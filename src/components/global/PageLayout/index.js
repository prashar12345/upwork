import React, { useEffect } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import methodModel from '../../../methods/methods';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../../actions/user';

const PageLayout = ({ children }) => {
  const user = useSelector(state => state.user)
  const history=useHistory()
  const dispatch=useDispatch()

  const Logout = () => {
    dispatch(logout())
    localStorage.removeItem("persist:admin-app")
    localStorage.removeItem("token")
    history.push('/login');
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div className='container'>
          {/* <Link to="/home" className="navbar-brand">
                  <img src='/assets/img/logo.png' className='logocls' />
                </Link> */}
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav ml-auto align-items-center">
              {/* <li class="nav-item">
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li> */}
              <div className="dropdown">
                <a data-toggle="dropdown"
                  className="nav-link dropdown-toggle nav-link-user text-dark d-flex align-items-center">

                  <img alt="image" src={methodModel.userImg(user.image)} className="rounded-circle mr-1 userImg" />
                  <div className="ml-1 ">
                    <b>{user.fullName}</b>
                    <p className="grayCls mb-0 text-capitalize">{user.role?.name}</p>
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-right position-absolute shadow bg_hover">
                  <Link to="/profile" className="dropdown-item has-icon">
                    <i className="far fa-user" /> Profile
                  </Link>
                  <Link to="/profile/change-password" className="dropdown-item has-icon">
                    <i className="fa fa-cog" aria-hidden="true"></i> Change Password
                  </Link>
                  <a onClick={() => Logout()} className="dropdown-item has-icon">
                    <i className="fas fa-sign-out-alt" /> Logout
                  </a>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </nav>
      <div className='pageLayout'>
        {children}
      </div> 
    </>
  );
};
export default PageLayout;
