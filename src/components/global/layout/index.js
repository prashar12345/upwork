import React, { useEffect } from 'react';
import './style.scss';
import { useHistory } from 'react-router-dom';
import Sidebar from '../sidebar';
import Header from '../header';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastsStore } from 'react-toasts';
import ReactGA from 'react-ga'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const Layout = ({ children }) => {
  let user = useSelector(state => state.user);
   const routes=useLocation();
   const pathname=routes.pathname;
  const dispatch=useDispatch();
  const searchState = useSelector((state) => state.search);
  const history = useHistory();
  const useAnalyticsEventTracker = (category="Blog category") => {
    const eventTracker = (action = "test action", label = "test label") => {
      ReactGA.event({category, action, label});
    }
    return eventTracker;
  }
ReactGA.initialize('G-PDR2K98N27');
useEffect(()=>{
 useAnalyticsEventTracker("Dazboard")
},[])
  useEffect(() => {
    if (user && !user.loggedIn) {
      history.push('/home');
    }
  }, [searchState])
  useEffect(()=>{
if(user.role &&user.role.id == "64e83a928599356bddc2fa00"&&user.isVerifiedDocument!="accepted"){
  if(pathname=="/profile/edit")
  {
  }else{
  history.push("/profile")}
}
if(user.role &&user.role.id == "64e83a928599356bddc2fa00"&&user.isVerifiedDocument=="rejected"){
  if(pathname=="/profile/edit")
  {
  }else{
    // toast.error("Your account is Inactive or blocked by Admin.Please upload updated Documents");
  history.push("/profile")}
}
if(user.role &&user.role.id == "64e83a928599356bddc2fa00"&&user.isVerifiedDocument=="pending"){
  if(pathname=="/profile/edit")
  {
  }else{
    // toast.success("Your Account is under progress.Admin will Approve it Shortly ")
  history.push("/profile")}
}
  },[])

  const logo = () => {
    let value = '/assets/img/newlogo.png'
    return value
  }

  const router=()=>{ 
    history.push("/");
  }
 


  return (
    <>
    <div component="layout">
    <div onClick={e=>router()} id="routerDiv"></div>
      <Header />
      <div className="main-wrapper d-flex">
        <div className="main-sidebar  d-md-block">
          {/* <div className="sidebar-brand p-3 pt-4  text-left pl-5">
            <label className='editLogo'>
              <img src={logo()}  onClick={e=>history.push("/home")} className="logocls" />
            </label>

          </div> */}
          {user.role &&user.role.id == "64e83a928599356bddc2fa00"&&user.isVerifiedDocument!="accepted"?null:<Sidebar />}
        </div>
        <main className="main">
          <div className="mainarea">{children}</div> 
        </main>
      </div>
    </div>
    </>
  );
};
export default Layout;
