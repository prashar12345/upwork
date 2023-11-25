import React, { useEffect, useState } from "react";
import methodModel from "../../methods/methods";
import { Link } from "react-router-dom"; 
import Layout from "../../components/global/layout";
import Select from "react-select";
import { toast } from "react-toastify";
import ApiClient from "../../methods/api/apiClient";
import { User } from "../../methods/auth";
import { useSelector } from "react-redux";
import environment from "../../environment";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Header from '../../components/global/header';
import loader from "../../methods/loader";
import Multiselect from "multiselect-react-dropdown";
import { Formik } from "formik";
import moment from "moment";
import Pagination from 'react-js-pagination'; 
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Contract = () => { 
  const user=useSelector(state=>state.user); 
  const Navigate=useHistory();
  const [SearchData,setSearchData]=useState("");
  const [Preview,setPreview]=useState(false); 
  const [filters,setfilters]=useState({page:1,count:50,search:"",employerId:user.role&&user.role.id=="64e83a928599356bddc2fa00"?"":user.id,freelancerId:user.role&&user.role.id=="64e83a928599356bddc2fa00"?user.id:"",status:""})
  const [total,settotal]=useState(0);
  const [View,setView]=useState(false);
  const [Edit,setEdit]=useState(false);
  const [Editid,setEditid]=useState("")
  const [SelectedSkills,setSelectedSkills]=useState([]) ;
  const [SubmittedError,setSubmittedError]=useState(false);
  

const [ProjectsData,setProjectsData]=useState([]);
  const GetAllProjects=(p={})=>{
    const newfilters={...filters,...p};
    loader(true);
    ApiClient.get(`invites`,newfilters).then(res=>{
      if(res.success){
        setProjectsData(res.data);
        settotal(res.total)
      }
      loader(false);
    })
  }
  useEffect(()=>{
GetAllProjects();
  },[])


   
    
      

      const HandleProjectDelete=(id)=>{
        if(window.confirm("Do you want to Delete this?")){
        loader(true);
        ApiClient.delete(`invites?id=${id}`).then(result=>{
          if(result.success){
            GetAllProjects();
          }
          loader(false);
        })
      }
      }
      const pageChange = e => {
        setfilters({ ...filters, page: e });
        GetAllProjects({ page: e });
      };
      const HandleSearchSubmit=(e)=>{
        e.preventDefault();
        if(SearchData==""){
      
        }else{
        setfilters({...filters,search:SearchData})
        GetAllProjects({search:SearchData})
        }
      }

   const HandleEmptySearch=(e)=>{
    e.preventDefault();
    setSearchData("")
    setfilters({...filters,search:""})
        GetAllProjects({search:""})
   }
 

   const HandleAcceptRejectInvite=(e,id,status)=>{
    e.preventDefault();
  loader(true);
  const payload={id:id,status:status}
  ApiClient.put(`accept/reject/invite`,payload).then(res=>{
    if(res.success){
      GetAllProjects();
      toast.success(res.message);
    }
  })
   }
  
  return (
    <>
     <Layout> 
        <div className="container">
     
        <div className="row position-relative">
          <div className="d-flex align-items-center justify-content-between mb-3"> 
        <div className="text-left">
                            <h3 className="font-weight-bold mb-0">Contracts</h3> 
                        </div>
                        <div>
                       
                        <select className="form-control" value={filters.status} onChange={e=>{setfilters({...filters,status:e.target.value});GetAllProjects({status:e.target.value})}}>
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>
                        <div>
  <form onSubmit={e=>HandleSearchSubmit(e)}>
    <div className="d-flex">
    <input  className="form-control" placeholder="Search here" value={SearchData} onChange={e=>{e.target.value==""?HandleEmptySearch(e):setSearchData(e.target.value)}}/>
    <button type="submit" class="btn btn-primary lokm d-inline-flex pl-3 pr-3">
          <i class="fas fa-search"></i>
        </button>
        </div>
  </form>
                        </div>
       </div> 
        <div className="col-md-12 table-responsive">
         <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Title</th>
      {user.role&&user.role.id=="64e83a928599356bddc2fa00"? <th scope="col">Employer Name </th>:null} 
      {user.role&&user.role.id=="64e83a928599356bddc2fa00"?null:<th scope="col">Virtual Assistant</th>}
      <th scope="col">Country</th>
      <th scope="col">Status</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  {ProjectsData.map((item,index)=>(  
    <tr>
      <th scope="row" className="text-capitalize">{item.projectName}</th>
      {user.role&&user.role.id=="64e83a928599356bddc2fa00"?<td>{item.employer_details&&item.employer_details.fullName}</td>:null}
     
      {user.role&&user.role.id=="64e83a928599356bddc2fa00"?null:<td className="text-capitalize" >{item.freelancer_details&&item.freelancer_details.fullName}</td>}
      {user.role&&user.role.id=="64e83a928599356bddc2fa00"?<td>{item.employer_details&&item.employer_details.country}</td>:<td>{item.freelancer_details&&item.freelancer_details.country}</td>}
     
     {/* <td>      {item.status == 'deactive' ?<Switch onChange={e=>statusChange(item)} checked={false} /> : <Switch onChange={e=>statusChange(item)} checked={true} />}</td>  */}
     <td>{item.status}</td>
     <td>
      {user.role&&user.role.id=="64e83a928599356bddc2fa00" &&item.status=="pending" ?<> 
      <button className="mr-2 btn btn-success" onClick={e=>HandleAcceptRejectInvite(e,item.id,"accepted")}>Accept</button>
      <button className="mr-2 btn btn-danger" onClick={e=>HandleAcceptRejectInvite(e,item.id,"rejected")}>Reject</button>
      </>:null}
      <button data-toggle="modal" data-target="#exampleModal" className="d-none" id="openprojectedit" ></button> 
      <i data-toggle="modal" data-target="#exampleModal" onClick={e=>{Navigate.push(`/invite/${item.id}`)}} className="fa fa-eye gogl mr-2"></i>
      {/* <i  className="fa fa-eye mr-2" data-toggle="modal" data-target="#exampleModal" onClick={e=>{setProtofolioError1(false);setEditid(item.id);setView(true); setEditData(item);setEdit(true);setimages1(item.documents);setSelectedSkills(item.skills);setSubmittedError(false);setSelectedTechnology(item.technology)}}></i> */}
      {/* <i className="fa fa-trash text-danger" onClick={e=>HandleProjectDelete(item.id)}></i> */}
      </td>
    </tr> 
    ))}
  </tbody>
</table>
                    </div>
                  
                    {ProjectsData?.length==0?<div className="text-center text-danger m-5"><h5>No Data</h5></div>:null}
                    
                  </div>
                  {total > filters.count ? (
            <div className='' style={{float:"right"}}>

              <Pagination

                activePage={filters.page}
                itemClassPrev='back_page'
                itemClassNext='next_page'
                itemsCountPerPage={filters.count}
                totalItemsCount={total}
                pageRangeDisplayed={5}
                onChange={pageChange}
              />
            </div>
          ) : null}
                </div> 

  
                </Layout>
 
    </>
  );
};

export default Contract;
