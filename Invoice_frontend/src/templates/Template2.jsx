import React from 'react';

const Template2 = ({ data }) => (
  <div className="bg-white p-5" style={{ minHeight: '297mm', width: '210mm' }}>
    {/* Top Header with Logo and Company */}
    <div className="d-flex justify-content-between align-items-start pb-4 mb-4 border-bottom border-dark border-2">
      <div>
        {data.logo && (
          <img src={data.logo} alt="Logo" style={{ maxWidth: '120px', marginBottom: '15px' }} />
        )}
        <h6 className="fw-bold mb-1">{data.company.name}</h6>
        <p className="mb-0 small text-muted">{data.company.address}</p>
        <p className="mb-0 small text-muted">{data.company.phone}</p>
      </div>
      <div className="text-end">
        <h1 className="fw-bold mb-2" style={{ fontSize: '3rem', letterSpacing: '2px' }}>{data.title}</h1>
      </div>
    </div>

    {/* Invoice Details in Grid */}
    <div className="row g-4 mb-5">
      <div className="col-3">
        <div className="bg-light p-3 h-100">
          <small className="text-muted d-block mb-1">INVOICE NO</small>
          <strong className="d-block">{data.invoice.number}</strong>
        </div>
      </div>
      <div className="col-3">
        <div className="bg-light p-3 h-100">
          <small className="text-muted d-block mb-1">DATE</small>
          <strong className="d-block">{data.invoice.date}</strong>
        </div>
      </div>
      <div className="col-3">
        <div className="bg-light p-3 h-100">
          <small className="text-muted d-block mb-1">DUE DATE</small>
          <strong className="d-block">{data.invoice.duedate || 'N/A'}</strong>
        </div>
      </div>
      <div className="col-3">
        <div className="bg-dark text-white p-3 h-100">
          <small className="d-block mb-1 opacity-75">AMOUNT DUE</small>
          <strong className="d-block fs-5">{data.currencySymbol}{data.grandTotal.toFixed(2)}</strong>
        </div>
      </div>
    </div>

    {/* Bill To and Ship To */}
    <div className="row mb-5">
      <div className="col-6">
        <div className="border-start border-dark border-3 ps-3">
          <small className="text-muted d-block mb-2">BILL TO</small>
          <h6 className="fw-bold mb-1">{data.billing.name}</h6>
          <p className="mb-0 small">{data.billing.address}</p>
          <p className="mb-0 small">{data.billing.phone}</p>
        </div>
      </div>
      {data.shipping.name && (
        <div className="col-6">
          <div className="border-start border-dark border-3 ps-3">
            <small className="text-muted d-block mb-2">SHIP TO</small>
            <h6 className="fw-bold mb-1">{data.shipping.name}</h6>
            <p className="mb-0 small">{data.shipping.address}</p>
            <p className="mb-0 small">{data.shipping.phone}</p>
          </div>
        </div>
      )}
    </div>

    {/* Items Table */}
    <table className="table table-sm">
      <thead>
        <tr className="bg-dark text-white">
          <th className="py-3 border-0">ITEM</th>
          <th className="py-3 border-0">DESCRIPTION</th>
          <th className="py-3 border-0 text-center" style={{ width: '80px' }}>QTY</th>
          <th className="py-3 border-0 text-end" style={{ width: '100px' }}>RATE</th>
          <th className="py-3 border-0 text-end" style={{ width: '120px' }}>AMOUNT</th>
        </tr>
      </thead>
      <tbody>
        {data.items.map((item, index) => (
          <tr key={index} className="border-bottom">
            <td className="py-3">{item.name}</td>
            <td className="py-3 small text-muted">{item.description}</td>
            <td className="py-3 text-center">{item.quantity}</td>
            <td className="py-3 text-end">{data.currencySymbol}{item.amount.toFixed(2)}</td>
            <td className="py-3 text-end fw-bold">{data.currencySymbol}{item.total.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Summary Section */}
    <div className="row mt-5">
      <div className="col-7">
        {data.notes && (
          <div className="bg-light p-3">
            <small className="text-muted d-block mb-2">NOTES</small>
            <p className="small mb-0">{data.notes}</p>
          </div>
        )}
      </div>
      <div className="col-5">
        <table className="table table-borderless table-sm">
          <tbody>
            <tr>
              <td className="text-end">Subtotal:</td>
              <td className="text-end fw-bold">{data.currencySymbol}{data.subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="text-end">Tax ({data.tax}%):</td>
              <td className="text-end fw-bold">{data.currencySymbol}{data.taxAmount.toFixed(2)}</td>
            </tr>
            <tr className="border-top border-2">
              <td className="text-end pt-3"><strong>TOTAL:</strong></td>
              <td className="text-end pt-3"><strong className="fs-3">{data.currencySymbol}{data.grandTotal.toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* Payment Details Footer */}
    {data.account.name && (
      <div className="mt-5 pt-4 border-top">
        <div className="row">
          <div className="col-12">
            <small className="text-muted d-block mb-2">PAYMENT INFORMATION</small>
            <div className="d-flex gap-4">
              <span className="small"><strong>Bank:</strong> {data.account.name}</span>
              <span className="small"><strong>Account:</strong> {data.account.number}</span>
              <span className="small"><strong>IFSC:</strong> {data.account.ifsccode}</span>
            </div>
          </div>
        </div>
      </div>
    )}

    <div className="text-center mt-5">
      <p className="small text-muted mb-0">Thank you for your business</p>
    </div>
  </div>
);

export default Template2;