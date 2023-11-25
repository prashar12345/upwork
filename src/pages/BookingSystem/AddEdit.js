import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import './style.scss'
import { useSelector } from 'react-redux';
import methodModel from '../../methods/methods';


const AddEditBooking = () => {
  const history = useHistory()
  const backbutton=()=>{
    history.goBack()
  }

  return (
    <Layout>
      <div className="container-fluid">
        <form>
          <div className='pprofile1'>
            <div className='row align-items-center'>
              <h2 className='mb-5'>Add a Booking System</h2>
              <div className='col-md-3 booking_heading'>
                Select Booking System
              </div>
              <div className='col-md-7 mb-4'>
                <div className="dropdown addDropdown booking_system mr-2 w-100">
                  <button className="btn btn-primary dropdown-toggle removeBg w-100" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Select Booking System
                  </button>
                  <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item active" >All booking</a>
                  </div>
                </div>
              </div>
              <div className='col-md-3 booking_heading'>
                API Key
              </div>
              <div className='col-md-7 mb-4'>
                <input type='text' className='form-control' placeholder='API key' />
              </div>
              <div className='col-md-3 booking_heading'>
                Secret Key
              </div>
              <div className='col-md-7 mb-4'>
                <input type='text' className='form-control' placeholder='Secret key' />
              </div>
              <div className='col-md-10 text-right'>
                <button type='button' className='btn btn-secondary mr-2 discard' onClick={e=>backbutton()}>Back</button>
                <button className='btn btn-primary'>Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddEditBooking;
