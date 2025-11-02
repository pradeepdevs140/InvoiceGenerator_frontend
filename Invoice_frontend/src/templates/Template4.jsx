import React from 'react';

const Template4 = ({ data }) => (
  <div className="bg-white" style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Arial, sans-serif' }}>
    {/* Header */}
    <div className="px-5 pt-5 pb-4">
      <div className="border-bottom pb-3 mb-4" style={{ borderColor: '#14b8a6', borderWidth: '3px' }}>
        <h1 className="mb-0 fw-bold" style={{ fontSize: '3rem', color: '#14b8a6' }}>{data.title}</h1>
      </div>

      <div className="row small">
        <div className="col-6">
          <div className="mb-3">
            <div className="text-muted mb-1">Company Name:</div>
            <strong>{data.company.name}</strong>
          </div>
          <div className="mb-3">
            <div className="text-muted mb-1">Address:</div>
            <div>{data.company.address}</div>
          </div>
          <div className="mb-3">
            <div className="text-muted mb-1">Contact:</div>
            <div>{data.company.phone}</div>
          </div>
        </div>
        <div className="col-6 text-end">
          <div className="mb-3">
            <div className="text-muted mb-1">Date:</div>
            <strong>{data.invoice.date}</strong>
          </div>
          <div className="mb-3">
            <div className="text-muted mb-1">Invoice No.:</div>
            <strong>#{data.invoice.number}</strong>
          </div>
          <div className="mb-3">
            <div className="text-muted mb-1" style={{ color: '#14b8a6' }}>Invoice Total:</div>
            <div className="p-2 d-inline-block" style={{ background: '#e0f2f1', minWidth: '150px' }}>
              <strong className="fs-5" style={{ color: '#14b8a6' }}>{data.currencySymbol}{data.grandTotal.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-muted mb-1 small">Bill To:</div>
        <div className="row">
          <div className="col-4">
            <div className="text-muted mb-1 small">Name:</div>
            <strong>{data.billing.name}</strong>
          </div>
          <div className="col-8">
            <div className="text-muted mb-1 small">Address:</div>
            <div>{data.billing.address}</div>
          </div>
        </div>
        <div className="mt-2">
          <div className="text-muted mb-1 small">Contact:</div>
          <div>{data.billing.phone}</div>
        </div>
      </div>
    </div>

    {/* Items Table */}
    <div className="px-5 pb-4">
      <table className="table table-bordered border-0">
        <thead>
          <tr style={{ background: '#14b8a6' }}>
            <th className="py-3 text-white fw-bold border-end border-white">Description</th>
            <th className="py-3 text-white fw-bold text-center border-end border-white" style={{ width: '15%' }}>Quantity</th>
            <th className="py-3 text-white fw-bold text-end border-end border-white" style={{ width: '20%' }}>Unit Price</th>
            <th className="py-3 text-white fw-bold text-end" style={{ width: '20%' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index} className="border-bottom">
              <td className="py-4 border-end" style={{ borderColor: '#e0f2f1' }}>
                <div className="fw-semibold text-dark">{item.name}</div>
                {item.description && <div className="small text-muted mt-1">{item.description}</div>}
              </td>
              <td className="py-4 text-center border-end align-middle" style={{ borderColor: '#e0f2f1' }}>
                {item.quantity}
              </td>
              <td className="py-4 text-end border-end align-middle" style={{ borderColor: '#e0f2f1' }}>
                {data.currencySymbol}{item.amount.toFixed(2)}
              </td>
              <td className="py-4 text-end align-middle fw-bold" style={{ color: '#14b8a6' }}>
                {data.currencySymbol}{item.total.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Section */}
      <div className="row mt-4">
        <div className="col-8"></div>
        <div className="col-4">
          <div className="border rounded overflow-hidden">
            <div className="d-flex justify-content-between p-2 border-bottom" style={{ background: '#e0f2f1' }}>
              <span className="small">Subtotal:</span>
              <span className="small fw-bold">{data.currencySymbol}{data.subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between p-2 border-bottom" style={{ background: '#e0f2f1' }}>
              <span className="small">Tax ({data.tax}%):</span>
              <span className="small fw-bold">{data.currencySymbol}{data.taxAmount.toFixed(2)}</span>
            </div>
            <div className="text-white text-center py-3" style={{ background: '#14b8a6' }}>
              <div className="small mb-1">Total Amount</div>
              <strong className="fs-4">{data.currencySymbol}{data.grandTotal.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Payment Information */}
    {data.account.name && (
      <div className="px-5 pb-4">
        <div className="border-top pt-3" style={{ borderColor: '#e0f2f1' }}>
          <div className="row small">
            <div className="col-4">
              <div className="text-muted mb-1">Account Name:</div>
              <strong>{data.account.name}</strong>
            </div>
            <div className="col-4">
              <div className="text-muted mb-1">Account Number:</div>
              <strong>{data.account.number}</strong>
            </div>
            <div className="col-4">
              <div className="text-muted mb-1">IFSC Code:</div>
              <strong>{data.account.ifsccode}</strong>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Footer */}
    <div className="px-5 pb-5">
      <div className="border-top pt-4" style={{ borderColor: '#e0f2f1' }}>
        <div className="row small text-center">
          <div className="col-3">
            <div className="text-muted">Authorized Person</div>
            <div className="mt-4 pt-3 border-top" style={{ borderColor: '#e0f2f1' }}>
              {data.company.name}
            </div>
          </div>
          <div className="col-3">
            <div className="text-muted">Date</div>
            <div className="mt-4 pt-3 border-top" style={{ borderColor: '#e0f2f1' }}>
              {data.invoice.date}
            </div>
          </div>
          <div className="col-6">
            <div className="text-muted">Authorized Signature</div>
            <div className="mt-4 pt-3 border-top" style={{ borderColor: '#e0f2f1' }}>
              -
            </div>
          </div>
        </div>
      </div>

      {data.notes && (
        <div className="mt-4 p-3" style={{ background: '#e0f2f1' }}>
          <strong className="d-block mb-2 small" style={{ color: '#14b8a6' }}>Notes:</strong>
          <p className="small text-muted mb-0">{data.notes}</p>
        </div>
      )}
    </div>
  </div>
);

export default Template4;