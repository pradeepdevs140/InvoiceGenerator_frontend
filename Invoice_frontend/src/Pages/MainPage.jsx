import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import InvoiceForm from '../Components/InvoiceForm.jsx';
import TemplateGrid from '../Components/TemplateGrid.jsx';
const MainPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [invoiceTitle, setInvoiceTitle] = useState('INVOICE');

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="container">
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-center">
              {isEditing ? (
                <input
                  type="text"
                  className="form-control text-center fw-bold border-primary"
                  style={{ maxWidth: '400px', fontSize: '1.5rem' }}
                  value={invoiceTitle}
                  onChange={(e) => setInvoiceTitle(e.target.value)}
                  onBlur={() => setIsEditing(false)}
                  autoFocus
                />
              ) : (
                <div className="d-flex align-items-center gap-2">
                  <h4 className="mb-0 fw-bold">{invoiceTitle}</h4>
                  <button
                    className="btn btn-sm p-1 border-0 bg-transparent"
                    onClick={() => setIsEditing(true)}
                  >
                    <Pencil className="text-primary" size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-body" style={{ maxHeight: '85vh', overflowY: 'auto' }}>
                <h5 className="card-title fw-bold mb-4 text-center text-primary">Invoice Details</h5>
                <InvoiceForm />
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-4 text-center text-primary">Template Preview</h5>
                
                <h6 className="fw-bold mb-3">Choose Template</h6>
                <TemplateGrid />
                
                <hr className="my-4" />
                
                <div className="bg-light rounded p-4 text-center">
                  <div className="mb-3">
                    <div className="display-1">📄</div>
                  </div>
                  <h6 className="fw-bold mb-2">Invoice Preview</h6>
                  <p className="text-muted small mb-3">
                    Your invoice will appear here once you fill in the details
                  </p>
                  <button className="btn btn-primary w-100">
                    Generate Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;