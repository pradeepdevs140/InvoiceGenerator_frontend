import React from 'react';

const Template3 = ({ data }) => (
  <div className="bg-white" style={{ minHeight: '297mm', width: '210mm' }}>
    {/* Colorful Top Banner */}
    <div className="text-white p-5" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
      <div className="row align-items-center">
        <div className="col-8">
          {data.logo && (
            <img src={data.logo} alt="Logo" style={{ maxWidth: '100px', marginBottom: '15px', filter: 'brightness(0) invert(1)' }} />
          )}
          <h1 className="fw-bold mb-2" style={{ fontSize: '3rem' }}>{data.title}</h1>
          <div className="d-flex gap-4">
            <div>
              <small className="opacity-75 d-block">Invoice Number</small>
              <strong className="fs-5">{data.invoice.number}</strong>
            </div>
            <div>
              <small className="opacity-75 d-block">Date</small>
              <strong className="fs-5">{data.invoice.date}</strong>
            </div>
          </div>
        </div>
        <div className="col-4 text-end">
          <div className="bg-white bg-opacity-25 p-4 rounded">
            <small className="opacity-75 d-block mb-1">TOTAL DUE</small>
            <h2 className="fw-bold mb-0">{data.currencySymbol}{data.grandTotal.toFixed(2)}</h2>
          </div>
        </div>
      </div>
    </div>

    <div className="p-5">
      {/* Company and Client Cards */}
      <div className="row g-4 mb-5">
        <div className="col-6">
          <div className="card shadow-sm border-0 h-100" style={{ borderLeft: '4px solid #f093fb' }}>
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle d-flex align-items-center justify-content-center text-white me-3" 
                     style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                  <strong>FROM</strong>
                </div>
              </div>
              <h6 className="fw-bold mb-2">{data.company.name}</h6>
              <p className="mb-1 small text-muted">{data.company.address}</p>
              <p className="mb-0 small text-muted">{data.company.phone}</p>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card shadow-sm border-0 h-100" style={{ borderLeft: '4px solid #f5576c' }}>
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle d-flex align-items-center justify-content-center text-white me-3" 
                     style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)' }}>
                  <strong>TO</strong>
                </div>
              </div>
              <h6 className="fw-bold mb-2">{data.billing.name}</h6>
              <p className="mb-1 small text-muted">{data.billing.address}</p>
              <p className="mb-0 small text-muted">{data.billing.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Items Section with Cards */}
      <div className="mb-4">
        <h5 className="fw-bold mb-3" style={{ color: '#f5576c' }}>Items</h5>
        {data.items.map((item, index) => (
          <div key={index} className="card shadow-sm border-0 mb-3">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-5">
                  <h6 className="fw-bold mb-1">{item.name}</h6>
                  <p className="small text-muted mb-0">{item.description}</p>
                </div>
                <div className="col-2 text-center">
                  <small className="text-muted d-block">Quantity</small>
                  <strong className="fs-5">{item.quantity}</strong>
                </div>
                <div className="col-2 text-center">
                  <small className="text-muted d-block">Rate</small>
                  <strong>{data.currencySymbol}{item.amount.toFixed(2)}</strong>
                </div>
                <div className="col-3 text-end">
                  <small className="text-muted d-block">Amount</small>
                  <h5 className="fw-bold mb-0" style={{ color: '#f5576c' }}>
                    {data.currencySymbol}{item.total.toFixed(2)}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Card */}
      <div className="row">
        <div className="col-7">
          {data.notes && (
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h6 className="fw-bold mb-2" style={{ color: '#f093fb' }}>Notes</h6>
                <p className="small mb-0">{data.notes}</p>
              </div>
            </div>
          )}
        </div>
        <div className="col-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                <span>Subtotal</span>
                <strong>{data.currencySymbol}{data.subtotal.toFixed(2)}</strong>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                <span>Tax ({data.tax}%)</span>
                <strong>{data.currencySymbol}{data.taxAmount.toFixed(2)}</strong>
              </div>
              <div className="p-3 rounded text-white text-center" 
                   style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                <small className="opacity-75 d-block mb-1">TOTAL AMOUNT</small>
                <h3 className="fw-bold mb-0">{data.currencySymbol}{data.grandTotal.toFixed(2)}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      {data.account.name && (
        <div className="card border-0 shadow-sm mt-4" style={{ borderTop: '3px solid #f093fb' }}>
          <div className="card-body">
            <h6 className="fw-bold mb-3" style={{ color: '#f093fb' }}>Payment Information</h6>
            <div className="row">
              <div className="col-4">
                <small className="text-muted d-block mb-1">Account Name</small>
                <strong className="small">{data.account.name}</strong>
              </div>
              <div className="col-4">
                <small className="text-muted d-block mb-1">Account Number</small>
                <strong className="small">{data.account.number}</strong>
              </div>
              <div className="col-4">
                <small className="text-muted d-block mb-1">IFSC Code</small>
                <strong className="small">{data.account.ifsccode}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

    {/* Footer */}
    <div className="text-center py-4" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
      <p className="text-white mb-0 small opacity-75">Thank you for your business!</p>
    </div>
  </div>
);

export default Template3;