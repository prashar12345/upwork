import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import { ToastsStore } from 'react-toasts';
import methodModel from '../../methods/methods';
import { login_success } from '../../actions/user';
import './style.scss';
import { userType } from '../../models/type.model';
import Html from './Html';
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import { toast } from 'react-toastify';
import Header from '../../components/global/header';

const Budget = ({setCount,setMyForm,MyForm}) => {
   
  return (
    <>  
       <div className="bg-white pt-4">
     <div className="container pl-5 pr-5 mt-5">
      <div className="row ">
        <div className="col-md-6">
      <p>Job Post</p>
      <h2>Tell us about your budget.</h2>
      <p>This will help us match you to talent within your range</p>
        </div>
        <div className="col-md-6">

          <div className='rate_box pl-4 pr-4 pl-4 pt-3 pb-4'>
            <i className='fa fa-clock'></i>
            <h5 className='mt-3'><b>Hourly rate</b></h5>
          </div> 

          <div className='rate_from'>
            <div>
            <b>From</b>
            <div className='d-flex align-items-center'>
          <input type='text' value={MyForm.hourlyratestart}  onChange={e=>setMyForm({...MyForm,hourlyratestart:e.target.value})} className="form-control mt-1 mr-2"  /> /hr
          </div>
          </div>
          <div className='ml-3'>
            <b>to</b>
            <div className='d-flex align-items-center'>
          <input type='text' value={MyForm.hourlyrateEnd} onChange={e=>setMyForm({...MyForm,hourlyrateEnd:e.target.value})} className="form-control mt-1 mr-2"  /> /hr
          </div>
          </div>
          </div>
             <p className='mt-3'>This is the average rate for similar projects.</p> 
     
        </div>
      </div>
     </div>
     </div>
     <div className="footer_btn">
      <button className="btn btn-outline-primary" onClick={e=>setCount(1)}>Back</button>
      <button className="btn btn-primary" disabled={MyForm.hourlyratestart==""||MyForm.hourlyrateEnd==""} onClick={e=>setCount(3)}  >Next:Description</button>
     </div>

    </>
  );
};

export default Budget;