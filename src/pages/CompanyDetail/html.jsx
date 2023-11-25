import React, { useRef, useState } from 'react';
import Layout from '../../components/global/layout';
import Pagination from "react-pagination-js";
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import loader from '../../methods/loader';
import ApiClient from '../../methods/api/apiClient';
import { toast } from 'react-toastify';
import { login_success } from '../../actions/user';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import environment from '../../environment';
import methodModel from '../../methods/methods';




const Html = ({

}) => {
  const OpenImage=useRef();
    const dispatch=useDispatch();
    const user=useSelector(state=>state.user);
    const [CompanyMobileNo,setCompanyMobileNO]=useState(user.companyMobileNo)

    const uploadImage = (e) => { 
        let files = e.target.files
        let file = files.item(0)
        if(file){
        loader(true)}
        ApiClient.postFormData('upload/image?modelName=users', { file: file, modelName: 'users' }).then(res => {
          // console.log(res,'kk')
          if (res.success) {
            let image = res.data.fullpath
            ApiClient.put('edit/profile',{companyImage:image,id:user.id}).then(res => {
                if(res.success){
                    toast.success("Image uploaded Successfully");
                    const dispatchdata={...user,companyImage:image}
                    dispatch(login_success(dispatchdata))
                }
            }) 
          } else { 
          }
          loader(false)
        })
      }
    
    return (
        <>
            

<div className="maincompany  border-bottom mt-3">
<div className=" border-bottom p-3 d-flex justify-content-between">
<h3 className="mainhedding">Company Details</h3>
{user.companyName==""? <i class="material-icons new_icons" data-toggle="modal" data-target="#EditComapy">add_circle </i>:<i data-toggle="modal" data-target="#EditComapy" class="material-icons new_icons">mode_edit</i>}
</div>

{user.companyName&&user.companyName==""?null:<><div className="img_div p-3">
    <img src={methodModel.userImg(user?.companyImage)} className="companyimg "/>
    <div className='companyimg_edit' onClick={e=>OpenImage.current.click()}><i class="material-icons">mode_edit</i></div>

    {/* <input type="file" className=""  /> */}
    <input type="file" className="img_choose d-none"  ref={OpenImage} accept="image/*"  disabled={loader} onChange={(e) => { uploadImage(e); }} />
           
        
</div>



<div className=" border-bottom border-top p-3">
   <label className="lablecls">{user?.companyName}</label>
   <p className="greenlink">{user?.companyWebsite}</p>

   {/* <label className="lablecls">Tagline</label>
   <p className="">Tantoca Inc-<span>sunshine Indoors</span></p> */}

   <label className="lablecls">StartDate</label>
   <p className="">{user?.companyStartDate}</p>

   <label className="lablecls">Description</label>
   <p className="">{user?.companyDescription}</p>

</div></>}
</div>


{user.companyName&&user.companyName==""?null:<div className="maincompany  border-bottom mt-3">
<div className=" border-bottom p-3">
<h3 className="mainhedding">Company Contact</h3>
</div>

<div className=" border-bottom p-3">
   <label className="lablecls">owner</label>
   <p className="greenlink">{user?.contactName}</p>
   <label className="lablecls">Email</label>
   <p className="greenlink">{user?.contactEmail}</p>
   <label className="lablecls">MobileNumber</label>
   <p className="greenlink">{user?.companyMobileNo}</p>
   <label className='lablecls'>Address</label>
   <p className='greenlink'>{user?.companyAddress}</p>

  

</div>
</div>}
             
{/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#EditComapy">
  Launch demo modal
</button>  */}
<div class="modal fade" id="EditComapy" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Company</h5>
        <button type="button" class="close"  id='closecompanymodal' data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
    <Formik
    enableReinitialize
    initialValues={{
        companyName:user.companyName,
companyWebsite:user.companyWebsite,
companyDescription:user.companyDescription,
companyStartDate:user.companyStartDate,
companyAddress:user.companyAddress,
contactName:user.contactName,
contactEmail:user.contactEmail,
companyMobileNo:user.companyMobileNo
    }}
    onSubmit={(values)=>{
        const payload={id:user.id,companyName:values.companyName,companyWebsite:values.companyWebsite,companyDescription:values.companyDescription,companyStartDate:values.companyStartDate,companyAddress:values.companyAddress,contactName:values.contactName,contactEmail:values.contactEmail,companyMobileNo:CompanyMobileNo}
        loader(true);
        ApiClient.put(`edit/profile`,payload).then(res=>{
if(res.success){
    document.getElementById("closecompanymodal").click();
    toast.success("Company Details Updated Successfully")
const data ={...user,...payload}
dispatch(login_success(data))
    loader(false)
}
        })
    }}
    >
        {({values,handleBlur,handleChange,handleSubmit})=>(
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-md-6 mb-3'>
                <label className='' >Company Name</label>
                <input name='companyName' className='form-control' value={values.companyName} onChange={handleChange} />
                    </div>
                    <div className='col-md-6 mb-3'>
                <label className='' >Website</label>
                <input name='companyWebsite' className='form-control' value={values.companyWebsite} onChange={handleChange} />
                    </div>
                    <div className='col-md-6 mb-3'>
                <label className='' >StartDate</label>
                <input name='companyStartDate' type='date' className='form-control' value={values.companyStartDate} onChange={handleChange} />
                    </div>
                    {/* <div className='col-md-6'>
                <label className='' >StartDate</label>
                <input name='companyStartDate' type='date' value={values.companyStartDate} onChange={handleChange} />
                    </div> */}
                    <div className='col-md-6 mb-3'>
                <label className='' >Owner Name</label>
                <input name='contactName' className='form-control' type='text' value={values.contactName} onChange={handleChange} />
                    </div>
                    <div className='col-md-6 mb-3'>
                <label className='' >Email</label>
                <input name='contactEmail'  type='email' className='form-control' value={values.contactEmail} onChange={handleChange} />
                    </div>
                    <div className='col-md-6 mb-3'>
                <label className='' >Contact Number</label>
                <PhoneInput
                value={CompanyMobileNo}
                onChange={e=>setCompanyMobileNO(e)} 
               className='form-control'
               maxlength="13"
                />
                {/* <input name='companyMobileNo'  type='number' className='form-control' value={values.companyMobileNo} onChange={handleChange} /> */}
                    </div>
                    <div className='col-md-6 mb-3'>
                <label className='' >Address</label>
                <input name='companyAddress' className='form-control' type='text' value={values.companyAddress} onChange={handleChange} />
                    </div>
                    <div className='col-md-12 mb-3'>
                <label className='' >Description</label>
                <textarea name='companyDescription' className='form-control' rows={4} type='text' value={values.companyDescription} onChange={handleChange} />
                    </div>
                </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
            </form>
        )}
    </Formik>
      </div>
    </div>
  </div>
</div>

        </>
    );
};

export default Html;
