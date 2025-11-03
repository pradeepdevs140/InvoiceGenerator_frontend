import axios from 'axios';
export const saveInvoice =(baseURL, payLoad)=>{
 return axios.post(`${baseURL}/invoice`, payLoad);
}
export const getAllInvoices=(baseURL)=>{
    return  axios.get(`${baseURL}/invoice/fetchInvoices`);

}

export const deleteInvoice= (baseURL, invoiceId)=>{
    return  axios.delete(`${baseURL}/invoice/${invoiceId}`);
}