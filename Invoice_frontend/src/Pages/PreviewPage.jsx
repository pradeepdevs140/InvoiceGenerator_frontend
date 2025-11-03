import React, { useContext, useRef } from 'react';
import { templates } from '../assets/assests';
import { AppContext } from '../Context/AppContext';
import InvoicePreview from '../Components/InvoicePreview.jsx';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import {Loader2} from 'lucide-react';
import { useState } from 'react';
import { saveInvoice } from '../Service/InvoiceService.js';
import html2canvas from 'html2canvas';
import {uploadImage} from '../Service/CloudniaryService.js';

const PreviewPage = () => {
  const previewRef = useRef();
  const { selectedTemplate, setSelectedTemplate, Invoicedata , baseURL } = useContext(AppContext);
  const [loading , setloading] = useState(false);
  const navigate = useNavigate();
  
  const handleDownloadPDF = () => {
    console.log('Downloading PDF...');
  };
  
  const handleEdit = () => {
    console.log('Edit invoice...');
  };
  
  const handleDelete = () => {
    console.log('Delete invoice...');
  };
  
  const handleSendEmail = () => {
    console.log('Send email...');
  };
  
  const handleSave = async () => {
    try{
      setloading(true);
      const canvas= await html2canvas(previewRef.current, {
        scale:2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollY: -window.scrollY
      })
      const imageData = canvas.toDataURL("image/png");
      const thumbnailUrl = await uploadImage(imageData);
      const payload ={
        ...Invoicedata ,
        thumbnailUrl,
        template : selectedTemplate
      }
      const response = await saveInvoice(baseURL , payload);
      if(response.status === 200){
        toast.success("Invoice saved successfully");
        navigate('/dashboard');
      }
      else{
        throw new Error("Invoice Save Failed!");
      }
    }
    catch(error){
      toast.error("Error saving invoice: " + error.message);
    }
    finally{
      setloading(false);
    }
  };
  
  return (
    <div className="preview-page">
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spinner {
          animation: spin 1s linear infinite;
          display: inline-block;
        }
      `}</style>
      
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
                  disabled={loading} 
                  className="btn btn-success btn-lg px-4 py-2"
                  style={{ minWidth: '160px' }}
                >
                  {loading && (
                    <span className="spinner me-2" style={{ display: 'inline-block' }}>
                      <Loader2 size={18} />
                    </span>
                  )}
                  {loading ? 'Saving...' :  'Save Invoice'}
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