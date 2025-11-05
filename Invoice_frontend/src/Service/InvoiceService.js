import axios from 'axios';

export const saveInvoice =(baseURL, payload, token)=>{
 return axios.post(`${baseURL}/api/invoice`, payload , {
   headers:{ Authorization: `Bearer ${token}` }
 });
};

export const getAllInvoices=(baseURL,token)=>{
 return axios.get(`${baseURL}/invoice/fetchInvoices`, {
   headers:{ Authorization: `Bearer ${token}` }
 });
};

export const deleteInvoice= (baseURL, invoiceId, token)=>{
 return axios.delete(`${baseURL}/api/invoice/${invoiceId}`, {
   headers:{ Authorization: `Bearer ${token}` }
 });
};

export const sendinvoice = (baseURL, formData, token) => {
 return axios.post(`${baseURL}/api/invoice/sendinvoice`, formData, {
   headers: {
     "Content-Type": "multipart/form-data",
     "Authorization": `Bearer ${token}`
   }
 });
};
