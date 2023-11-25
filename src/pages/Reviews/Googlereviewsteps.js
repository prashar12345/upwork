import React, {  useEffect, useState } from 'react';
import Layout from '../../components/global/layout';
import './style.scss';
import { Link } from 'react-router-dom';
import Step2 from './step2';
import Sitereview from './Reviewsite';
import Improvecontact from './ImproveContacts';
import methodModel from '../../methods/methods';
import ApiClient from '../../methods/api/apiClient';

function Googlereviewsteps({}) {

    const [detail,setDetail]=useState()

    const mystyle={
        backgroundImage: 'linear-gradient(to left, rgba(255,0,0,0), rgb(118 90 166))',
        width:'50%'
      }

    const [tab,setTab]=useState('step1')
    const tabChange=(t)=>{
        console.log("t",t)
        setTab(t)
    }

    const code=methodModel.getPrams('code')

    useEffect(()=>{
        let googleAccount=localStorage.getItem('googleAccount')
        if(googleAccount){
            setDetail(JSON.parse(googleAccount))
        }
        if(code && !googleAccount){
            ApiClient.get('api/google/account',{authCode:code}).then(res=>{
                if(res.success){
                    let data=res.data
                    localStorage.setItem('googleAccount',JSON.stringify(data))
                    setDetail(data)
                }
                
            })
        }
    },[])

    return (
        <Layout>
            {tab=='step1'?<>
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
                            Welcome aboard!
                        </h1>
                        <p className='text-center pcls'> Let's get you set up for sucsess as fast as possible</p>
                        <div className='social_search mt-4'>
                            <input className='form-control' placeholder='Search...' />
                            <div className='buttonSection mt-4 d-flex justify-content-center'>
                                <Link className='btn btnsecondary backBtn w-25' to="/review">
                                    <span class="material-icons">keyboard_backspace</span>
                                </Link>
                                
                                <button className='btn btn-primary ml-2 w-75' onClick={e=>tabChange('step2')}>
                                   Next Step 
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            </>:<></>}
            {tab=='step2'?<>
                <Step2 tabChange={tabChange} />
            </>:<></>}
            {tab=='step3'?<>
                <Sitereview tabChange={tabChange} />
            </>:<></>}
            {tab=='step4'?<>
                <Improvecontact tabChange={tabChange} />
            </>:<></>}
            

        </Layout>
    );
}

export default Googlereviewsteps;
