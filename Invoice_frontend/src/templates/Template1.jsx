import React from 'react';

const Template1 = ({ data }) => (
  <div className="bg-white" style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Arial, sans-serif' }}>
    {/* Header Section */}
    <div className="border-bottom border-3 border-dark p-5">
      <div className="row align-items-center">
        <div className="col-6">
          {data.logo && (
            <img src={data.logo} alt="Logo" style={{ maxHeight: '60px', marginBottom: '1rem' }} />
          )}
          <h1 className="mb-1 fw-bold text-dark" style={{ fontSize: '2.5rem', letterSpacing: '-1px' }}>
            {data.title}
          </h1>
          <p className="mb-0 text-muted fs-5">#{data.invoice.number}</p>
        </div>
        <div className="col-6 text-end">
          <div className="mb-3">
            <p className="mb-0 small fw-bold text-uppercase text-muted">Issue Date</p>
            <p className="mb-0 fs-5 fw-semibold">{data.invoice.date}</p>
          </div>
          <div>
            <p className="mb-0 small fw-bold text-uppercase text-muted">Due Date</p>
            <p className="mb-0 fs-5 fw-semibold">{data.invoice.duedate || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>

    {/* Company and Client Info */}
    <div className="px-5 pt-5 pb-4">
      <div className="row">
        <div className="col-6">
          <div className="border-start border-4 border-dark ps-3">
            <p className="mb-1 small fw-bold text-uppercase text-muted">From</p>
            <h5 className="mb-2 fw-bold text-dark">{data.company.name}</h5>
            <p className="mb-1 small text-secondary">{data.company.phone}</p>
            <p className="mb-0 small text-secondary">{data.company.address}</p>
          </div>
        </div>
        <div className="col-6">
          <div className="border-start border-4 border-dark ps-3">
            <p className="mb-1 small fw-bold text-uppercase text-muted">Bill To</p>
            <h5 className="mb-2 fw-bold text-dark">{data.billing.name}</h5>
            <p className="mb-1 small text-secondary">{data.billing.phone}</p>
            <p className="mb-0 small text-secondary">{data.billing.address}</p>
          </div>
        </div>
      </div>
    </div>

    {/* Items Table */}
    <div className="px-5 pb-4">
      <table className="table table-bordered border-dark">
        <thead className="bg-dark text-white">
          <tr>
            <th className="py-3 fw-bold text-uppercase" style={{ fontSize: '0.85rem' }}>Description</th>
            <th className="py-3 fw-bold text-uppercase text-center" style={{ fontSize: '0.85rem', width: '10%' }}>Qty</th>
            <th className="py-3 fw-bold text-uppercase text-end" style={{ fontSize: '0.85rem', width: '15%' }}>Rate</th>
            <th className="py-3 fw-bold text-uppercase text-end" style={{ fontSize: '0.85rem', width: '15%' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index} className="border-bottom">
              <td className="py-3">
                <div className="fw-semibold text-dark">{item.name}</div>
                {item.description && (
                  <div className="small text-muted mt-1">{item.description}</div>
                )}
              </td>
              <td className="py-3 text-center align-middle">{item.quantity}</td>
              <td className="py-3 text-end align-middle">{data.currencySymbol}{item.amount.toFixed(2)}</td>
              <td className="py-3 text-end align-middle fw-bold">{data.currencySymbol}{item.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Totals Section */}
    <div className="px-5 pb-4">
      <div className="row justify-content-end">
        <div className="col-5">
          <div className="border border-dark">
            <div className="d-flex justify-content-between p-3 border-bottom">
              <span className="fw-semibold">Subtotal</span>
              <span className="fw-semibold">{data.currencySymbol}{data.subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between p-3 border-bottom">
              <span className="fw-semibold">Tax ({data.tax}%)</span>
              <span className="fw-semibold">{data.currencySymbol}{data.taxAmount.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between p-3 bg-dark text-white">
              <span className="fw-bold text-uppercase">Total</span>
              <span className="fw-bold fs-4">{data.currencySymbol}{data.grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Payment Info */}
    {data.account.name && (
      <div className="px-5 pb-4">
        <div className="border border-dark p-3 bg-light">
          <p className="mb-2 small fw-bold text-uppercase text-dark">Payment Information</p>
          <div className="row small">
            <div className="col-4">
              <span className="text-muted">Account Name:</span>
              <p className="mb-0 fw-semibold">{data.account.name}</p>
            </div>
            <div className="col-4">
              <span className="text-muted">Account Number:</span>
              <p className="mb-0 fw-semibold">{data.account.number}</p>
            </div>
            <div className="col-4">
              <span className="text-muted">IFSC Code:</span>
              <p className="mb-0 fw-semibold">{data.account.ifsccode}</p>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Notes */}
    {data.notes && (
      <div className="px-5 pb-5">
        <div className="border-top border-2 border-dark pt-3">
          <p className="mb-2 small fw-bold text-uppercase text-muted">Notes & Terms</p>
          <p className="small text-secondary mb-0">{data.notes}</p>
        </div>
      </div>
    )}
  </div>
);

export default Template1;