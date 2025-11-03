import React, { useContext, useRef } from 'react';
import { templates } from '../assets/assests';
import { AppContext } from '../Context/AppContext';
import InvoicePreview from '../Components/InvoicePreview.jsx';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2, Download, Edit3, Save, Mail, Trash2, ArrowLeft, Eye } from 'lucide-react';
import { useState } from 'react';
import { saveInvoice } from '../Service/InvoiceService.js';
import html2canvas from 'html2canvas';
import { uploadImage } from '../Service/CloudniaryService.js';
import { deleteInvoice } from '../Service/InvoiceService.js';

const PreviewPage = () => {
  const previewRef = useRef();
  const { selectedTemplate, setSelectedTemplate, Invoicedata, baseURL } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const[Downloading , setDownloading] = useState(false);
  
  const handleDownloadPDF = async() => {
    if(!previewRef.current){
      return;
    }
    try{
      setDownloading(true);
     await generatePdfFromElement(previewRef.current), `invoice_${Date.now()}.pdf`  ;
    }
    catch(error){
      toast.error("Error downloading PDF: " + error.message);
    }
    console.log('Downloading PDF...');
  };
  
  const handleEdit = () => {
    navigate(-1);
  };
  
  const handleDelete = async () => {
    if (!Invoicedata.id) {
      toast.error("Cannot delete unsaved invoice!");
      navigate('/dashboard');
      return;
    }
    
    if (!window.confirm('Are you sure you want to delete this invoice?')) {
      return;
    }
    
    try {
      const response = await deleteInvoice(baseURL, Invoicedata.id);
      toast.success("Invoice deleted successfully");
      navigate('/dashboard');
    } catch (error) {
      toast.error("Error deleting invoice: " + error.message);
    }
  };
  
  const handleSendEmail = () => {
    console.log('Send email...');
  };
  
  const handleSave = async () => {
    try {
      setLoading(true);
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollY: -window.scrollY
      });
      const imageData = canvas.toDataURL("image/png");
      const thumbnailUrl = await uploadImage(imageData);
      const payload = {
        ...Invoicedata,
        thumbnailUrl,
        template: selectedTemplate
      };
      const response = await saveInvoice(baseURL, payload);
      if (response.status === 200) {
        toast.success("Invoice saved successfully");
        navigate('/dashboard');
      } else {
        throw new Error("Invoice Save Failed!");
      }
    } catch (error) {
      toast.error("Error saving invoice: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="preview-page bg-light min-vh-100">
      <div className="container-fluid py-4">
        {/* Header with Actions */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  {/* Left: Back Button & Title */}
                  <div className="d-flex align-items-center gap-3">
                    <button 
                      onClick={() => navigate('/dashboard')} 
                      className="btn btn-light border"
                    >
                      <ArrowLeft size={18} className="me-2" />
                      Back
                    </button>
                    <div>
                      <h4 className="mb-0 fw-bold text-dark">
                        <Eye size={24} className="me-2 text-primary" />
                        Invoice Preview
                      </h4>
                      <small className="text-muted">Review and manage your invoice</small>
                    </div>
                  </div>
                  
                  {/* Right: Action Buttons */}
                  <div className="d-flex flex-wrap gap-2">
                    <button 
                      onClick={handleEdit} 
                      className="btn btn-outline-secondary"
                    >
                      <Edit3 size={16} className="me-2" />
                      Edit
                    </button>
                    
                    <button 
                      onClick={handleDownloadPDF} 
                      className="btn btn-outline-primary" disabled={Downloading} 
                    >
                      {Downloading && (
                        <Loader2 size={16} className="me-2" style={{ animation: 'spin 1s linear infinite' }} />
                      )}
                      <Download size={16} className="me-2" />
                      Download PDF
                    </button>
                    
                    <button 
                      onClick={handleSendEmail} 
                      className="btn btn-outline-info"
                    >
                      <Mail size={16} className="me-2" />
                      Send Email
                    </button>
                    
                    <button 
                      onClick={handleSave}  
                      disabled={loading} 
                      className="btn btn-success"
                      style={{ minWidth: '120px' }}
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="me-2" style={{ animation: 'spin 1s linear infinite' }} />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={16} className="me-2" />
                          Save
                        </>
                      )}
                    </button>
                    
                    <button 
                      onClick={handleDelete} 
                      className="btn btn-danger"
                    >
                      <Trash2 size={16} className="me-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Template Selection */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h6 className="mb-3 text-secondary fw-semibold">Select Template</h6>
                <div className="d-flex flex-wrap gap-2">
                  {templates.map(({ id, label }) => (
                    <button
                      key={id}
                      className={`btn ${selectedTemplate === id ? 'btn-primary' : 'btn-outline-primary'}`}
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
        <div className="row">
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
      </div>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .preview-page {
          background-color: #f8f9fa;
        }
        
        .btn {
          transition: all 0.2s ease;
        }
        
        .btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .card {
          transition: box-shadow 0.3s ease;
        }
        
        .card:hover {
          box-shadow: 0 0.5rem 1.5rem rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default PreviewPage;