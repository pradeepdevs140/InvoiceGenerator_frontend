import React from 'react';

const Template4 = ({ data }) => (
  <div className="bg-white p-5" style={{ minHeight: '297mm', width: '210mm' }}>
    {/* Ornate Border */}
    <div className="border border-3 p-5" style={{ borderColor: '#2c3e50' }}>
      {/* Centered Header */}
      <div className="text-center mb-5 pb-4 border-bottom border-2" style={{ borderColor: '#2c3e50' }}>
        {data.logo && (
          <img src={data.logo} alt="Logo" style={{ maxWidth: '120px', marginBottom: '20px' }} />
        )}
        <h1 className="fw-bold mb-3" style={{ fontSize: '3rem', letterSpacing: '3px', color: '#2c3e50' }}>
          {data.title}
        </h1>
        <div className="d-inline-block px-4 py-2" style={{ border: '2px solid #2c3e50' }}>
          <strong style={{ color: '#2c3e50' }}>No. {data.invoice.number}</strong>
        </div>
      </div>

      {/* Date Information */}
      <div className="row mb-5">
        <div className="col-6 text-center">
          <div className="p-3" style={{ background: '#f8f9fa', border: '1px solid #dee2e6' }}>
            <small className="text-muted d-block mb-2">INVOICE DATE</small>
            <strong style={{ color: '#2c3e50' }}>{data.invoice.date}</strong>
          </div>
        </div>
        <div className="col-6 text-center">
          <div className="p-3" style={{ background: '#f8f9fa', border: '1px solid #dee2e6' }}>
            <small className="text-muted d-block mb-2">DUE DATE</small>
            <strong style={{ color: '#2c3e50' }}>{data.invoice.duedate || 'N/A'}</strong>
          </div>
        </div>
      </div>

      {/* Company and Client Info in Table Format */}
      <table className="table table-bordered mb-5">
        <tbody>
          <tr>
            <td style={{ width: '50%', background: '#f8f9fa' }}>
              <strong className="d-block mb-3" style={{ color: '#2c3e50', fontSize: '0.9rem', letterSpacing: '1px' }}>
                FROM
              </strong>
              <h6 className="fw-bold mb-2">{data.company.name}</h6>
              <p className="mb-1 small">{data.company.address}</p>
              <p className="mb-0 small">{data.company.phone}</p>
            </td>
            <td style={{ width: '50%', background: '#f8f9fa' }}>
              <strong className="d-block mb-3" style={{ color: '#2c3e50', fontSize: '0.9rem', letterSpacing: '1px' }}>
                BILL TO
              </strong>
              <h6 className="fw-bold mb-2">{data.billing.name}</h6>
              <p className="mb-1 small">{data.billing.address}</p>
              <p className="mb-0 small">{data.billing.phone}</p>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Items Table - Classic Style */}
      <table className="table table-bordered mb-4">
        <thead style={{ background: '#2c3e50', color: 'white' }}>
          <tr>
            <th className="py-3" style={{ width: '40%' }}>DESCRIPTION</th>
            <th className="py-3 text-center" style={{ width: '15%' }}>QUANTITY</th>
            <th className="py-3 text-end" style={{ width: '20%' }}>UNIT PRICE</th>
            <th className="py-3 text-end" style={{ width: '25%' }}>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index} style={{ background: index % 2 === 0 ? '#ffffff' : '#f8f9fa' }}>
              <td className="py-3">
                <strong className="d-block mb-1">{item.name}</strong>
                <small className="text-muted">{item.description}</small>
              </td>
              <td className="py-3 text-center">{item.quantity}</td>
              <td className="py-3 text-end">{data.currencySymbol}{item.amount.toFixed(2)}</td>
              <td className="py-3 text-end fw-bold">{data.currencySymbol}{item.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary Section */}
      <div className="row">
        <div className="col-6">
          {data.notes && (
            <div className="border p-3" style={{ borderColor: '#dee2e6' }}>
              <strong className="d-block mb-2" style={{ color: '#2c3e50', fontSize: '0.9rem', letterSpacing: '1px' }}>
                NOTES & TERMS
              </strong>
              <p className="small mb-0">{data.notes}</p>
            </div>
          )}
        </div>
        <div className="col-6">
          <table className="table table-sm mb-0">
            <tbody>
              <tr className="border-bottom">
                <td className="py-2">
                  <strong>Subtotal</strong>
                </td>
                <td className="py-2 text-end">
                  {data.currencySymbol}{data.subtotal.toFixed(2)}
                </td>
              </tr>
              <tr className="border-bottom">
                <td className="py-2">
                  <strong>Tax ({data.tax}%)</strong>
                </td>
                <td className="py-2 text-end">
                  {data.currencySymbol}{data.taxAmount.toFixed(2)}
                </td>
              </tr>
              <tr style={{ background: '#2c3e50', color: 'white' }}>
                <td className="py-3">
                  <strong style={{ fontSize: '1.1rem' }}>TOTAL</strong>
                </td>
                <td className="py-3 text-end">
                  <strong style={{ fontSize: '1.5rem' }}>
                    {data.currencySymbol}{data.grandTotal.toFixed(2)}
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Details */}
      {data.account.name && (
        <div className="mt-5 pt-4 border-top border-2" style={{ borderColor: '#2c3e50' }}>
          <div className="text-center mb-3">
            <strong style={{ color: '#2c3e50', fontSize: '0.9rem', letterSpacing: '1px' }}>
              PAYMENT DETAILS
            </strong>
          </div>
          <table className="table table-bordered table-sm mb-0">
            <tbody>
              <tr style={{ background: '#f8f9fa' }}>
                <td className="fw-bold" style={{ width: '30%' }}>Account Name</td>
                <td>{data.account.name}</td>
              </tr>
              <tr>
                <td className="fw-bold">Account Number</td>
                <td>{data.account.number}</td>
              </tr>
              <tr style={{ background: '#f8f9fa' }}>
                <td className="fw-bold">IFSC Code</td>
                <td>{data.account.ifsccode}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      <div className="text-center mt-5 pt-4 border-top" style={{ borderColor: '#dee2e6' }}>
        <p className="small text-muted mb-2">Thank you for your business</p>
        <div className="d-flex justify-content-center gap-3">
          <span className="small">●</span>
          <span className="small">●</span>
          <span className="small">●</span>
        </div>
      </div>
    </div>
  </div>
);

export default Template4;