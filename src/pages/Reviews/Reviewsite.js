import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function Sitereview({ tabChange }) {
    const mystyle = {
        backgroundImage: 'linear-gradient(to left, rgba(255,0,0,0), rgb(118 90 166))',
        width: '50%'
    }

    const responseGoogle = (res) => {
        console.log("responseGoogle", res)
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
                        Add your review sites
                    </h1>
                    <p className='text-center pcls'>Find and import your reviews into Cloutly</p>
                    <div className='socialForm mx-auto mt-4'>
                        <div className='row'>
                            {/* <GoogleOAuthProvider
                                clientId="786300942943-78tgj104fiq5c5rdhkc37o2vukcq9pca.apps.googleusercontent.com"
                                response_type="token"
                                scope="https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/business.manage openid"
                            >
                                <GoogleLogin
                                    onSuccess={responseGoogle}
                                    onError={responseGoogle}
                                    useOneTap
                                />
                            </GoogleOAuthProvider> */}
                            <div className='borderSocial_review mb-3'>
                                <div className='d-flex align-items-center'>
                                    <img className='social_Img mr-2' src='https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png' />
                                    <span className='socialName'>Google</span>
                                </div>
                                <Link className='btn btn-primary'>Connect</Link>
                            </div>

                            <div className='borderSocial_review mb-3'>
                                <div className='d-flex align-items-center'>
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" width="35px" space="preserve"><g><path fill="#4267B2" class="st0" d="M49.59,2.48c-26.12,0-47.3,21.18-47.3,47.3c0,23.43,17.05,42.83,39.41,46.59V59.65H30.29V46.43H41.7v-9.74 c0-11.31,6.9-17.47,16.99-17.47c4.83,0,8.98,0.36,10.19,0.52v11.82l-7,0c-5.48,0-6.54,2.61-6.54,6.43v8.43h13.09l-1.71,13.21H55.35 v37.04c23.4-2.85,41.54-22.75,41.54-46.92C96.89,23.66,75.71,2.48,49.59,2.48z"></path></g></svg>
                                    <span className='socialName ml-2'>
                                        Facebook</span>
                                </div>
                                <Link className='btn btn-primary'>Connect</Link>
                            </div>


                        </div>
                        <div className='buttonSection mt-4 mb-4 d-flex justify-content-center'>
                            <button className='btn btnsecondary backBtn w-25' onClick={e => tabChange('step2')}>
                                <span class="material-icons">keyboard_backspace</span>
                            </button>
                            <button onClick={e => tabChange('step4')} className='btn btn-primary ml-2 w-75'>
                                Next Step
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Sitereview;
