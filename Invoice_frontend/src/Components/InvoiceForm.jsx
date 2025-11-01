import React, { useState } from 'react';
import { Pencil } from 'lucide-react';

const InvoiceForm = () => {
  const [logo, setLogo] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [billToName, setBillToName] = useState('');
  const [billToPhone, setBillToPhone] = useState('');
  const [billToAddress, setBillToAddress] = useState('');
  const [shipToName, setShipToName] = useState('');
  const [shipToPhone, setShipToPhone] = useState('');
  const [shipToAddress, setShipToAddress] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState([{ id: 1, name: '', description: '', qty: 1, amount: 0 }]);
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [branchCode, setBranchCode] = useState('');
  const [taxRate, setTaxRate] = useState(2);
  const [notes, setNotes] = useState('');

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const addItem = () => {
    setItems([...items, { id: items.length + 1, name: '', description: '', qty: 1, amount: 0 }]);
  };

  const updateItem = (id, field, value) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const removeItem = (id) => {
    if (items.length > 1) setItems(items.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => items.reduce((sum, item) => sum + (item.qty * item.amount || 0), 0);
  const calculateTax = () => (calculateSubtotal() * taxRate) / 100;
  const calculateTotal = () => calculateSubtotal() + calculateTax();
  const calculateItemTotal = (item) => (item.qty * item.amount || 0);

  return (
    <div>
      <div className="mb-4">
        <h6 className="fw-bold mb-3 text-primary">Company Logo</h6>
        <div className="d-flex align-items-center gap-3">
          <label htmlFor="logoUpload" className="border rounded p-2" style={{ cursor: 'pointer' }}>
            {logo ? (
              <img src={logo} alt="Logo" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
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

      <h6 className="fw-bold mb-3 text-primary">Your Company</h6>
      <div className="row g-2 mb-4">
        <div className="col-md-6">
          <input type="text" className="form-control form-control-sm" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control form-control-sm" placeholder="Phone Number" value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} />
        </div>
        <div className="col-md-12">
          <input type="text" className="form-control form-control-sm" placeholder="Address" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} />
        </div>
      </div>

      <h6 className="fw-bold mb-3 text-primary">Bill To</h6>
      <div className="row g-2 mb-4">
        <div className="col-md-6">
          <input type="text" className="form-control form-control-sm" placeholder="Client Name" value={billToName} onChange={(e) => setBillToName(e.target.value)} />
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control form-control-sm" placeholder="Client Phone" value={billToPhone} onChange={(e) => setBillToPhone(e.target.value)} />
        </div>
        <div className="col-md-12">
          <input type="text" className="form-control form-control-sm" placeholder="Client Address" value={billToAddress} onChange={(e) => setBillToAddress(e.target.value)} />
        </div>
      </div>

      <h6 className="fw-bold mb-3 text-primary">Ship To</h6>
      <div className="row g-2 mb-4">
        <div className="col-md-6">
          <input type="text" className="form-control form-control-sm" placeholder="Recipient Name" value={shipToName} onChange={(e) => setShipToName(e.target.value)} />
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control form-control-sm" placeholder="Recipient Phone" value={shipToPhone} onChange={(e) => setShipToPhone(e.target.value)} />
        </div>
        <div className="col-md-12">
          <input type="text" className="form-control form-control-sm" placeholder="Shipping Address" value={shipToAddress} onChange={(e) => setShipToAddress(e.target.value)} />
        </div>
      </div>

      <h6 className="fw-bold mb-3 text-primary">Invoice Information</h6>
      <div className="row g-2 mb-4">
        <div className="col-md-4">
          <input type="text" className="form-control form-control-sm" placeholder="Invoice #" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
        </div>
        <div className="col-md-4">
          <input type="date" className="form-control form-control-sm" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
        </div>
        <div className="col-md-4">
          <input type="date" className="form-control form-control-sm" placeholder="Due Date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
      </div>

      <h6 className="fw-bold mb-3 text-primary">Item Details</h6>
      {items.map((item) => (
        <div key={item.id} className="border rounded p-2 mb-2 bg-light position-relative">
          {items.length > 1 && (
            <button className="btn btn-sm text-danger position-absolute top-0 end-0 m-1" style={{ fontSize: '0.8rem' }} onClick={() => removeItem(item.id)}>×</button>
          )}
          <div className="row g-2">
            <div className="col-md-3">
              <input type="text" className="form-control form-control-sm" placeholder="Item Name" value={item.name} onChange={(e) => updateItem(item.id, 'name', e.target.value)} />
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control form-control-sm" placeholder="Description" value={item.description} onChange={(e) => updateItem(item.id, 'description', e.target.value)} />
            </div>
            <div className="col-md-2">
              <input type="number" className="form-control form-control-sm" placeholder="Qty" value={item.qty} onChange={(e) => updateItem(item.id, 'qty', parseFloat(e.target.value) || 0)} />
            </div>
            <div className="col-md-2">
              <input type="number" className="form-control form-control-sm" placeholder="Amount" value={item.amount} onChange={(e) => updateItem(item.id, 'amount', parseFloat(e.target.value) || 0)} />
            </div>
            <div className="col-md-2">
              <input type="number" className="form-control form-control-sm" value={calculateItemTotal(item).toFixed(2)} disabled />
            </div>
          </div>
        </div>
      ))}
      <button className="btn btn-sm btn-primary mb-4" onClick={addItem}>+ Add Item</button>

      <h6 className="fw-bold mb-3 text-primary">Bank Account Details</h6>
      <div className="row g-2 mb-4">
        <div className="col-md-4">
          <input type="text" className="form-control form-control-sm" placeholder="Account Name" value={accountName} onChange={(e) => setAccountName(e.target.value)} />
        </div>
        <div className="col-md-4">
          <input type="text" className="form-control form-control-sm" placeholder="Account Number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
        </div>
        <div className="col-md-4">
          <input type="text" className="form-control form-control-sm" placeholder="IFSC/Branch Code" value={branchCode} onChange={(e) => setBranchCode(e.target.value)} />
        </div>
      </div>

      <h6 className="fw-bold mb-3 text-primary">Notes</h6>
      <textarea className="form-control form-control-sm mb-4" rows="3" placeholder="Add notes or terms..." value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>

      <div className="card bg-light border-0">
        <div className="card-body p-3">
          <div className="d-flex justify-content-between mb-2">
            <span className="small">Subtotal</span>
            <strong className="small">₹{calculateSubtotal().toFixed(2)}</strong>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-items-center gap-2">
              <span className="small">Tax</span>
              <input type="number" className="form-control form-control-sm" style={{ width: '60px' }} min="0" max="100" value={taxRate} onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)} />
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
    </div>
  );
};

export default InvoiceForm;
