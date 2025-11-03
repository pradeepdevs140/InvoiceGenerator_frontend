import axios from 'axios';
export const saveInvoice =(baseURL, payLoad)=>{
 return axios.post(`${baseURL}/invoice`, payLoad);
}