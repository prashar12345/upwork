import React, { useEffect, useState } from 'react';
import Layout from '../../components/global/layout';
import './style.scss';
import ApiClient from '../../methods/api/apiClient';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Googlereview = ({ }) => {
    const history = useHistory()
    const [tripadvisior, settripadvisior] = useState()
    const user = useSelector(state => state.user)

    useEffect(() => {
        getUserDetail()
    }, [])

    const connect = () => {
        ApiClient.get('api/auth/code').then(res => {
            if (res.success) {
                localStorage.removeItem('googleAccount')
                window.open(res.data)
            }
        })
    }

    const getUserDetail = () => {
        ApiClient.get(`api/user/profile?id=${user._id}`).then(res => {
            if (res.success) {
                settripadvisior(res.data.tripAdvisorConnection)
            }
        })
    }

    const handletripadvisior = () => {
        if(tripadvisior){
            ApiClient.put(`api/unlink/tripadvisior`).then(res=>{
                if(res.success){
                    getUserDetail()
                    toast.success(res.message)
                }
            })
        }else{
            history.push(`reviewpage`)
        }
    }

    return (
        <Layout>
            <div className=" mt-4 align-items-center">
                <div className='row mx-auto'>
                    <div className='col-md-12 mx-auto'>
                        <h1 className="heddingReview text-center mb-3">
                            Works great with the tools  <br /> you already use
                        </h1>
                        <p className='text-center pcls mt-4'>Manage reviews from 40+ review sites and connect Dazhboard with the apps you use to run your business. Integration. Automation. Sorted.</p>
                        <div className='social_search mt-4 d-flex'>
                            <input className='form-control' placeholder='Search...' />
                            {/* <button className='btn btn-primary ml-2'>Search</button> */}
                        </div>

                        {/* Tripadvisor Review */}
                        {/* <div class="elfsight-app-853e6395-6457-4ef7-9a54-708c38cf6c2c"></div> */}

                        <div className='social-box'>
                            <div className='row'>
                                <div className='col-md-3 mt-5'>
                                    <div className='shadow bg-white text-center p-2 roundedBox'>
                                        <img className='socialImg' src='https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png' />
                                        <h5><b>Google My Business</b></h5>
                                        <p>Ask for, monitor, respond to and display reviews</p>
                                        {/* <Link className='btn btn-primary' to='/reviewStep'> Connect </Link> */}
                                        <button className='btn btn-primary' onClick={e => connect()}>Connect</button>
                                    </div>
                                </div>
                                <div className='col-md-3 mt-5'>
                                    <div className='shadow bg-white text-center p-2 roundedBox tripcard'>
                                        <img className='socialImg w-100 mt-4' src='/assets/img/triplogo.png' width="auto" height="auto" />
                                        <h5 className='mt-3'><b>Tripadvisor</b></h5>
                                        <p>Ask for, monitor, respond to and display reviews</p>
                                        <button className='btn btn-primary' onClick={e => handletripadvisior()}>{tripadvisior ? 'Disconnect' : 'Connect'}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    );
};

export default Googlereview;
