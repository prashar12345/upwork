import React from 'react';
import Layout from '../../components/global/layout';
import Pagination from "react-pagination-js";
import './style.scss';
import { Link } from 'react-router-dom';
import methodModel from '../../methods/methods';

function Step2({ tabChange }) {
    const mystyle = {
        backgroundImage: 'linear-gradient(to left, rgba(255,0,0,0), rgb(118 90 166))',
        width: '50%'
    }
    return (

        <div className=" mt-4 align-items-center">
            <div className='row mx-auto'>
                <div className='col-md-12 mx-auto'>
                    <div className='d-flex justify-content-between w-50 mx-auto mb-2'>
                        <div>Sign up</div>
                        <div>Set up</div>
                        <div>Lift off</div>
                    </div>
                    <div class="progress w-50 mx-auto mb-5">
                        <div class="progress-bar stepCls" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={mystyle}></div>
                    </div>

                    <h1 className="welcomeAboard text-center mb-0">
                        Let's start with the basics
                    </h1>
                    <p className='text-center pcls'>Confirm your business details and upload a logo</p>
                    <div className='socialForm mx-auto mt-4'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label>Business name (what your customers will see)</label>
                                <input className='form-control' placeholder=''></input>
                            </div>
                            <div className='col-md-6'>
                                <label>Select Industry</label>
                                <select className='form-control'>
                                    <option>Select industry</option>
                                </select>
                            </div>
                            <div className='col-md-5 mt-3'>
                                <label>Company Logo</label>
                                <div className='boxImgupload'>
                                    <div>
                                        <input type="file" class="image-upload" accept="image/*" />
                                        <div className='border_file'>
                                            <span class="material-icons">file_upload</span>
                                        </div>
                                        <b>Upload Image</b>
                                    </div>
                                </div>
                                <p className='small text-center m-auto'>* must be a JPG, PNG or GIF file <br />and under 150kb in size.</p>
                            </div>
                        </div>
                        <div className='buttonSection mt-4 mb-4 d-flex justify-content-center'>
                            <button className='btn btnsecondary backBtn w-25' onClick={e => tabChange('step1')}>
                                <span class="material-icons">keyboard_backspace</span>
                            </button>
                            <button onClick={e => tabChange('step3')} className='btn btn-primary ml-2 w-75'>
                                Next Step
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Step2;
