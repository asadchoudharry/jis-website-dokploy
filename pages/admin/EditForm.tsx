import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';

interface FormField {
  name: string;
  label: string;
  type: string;
}

interface FormStep {
  title: string;
  fields: FormField[];
}

interface Form {
  name: string;
  steps: FormStep[];
  submissions: any[];
}

const EditForm: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [form, setForm] = useState<Form | null>(null);
  const [fieldName, setFieldName] = useState('');
  const [fieldLabel, setFieldLabel] = useState('');
  const [fieldType, setFieldType] = useState('text');

  useEffect(() => {
    fetch(`http://localhost:3001/api/forms/${name}`)
      .then(response => response.json())
      .then(data => setForm(data))
      .catch(error => console.error('Error fetching form:', error));
  }, [name]);

  const handleUpdateForm = (updatedForm: Form) => {
    fetch(`http://localhost:3001/api/forms/${name}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedForm),
    })
      .then(response => response.json())
      .then(data => {
        setForm(data);
      })
      .catch(error => console.error('Error updating form:', error));
  };

  const handleAddStep = () => {
    if (!form) return;
    const newStep: FormStep = { title: 'New Step', fields: [] };
    const updatedForm = { ...form, steps: [...form.steps, newStep] };
    handleUpdateForm(updatedForm);
  };

  const handleRemoveStep = (stepIndex: number) => {
    if (!form) return;
    const updatedForm = { ...form, steps: form.steps.filter((_, i) => i !== stepIndex) };
    handleUpdateForm(updatedForm);
  };
  
  const handleAddField = (stepIndex: number) => (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    const newField: FormField = { name: fieldName, label: fieldLabel, type: fieldType };
    const updatedSteps = [...form.steps];
    updatedSteps[stepIndex].fields.push(newField);
    const updatedForm = { ...form, steps: updatedSteps };
    handleUpdateForm(updatedForm);
    setFieldName('');
    setFieldLabel('');
    setFieldType('text');
  };


  if (!form) {
    return <AdminLayout><div>Loading...</div></AdminLayout>;
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Editing Form: {form.name}</h1>
      
      <button onClick={handleAddStep} className="bg-green-500 text-white p-2 rounded mb-4">Add Step</button>

      {form.steps.map((step, stepIndex) => (
        <div key={stepIndex} className="border p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{step.title}</h2>
            <button onClick={() => handleRemoveStep(stepIndex)} className="bg-red-500 text-white p-1 rounded text-sm">Remove Step</button>
          </div>
          
          <form onSubmit={handleAddField(stepIndex)} className="mb-4">
            <h3 className="text-lg font-bold mb-2">Add New Field</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor={`fieldName-${stepIndex}`} className="block">Name</label>
                <input type="text" id={`fieldName-${stepIndex}`} value={fieldName} onChange={e => setFieldName(e.target.value)} className="border p-2 w-full" required />
              </div>
              <div>
                <label htmlFor={`fieldLabel-${stepIndex}`} className="block">Label</label>
                <input type="text" id={`fieldLabel-${stepIndex}`} value={fieldLabel} onChange={e => setFieldLabel(e.target.value)} className="border p-2 w-full" required />
              </div>
              <div>
                <label htmlFor={`fieldType-${stepIndex}`} className="block">Type</label>
                <select id={`fieldType-${stepIndex}`} value={fieldType} onChange={e => setFieldType(e.target.value)} className="border p-2 w-full">
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="textarea">Textarea</option>
                  <option value="select">Select</option>
                </select>
              </div>
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">Add Field</button>
          </form>

          <h3 className="text-lg font-bold mb-2">Fields</h3>
          <ul>
            {step.fields.map(field => (
              <li key={field.name} className="mb-2 p-2 border rounded">
                <strong>{field.label}</strong> ({field.name}) - <em>{field.type}</em>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div>
        <h2 className="text-xl font-bold mb-2">Submissions</h2>
        {form.submissions.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          <pre>{JSON.stringify(form.submissions, null, 2)}</pre>
        )}
      </div>
    </AdminLayout>
  );
};

export default EditForm;