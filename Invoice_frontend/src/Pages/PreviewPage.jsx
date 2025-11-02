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
    <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h2 className="card-title mb-4 text-primary fw-bold">Invoice Preview</h2>
                <div className="d-flex flex-wrap gap-2">
                  {templates.map(({ id, label }) => (
                    <button
                      key={id}
                      className={`btn ${selectedTemplate === id ? 'btn-primary' : 'btn-outline-primary'} px-4 py-2`}
                      onClick={() => setSelectedTemplate(id)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      
      {/* Invoice Preview */}
      <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                <InvoicePreview 
                  ref={previewRef}
                  invoicedata={Invoicedata}
                  template={selectedTemplate}
                />
              </div>
            </div>
          </div>
        </div>
      
      {/* Action Buttons */}
      <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <button 
                    onClick={handleDownloadPDF} 
                    className="btn btn-primary btn-lg px-4 py-2"
                  >
                    📥 Download PDF
                  </button>
                  <button 
                    onClick={handleEdit} 
                    className="btn btn-secondary btn-lg px-4 py-2"
                  >
                    ✏️ Edit Invoice
                  </button>
                  <button 
                    onClick={handleSave} 
                    className="btn btn-secondary btn-lg px-4 py-2"
                  >
                    💾 Save Invoice
                  </button>
                  <button 
                    onClick={handleSendEmail} 
                    className="btn btn-secondary btn-lg px-4 py-2"
                  >
                    📧 Send Email
                  </button>
                  <button 
                    onClick={handleDelete} 
                    className="btn btn-danger btn-lg px-4 py-2"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default PreviewPage;