import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import './style.scss'
import { useSelector } from 'react-redux';
import methodModel from '../../methods/methods';


const Payment = () => {

  

  return (
    <Layout> 
        <div className="container-fluid">
           <h2 className='border-bottom pb-3'>Payment</h2>
           <div className='row'>
            <div className='col-md-8'> 
           <div class="card shadow mt-4 rounded"> 
          <div class="card-body p-4">
          <h5 class="card-title mb-3 justify-content-between d-flex">
          <img src='/assets/img/logo.png' className='paymentLogo' />
          <small>Manage</small>
          </h5> 

            <div className='border rounded mt-4'>
              <div className='d-flex p-3'>
                <img src='/assets/img/visa.png' className='visa mr-2' />
                <img src='/assets/img/master.svg' className='visa mr-2' />
                <img src='/assets/img/amex.svg' className='visa mr-2' />
                <img src='/assets/img/union.svg' className='visa mr-2' />
                <img src='/assets/img/shop-pay.svg' className='visa mr-2' />
                <img src='/assets/img/pay.svg' className='visa mr-2' />
                <img src='/assets/img/g-pay.svg' className='visa mr-2' />
              </div>

              <div className='border-top p-4 bg-gray'>
                <div className='row'>
                  <div className='col-md-6'>
                    <h6>Credit card rate</h6>
                    <p className='mb-0'>As low as 1.75% + $0.30</p>
                  </div>
                  <div className='col-md-6'>
                    <h6>Transaction fee</h6>
                    <p className='mb-0'>0%</p>
                  </div>
                </div>
              </div>


            </div>
            <p className='mt-3 border-bottom pb-3'> <i className='fa fa-info-circle textlight mr-1'></i> You can get improved Dazhboards Payments rates by upgrading your <a className='text-primary'>Dazhboards plan</a>.</p>
            <b>Payout bank account</b>
            <p>Your payouts are scheduled manually and are deposited into bank account ****** 82 (AUD)</p>
            <button className='btn btn-primary'>View payouts</button>
           </div>

        </div>

        <div class="card shadow mt-4 rounded"> 
          <div class="card-body p-4">
            <h4>Additional payment methods</h4>
            <p className='mb-0'>Payment methods that are available with one of Dazhboards approved payment providers.</p>
            </div>
            <div className='border-top p-4'>
            <div className=' bg-gray'>
              <div className='border rounded p-4'>
                <div className='d-flex align-items-center justify-content-between border-bottom pb-3'>
                <img src='https://cdn.shopify.com/shopifycloud/web/assets/v1/fb2d9dcc948840af.svg' className='visa bg-white' />
                <small>Manage</small>
                </div>
                <div className='row pt-3'>
                  <div className='col-md-4'>
                    <lable>Provider</lable>
                    <p className='text-black'>payPal</p>
                  </div>
                  <div className='col-md-4'>
                    <lable>Status</lable>
                    <p className='d-block userHours p-1 pl-3 pr-3 active'>Acive</p>
                  </div>
                  <div className='col-md-4'>
                    <lable>Transaction Fee</lable>
                    <p className='text-black'>0%</p>
                  </div>
                </div>
              </div>
            </div>
            <button className='btn btn-primary mt-4'>Add payment methods</button>
            </div>
           
            </div>

            <div class="card shadow mt-4 rounded"> 
            <div class="card-body p-4">
              <h4 className='mb-3'>Manual payment methods</h4>
              <p>Payments that are made outside your online store. When a customer selects a manual payment method such as cash on delivery, you'll need to approve their order before it can be fulfilled.</p>
            
              <div className="dropdown addDropdown mr-2">
                        <button className="btn btn-primary dropdown-toggle removeBg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           All manual payment method
                        </button>
                        <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                            <a className=  'dropdown-item'>Create custom payment method</a>
                            <a className= 'dropdown-item'>Bank Deposit</a>
                            <a className= 'dropdown-item'>Money Order</a>
                            <a className= 'dropdown-item'>Cash on Delivery (COD)</a>
                        </div>
                    </div>
            </div>
            </div>
        </div>
        <div className='col-md-4'>
        <div class="card shadow mt-4 rounded"> 
          <div class="card-body p-4">
            <h4>Payment capture</h4>
            <span className='badge badge-secondary'>Automatic</span>
            <p className='mt-3'>The customer’s payment method is authorized and charged automatically.</p>
            <button className='btn btn-primary'>Manage</button>
            </div>
            </div>
        </div>
           </div>
        </div> 
    </Layout>
  );
};

export default Payment;
