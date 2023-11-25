import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login_success } from '../../actions/user';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import { Link } from 'react-router-dom';
import './style.scss';
import methodModel from '../../methods/methods';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const history = useHistory();
  const user = useSelector(state => state.user)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/profile')
    }
  }, [])

  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [remember, setRemember] = useState(false);
  const [password, setPassword] = useState('');
  
  const [eyes, setEyes] = useState({ password: false, confirmPassword: false, currentPassword: false });

  useEffect(() => {
    loader(true)
    setTimeout(() => {
      loader(false)
    }, 500);

    let r=localStorage.getItem('remember')
    if(r) {
      let data=JSON.parse(r)
      setUsername(data.email)
      setPassword(data.password)
      setRemember(true)
    }

    let message=methodModel.getPrams('message')
    if(message) toast.success(message)
  }, [])

  const hendleSubmit = (e) => {
    e.preventDefault()
    const data = {
      email: username,
      password
    };

    loader(true)

    ApiClient.post('user/signin', data).then(res => {
      loader(false)
      if (res.success) {
        if(remember){
          localStorage.setItem('remember',JSON.stringify(data))
        }else{
          localStorage.removeItem('remember')
        }
        toast.success(res.message)
       
        localStorage.setItem('token', res.data.access_token)
        dispatch(login_success(res.data)) 
        const newdata=res.data;
        if(newdata.role&&newdata.role.id=="64e83a928599356bddc2fa00"&&newdata.isVerifiedDocument=="accepted"){
          history.push("/projectslist")
        }
        else{
        history.push('/profile');}
      }
    })
  };


const params=new  URLSearchParams(window.location.search);
const id=params.get('id');
  useEffect(() => {
     if(id){
      loader(true)
      localStorage.clear();
      ApiClient.post('autoLogin',{id:id}).then(response => {
    
        if(response.success){  
          dispatch(login_success(response.data))  
          localStorage.setItem('token', response.data.access_token)
          toast.success(response.message);
          const newdata=response.data;
          if(newdata.role&&newdata.role.id=="64e83a928599356bddc2fa00"&&newdata.isVerifiedDocument=="accepted"){
            history.push("/projectslist")
          }
          else{
          history.push('/profile');}
        }
        loader(false)
      })
     }
  }, []);




  return (
    <> 
    <Link className='right_home' to='/'><span class='material-icons arrow_right'>arrow_back</span>  Home</Link>
           <div className="main_signup">
          <div className="row align-items-center">
    
           
            <div className="col-md-12 p-0">
            <div className='top_section'>
            <div className='right_side'>

              <Link to="/"><div className='logo_image'>
                  <img src='/assets/img/Logo_new.png' className='logo_name mb-2'/>
                </div></Link>
           
                <div className="text-center mb-2">
                  <h3 className="text-cenetr lgtext">Sign in</h3> 
                </div>
            <p className='accopunt text-center'>Don’t have an account? <Link class="sign_up" to="/signup" > Sign Up</Link></p>
              <form
                className="centerLogin mt-3"
                onSubmit={hendleSubmit}
              >  
              

                <div className="mb-3">
                <label className="ml-1"> Email <span className="red">*</span></label>
                  <input
                    type="email"
                    className="form-control mb-0 bginput changes" placeholder='Email address'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                  />
                </div>



                <label className="ml-1"> Password <span className="red">*</span></label>
                <div className="mb-3">
                  <div className="inputWrapper">
                    <input
                      type={eyes.password ? 'text' : 'password'}
                      className="form-control mb-0 bginput changes"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                    />
                    <i className={eyes.password ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => setEyes({ ...eyes, password: !eyes.password })}></i>
                  </div>
                </div>

                <div className="forget text-right">
                  <Link to="/forgotpassword" className="text-black">Forgot Password?</Link>

                </div>
                <div className="mt-0">
                  {/* <label><input type="checkbox" checked={remember} onChange={(e)=>setRemember(e.target.checked)} className="mr-2" /> Remember Me</label> */}
                  <button type="submit" className="btn btn-primary loginclass mt-2">
                 Sign in
                  </button>
                </div>
                <div className='borderCls mt-5'><span className='or'>or</span></div>
                <div className='text-center d-flex justify-content-center mt-5'>
                <a className='btn btn-outline google_id mr-3 '>
                  <img src='/assets/img/gogle.png' />
                  <span className='google_heading'></span>
                </a>
                <a className='btn btn-outline google_id'>
                  <img src='/assets/img/facebooklogo.png' />
                  <span className='google_heading'></span>
                </a>
                </div>
                {/* <p className='accopunts mt-4'>Protected by reCAPTCHA and subject to the Dazhboards <a className='text-primary'>Privacy Policy</a> and <a className='text-primary'>Terms of Service.</a></p> */}
              </form>

</div>
              </div>

            </div>

           
          </div>
        </div>  


    </>
  );
};




export default Login;
