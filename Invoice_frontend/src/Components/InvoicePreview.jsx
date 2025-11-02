import React, { forwardRef } from 'react';
import {formatInvoiceData} from '../util/formatInvoiceData'
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import Template3 from '../templates/Template3';
import Template4 from '../templates/Template4';

const InvoicePreview = forwardRef(({ invoicedata, template }, ref) => {
  const formattedData = formatInvoiceData(invoicedata);

  const renderTemplate = () => {
    switch (template) {
      case 'template1':
        return <Template1 data={formattedData} />;
      case 'template2':
        return <Template2 data={formattedData} />;
      case 'template3':
        return <Template3 data={formattedData} />;
      case 'template4':
        return <Template4 data={formattedData} />;
      default:
        return <Template1 data={formattedData} />;
    }
  };

  return (
    <div ref={ref} className="invoice-preview d-flex justify-content-center py-4 bg-light">
      <div className="shadow-lg">
        {renderTemplate()}
      </div>
    </div>
  );
});

InvoicePreview.displayName = 'InvoicePreview';

export default InvoicePreview;