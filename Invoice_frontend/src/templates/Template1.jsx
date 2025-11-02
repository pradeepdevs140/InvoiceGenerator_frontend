import React from 'react';

const Template1 = ({ data }) => (
  <div className="d-flex bg-white" style={{ minHeight: '297mm', width: '210mm' }}>
    {/* Left Sidebar - Purple Gradient */}
    <div className="text-white p-4 d-flex flex-column" style={{ width: '35%', background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)' }}>
      {data.logo && (
        <div className="mb-4 text-center">
          <img src={data.logo} alt="Logo" style={{ maxWidth: '100px', filter: 'brightness(0) invert(1)' }} />
        </div>
      )}
      
      <div className="mb-4">
        <h1 className="mb-1 fw-bold" style={{ fontSize: '2.5rem' }}>{data.title}</h1>
        <p className="mb-0 opacity-75">#{data.invoice.number}</p>
      </div>

      <div className="mb-4">
        <p className="mb-1 small opacity-75">DATE</p>
        <p className="mb-0 fw-bold">{data.invoice.date}</p>
      </div>

      <div className="mb-4">
        <p className="mb-1 small opacity-75">DUE DATE</p>
        <p className="mb-0 fw-bold">{data.invoice.duedate || 'N/A'}</p>
      </div>

      <div className="mb-4">
        <p className="mb-2 small opacity-75">FROM</p>
        <p className="mb-1 fw-bold">{data.company.name}</p>
        <p className="mb-0 small opacity-75">{data.company.phone}</p>
        <p className="mb-0 small opacity-75">{data.company.address}</p>
      </div>

      <div className="mt-auto">
        <div className="border-top border-white opacity-50 pt-3">
          <p className="mb-2 small opacity-75">PAYMENT INFO</p>
          {data.account.name && (
            <>
              <p className="mb-1 small">{data.account.name}</p>
              <p className="mb-1 small">{data.account.number}</p>
              <p className="mb-0 small">{data.account.ifsccode}</p>
            </>
          )}
        </div>
      </div>
    </div>

    {/* Right Content Area */}
    <div className="p-5 flex-grow-1">
      {/* Bill To */}
      <div className="mb-4">
        <p className="mb-1 small text-muted">BILL TO</p>
        <h5 className="mb-1 fw-bold">{data.billing.name}</h5>
        <p className="mb-0 small">{data.billing.phone}</p>
        <p className="mb-0 small">{data.billing.address}</p>
      </div>

      {/* Items Table */}
      <table className="table table-borderless mt-5">
        <thead className="border-bottom border-2">
          <tr>
            <th className="pb-3">DESCRIPTION</th>
            <th className="pb-3 text-center">QTY</th>
            <th className="pb-3 text-end">RATE</th>
            <th className="pb-3 text-end">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index} className="border-bottom">
              <td className="py-3">
                <div className="fw-bold">{item.name}</div>
                <div className="small text-muted">{item.description}</div>
              </td>
              <td className="py-3 text-center">{item.quantity}</td>
              <td className="py-3 text-end">{data.currencySymbol}{item.amount.toFixed(2)}</td>
              <td className="py-3 text-end fw-bold">{data.currencySymbol}{item.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="row mt-5">
        <div className="col-7"></div>
        <div className="col-5">
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal</span>
            <span>{data.currencySymbol}{data.subtotal.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Tax ({data.tax}%)</span>
            <span>{data.currencySymbol}{data.taxAmount.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between p-3 text-white fw-bold" style={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}>
            <span>TOTAL</span>
            <span className="fs-4">{data.currencySymbol}{data.grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {data.notes && (
        <div className="mt-5">
          <p className="mb-1 small text-muted">NOTES</p>
          <p className="small">{data.notes}</p>
        </div>
      )}
    </div>
  </div>
);

export default Template1;