import React, { useContext, useRef } from 'react';
import { templates } from '../assets/assests';
import { AppContext } from '../Context/AppContext';
import InvoicePreview from '../Components/InvoicePreview.jsx';

const PreviewPage = () => {
  const previewRef = useRef();
  const { selectedTemplate, setSelectedTemplate, Invoicedata } = useContext(AppContext);
  
  const handleDownloadPDF = () => {
    // TODO: Implement PDF download functionality
    console.log('Downloading PDF...');
  };
  
  const handleEdit = () => {
    // TODO: Navigate back to edit page
    console.log('Edit invoice...');
  };
  
  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log('Delete invoice...');
  };
  
  const handleSendEmail = () => {
    // TODO: Implement email functionality
    console.log('Send email...');
  };
  
  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Save invoice...');
  };
  
  return (
    <div className="preview-page">
      {/* Template Selection Buttons */}
      <div className="template-selection">
        <h2>Invoice Preview</h2>
        <div className="template-buttons">
          {templates.map(({ id, label }) => (
            <button
              key={id}
              className={selectedTemplate === id ? 'active' : ''}
              onClick={() => setSelectedTemplate(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Invoice Preview */}
      <div className="invoice-preview-wrapper">
        <InvoicePreview 
          ref={previewRef}
          invoicedata={Invoicedata}
          template={selectedTemplate}
        />
      </div>
      
      {/* Action Buttons */}
      <div className="action-buttons">
        <button onClick={handleDownloadPDF} className="btn-primary">
          📥 Download PDF
        </button>
        <button onClick={handleEdit} className="btn-secondary">
          ✏️ Edit Invoice
        </button>
        <button onClick={handleSave} className="btn-secondary">
          💾 Save Invoice
        </button>
        <button onClick={handleSendEmail} className="btn-secondary">
          📧 Send Email
        </button>
        <button onClick={handleDelete} className="btn-danger">
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default PreviewPage;