import Header from '../../components/global/header';
import React, { useEffect, useState } from "react";
import Layout from "../../components/global/layout";
import loader from '../../methods/loader';
import ApiClient from '../../methods/api/apiClient';
import Pagination from 'react-js-pagination';
import methodModel from '../../methods/methods';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function ProjectsList(){
  const Navigate =useHistory();
  const user=useSelector(state=>state.user);
    const [ProjectsData,setProjectsData]=useState([]);
    const [ViewProjectData,setViewProjectData]=useState({});
    const [Filters,setFilters]=useState({search:"",page:1,count:50,skills:[],technology:[]});
const [total,setTotal]=useState(0);
    const GetAllprojects=(p={})=>{
        const newfilters={...Filters,...p,skills:p.skills?p.skills.map((item)=>item.id).toString():Filters.skills.map((item)=>item.id).toString(),technology:p.technology?p.technology.map((item)=>item.id).toString():Filters.technology.map((item)=>item.id).toString()};
        loader(true);
        ApiClient.get(`posted/projects`,newfilters).then(result=>{
            if(result.success){
                const data=result.data; 
                setTotal(result.total);
                setProjectsData(result.data);
            }
            loader(false);
        })
    }


    //  For Pagination We need this Function
    const pageChange = e => {
        setFilters({ ...Filters, page: e });
        GetAllprojects({ page: e });
      };

      useEffect(()=>{
GetAllprojects()
      },[])

      const HandleSearchFilter=(value)=>{
          setFilters({...Filters,search:value});
        setTimeout(() => {
            GetAllprojects({search:value});
        }, 2000);
      }
      const HandleSearchSubmit=(e,value=Filters.search)=>{
        e.preventDefault();
        GetAllprojects({search:value});
      }
      const GetPostedTime=(date)=>{  
        const data=new Date(date).getTime();
      const result = moment.utc(new Date(date)).local().startOf('date').fromNow();
    if (result == "an hour ago") {
      return "1hr ago"
    }
    else {
      return result;
    }
      }
    return(
        <>
        <Header />
{/* <div className="mainfind">
</div> */}

        <div className='container mt-4 mb-5'>

            <div className='row'>
                {/* <div className='col-md-12 text-center mb-3'>
                    <h3 className='mb-0 font-weight-bold'>Find Jobs</h3>
                </div>
               */}
               {/* <div className="mainfind"> </div> */}
                <div className='col-md-9 mb-4'>
               
              
                    <div className='d-flex justify-content-between'>
                    <h3 className='mb-2 mt-2 font-weight-bold find_title'>Find Jobs</h3>
                <form className='w-50' onSubmit={e=>HandleSearchSubmit(e)}> 
          <div class="input-group">
          <input type="search" placeholder='Search' value={Filters.search} onChange={e=>{if(e.target.value==""){setFilters({...Filters,search:""});HandleSearchSubmit(e,"");}else{setFilters({...Filters,search:e.target.value})}}}  id="form1" class="form-control d-flex-inline" /> 
          <div class="input-group-append">
          <button type="submit" class="btn btn-primary d-inline-flex pl-3 pr-3">
          <i class="fas fa-search"></i>
        </button>
        </div> 
        </div>
       </form> 
       {/* <button className='btn btn-primary pl-4 pr-4' data-toggle="modal" data-target="#exampleModalLong">Add Product</button> */}
       </div>
                </div>
               

                <div className='col-md-9'>
             
               {ProjectsData?.map((item,index)=>( 
                      <div className='col-md-12 border-top round_jobs_border  border-left  border-right border-bottom mt-3 pt-3 mb-3 pb-3'>
                 <div className='d-flex justify-content-between align-items-baseline'>
                    <div className='d-flex'>
                        <div className='product_details'>
                        <p className='mb-4'><b className='text-primary font-weight-bold text-capitalize pointer' onClick={e=>setViewProjectData(item)}><a data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">{item.name}</a></b></p>
                        {/* <p className="bold_hedding">{item.name}</p> */}
                          <p className="gay_title">Hourly -{item.addedByDetail&&item.addedByDetail.hourlyRate}$, - posted  {GetPostedTime(item.createdAt)}</p>  
                       
                      
                        <p className=' description_cls  mb-0'>{item.description}</p>
                        <div className='badges_project'>
                           {/* <p className='text-bold d-inline'>Technologies:</p>  {item.technology.map((item)=><span>{item.name}</span>)} */}
                        </div> 
                        <div className='badges_project'>
                           <p className='text-bold d-inline skills_txt mr-1'>Skills:</p>  {item.skills&&item.skills.map((item,index)=>(<span>{item.name}</span>))}
                        </div> 
                        <div className='d-flex'>
                        <span className='mt-3 mr-5'>Price: <b>${item.addedByDetail&&item.addedByDetail.hourlyRate}</b>/hrs</span>
                           
                        </div> 
                        </div>
                    </div> 
                    <div className='post_btn d-flex'>
                        <button className='btn btn-outline-primary header_like mr-2'><span class="material-icons">thumb_down_off_alt</span></button>
                        <button className='btn btn-outline-primary header_like'> 
                        <span class="material-icons">favorite_border</span>
                        </button>
                    </div>
                    </div>
                </div>
              ))}
                {ProjectsData.length==0?<div className='text-danger text-center mt-5'>No Data</div>:null}
                </div>
               

                
           <div className='col-md-3'>
            <div className='border_userDate p-3 text-center mb-4'>
                <img src={`${user.image==""?"/assets/img/person.jpg":methodModel.userImg(user.image)} `} className='img_person'/>
                <p className='mt-3 mb-1 text-capitalize'><b>{user.fullName}</b></p>
                <p>{user.email}</p>
            </div>

            <div className='border_userDate bg_blue_port pt-3 pb-2 pl-3 pr-3 mb-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <h6 className='font-weight-bold'>Build you portfolio</h6> 
                <span class='material-icons' onClick={e=>Navigate.push("/profile")} style={{cursor:"pointer"}}>arrow_forward</span>
              </div>
              <div className='d-flex justify-content-between'>
                <p className='mr-3 description_cls'>Adding a project may increase your changes of earning by 8 times.</p>
                <span class="material-icons increase">add_task</span>
                </div>
            </div>


            <div className='border_userDate  pt-3 pb-2 pl-3 pr-3 mb-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <h6 className='font-weight-bold'>My Jobs</h6> 
                <span class='material-icons'>arrow_forward</span>
              </div>
              <div className='d-flex justify-content-between'>
                <p className='mr-3 description_cls'>View your active contracts, timesheets,and available earnings.</p>
                <span class="material-icons increase">business_center</span>
                </div>
            </div>

            <div className='border_userDate  pt-3 pb-2 pl-3 pr-3 mb-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <h6 className='font-weight-bold'>My Proposals</h6> 
                <span onClick={e=>Navigate.push("/invites")} style={{cursor:"pointer"}} class='material-icons'>arrow_forward</span>
              </div>
              <div className='d-flex justify-content-between'>
                <p className='mr-3 description_cls'>Review you perposals, offers, referrals, and client invitations.</p>
            
                <span class="material-icons increase">import_contacts</span>
                </div>
            </div>
           </div>

            </div>
                  {total>Filters.count?  <Pagination 
                            activePage={Filters.page}
                            itemClassPrev='back_page'
                            itemClassNext='next_page'
                            itemsCountPerPage={Filters.count}
                            totalItemsCount={total}
                            pageRangeDisplayed={5}
                            onChange={pageChange}
                            />:null}
        </div>


{/* offcanva */}
<div class="offcanvas offcanvas-end space_canvas" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasRightLabel">Post Detail</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div className='card'>
        <div className='row'>
        <div className='col-md-8 pr-0'>
        <div className='p-3'>
        <h3>{ViewProjectData.name}</h3>
        <p className='text-primary mt-3'>{ViewProjectData.skillType}</p>
        <p>Posted {GetPostedTime(ViewProjectData.createdAt)}</p>
        </div>
        <hr />
        <div className='p-3'>
       {ViewProjectData.description}
        </div>
        <hr />
        <div className='p-3'>
        <div className='d-flex justify-content-between'>
            <div className='price_pro pl-4 d-flex'>
            <span class="material-icons price_local mt-1">local_offer</span>
            <div className='ml-2'>
            <b> ${ViewProjectData.addedByDetail&&ViewProjectData.addedByDetail.hourlyRate}</b>
            <p>Fixed-price</p>
            </div>
            </div>
            <div className='price_pro d-flex pr-4'>
            <span class="material-icons price_locals">manage_accounts</span>
            <div className='ml-2'>
            <b>Intermediate</b>
            <p>I am looking for a mix of <br /> experience and value</p>
            </div>
            </div>
        </div>
        </div>
        </div>
        <div className='col-md-4  pl-0 border-left'>
            <div className='p-3'>
                    <button className='btn btn-primary mb-3 w-100'>Apply Now</button>
                    <button className='btn btn-outline-primary mb-3 w-100 d-flex align-items-center justify-content-center'> <span class="material-icons mr-2">favorite_border</span> Saved Job</button>
                    <p>Send a proposal for:12 Connects</p>
                    <p>Available Connects: 60</p>
                    </div>
                    <hr />
                    <div className='p-3'>
                    <h6 className='mb-3'><b>About the client</b></h6>
                    <h7 className="mb-3"><b>{ViewProjectData.addedByDetail&&ViewProjectData.addedByDetail.companyName}</b></h7><br/>
                    <p className='mb-3 mt-2'><b>{ViewProjectData.addedByDetail&&ViewProjectData.addedByDetail.city},{ViewProjectData.addedByDetail&&ViewProjectData.addedByDetail.country}</b></p>
                    <p className='mb-3'>{ViewProjectData.addedByDetail&&ViewProjectData.addedByDetail.timeZone&&ViewProjectData.addedByDetail.timeZone.label}</p>
                    <b>8 Jobs Posted</b>
                    <p>25% hire rate, 4 open jobs</p>
                    <b>${ViewProjectData.addedByDetail&&ViewProjectData.addedByDetail.hourlyRate} /hr avg hourly rate paid</b>
                    <p>56 hours</p>
                    </div>

        </div>
        </div>
    </div>
  </div>
</div>

        <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Add Project</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div className="row">
      <div className="col-md-6">
            <div className="form-group">
            <label htmlFor="">Project Name</label>
            <input type="text" className="form-control" />
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
            <label htmlFor="">Technology</label>
            <input type="text" className="form-control" />
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
            <label htmlFor="">Skills</label>
            <input type="text" className="form-control" />
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
            <label htmlFor="">Start Date</label>
            <input type="date" className="form-control" />
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
            <label htmlFor="">End Date</label>
            <input type="date" className="form-control" />
            </div>
        </div>
        <div className="col-md-12">
            <div className="form-group">
            <label htmlFor="">Description</label>
            <textarea type="text" className="form-control" ></textarea>
            </div>
        </div>
        <div className="col-md-6">
            <label  className="mb-0">Upload Documents</label>
        <div class="profile_btn_portfolio ">
            <label class="add_portfolio edit ml-3">
            <input id="bannerImage" type="file" multiple="" class="d-none" />
                <span class="add_portfolio"><i class="material-icons add_port">add</i></span></label></div>
        </div>
        

        <div className="col-md-12 text-right">
            <button className="btn btn-primary">Submit</button>
        </div>
      </div>
      </div> 
    </div>
  </div>
</div>
        </>
    )
}