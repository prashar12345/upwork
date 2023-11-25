import React from "react";
import { Link } from "react-router-dom";
import methodModel from '../../../methods/methods';
import Sidebar from '../sidebar';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

const Html=({isOpen,toggle,searchHandle,search,isOpen1,searchChange,clear,Logout,setrole})=>{
  const pathname=location.pathname;
  const user=useSelector(state=>state.user)
  const Navigate=useHistory();
  const HandleSignupEvent=(data)=>{
Navigate.push(`/signup?role=${data}`)
  }
    return (
      <> 
        <nav
        component="header"
          className= 'navbar navbar-expand-lg navbar-light bg-light'
        >
          <Link to='/'>
    <img 
      className="myvirtualpalLogo151Icon"
      alt=""
      src="/assets/img/myvirtualpallogo15-1@2x.png"
    /></Link>
          {/* <a
            onClick={toggle}
            className={
              isOpen
                ? 'btn barlink text-primary active'
                : 'btn barlink  text-primary'
            }
          >
            <i className="fas fa-bars" />
          </a> */}
       
     <ul className="header navbar-nav justify-content-center">
        {/* <li className="nav-item nav-link forEmployers">For Employers</li> */}
        {user.role&&user.role.id=="64e83a928599356bddc2fa00"?null:<li onClick={e=>user.loggedIn?Navigate.push("/virtual"):null} className="nav-item nav-link forVirtualAssistants">
            Assistants
        </li>}
        {user.role&&user.role.id=="64e83a928599356bddc2fa00"?<li onClick={e=>user.loggedIn?Navigate.push("/projectslist"):null} className="nav-item nav-link forVirtualAssistants">
            Find Jobs
        </li>:null}
        <li className="nav-item nav-link plansPricing">Plans & Pricing</li>
        <li className="nav-item nav-link howItWorks">How it works</li>
        <Link to="/blogs"><li className="nav-item nav-link blogs">Blogs</li></Link>


        <Link to='/faq'><li className="nav-item nav-link blogs">FAQs</li></Link> 
        {/* <Link className="nav-item nav-link blogs" to='/faq'>FAQ</Link>  */}
     
      </ul>
{!user.loggedIn? <>     <li className="nav-item nav-link headerChild" onClick={e=>Navigate.push("/login")}>Login</li>
        {/* <li className="nav-item nav-link headerItem" onClick={e=>Navigate.push("/signup")}>Sign Up</li> */}
        <li class="licls "><div class="dropdown">
  <button class="nav-item nav-link headerItem" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  Sign Up <i class="fa fa-angle-down ml-1" aria-hidden="true"></i>
  </button>
  <div class="dropdown-menu rightDrop_down shadow" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#"  onClick={(e) => HandleSignupEvent("employer")}>Employer</a>
    <a class="dropdown-item mt-2" href="#" onClick={(e) => HandleSignupEvent("virtual")}>Virtual Assistant</a>
  </div>
</div></li></>:null}

          {/* {pathname=="/"?
          <form className='headerSearch ml-3' onSubmit={searchHandle}>
            <input type="text" placeholder="Search..." value={search} onChange={e => searchChange(e.target.value)} className="Searchbar"></input>
            <i className="fa fa-search" onClick={searchHandle} aria-hidden="true"></i>
            {search ? <i className="fa fa-times" onClick={clear} aria-hidden="true"></i> : <></>}
          </form>:null} */}
    
 {user.loggedIn?        <> <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
    
          <div className="dropdown ml-auto">
                <a data-toggle="dropdown"
                  className="nav-link dropdown-toggle nav-link-user text-dark d-flex align-items-center">
    
                  <img alt="image" src={methodModel.userImg(user.image)} width={50} height={50} className="rounded-circle mr-1" />
                  <div className="ml-1 ">
                  <b>{user.fullName}</b>
                    <p className="grayCls mb-0 text-capitalize">{user.role?.name}</p>
                    </div>
                </a>
                <div className="dropdown-menu dropdown-menu-right position-absolute shadow bg_hover">
                  <Link to="/profile" className="dropdown-item has-icon">
                    <i className="far fa-user mr-1" /> Profile
                  </Link>
                  <Link to="/profile/change-password " className="dropdown-item has-icon ">
                    <i className="fa fa-cog mr-1" aria-hidden="true"></i> Change Password
                  </Link>
                  <a id="WantLogout" onClick={() => Logout()} className="dropdown-item has-icon">
                    <i className="fas fa-sign-out-alt mr-1" /> Logout
                  </a>
                </div>
              </div></>:null}
    
          {
            isOpen1 ? (
              <div className="w-100 mobi-dropdown">
                <Sidebar />
              </div>
            ) : (
              <></>
            )
          }
        </nav>
        </>
      );
}

export default Html