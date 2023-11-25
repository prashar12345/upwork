import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import { ToastsStore } from 'react-toasts';
import methodModel from '../../methods/methods';
import { login_success } from '../../actions/user';
import './style.scss';
import { userType } from '../../models/type.model';
import Html from './Html';
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import { toast } from 'react-toastify';
import Header from '../../components/global/header';

const JobDetails = ({setMyForm,setCount,MyForm}) => {
  const Navigate=useHistory();
  const [Allskills,setAllSkills]=useState([])
  const HandleSubmit=(e)=>{
    const newarray=[];
    Allskills.map((item,index)=>{
       if(MyForm.skills.includes(item.id)){
        newarray.push({name:item.name,id:item.id});
       }
    })
    loader(true);
e.preventDefault();
let method="post";
let payload={...MyForm,skills:newarray,name:MyForm.title};
if(MyForm.id!=""){
method="put"
}
else{
  delete payload.id;
}

ApiClient.allApi("project",payload,method).then(Res=>{
  if(Res.success){
    Navigate.push("/project")
    toast.success(Res.message); 
  } 
   loader(false);
})}

const skills=()=>{
  ApiClient.get(`skills?status=active`).then(res=>{
    if(res.success){
setAllSkills(res.data);
    }
  })
}
useEffect(()=>{
  skills()
},[])
   
  return (
    <>  
       <div className="bg-white pt-4">
     <div className="container pl-5 pr-5 mt-5">
      <div className="row ">
       <div className='d-flex justify-content-between'>
        <h2 className='mb-0'>Job Details</h2>
        <button className='btn btn-primary' onClick={e=>HandleSubmit(e)}>{MyForm.id==""?"Post":"Update"} this job</button>
       </div>
         <div className='card p-0 radius_card mt-3'>
         <div className='d-flex justify-content-between p-3'>
          <h5 className='font-weight-bold'>{MyForm.title}</h5>

          <a className='edit_job_post'><span class="material-icons" onClick={e=>setCount(0)} >mode_edit</span></a>
         </div>
         <hr className='m-0' />
         <div className='p-3'>
         <a className='edit_job_post' style={{float:"right"}} ><span class="material-icons" onClick={e=>setCount(3)} >mode_edit</span></a>
         <p className='mb-1'>Project Description:</p>
          <p>{MyForm.description}</p>
         </div>
         </div>
      </div>
     </div>
     </div>
  

    </> 
  );
};

export default JobDetails;