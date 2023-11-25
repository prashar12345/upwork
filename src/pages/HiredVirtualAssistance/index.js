import Header from '../../components/global/header';
import React, { useEffect, useState } from "react";
import Layout from "../../components/global/layout";
import loader from '../../methods/loader';
import ApiClient from '../../methods/api/apiClient';
import Pagination from 'react-js-pagination';
import methodModel from '../../methods/methods';

export default function NotUseForNow(){
    const [ProjectsData,setProjectsData]=useState([]);
    const [Filters,setFilters]=useState({search:"",page:1,count:50,skills:[],technology:[]});
const [total,setTotal]=useState(0);
    const GetAllprojects=(p={})=>{
        const newfilters={...Filters,...p,skills:p.skills?p.skills.map((item)=>item.id).toString():Filters.skills.map((item)=>item.id).toString(),technology:p.technology?p.technology.map((item)=>item.id).toString():Filters.technology.map((item)=>item.id).toString()};
        loader(true);
        ApiClient.get(`posted/projects`,newfilters).then(result=>{
            if(result.success){
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
    return(
        <>
        <Header />

        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-4'>
                    <h3 className='mb-0 font-weight-bold'>Project</h3>
                </div>
                <div className='col-md-5  ml-auto'>
                    <div className='d-flex justify-content-between'>
                <form className='mr-2'    onSubmit={e=>HandleSearchSubmit(e)}> 
          <div class="input-group">
          <input type="search" placeholder='Search' value={Filters.search} onChange={e=>{if(e.target.value==""){setFilters({...Filters,search:""});HandleSearchSubmit(e,"");}else{HandleSearchFilter(e.target.value)}}}  id="form1" class="form-control d-flex-inline" /> 
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
               {ProjectsData.map((item,index)=>( <div className='col-md-12 border-top border-bottom mt-3 pt-3 mb-3 pb-3'>
                    <div className='d-flex justify-content-between align-items-center'>
                    <div className='d-flex'>
                        <img src={`${!item.addedByDetail&&item.addedByDetail==""?"/assets/img/person.jpg":methodModel.userImg(item.addedByDetail&&item.addedByDetail.image)} `} className='user_img'  />
                        <div className='product_details'>
                        <b className='text-primary font-weight-bold text-capitalize'>{item.addedByDetail&&item.addedByDetail.fullName}</b>
                        <p className='mb-0 font-weight-bold'>Employer</p>
                        <div className='d-flex'>
                        <b>${item.addedByDetail&&item.addedByDetail.hourlyRate} </b> <span className='ml-2 mr-5' >/ hr</span>
                           <b className='mr-3'>$0</b> earned
                        </div>
                        <p className='text-truncate mb-0'>{item.description}</p>
                        </div>
                    </div>
                    <div className='right_assistent align-items-center d-flex'>
                    <span class="material-icons">location_on</span><b>United State</b>
                    </div>
                    <div className='post_btn'>
                        <button className='btn btn-primary d-block mb-2 pl-5 pr-5'>Post Job</button>
                        <button className='btn btn-outline-primary pl-5 pr-5'> 
                        <i className='fa fa-heart'></i> Save
                        </button>
                    </div>
                    </div>
                </div>))}
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