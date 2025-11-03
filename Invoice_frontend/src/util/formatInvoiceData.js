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

  // Format items with numeric conversions
  const formattedItems = items.map(item => ({
    ...item,
    quantity: Number(item.quantity) || 0,
    rate: Number(item.rate) || 0,
    total: Number(item.total) || 0,
    amount: Number(item.total) || 0  // Add amount property mapped to total
  }));

  // Calculate totals
  const subtotal = formattedItems.reduce((sum, item) => sum + (item.total || 0), 0);
  const taxAmount = (subtotal * Number(tax)) / 100;
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
    tax: Number(tax) || 0,
    notes,
    logo,
    items: formattedItems,
    currencySymbol,
    subtotal: Number(subtotal) || 0,
    taxAmount: Number(taxAmount) || 0,
    grandTotal: Number(grandTotal) || 0
  };
};

export const formatCurrency = (amount, symbol = '₹') => {
  return `${symbol}${Number(amount).toFixed(2)}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

