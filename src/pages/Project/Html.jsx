import React, { useEffect, useState } from "react";
import methodModel from "../../methods/methods";
import { Link } from "react-router-dom";
import "./style.scss";
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
import Switch from "react-switch";
import Skill from "./skill";
import Budget from './budget'
import Describe from "./describe";
import JobDetails from "./JobDetails";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Html = ({
  handleSubmit,
  setForm,
  form,
  getError,
  uploadImage,
  submitted,
  setProtofolioError,
  images,
  setimages,
  ProtofolioError,
}) => { 
  const Navigate=useHistory();
  const user=useSelector(state=>state.user);
  const [GoArray,setGoArray]=useState([{Good:""}])
  const [SearchData,setSearchData]=useState("");
  const [Preview,setPreview]=useState(false);
  const [PreviewData,setPreviewData]=useState({});
  const [filters,setfilters]=useState({page:1,count:50,search:"",userId:user.id,skills:[],technology:[]})
  const [total,settotal]=useState(0);
  const [View,setView]=useState(false);
  const [Edit,setEdit]=useState(false);
  const [Editid,setEditid]=useState("")
  const [SelectedSkills,setSelectedSkills]=useState([])
  const [SkillsData,setSkillsData]=useState([]);
  const [SubmittedError,setSubmittedError]=useState(false);
  const GetAllSkills=()=>{
  loader(true);
  ApiClient.get(`skills?status=active`).then(res=>{
    if(res.success){
      const data=res.data;
      const array=[];
      data.map((item,index)=>{
array.push({name:item.name,id:item.id})
      })
      setSkillsData(array);
    }
    loader(false)
  })

  }
  useEffect(()=>{
    GetAllSkills()
  },[])

const [ProjectsData,setProjectsData]=useState([]);
  const GetAllProjects=(p={})=>{
    const newfilters={...filters,...p,skills:p.skills?p.skills.map((item)=>item.id).toString():filters.skills.map((item)=>item.id).toString(),technology:p.technology?p.technology.map((item)=>item.id).toString():filters.technology.map((item)=>item.id).toString()};
    loader(true);
    ApiClient.get(`projects`,newfilters).then(res=>{
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


      //  for Document 
      const [DoumentUploadLoading, setDocumentUploadLoading] = useState(false);
      const [images1, setimages1] = useState([]);
      const [ProtofolioError1, setProtofolioError1] = useState(false);
      // const [DoumentUploadLoading, setDocumentUploadLoading] = useState(false);
      const [documents, setdocuments] = useState([]);
    
      //  For Deleting the Document
      const HanldDocumentDelete = (e, index) => {
        e.preventDefault();
        const array = [...images1];
        array.splice(index, 1);
        setimages1(array);
      };
    
      const imageResult = (e) => {
        if ( e.target.files&&e.target.files.length > 0) {
    
          const files = e.target.files;
          const newdata = new FormData();
          let newarray = images1;
          let imgarrays = [];
          let i = 0;
          let original = [];
          for (let items of files) {
            imgarrays.push(items);
          }
          for (let item of imgarrays) {
            let file = files.item(i);
            setDocumentUploadLoading(true);
            ApiClient.multiImageUpload("single/documents?modelName=document", {
              data: file,
            }).then((res) => {
              if (res.success) {
                console.log(res?.data?.imagePath, "THis is Image Path");
                const path = res?.data?.imagePath;
                newarray.push(path);
                original.push(path);
                setdocuments(new Date())
                if(files.length==images1.length){
                  setDocumentUploadLoading(false)
                }
              } else {
                setDocumentUploadLoading(false);
                // toast.error({ message: "Some error Occurred ! Try Again!" });
              }
            });
            
            i++;
    
          }
          setProtofolioError1(false);
          setdocuments(newarray);
          setimages1(newarray);
        } else {
          // toast.error({ message: "Please Upload the Documents" });
        }

      };
      const [EditData,setEditData]=useState({});

      const HandleProjectDelete=(id)=>{
        if(window.confirm("Do you want to Delete this?")){
        loader(true);
        ApiClient.delete(`project?id=${id}`).then(result=>{
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

      const HandleSearchFilter=(value)=>{
        setfilters({...filters,search:""});
        setSearchData("");
        GetAllProjects({search:""})
      }
      const statusChange=(itm)=>{ 
        let status='active'
        if(itm.status=='active') status='deactive'

        if(window.confirm(`Do you want to ${status=='active'?'Activate':'Deactivate'} this Project`)){
            loader(true)
            ApiClient.put(`change/status?model=projects`,{status,id:itm.id}).then(res=>{
                if(res.success){
                    toast.success(`Project ${status=='active'?'Activated':'Deactivated'} Successfully`)
                    GetAllProjects()
                }
                loader(false)
            })
        }
    }

    const [TechnologyData,setTechnologyData]=useState([]);
    const [SelectedTechnology,setSelectedTechnology]=useState([]);
    const GetAllTechnologies=()=>{
      loader(true);
      ApiClient.get(`technologies?status=active`).then(res=>{
        if(res.success){
          const newdata=res.data;
          const array=[];
          newdata.map((item)=>{
   array.push({name:item.name,id:item.id});
          })
          setTechnologyData(array);
        }
      })
    }
    useEffect(()=>{
     GetAllTechnologies();
    },[])
    
    const HandleEditFunction=()=>{
      document.getElementById("closePreviewModal").click()
      setProtofolioError1(false);setView(false); 
      // setEditid(item.id);
      setEditData(PreviewData);
      setEdit(true);
      setimages1(PreviewData.documents);
      setSelectedSkills(PreviewData.skills);
      setSubmittedError(false);
      setSelectedTechnology(PreviewData.technology)
      document.getElementById("openprojectedit").click()
    }
  return (
    <>
     <Header/>
   
   
     <section className="faq-section mainfaq">
        <div className="container">
     
        <div className="row position-relative">
          <div className="d-flex align-items-center justify-content-between mb-3"> 
        <div className="text-left">
                            <h3 className="font-weight-bold mb-0">Job Posts</h3> 
                        </div>
    <div className="right d-flex align-items-center">
    {/* <Multiselect
            displayValue="name"
            className="d-inline bg-white"
            options={TechnologyData}   
            placeholder="All Technologies"
            selectedValues={filters.technology}
            onSelect={e=>{setfilters({...filters,technology:e});GetAllProjects({technology:e}) }}
            onRemove={e=>{setfilters({...filters,technology:e});GetAllProjects({technology:e}) }}
            /> */}
      <div className="d-flex mr-2 ml-2">
      
      <Multiselect
            displayValue="name"
            className="d-inline bg-white"
            placeholder="All Skills"
            options={SkillsData}   
            selectedValues={filters.skills}
            onSelect={e=>{setfilters({...filters,skills:e});GetAllProjects({skills:e}) }}
            onRemove={e=>{setfilters({...filters,skills:e});GetAllProjects({skills:e}) }}
            />
            {filters.skills&&filters.skills.length==0?null:<button className="btn btn-primary d-inline ml-2" onClick={e=>{setfilters({...filters,skills:[]});GetAllProjects({skills:[]})}}>Clear</button>}
      </div>
        <form className='mr-2'    onSubmit={e=>HandleSearchSubmit(e)}> 
          <div class="input-group">
          <input type="search" placeholder='Search' onChange={e=>e.target.value==""?HandleSearchFilter(e.target.value):setSearchData(e.target.value)} id="form1" class="form-control d-flex-inline" /> 
          <div class="input-group-append">
          <button type="submit" class="btn btn-primary d-inline-flex pl-3 pr-3">
          <i class="fas fa-search"></i>
        </button>
        </div> 
        </div>
       </form> 
       <button className="btn btn-primary"  onClick={e=>Navigate.push("/addeditproject")}>Add Job Post </button>
       </div>
       </div> 
        <div className="col-md-12 table-responsive">
         <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Skills</th> 
      <th scope="col">Skill Type</th>
      {/* <th scope="col">Specialty</th> */}
      <th scope="col">Status</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {ProjectsData.map((item,index)=>(  
    <tr>
      <th scope="row" className="text-capitalize">{item.name}</th>
      <td>{item.skills&&item.skills.map((item)=>(<span className="bg_bages">{item.name}</span>))}</td>
     
      <td className="text-capitalize">{item.skillType&&item.skillType.name}</td>
      {/* <td>{item.specialtyDetail&&item.specialtyDetail.name}</td> */}
        <td>      {item.status == 'deactive' ?<Switch onChange={e=>statusChange(item)} checked={false} /> : <Switch onChange={e=>statusChange(item)} checked={true} />}</td> 
     <td>
      <button data-toggle="modal" data-target="#exampleModal" className="d-none" id="openprojectedit" ></button> 
      {/* <i data-toggle="modal" data-target="#exampleModal" onClick={e=>{setProtofolioError1(false);setView(false); setEditid(item.id);setEditData(item);setEdit(true);setimages1(item.documents);setSelectedSkills(item.skills);setSubmittedError(false);setSelectedTechnology(item.technology);setPreview(false)}} className="fa fa-edit mr-2"></i> */}
      <i  onClick={e=>{Navigate.push(`/addeditproject/${item.id}`)}} className="fa fa-edit mr-2"></i>

      <i  className="fa fa-eye gogl mr-2" data-toggle="modal" data-target="#exampleModal" onClick={e=>{setProtofolioError1(false);setEditid(item.id);setView(true); setEditData(item);setEdit(true);setimages1(item.documents);setSelectedSkills(item.skills);setSubmittedError(false);setSelectedTechnology(item.technology)}}></i>
      <i className="fa fa-trash text-danger" onClick={e=>HandleProjectDelete(item.id)}></i>
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
                </section>

 

   <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{Edit?View?"View":"Update":"Add"} Job Post</h5>
        <button type="button" class="close" id="closeprojectmodal" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <Formik
      enableReinitialize 
      initialValues={{
        name:Edit?EditData.name:"",
        description:Edit?EditData.description:"",
        documents:[],
        technology:Edit?EditData.technology:"",
        startDate:Edit?EditData.startDate:"",
        endDate:Edit?EditData.endDate:"",
        allowedHours:Edit?EditData.allowedHours:""
      }}
      onSubmit={(values,{resetForm})=>{  
        setSubmittedError(true);
        const payload={id:Editid,name:values.name,description:values.description,technology:SelectedTechnology,startDate:values.startDate,endDate:values.endDate,documents:images1,skills:SelectedSkills,allowedHours:values.allowedHours}
        let method="post";
  if(Edit){
    method="put";
  }else{
    delete payload.id;
  }
  if(payload.skills.length==0||payload.technology.length==0) return false
  if(payload.documents&&payload.documents.length==0){
setProtofolioError1(true)
return  false
  }else{
    setPreviewData({...payload});
    {if(!Edit&&!Preview){
      setPreview(true)
    }else{ 
        loader(true);
         ApiClient.allApi("project",payload,method).then(Res=>{
          if(Res.success){
            document.getElementById("closeprojectmodal").click();
            GetAllProjects(); 
            if(method=="post"){setPreview(true);}else{setPreview(false);}
            toast.success(Res.message);
            resetForm();
            setPreview(false);
          } 
           loader(false);
        })}
      }
      }
      }}
      >{({values,handleChange,handleSubmit,handleBlur})=>(
      <form onSubmit={handleSubmit}>
      <div class="modal-body"> 
      {/* {View?<i className="fa fa-edit text-info float-end" onClick={e=>setView(false)}></i>:null} */}
      <div className="row">
        {!Preview? <>
      <div className="col-md-6">
            <div className="form-group">
            <label htmlFor="">Title</label>
            <input type="text" required disabled={View} name="name" value={values.name} onChange={handleChange} className="form-control" />
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group mt-3">
            <label htmlFor="">Skill Type</label>
      <p>{EditData.skillType&&EditData.skillType.name}</p>
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
            <label htmlFor="">Skills</label>
            <Multiselect
            displayValue="name"
            options={SkillsData} 
            disable={View}
            required
            placeholder="Select Skills"
            selectedValues={SelectedSkills}
            onSelect={e=>setSelectedSkills(e)}
            onRemove={e=>setSelectedSkills(e)}
            />
            {SubmittedError&&SelectedSkills.length==0?<p className="text-danger ml-2 mt-1">Skills are Required</p>:null}
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group mt-3">
            <label htmlFor="">Hourly Rate</label>
            <p>${EditData.hourlyratestart} - ${EditData.hourlyrateEnd}</p>
            {/* <input type="date" required disabled={View} className="form-control" value={values.startDate} name="startDate" onChange={handleChange} /> */}
            </div>
        </div>
        {/* <div className="col-md-6">
            <div className="form-group">
            <label htmlFor="">Category</label>
            <p className="text-capitalize">{EditData.categoryDetail&&EditData.categoryDetail.name}</p>
            </div>
        </div> */}
        {/* <div className="col-md-6">
            <div className="form-group">
            <label htmlFor="">Speciality</label>
            <p className="text-capitalize">{EditData.specialtyDetail&&EditData.specialtyDetail.name}</p>
             </div> 
        </div>      */}
          {/* <div className="col-md-6">
            <div className="form-group">
            <label htmlFor="">Weekly Hours Allowed</label>
            <input type="number" required disabled={View} className="form-control" value={values.allowedHours} name="allowedHours"  onChange={handleChange}  />
            </div> 
        </div>    */}
            <div className="col-md-12">
            <div className="form-group">
            <label htmlFor="">Description</label>
            <textarea type="text" required disabled={View} className="form-control" value={values.description} name="description" onChange={handleChange} ></textarea>
            </div>
        </div>
        <div className="col-md-12 mt-3">
            <div className="col-md-12">
                              <label>Upload Documents</label>
                             {View?null: <div className={`profile_btn_portfolio `}>
                                <label className="add_portfolio edit ml-3">
                                  <input
                                    id="bannerImage"
                                    type="file"
                                    multiple={true}
                                    className="d-none"
                                    // accept="image/*"
                                    onChange={(e) => imageResult(e)}
                                  />
                                  <span className="add_portfolio">
                                    <i class="material-icons add_port">add</i>
                                  </span>
                                </label>
                              </div>}
                            </div>


                            <div>
                              <br />
                              <div class="imagesRow ml-3">
                                {DoumentUploadLoading == true ? (
                                  <div className="text-success">
                                    Uploading...{" "}
                                    <i className="fa fa-spinner fa-spin"></i>
                                  </div>
                                ) : (
                                  images1.map((item, index) => (
                                    <div>
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
                                     {View?null:  <i
                                          className="fa fa-trash text-danger shadow-danger delet_icon"
                                          style={{ cursor: "pointer" }}
                                          onClick={(e) =>
                                            HanldDocumentDelete(e, index)
                                          }
                                        ></i>}
                                      </p>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                            {ProtofolioError1&&images1.length==0 ? (
                              <div className="text-danger text-center mt-3 ml-5">
                                Please  Upload Documents {" "}
                              </div>
                            ) : null}
                          </div>
                          </>:<>   <div className='col-md-12 border-top border-bottom mt-3 pt-3 mb-3 pb-3'>
                    <div className='d-flex justify-content-between align-items-baseline'>
                    <div className='d-flex'>
                        {/* <img src={`${!item.addedByDetail&&item.addedByDetail==""?"/assets/img/person.jpg":methodModel.userImg(item.addedByDetail&&item.addedByDetail.image)} `} className='user_img'  /> */}
                        <div className='product_details'>
                        <p className='mb-4'><b className='text-primary font-weight-bold text-capitalize pointer'><a>{user.fullName}</a></b></p>
                          <p>Hourly -Intermediate-Est. Time less then 1 month, {values.allowedHours}hrs/week - posted just now </p>  
                       
                        <div className='d-flex'>
                        <b>${user.hourlyRate} </b> <span className='ml-2 mr-5' >/ hrs</span>
                           
                        </div>
                         {/* <span class="material-icons">location_on</span><b>{item.addedByDetail&&item.addedByDetail.country}</b> */}
                        <p className='  mb-0'>{values.description}</p>
                        <div className='badges_project'>
                          {SelectedSkills.map((item)=><span>{item.name}</span>)}
                            {/* <span>Jquery</span>
                            <span>JavaScript</span> */}
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
                </div></>}
        

        <div className="col-md-12 text-right mt-3"> 
            {Preview?<button type="button" className="mr-2 btn btn-primary" onClick={e=>{setGoArray([...GoArray,{Godd:""}]); setPreview(false)}}>Edit</button>:null}
            {View?null: Edit?<button type="submit" className="btn btn-primary">Submit</button>:!Preview?<button type="submit"  className="btn btn-primary">Preview</button>:<> <button type="submit"  className="btn btn-primary">Submit</button> </>}
        </div>
      </div>
      </div>
      </form>)} 
      </Formik>
    </div>

    {/*  This is the Modal for Showing the Listing  */} 

  </div>
</div>
 
    </>
  );
};

export default Html;
