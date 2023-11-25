import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import './style.scss'
import { useSelector } from 'react-redux';
import methodModel from '../../methods/methods';

const BookingSystem = () => {
  return (
    <Layout> 
      <div className="d-flex justify-content-between align-items-center">
                <h3 className="hedding">
                List - Booking Systems
                </h3>
                <article className="d-flex">
                    <Link className="btn btn-primary mr-2" to="/booking/add">
                        Add Booking
                    </Link>
                </article>
            </div>

            <div className="table-responsive table_section">
                <table class="table table-striped">
                    <thead className='table_head'>
                        <tr className='heading_row'> 
                            <th scope="col" className='table_data'>Booking System</th>
                            <th scope="col" className='table_data'>Connected On</th>
                            <th scope="col" className='table_data'>Connected By </th>
                            <th scope="col" className='table_data'>Status</th>
                            <th scope="col" className='table_data'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                       <tr className='data_row'>
                                <td className='table_dats'>Rezdy</td>
                                <td className='table_dats'>December 10, 1815</td>
                                <td className='table_dats'>John Doe</td>
                                <td className='table_dats'> 
                                <div className='user_hours active'>
                                <span class="contract">Connected</span>
                                </div>
                                {/* <button className='btn btn-success'>Connected</button> */}
                                </td>
                                <td className='table_dats'>
                                    <div className="action_icons">
                                    <span className='edit_icon mr-0'>
                                            <i class="material-icons delete" title='Refresh'> refresh</i>
                                        </span> 
                                        <span className='edit_icon ml-1 mr-1'>
                                            <i class="material-icons delete" title='Delete'> delete</i> 
                                        </span>  
                                        <a className="edit_icon"  >
                                            <i class="material-icons edit" title="Edit">edit</i>
                                        </a>
                                    </div> 
                                </td> 
                            </tr> 
                    </tbody>
                </table>
            </div>
    </Layout>
  );
};

export default BookingSystem;
