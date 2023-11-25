import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import './style.scss';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Forgotpassword = () => {
    const history = useHistory();

    const user = useSelector(state => state.user)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/dashboard')
          }
    }, [])

    const [form, setForm] = useState({ email: '' });

    useEffect(() => {

    }, [])

    const hendleSubmit = (e) => {
        e.preventDefault();
        loader(true)

        ApiClient.post('forgot/password/frontend', {...form,role:'64b15102b14de6c28838f7d2'}).then(res => {
            if (res.success) {
                history.push('/login?message='+res.message);
            }
            loader(false)
        })
    };

    return (
        <>



<div className="main_signup">
          <div className="row align-items-center">
        
           
            <div className="col-md-12 p-0">
            <div className='top_section'>
<div className='right_side'>
<div className='logo_image'>
                  <img src='/assets/img/Logo_new.png' className='logo_name'/>
                </div>
              <form
                className="centerLogin"
                onSubmit={hendleSubmit}
              >  
                <div className="text-center mb-4">
                  <h3 className="text-left lgtext">Forgot password?</h3> 
                </div>
                <p className='para_forget'>"It's all good! Enter your email, and we'll send a reset password link your way"</p>
                <div className="mb-3">
                  <div className="inputWrapper">
                  <input
                                        type="email"
                                        className="form-control  mb-0 bginput changes" placeholder='Email*'
                                        value={form.email}
                                        required
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                    />
                 
                  </div>
                </div>

                
                <div className="buttons">
              
                  <button type="submit" className="btn btn-primary loginclass mb-4">
                  Send Recovery Email
                  </button>
                </div>

                <p className='accopuntt'> Just Remember?<Link class="sign_up" to="/signup"> Sign Up</Link></p>
              </form>
              
</div>
</div>

            </div>

           
          </div>
        </div> 


            {/* <div className="login-wrapper">
                <div className="mainfromclss">
                    <div className="row">
                        <div className="col-md-6  px-0">
                            <form
                                className="p-5 rounded shadow"
                                onSubmit={hendleSubmit}
                            >
                                <a href="/login"><i className="fa fa-arrow-left" title='Back' aria-hidden="true"></i></a>
                                <div className="mb-3">
                                    <Link to={''}>
                                        <img src="/assets/img/logo.jpg" className="logimg pt-4" />
                                    </Link>
                                </div>
                                <div className="text-center mb-3">
                                    <h3 className="text-left lgtext">Forgot Password</h3>
                                </div>
                                <label></label>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control  mb-0 bginput" placeholder='Email*'
                                        value={form.email}
                                        required
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                    />

                                </div>

                                <div className="text-right">
                                    <button type="submit" className="btn btn-primary loginclass">Send</button>
                                </div>
                            </form>
                        </div>

                        <div className="col-md-6 px-0">
                            <img src="./assets/img/login_Img.png" className="loginimg w-100" />
                        </div>
                    </div>
                </div>
            </div> */}




 
        </>
    );
};

export default Forgotpassword;
