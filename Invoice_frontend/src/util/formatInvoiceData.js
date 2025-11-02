export const formatInvoiceData = (invoiceData) => {
  const {
    title = "INVOICE",
    company = {},
    invoice = {},
    account = {},
    billing = {},
    shipping = {},
    tax = 0,
    notes = "",
    logo = "",
    items = []
  } = invoiceData || {};

  const currencySymbol = "₹";

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.total || 0), 0);
  const taxAmount = (subtotal * tax) / 100;
  const grandTotal = subtotal + taxAmount;

  return {
    title,
    company: {
      name: company.name || '',
      phone: company.phone || '',
      address: company.address || ''
    },
    invoice: {
      number: invoice.number || '',
      date: invoice.date || '',
      duedate: invoice.duedate || ''
    },
    account: {
      name: account.name || '',
      number: account.number || '',
      ifsccode: account.ifsccode || ''
    },
    billing: {
      name: billing.name || '',
      phone: billing.phone || '',
      address: billing.address || ''
    },
    shipping: {
      name: shipping.name || '',
      phone: shipping.phone || '',
      address: shipping.address || ''
    },
    tax,
    notes,
    logo,
    items,
    currencySymbol,
    subtotal,
    taxAmount,
    grandTotal
  };
};

export const formatCurrency = (amount, symbol = '₹') => {
  return `${symbol}${amount.toFixed(2)}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};