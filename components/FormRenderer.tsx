import React, { useState, useEffect } from 'react';

interface FormField {
  name: string;
  label: string;
  type: string;
  options?: string[];
}

interface FormStep {
  title: string;
  fields: FormField[];
}

interface Form {
  name: string;
  steps: FormStep[];
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

interface FormRendererProps {
  formName: string;
}

const FormRenderer: React.FC<FormRendererProps> = ({ formName }) => {
  const [form, setForm] = useState<Form | null>(null);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/forms/${formName}`)
      .then(response => response.json())
      .then(data => setForm(data))
      .catch(error => console.error('Error fetching form:', error));
  }, [formName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    if (currentStep < form.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setSubmissionStatus('submitting');
      fetch(`${BACKEND_URL}/api/forms/${formName}/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Submission failed');
          }
          return response.json();
        })
        .then(() => {
          setSubmissionStatus('success');
          setFormData({});
          setCurrentStep(0);
        })
        .catch(() => {
          setSubmissionStatus('error');
        });
    }
  };

  if (!form) {
    return <div>Loading form...</div>;
  }

  const step = form.steps[currentStep];

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">{step.title}</h2>
      {step.fields.map(field => (
        <div key={field.name} className="mb-4">
          <label htmlFor={field.name} className="block">{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          ) : field.type === 'select' ? (
            <select
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
              className="border p-2 w-full"
            >
              <option value="">Select an option</option>
              {field.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          )}
        </div>
      ))}
      <div className="flex justify-between">
        {currentStep > 0 && (
          <button type="button" onClick={() => setCurrentStep(currentStep - 1)} className="bg-gray-500 text-white p-2 rounded">
            Previous
          </button>
        )}
        <button type="submit" disabled={submissionStatus === 'submitting'} className="bg-blue-500 text-white p-2 rounded">
          {submissionStatus === 'submitting' ? 'Submitting...' : (currentStep < form.steps.length - 1 ? 'Next' : 'Submit')}
        </button>
      </div>
      {submissionStatus === 'success' && <p className="text-green-500 mt-2">Form submitted successfully!</p>}
      {submissionStatus === 'error' && <p className="text-red-500 mt-2">An error occurred. Please try again.</p>}
    </form>
  );
};

export default FormRenderer;
