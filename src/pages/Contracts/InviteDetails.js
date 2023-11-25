import React, { useEffect, useState } from 'react'
import Header from '../../components/global/header'
import Layout from "../../components/global/layout";
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import loader from '../../methods/loader';
import ApiClient from '../../methods/api/apiClient';
import { useSelector } from 'react-redux';
import environment from '../../environment';


export default function ContractsDetails() {
  const {id}=useParams();
  const Navigate=useHistory();
const [data,setdata]=useState([]);
const user=useSelector(state=>state.user);
  const GetInviteDetails=()=>{
    loader(true);
    ApiClient.get(`invite?id=${id}`).then(res=>{
      if(res.success){
setdata(res.data);
      }
      loader(false);
    })
  }

  useEffect(()=>{
   GetInviteDetails()
  },[id])
  return (
    <div>
      <Layout> 
        <div className='conatiner'>
          <div className='row'>
          <div className=' border-bottom d-flex justify-content-between align-items-center'> 
            <div className='mb-3'>
            <h4 className='font-weight-bold mb-0'>Invite Details</h4>

            </div>
            <div className='mb-3'>
            <button className='btn btn-secondary mr-2'  onClick={e=>Navigate.push("/invites")}>Back</button>
            
            <button disabled  className={`btn ${data.status=="pending"?"btn-warning":data.status=="accepted"?"btn btn-success":"btn-danger"} text-capitalize`}>{data.status}</button>
            </div>

          </div> 
          {/*  Details of Freelancer */}
      {user.role&&user.role.id=="64e83a928599356bddc2fa00"?null:
      <div className='border_invite p-3 mb-4'>
          <div className='col-md-12 mb-3 pb-1 p-0'>
            <h5 className='font-weight-bold'>Virtual Assistance Details</h5>
          </div> 
          <div className='row'>
            <div className='col-md-4'>
              <label className='font-weight-bold'>Name</label>
              <p className='bg_invite text-capitalize'>{data.freelancerId&&data.freelancerId.fullName}</p>
            </div>
            <div className='col-md-4'>
              <label className='font-weight-bold'>Email</label>
              <p className='bg_invite'>{data.freelancerId&&data.freelancerId.email}</p>
            </div>
            <div className='col-md-4'>
              <label className='font-weight-bold'>Hourly Rate</label>
              <p className='bg_invite'>$ {data.freelancerId&&data.freelancerId.hourlyRate}</p>
            </div> 
            <div className='col-md-4'>
              <label className='font-weight-bold'>Country</label>
              <p className='bg_invite'>{data.freelancerId&&data.freelancerId.country}</p>
            </div>
            <div className='col-md-12 badges'>
              <label className='font-weight-bold'>Skills</label>
              <p className='bg_invite'>{data.freelancerId&&data.freelancerId.skills&&data.freelancerId.skills.map((item,index)=>(<span className='bg_bages'>{item.label}</span>))}</p>
            </div>
            </div>
            </div>}

          {user.role&&user.role.id=="64e5cdfc5bb9a041a39046d5"?null: <div className='border_invite p-3 mb-4'>
          <div className='col-md-12 mb-3 pb-1 p-0'>
            <h5 className='font-weight-bold'>Employer Details</h5>
          </div> 
          <div className='row'>
            <div className='col-md-4'>
              <label className='font-weight-bold'>Name</label>
              <p className='bg_invite'>{data.employerId&&data.employerId.fullName}</p>
            </div>
            <div className='col-md-4'>
              <label className='font-weight-bold'>Email</label>
              <p className='bg_invite'>{data.employerId&&data.employerId.email}</p>
            </div> 
            <div className='col-md-4'>
              <label className='font-weight-bold'>Country</label>
              <p className='bg_invite'>{data.employerId&&data.employerId.country}</p>
            </div> 
            <div className='col-md-4'>
              <label className='font-weight-bold'>Hourly Rate</label>
              <p className='bg_invite'>$ {data.employerId&&data.employerId.hourlyRate}</p>
            </div> 
            </div>
            </div>}
            {user.role&&user.role.id=="64e5cdfc5bb9a041a39046d5"?null: <div className='border_invite p-3 mb-4'>
          <div className='col-md-12 mb-3 pb-1 p-0'>
            <h5 className='font-weight-bold'>Company Details</h5>
          </div> 
          <div className='row'>
            <div className='col-md-4'>
            
              <label className='font-weight-bold'>Name</label>
              <p className='bg_invite'>{data.employerId&&data.employerId.companyName}</p>
            </div>
            <div className='col-md-4'>
              <label className='font-weight-bold'>Website</label>
              <p className='bg_invite'>{data.employerId&&data.employerId.companyWebsite}</p>
            </div> 
            <div className='col-md-4'>
              <label className='font-weight-bold'>Contact Email</label>
              <p className='bg_invite'>{data.employerId&&data.employerId.contactEmail}</p>
            </div> 
            <div className='col-md-4'>
              <label className='font-weight-bold'>Description</label>
              <p className='bg_invite'>{data.employerId&&data.employerId.companyDescription}</p>
            </div> 
            </div>
            </div>}

            <div className='border_invite p-3 mb-4'>
          <div className='col-md-12 mb-3 pb-1 p-0'>
            <h5 className='font-weight-bold'>Job Post Details</h5>
          </div> 
          <div className='row'>
            <div className='col-md-4'>
              <label className='font-weight-bold'>Title</label>
              <p className='bg_invite'>{data.projectId&&data.projectId.name}</p>
            </div>
            <div className='col-md-4'>
              <label className='font-weight-bold'>Status</label>
              <p className='bg_invite text-capitalize'>{data.projectId&&data.projectId.status}</p>
            </div>
            
            <div className='col-md-4'>
              <label className='font-weight-bold'>Category</label>
              <p className='bg_invite text-capitalize'>{data.category&&data.category.name}</p>
            </div>
            <div className='col-md-4'>
              <label className='font-weight-bold'>Speciality</label>
              <p className='bg_invite text-capitalize'>{data.speciality&&data.speciality.name}</p>
            </div>
            <div className='col-md-4'>
              <label className='font-weight-bold'>Hourly Rate</label>
              <p className='bg_invite'>less than ${data.projectId&&data.projectId.hourlyrateEnd}/hr</p>
            </div>
            <div className='col-md-12 badges'>
              <label className='font-weight-bold'>Skills</label>
              <p className='bg_invite'>{data.projectId&&data.projectId.skills&&data.projectId.skills.map((item,index)=>(<span className='bg_bages'>{item.name}</span>))}</p>
            </div>
            <div className='col-md-12 badges'>
              <label className='font-weight-bold'>Documents</label>
              <p className='bg_invite d-flex'>{data.projectId&&data.projectId.documents&&data.projectId.documents.map((item)=>(
                <div className='ml-2'> 
                                      <p className="text-capitalize">
                                        <img
                                          style={{ cursor: "pointer" }}
                                          width={40}
                                          className="document_image"
                                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5kekkj6iYr_ZSKfB7GRWEJ4q-7_2sruMm5Hbc2haxduVzPhmc1kS-7OKKJDI1FjTEVAg&usqp=CAU"
                                          onClick={(e) =>
                                            window.open(
                                              `${environment.api}images/document/${item}`
                                            )
                                          }
                                        /> 
                                      </p>
                                    </div> 
              ))}</p>
            </div>
            <div className='col-md-12 badges'>
              <label className='font-weight-bold'>Description</label>
              <p className='bg_invite'>{data.projectId&&data.projectId.description}</p>
            </div>
            </div>
            </div>
            <hr/>
            <div>
            <div className='border_invite p-3 mb-4'>
          <div className='col-md-12 mb-3 pb-1 p-0'>
            <h5 className='font-weight-bold'>Invitation Description</h5>
          </div> 
          <div className='row'>
            
            <div className='col-md-12 badges'>
              <label className='font-weight-bold'>Description</label>
              <p className='bg_invite'>{data.description}</p>
            </div>
            </div>
            </div>
            </div>
          </div>
        </div>
       </Layout>
    </div>
  )
}
