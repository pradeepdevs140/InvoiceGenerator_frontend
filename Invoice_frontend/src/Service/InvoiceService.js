import axios from 'axios';
export const saveInvoice =(baseURL, payLoad, token)=>{
 return axios.post(`${baseURL}/invoice`, payLoad , {headers:{Authorization: `Bearer ${token}`}});
}
export const getAllInvoices=(baseURL,token)=>{
    return  axios.get(`${baseURL}/invoice/fetchInvoices`, {headers:{Authorization: `Bearer ${token}`}});

}

export const deleteInvoice= (baseURL, invoiceId, token)=>{
    return  axios.delete(`${baseURL}/invoice/${invoiceId}`, {headers:{Authorization: `Bearer ${token}`}});
}
export const sendinvoice = (baseURL, formData, token) => {
  return axios.post(`${baseURL}/invoice/sendinvoice`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`
    }
  });
};
