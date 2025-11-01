import React, { useState } from 'react';
const TemplateGrid = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  
  const templates = [
    { name: 'Classic', gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' },
    { name: 'Modern', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
    { name: 'Elegant', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' },
    { name: 'Professional', gradient: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)' }
  ];

  return (
    <div className="row g-3">
      {templates.map((template, index) => (
        <div key={index} className="col-6">
          <div 
            className={`border rounded p-3 text-center ${selectedTemplate === index ? 'border-primary border-2' : ''}`}
            style={{
              cursor: 'pointer',
              height: '100px',
              background: template.gradient,
              transition: 'all 0.3s ease'
            }}
            onClick={() => setSelectedTemplate(index)}
          >
            <div className="bg-white rounded mb-2 mx-auto" style={{ width: '30px', height: '40px' }}></div>
            <small className="text-white fw-bold">{template.name}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateGrid
