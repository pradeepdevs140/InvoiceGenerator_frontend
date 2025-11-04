import React from 'react'
import {getAllInvoices} from '../Service/InvoiceService.js';
import { useState } from 'react';
import {toast} from 'react-hot-toast';
import {Plus } from 'lucide-react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AppContext }  from '../Context/AppContext';
import {formatDate} from '../util/formatInvoiceData.js'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
const Dashboard = () => {
  const[invoices , setInvoices] = useState([]);
  const{baseURL , setInvoiceTitle,
      Invoicedata,
      setInvoicedata,
      selectedTemplate,
      setSelectedTemplate,
      initialInvoiceData
       } = useContext(AppContext);

      const navigate = useNavigate();
      const {getToken} = useAuth();
  
  useEffect(()=>{
    const fetchInvoices = async()=>{
      try{
        const token = getToken();
        const response = await getAllInvoices(baseURL, token);
        setInvoices(response.data);
      }
      catch(error){
        toast.error("Error fetching invoices: " + error.message);
      }
    }
    fetchInvoices();
  }, [baseURL]);
  const handleViewClcik =(invoice)=>{
    setInvoiceTitle(invoice.title || "New Invoice");
    setInvoicedata(invoice);
    setSelectedTemplate(invoice.template || "template1");
    navigate('/preview');
  }
  const handleCreateNew =()=>{
    setSelectedTemplate("template1");
    setInvoiceTitle("New Invoice");
    setInvoicedata(initialInvoiceData);
    navigate("/generate");
  }
  

  
  return (
    <div>
      <div className="container py-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
          {/* Invoice Cards */}
          <div className="col">
            <div  onClick ={handleCreateNew} className="card h-100 d-flex justify-content-center align-items-center border border-2 border-light shadow-sm cursor-pointer" style={{minHeight: '270px'}}>
              <Plus size={48} />
              <p className="mt-3 fw-medium">Create New Invoice</p>
            </div>
          </div>
          
          {invoices.map((invoice, idx) => (
            <div className="col" key={idx}>
              <div className="card h-100 shadow-sm cursor-pointer" style={{minHeight:"270px"}} onClick ={()=>handleViewClcik(invoice)}>
                {invoice.thumbnailUrl && (
                  <img src={invoice.thumbnailUrl} className="card-img-top" alt="Invoice Thumbnail" style={{height: "150px", objectFit: "cover"}}/>
                )}
                <div className="card-body">
                  <h6 className="card-title mb-1">
                    {invoice.title}
                  </h6>
                  <small className='text-muted'>
                    Last Updated: {formatDate(invoice.createdAt)};
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard