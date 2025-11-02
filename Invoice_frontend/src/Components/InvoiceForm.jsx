import React, { useContext, useEffect } from 'react';
import { AppContext } from '../Context/AppContext.jsx';

const InvoiceForm = () => {
  const { Invoicedata, setInvoicedata } = useContext(AppContext);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const logoUrl = URL.createObjectURL(file);
      setInvoicedata({ ...Invoicedata, logo: logoUrl });
    }
  };

  const updateCompany = (field, value) => {
    setInvoicedata({
      ...Invoicedata,
      company: { ...Invoicedata.company, [field]: value }
    });
  };

  const updateBilling = (field, value) => {
    setInvoicedata({
      ...Invoicedata,
      billing: { ...Invoicedata.billing, [field]: value }
    });
  };

  const updateShipping = (field, value) => {
    setInvoicedata({
      ...Invoicedata,
      shipping: { ...Invoicedata.shipping, [field]: value }
    });
  };

  const updateInvoice = (field, value) => {
    setInvoicedata({
      ...Invoicedata,
      invoice: { ...Invoicedata.invoice, [field]: value }
    });
  };

  const updateAccount = (field, value) => {
    setInvoicedata({
      ...Invoicedata,
      account: { ...Invoicedata.account, [field]: value }
    });
  };

  const addItem = () => {
    setInvoicedata({
      ...Invoicedata,
      items: [...Invoicedata.items, { name: '', description: '', quantity: 1, amount: 0, total: 0 }]
    });
  };

  const updateItem = (index, field, value) => {
    const updatedItems = Invoicedata.items.map((item, i) => {
      if (i === index) {
        const updatedItem = { ...item, [field]: value };
        // Auto-calculate total when quantity or amount changes
        if (field === 'quantity' || field === 'amount') {
          updatedItem.total = (updatedItem.quantity || 0) * (updatedItem.amount || 0);
        }
        return updatedItem;
      }
      return item;
    });
    setInvoicedata({ ...Invoicedata, items: updatedItems });
  };

  const removeItem = (index) => {
    if (Invoicedata.items.length > 1) {
      setInvoicedata({
        ...Invoicedata,
        items: Invoicedata.items.filter((_, i) => i !== index)
      });
    }
  };

  const calculateSubtotal = () => {
    return Invoicedata.items.reduce((sum, item) => sum + (item.total || 0), 0);
  };

  const calculateTax = () => {
    return (calculateSubtotal() * (Invoicedata.tax || 0)) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };
  const handlesubmit=()=>{
    console.log(Invoicedata);
  }

  return (
    <div>
      {/* Company Logo */}
      <div className="mb-4">
        <h6 className="fw-bold mb-3 text-primary">Company Logo</h6>
        <div className="d-flex align-items-center gap-3">
          <label htmlFor="logoUpload" className="border rounded p-2" style={{ cursor: 'pointer' }}>
            {Invoicedata.logo ? (
              <img src={Invoicedata.logo} alt="Logo" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
            ) : (
              <div className="text-center bg-light d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                <div>
                  <div style={{ fontSize: '1.5rem' }}>📤</div>
                  <small className="text-muted" style={{ fontSize: '0.7rem' }}>Upload</small>
                </div>
              </div>
            )}
          </label>
          <input type="file" id="logoUpload" className="d-none" accept="image/*" onChange={handleLogoChange} />
          <small className="text-muted">Click to upload logo</small>
        </div>
      </div>

      {/* Your Company */}
      <h6 className="fw-bold mb-3 text-primary">Your Company</h6>
      <div className="row g-2 mb-4">
        <div className="col-md-6">
          <input 
            type="text" 
            className="form-control form-control-sm" 
            placeholder="Company Name" 
            value={Invoicedata.company.name} 
            onChange={(e) => updateCompany('name', e.target.value)} 
          />
        </div>
        <div className="col-md-6">
          <input 
            type="text" 
            className="form-control form-control-sm" 
            placeholder="Phone Number" 
            value={Invoicedata.company.phone} 
            onChange={(e) => updateCompany('phone', e.target.value)} 
          />
        </div>
        <div className="col-md-12">
          <input 
            type="text" 
            className="form-control form-control-sm" 
            placeholder="Address" 
            value={Invoicedata.company.address} 
            onChange={(e) => updateCompany('address', e.target.value)} 
          />
        </div>
      </div>

      {/* Bill To */}
      <h6 className="fw-bold mb-3 text-primary">Bill To</h6>
      <div className="row g-2 mb-4">
        <div className="col-md-6">
          <input 
            type="text" 
            className="form-control form-control-sm" 
            placeholder="Client Name" 
            value={Invoicedata.billing.name} 
            onChange={(e) => updateBilling('name', e.target.value)} 
          />
        </div>
        <div className="col-md-6">
          <input 
            type="text" 
            className="form-control form-control-sm" 
            placeholder="Client Phone" 
            value={Invoicedata.billing.phone} 
            onChange={(e) => updateBilling('phone', e.target.value)} 
          />
        </div>
        <div className="col-md-12">
          <input 
            type="text" 
            className="form-control form-control-sm" 
            placeholder="Client Address" 
            value={Invoicedata.billing.address} 
            onChange={(e) => updateBilling('address', e.target.value)} 
          />
        </div>
      </div>

      {/* Ship To */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold mb-0 text-primary">Ship To</h6>
        <div className="form-check">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="sameAsBilling"
            onChange={(e) => {
              if (e.target.checked) {
                setInvoicedata({
                  ...Invoicedata,
                  shipping: { ...Invoicedata.billing }
                });
              }
            }}
          />
          <label className="form-check-label small" htmlFor="sameAsBilling">
            Same as Billing
          </label>
        </div>
      </div>
      <div className="row g-2 mb-4">
        <div className="col-md-6">
          <input 
            type="text" 
            className="form-control form-control-sm" 
            placeholder="Recipient Name" 
            value={Invoicedata.shipping.name} 
            onChange={(e) => updateShipping('name', e.target.value)} 
          />
        </div>
        <div className="col-md-6">
          <input 
            type="text" 
            className="form-control form-control-sm" 
            placeholder="Recipient Phone" 
            value={Invoicedata.shipping.phone} 
            onChange={(e) => updateShipping('phone', e.target.value)} 
          />
        </div>
        <div className="col-md-12">
          <input 
            type="text" 
            className="form-control form-control-sm" 
            placeholder="Shipping Address" 
            value={Invoicedata.shipping.address} 
            onChange={(e) => updateShipping('address', e.target.value)} 
          />
        </div>
      </div>

      {/* Invoice Information */}
      <h6 className="fw-bold mb-3 text-primary">Invoice Information</h6>
      <div className="row g-2 mb-4">
        <div className="col-md-4">
          <input 
            type="text" 
            className="form-control form-control-sm" 
            placeholder="Invoice #" 
            value={Invoicedata.invoice.number} 
            onChange={(e) => updateInvoice('number', e.target.value)} 
          />
        </div>
        <div className="col-md-4">
          <input 
            type="date" 
            className="form-control form-control-sm" 
            value={Invoicedata.invoice.date} 
            onChange={(e) => updateInvoice('date', e.target.value)} 
          />
        </div>
        <div className="col-md-4">
          <input 
            type="date" 
            className="form-control form-control-sm" 
            placeholder="Due Date" 
            value={Invoicedata.invoice.duedate} 
            onChange={(e) => updateInvoice('duedate', e.target.value)} 
          />
        </div>
      </div>

      {/* Item Details */}
      <h6 className="fw-bold mb-3 text-primary">Item Details</h6>
      {Invoicedata.items.map((item, index) => (
        <div key={index} className="border rounded p-2 mb-2 bg-light position-relative">
          {Invoicedata.items.length > 1 && (
            <button 
              className="btn btn-sm text-danger position-absolute top-0 end-0 m-1" 
              style={{ fontSize: '0.8rem' }} 
              onClick={() => removeItem(index)}
            >
              ×
            </button>
          )}
          <div className="row g-2">
            <div className="col-md-3">
              <input 
                type="text" 
                className="form-control form-control-sm" 
                placeholder="Item Name" 
                value={item.name} 
                onChange={(e) => updateItem(index, 'name', e.target.value)} 
              />
            </div>
            <div className="col-md-3">
              <input 
                type="text" 
                className="form-control form-control-sm" 
                placeholder="Description" 
                value={item.description} 
                onChange={(e) => updateItem(index, 'description', e.target.value)} 
              />
            </div>
            <div className="col-md-2">
              <input 
                type="number" 
                className="form-control form-control-sm" 
                placeholder="Qty" 
                value={item.quantity} 
                onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)} 
              />
            </div>
            <div className="col-md-2">
              <input 
                type="number" 
                className="form-control form-control-sm" 
                placeholder="Amount" 
                value={item.amount} 
                onChange={(e) => updateItem(index, 'amount', parseFloat(e.target.value) || 0)} 
              />
            </div>
            <div className="col-md-2">
              <input 
                type="number" 
                className="form-control form-control-sm" 
                value={item.total.toFixed(2)} 
                disabled 
              />
            </div>
          </div>
        </div>
      ))}
      <button className="btn btn-sm btn-primary mb-4" onClick={addItem}>+ Add Item</button>

      {/* Bank Account Details */}
      <h6 className="fw-bold mb-3 text-primary">Bank Account Details</h6>
      <div className="row g-2 mb-4">
        <div className="col-md-4">
          <input 
            type="text" 
            className="form-control form-control-sm" 
            placeholder="Account Name" 
            value={Invoicedata.account.name} 
            onChange={(e) => updateAccount('name', e.target.value)} 
          />
        </div>
        <div className="col-md-4">
          <input 
            type="text" 
            className="form-control form-control-sm" 
            placeholder="Account Number" 
            value={Invoicedata.account.number} 
            onChange={(e) => updateAccount('number', e.target.value)} 
          />
        </div>
        <div className="col-md-4">
          <input 
            type="text" 
            className="form-control form-control-sm" 
            placeholder="IFSC/Branch Code" 
            value={Invoicedata.account.ifsccode} 
            onChange={(e) => updateAccount('ifsccode', e.target.value)} 
          />
        </div>
      </div>

      {/* Notes */}
      <h6 className="fw-bold mb-3 text-primary">Notes</h6>
      <textarea 
        className="form-control form-control-sm mb-4" 
        rows="3" 
        placeholder="Add notes or terms..." 
        value={Invoicedata.notes} 
        onChange={(e) => setInvoicedata({ ...Invoicedata, notes: e.target.value })}
      ></textarea>

      {/* Totals */}
      <div className="card bg-light border-0">
        <div className="card-body p-3">
          <div className="d-flex justify-content-between mb-2">
            <span className="small">Subtotal</span>
            <strong className="small">₹{calculateSubtotal().toFixed(2)}</strong>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-items-center gap-2">
              <span className="small">Tax</span>
              <input 
                type="number" 
                className="form-control form-control-sm" 
                style={{ width: '60px' }} 
                min="0" 
                max="100" 
                value={Invoicedata.tax} 
                onChange={(e) => setInvoicedata({ ...Invoicedata, tax: parseFloat(e.target.value) || 0 })} 
              />
              <span className="small">%</span>
            </div>
            <strong className="small">₹{calculateTax().toFixed(2)}</strong>
          </div>
          <hr className="my-2" />
          <div className="d-flex justify-content-between">
            <span className="fw-bold">Grand Total</span>
            <strong className="text-primary fs-5">₹{calculateTotal().toFixed(2)}</strong>
          </div>
        </div>
      </div>
      <button onClick ={handlesubmit}>Submit</button>
    </div>
  );
};

export default InvoiceForm;