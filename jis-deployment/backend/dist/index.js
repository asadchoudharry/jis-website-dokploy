"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';
const dbPath = path_1.default.resolve(__dirname, '../db.json');
app.use((0, cors_1.default)({
    origin: isProduction ? ['https://your-domain.com'] : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(body_parser_1.default.json());
app.use('/uploads', express_1.default.static(path_1.default.resolve(__dirname, '../uploads')));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.resolve(__dirname, '../uploads/'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.json({ url: `/uploads/${req.file.filename}` });
});
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    fs_1.default.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }
        const db = JSON.parse(data);
        const user = db.users.find((u) => u.username === username);
        if (user) {
            // WARNING: Plain text password comparison. Not secure.
            // In a real application, you should hash the password and compare the hash.
            if (user.password === password) {
                const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, db.jwtSecret, { expiresIn: '1h' });
                res.json({ token });
            }
            else {
                res.status(401).send('Invalid credentials');
            }
        }
        else {
            res.status(401).send('Invalid credentials');
        }
    });
});
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        fs_1.default.readFile(dbPath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error reading database');
            }
            const db = JSON.parse(data);
            jsonwebtoken_1.default.verify(token, db.jwtSecret, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                next();
            });
        });
    }
    else {
        res.sendStatus(401);
    }
};
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/api/settings', (req, res) => {
    fs_1.default.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }
        res.json(JSON.parse(data).siteSettings);
    });
});
app.put('/api/settings', authenticateJWT, (req, res) => {
    fs_1.default.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }
        const db = JSON.parse(data);
        db.siteSettings = Object.assign(Object.assign({}, db.siteSettings), req.body);
        fs_1.default.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error writing to database');
            }
            res.json(db.siteSettings);
        });
    });
});
app.get('/api/pages', (req, res) => {
    fs_1.default.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }
        res.json(JSON.parse(data).pages);
    });
});
app.post('/api/pages', authenticateJWT, (req, res) => {
    fs_1.default.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }
        const db = JSON.parse(data);
        const newPage = {
            slug: req.body.slug,
            title: req.body.title,
            content: req.body.content || []
        };
        db.pages.push(newPage);
        fs_1.default.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error writing to database');
            }
            res.status(201).json(newPage);
        });
    });
});
app.get('/api/pages/:slug', (req, res) => {
    fs_1.default.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }
        const db = JSON.parse(data);
        const page = db.pages.find((p) => p.slug === req.params.slug);
        if (page) {
            res.json(page);
        }
        else {
            res.status(404).send('Page not found');
        }
    });
});
app.put('/api/pages/:slug', authenticateJWT, (req, res) => {
    fs_1.default.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }
        const db = JSON.parse(data);
        const pageIndex = db.pages.findIndex((p) => p.slug === req.params.slug);
        if (pageIndex !== -1) {
            db.pages[pageIndex] = Object.assign(Object.assign({}, db.pages[pageIndex]), req.body);
            fs_1.default.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error writing to database');
                }
                res.json(db.pages[pageIndex]);
            });
        }
        else {
            res.status(404).send('Page not found');
        }
    });
});
app.delete('/api/pages/:slug', authenticateJWT, (req, res) => {
    fs_1.default.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }
        const db = JSON.parse(data);
        const pageIndex = db.pages.findIndex((p) => p.slug === req.params.slug);
        if (pageIndex !== -1) {
            db.pages.splice(pageIndex, 1);
            fs_1.default.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error writing to database');
                }
                res.status(204).send();
            });
        }
        else {
            res.status(404).send('Page not found');
        }
    });
});
app.get('/api/forms', (req, res) => {
    fs_1.default.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }
        res.json(JSON.parse(data).forms);
    });
});
app.post('/api/forms', authenticateJWT, (req, res) => {
    fs_1.default.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }
        const db = JSON.parse(data);
        const newForm = {
            name: req.body.name,
            fields: req.body.fields || [],
            submissions: []
        };
        db.forms.push(newForm);
        fs_1.default.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error writing to database');
            }
            res.status(201).json(newForm);
        });
    });
});
app.get('/api/forms/:name', (req, res) => {
    fs_1.default.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }
        const db = JSON.parse(data);
        const form = db.forms.find((f) => f.name === req.params.name);
        if (form) {
            res.json(form);
        }
        else {
            res.status(404).send('Form not found');
        }
    });
});
app.post('/api/forms/:name/submissions', (req, res) => {
    fs_1.default.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }
        const db = JSON.parse(data);
        const formIndex = db.forms.findIndex((f) => f.name === req.params.name);
        if (formIndex !== -1) {
            db.forms[formIndex].submissions.push(req.body);
            fs_1.default.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error writing to database');
                }
                res.status(201).json(req.body);
            });
        }
        else {
            res.status(404).send('Form not found');
        }
    });
});
app.get('/api/forms/:name/submissions', (req, res) => {
    fs_1.default.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }
        const db = JSON.parse(data);
        const form = db.forms.find((f) => f.name === req.params.name);
        if (form) {
            res.json(form.submissions);
        }
        else {
            res.status(404).send('Form not found');
        }
    });
});
app.put('/api/forms/:name', authenticateJWT, (req, res) => {
    fs_1.default.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }
        const db = JSON.parse(data);
        const formIndex = db.forms.findIndex((f) => f.name === req.params.name);
        if (formIndex !== -1) {
            db.forms[formIndex] = Object.assign(Object.assign({}, db.forms[formIndex]), req.body);
            fs_1.default.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error writing to database');
                }
                res.json(db.forms[formIndex]);
            });
        }
        else {
            res.status(404).send('Form not found');
        }
    });
});
app.get('/api/theme/header', (req, res) => {
    fs_1.default.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }
        res.json(JSON.parse(data).header);
    });
});
app.put('/api/theme/header', authenticateJWT, (req, res) => {
    fs_1.default.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }
        const db = JSON.parse(data);
        db.header = Object.assign(Object.assign({}, db.header), req.body);
        fs_1.default.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error writing to database');
            }
            res.json(db.header);
        });
    });
});
app.get('/api/theme/footer', (req, res) => {
    fs_1.default.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }
        res.json(JSON.parse(data).footer);
    });
});
app.put('/api/theme/footer', authenticateJWT, (req, res) => {
    fs_1.default.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }
        const db = JSON.parse(data);
        db.footer = Object.assign(Object.assign({}, db.footer), req.body);
        fs_1.default.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error writing to database');
            }
            res.json(db.footer);
        });
    });
});
app.get('/api/popups', (req, res) => {
    fs_1.default.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }
        res.json(JSON.parse(data).popups);
    });
});
app.post('/api/popups', authenticateJWT, (req, res) => {
    fs_1.default.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }
        const db = JSON.parse(data);
        const newPopup = Object.assign({ id: new Date().toISOString() }, req.body);
        db.popups.push(newPopup);
        fs_1.default.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error writing to database');
            }
            res.status(201).json(newPopup);
        });
    });
});
app.get('/api/popups/:id', (req, res) => {
    fs_1.default.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }
        const db = JSON.parse(data);
        const popup = db.popups.find((p) => p.id === req.params.id);
        if (popup) {
            res.json(popup);
        }
        else {
            res.status(404).send('Popup not found');
        }
    });
});
app.put('/api/popups/:id', authenticateJWT, (req, res) => {
    fs_1.default.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }
        const db = JSON.parse(data);
        const popupIndex = db.popups.findIndex((p) => p.id === req.params.id);
        if (popupIndex !== -1) {
            db.popups[popupIndex] = Object.assign(Object.assign({}, db.popups[popupIndex]), req.body);
            fs_1.default.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error writing to database');
                }
                res.json(db.popups[popupIndex]);
            });
        }
        else {
            res.status(404).send('Popup not found');
        }
    });
});
app.delete('/api/popups/:id', authenticateJWT, (req, res) => {
    fs_1.default.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database');
        }
        const db = JSON.parse(data);
        const popupIndex = db.popups.findIndex((p) => p.id === req.params.id);
        if (popupIndex !== -1) {
            db.popups.splice(popupIndex, 1);
            fs_1.default.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error writing to database');
                }
                res.status(204).send();
            });
        }
        else {
            res.status(404).send('Popup not found');
        }
    });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: isProduction ? 'Internal Server Error' : err.message });
});
// Handle 404
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});
app.listen(port, () => {
    console.log(`Backend server is running at http://localhost:${port}`);
});
