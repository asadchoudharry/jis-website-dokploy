import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { SiteSettings } from '../../components/SettingsContext';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/settings')
      .then(response => response.json())
      .then(data => setSettings(data))
      .catch(error => console.error('Error fetching settings:', error));
  }, []);

  const handleSave = () => {
    fetch('http://localhost:3001/api/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Settings saved:', data);
        alert('Settings saved successfully!');
      })
      .catch(error => console.error('Error saving settings:', error));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (settings) {
      setSettings({
        ...settings,
        [e.target.name]: e.target.value,
      });
    }
  };

  if (!settings) {
    return <AdminLayout><div>Loading...</div></AdminLayout>;
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Site Settings</h1>
      <div className="mb-4">
        <label htmlFor="title" className="block">Site Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={settings.title}
          onChange={handleInputChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="logoUrl" className="block">Logo URL</label>
        <input
          type="text"
          id="logoUrl"
          name="logoUrl"
          value={settings.logoUrl}
          onChange={handleInputChange}
          className="border p-2 w-full"
        />
      </div>
      <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">Save Settings</button>
    </AdminLayout>
  );
};

export default Settings;
