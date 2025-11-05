import React, { useContext, useEffect, useRef, useState } from 'react';
import { templates } from '../assets/assests';
import { AppContext } from '../Context/AppContext';
import InvoicePreview from '../Components/InvoicePreview.jsx';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2, Download, Edit3, Save, Mail, Trash2, ArrowLeft, Eye } from 'lucide-react';
import { saveInvoice, deleteInvoice, sendinvoice } from '../Service/InvoiceService.js'
import html2canvas from 'html2canvas';
import { uploadImage } from '../Service/CloudniaryService.js';
import { generatePdfFromElement } from '../util/PdfUtil.js';
import { useAuth, useUser } from '@clerk/clerk-react';

const PreviewPage = () => {
  const previewRef = useRef();
  const { selectedTemplate, setSelectedTemplate, Invoicedata, baseURL } = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [emailing, setEmailing] = useState(false);

  const { getToken, isSignedIn } = useAuth();
  const { user } = useUser();

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return toast.error("Preview not available");

    try {
      setDownloading(true);
      await generatePdfFromElement(previewRef.current, `invoice_${Date.now()}.pdf`);
      toast.success("PDF downloaded successfully");
    } catch (error) {
      toast.error("Error downloading PDF: " + error.message);
    } finally {
      setDownloading(false);
    }
  };

  const handleEdit = () => navigate(-1);

  const handleDelete = async () => {
    if (!Invoicedata.id) return toast.error("Cannot delete unsaved invoice!");

    if (!window.confirm('Are you sure you want to delete this invoice?')) return;

    try {
     const token = await getToken({ template: "default" });
      await deleteInvoice(baseURL, Invoicedata.id, token);
      toast.success("Invoice deleted successfully");
      navigate('/dashboard');
    } catch (error) {
      toast.error("Error deleting invoice: " + error.message);
    }
  };

  const handleSendEmailClick = () => {
    if (!Invoicedata.id) return toast.error("Please save the invoice first!");
    setShowModal(true);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!previewRef.current) return toast.error("Preview not available");
    if (!customerEmail) return toast.error("Enter customer email");

    try {
      setEmailing(true);

      const pdfBlob = await generatePdfFromElement(
        previewRef.current,
        `invoice_${Date.now()}.pdf`,
        true
      );

      const formData = new FormData();
      formData.append("file", pdfBlob, `invoice_${Date.now()}.pdf`);
      formData.append("email", customerEmail);

      const token = await getToken({ template: "default" });
      const response = await sendinvoice(baseURL, formData, token);

      if (response.status === 200) {
        toast.success("Invoice sent successfully!");
        setShowModal(false);
        setCustomerEmail("");
      }
    } catch (error) {
      toast.error("Error sending invoice");
    } finally {
      setEmailing(false);
    }
  };

  const handleSave = async () => {
    if (!isSignedIn || !user) return toast.error("Please login again");

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
        clerkId: user.id,
        thumbnailUrl,
        template: selectedTemplate
      };

      const token = await getToken({ template: "default" });
      const response = await saveInvoice(baseURL, payload, token);

      if (response.status === 200) {
        toast.success("Invoice saved successfully");
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error("Error saving invoice: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!Invoicedata || !Invoicedata.items?.length) {
      toast.error("Invoice Data is Empty!");
      navigate("/dashboard");
    }
  }, [Invoicedata, navigate]);

  return (
    <div className="preview-page bg-light min-vh-100">
      <div className="container-fluid py-4">
        
        {/* Header */}
        <div className="d-flex justify-content-between mb-3">
          <button onClick={() => navigate('/dashboard')} className="btn btn-light border">
            <ArrowLeft size={18} className="me-2" /> Back
          </button>
          <h4 className="fw-bold text-dark"><Eye size={22} className="me-2 text-primary" /> Invoice Preview</h4>
        </div>

        {/* Action Buttons */}
        <div className="d-flex flex-wrap gap-2 mb-3">

          <button onClick={handleEdit} className="btn btn-outline-secondary">
            <Edit3 size={16} className="me-2" /> Edit
          </button>

          <button onClick={handleDownloadPDF} className="btn btn-outline-primary" disabled={downloading}>
            {downloading && <Loader2 size={16} className="me-2 spinner" />}
            <Download size={16} className="me-2" /> Download PDF
          </button>

          <button onClick={handleSendEmailClick} className="btn btn-outline-info" disabled={emailing || !Invoicedata?.id}>
            <Mail size={16} className="me-2" /> {emailing ? 'Sending...' : 'Send Email'}
          </button>

          <button onClick={handleSave} disabled={loading} className="btn btn-success">
            {loading ? <Loader2 size={16} className="me-2 spinner" /> : <Save size={16} className="me-2" />} Save
          </button>

          <button onClick={handleDelete} className="btn btn-danger">
            <Trash2 size={16} className="me-2" /> Delete
          </button>
        </div>

        {/* Templates & Preview */}
        <div className="mb-3">
          {templates.map(({ id, label }) => (
            <button
              key={id}
              className={`btn ${selectedTemplate === id ? 'btn-primary' : 'btn-outline-primary'} me-2`}
              onClick={() => setSelectedTemplate(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="card shadow-sm p-3">
          <InvoicePreview ref={previewRef} invoicedata={Invoicedata} template={selectedTemplate} />
        </div>

      </div>

      {/* Email Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => !emailing && setShowModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>

            <div className="modal-header">
              <h5 className="modal-title"><Mail size={20} className="me-2" /> Send Invoice</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
            </div>

            <form onSubmit={handleSendEmail}>
              <div className="modal-body">
                <label className="form-label fw-semibold">Customer Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="customer@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                  disabled={emailing}
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={emailing}>
                  {emailing ? <Loader2 className="spinner me-2" /> : <Mail className="me-2" />} Send
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Spinner CSS */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        .spinner { animation: spin 1s linear infinite }
      `}</style>
    </div>
  );
};

export default PreviewPage;
