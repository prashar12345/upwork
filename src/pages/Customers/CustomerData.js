import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import './style.scss'
import { useSelector } from 'react-redux';
import methodModel from '../../methods/methods';


const CustomerData = () => {

  

  return (
    <Layout> 
    <div className="container-fluid">
       <div className='d-flex align-items-center justify-content-between border-bottom pb-3'>
       <h3 className='hedding '>Customer Data</h3>
       <div className=' d-flex'> 
            <input className='form-control mr-2' placeholder='Search...' /> 
            <input type='date' className='form-control mr-2' /> 
             <button className='btn btn-primary mr-2'>Search</button>
            <button className='btn btn-primary'>Export</button>
            </div>
       </div>
       <div className='row mt-3'>
       


        <div className="table-responsive table_section">

<table class="table table-striped">
<thead className='table_head'>
    <tr className='heading_row'> 
        <th scope="col" className='table_data'>Booking Ref</th>
        <th scope="col" className='table_data'>Order Date</th>
        <th scope="col" className='table_data'> Reseller</th>
        <th scope="col" className='table_data'>Order Date & Time</th>
        <th scope="col" className='table_data'>Customer Name</th>
        <th scope="col" className='table_data'>Email</th>
        <th scope="col" className='table_data'>Contact Number</th>
        <th scope="col" className='table_data'>Order Location</th>
        <th scope="col" className='table_data'>Country of origin</th>
        <th scope="col" className='table_data'>No of pax</th>
        <th scope="col" className='table_data'>Amount</th>
        <th scope="col" className='table_data'>Avg Order Value</th>
        <th scope="col" className='table_data'>Booking Date & Time</th> 
        <th scope="col" className='table_data'>Payment Method</th>
         </tr>
         </thead>
<tbody>
   <tr className='data_row'>
   
            <td className='table_dats'>  </td>
            <td className='table_dats'>  </td>
            <td className='table_dats'>  </td>
            <td className='table_dats'>  </td>
            <td className='table_dats'>  </td>
            <td className='table_dats'>  </td>
            <td className='table_dats'>  </td>
            <td className='table_dats'>  </td>
            <td className='table_dats'>  </td>
            <td className='table_dats'>  </td>
            <td className='table_dats'>  </td>
            <td className='table_dats'>  </td>
            <td className='table_dats'>  </td>
            <td className='table_dats'>  
             </td>
            
            
        </tr> 
</tbody>
</table> 
</div>

       </div>

    </div>
</Layout>
  );
};

export default CustomerData;
