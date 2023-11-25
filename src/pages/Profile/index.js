import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/global/layout";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import "./profile.scss";
import { useDispatch, useSelector } from "react-redux";
import methodModel from "../../methods/methods";
import AddEditEducation from "../../pages/Education/AddEditEducation";
import EducationDetail from "../Education/Educationdetail";
import EmploymentDetail from "../Employment/Employmentdetail";
import AddEditEmployment from "../Employment/AddEditEmployment";
import moment from "moment";
import { toast } from "react-toastify";
import environment from "../../environment";
import AddEditSkills from "../SkillsType/AddEditSkills";
import Portfolio from "../Portfolio";
import Resume from "../Resume";
import parse from 'html-react-parser'
import CompanyDetail from "../CompanyDetail";
import VideoModal from "./VideoIntroduction/VideoModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { login_success } from "../../actions/user";

const Profile = () => {
  const dispatch=useDispatch()
  let user = useSelector((state) => state.user);
  const [SkillsEditID, setSkillsEditID] = useState(null);
  const [UpdateState,setUpdateState]=useState("");
  const [PortfolioEditID, setPortfolioEditID] = useState(null);
  const [ResumeEditID, setResumeEditID] = useState(null);
  const [data, setData] = useState("");
  const [MyResume,setMyResume]=useState(null)
  const [time,settime]=useState(new Date());
  // useEffect(()=>{
  //  user=useSelector(state=>state.user)
  // },[time])
const Navigate=useHistory();
  const gallaryData = () => {
    loader(true);
    ApiClient.get(`profile`, { id: user.id }).then((res) => {
      if (res.success) {
        setData(res.data);
        const data=res.data;
        const newdata={...user,...data,skillType:data.skillType&&data.skillType.id} 
        dispatch(login_success(newdata));
      }
      loader(false);
    });
  };

  useEffect(() => {
    if (user && user.loggedIn) {
      gallaryData();
    }
  }, []);

  const [EducationData, setEducationData] = useState([]);
  const [EducationId, setEducationId] = useState(null);

  const [EmploymentData, setEmploymentData] = useState([]);
  const [EmploymentId, setEmploymentId] = useState(null);
  const [EmployeementViewId, setEmployeementViewId] = useState(null);

  const [SkillData, setSkillData] = useState([]);
  const [SkillId, setSkillId] = useState(null);
  const [SkillViewId, setSkillViewId] = useState(null);

  const [EducationViewId, setEducationViewId] = useState(null);

  const GetEducationData = () => {
    loader(true);
    ApiClient.get(`educations`).then((res) => {
      if (res.success) {
        setEducationData(res.data);
        loader(false);
      }
    });
  };

  const GetEmployementData = () => {
    loader(true);
    ApiClient.get(`employments`).then((res) => {
      if (res.success) {
        setEmploymentData(res.data);
        loader(false);
      }
    });
  };

  useEffect(() => {
    GetEducationData();
    GetEmployementData();
    // ViewEducationData()
  }, []);

  const EducationDelete = (id) => {
    if (window.confirm("Do you want to delete this")) {
      loader(true);
      ApiClient.delete(`delete?model=education&id=${id}`).then((response) => {
        if (response.success) {
          toast.success(response.message);
          GetEducationData();
        }
      });
    }
  };

  const EmploymentnDelete = (id) => {
    if (window.confirm("Do you want to delete this")) {
      loader(true);
      ApiClient.delete(`delete?model=employment&id=${id}`).then((response) => {
        if (response.success) {
          toast.success(response.message);
          GetEmployementData();
        }
      });
    }
  };

  //  FOr Closing the modal of Skills
  const CloseSkillModal = () => {
    document.getElementById("closeskillModal").click();
  };

  const ClosePortfolioModal = () => {
    document.getElementById("closeskillModal").click();
    setUpdateState(user);
    setData(user)
  };

  const CloseResumeModal = () => {
    document.getElementById("resumekillModal").click();
  };




      //  for Document 
      const [DoumentUploadLoading, setDocumentUploadLoading] = useState(false);
      const [images, setimages] = useState(user.document);
      const [ProtofolioError, setProtofolioError] = useState(false);
      // const [DoumentUploadLoading, setDocumentUploadLoading] = useState(false);
      const [documents, setdocuments] = useState([]);
    
      //  For Deleting the Document
      const HanldDocumentDelete = (e, index) => {
        e.preventDefault();
        const array = [...images];
        array.splice(index, 1);
        setimages(array);
      };
    
      const imageResult = (e) => {
        if (e.target.files.length > 0) {
    
          const files = e.target.files;
          const newdata = new FormData();
          let newarray = images;
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
                if(files.length==images.length){
                  setDocumentUploadLoading(false)
                }
              } else {
                setDocumentUploadLoading(false);
                // toast.error({ message: "Some error Occurred ! Try Again!" });
              }
            });
            
            i++;
    
          }
          setProtofolioError(false);
          setdocuments(newarray);
          setimages(newarray);
        } else {
          // toast.error({ message: "Please Upload the Documents" });
        }
      };
    
      const HandleDocumentSubmit=(e)=>{
        e.preventDefault()
        if(images.length!=0){
          loader(true);
          ApiClient.put('edit/profile',{document:images,id:user.id}).then(res=>{
          if(res.success){
            const data={...user,document:images};
dispatch(login_success(data));
document.getElementById("closeDocumnet").click()
          toast.success("Documents Submitted Successfully");
        }
        loader(false)
        })
      }else{
        toast.error("Please Upload Documents")
      }
      }
  return (
    <Layout>
      <div className="pprofile1">
        <div className="d-flex justifycontent align-items-center mb-3"> 
          <h3 className="ViewUser mb-0">Basic Information</h3> 
          {user.document&&user.role && user.role.id == "64e83a928599356bddc2fa00"&&user.document.length==0?<p className="text-danger bg_danger">Please upload the verification document to get started with the process of verification. </p>:null}
          {user.document&&user.document.length>0&&user.role && user.role.id == "64e83a928599356bddc2fa00"&&user.isVerifiedDocument!="accepted"?<p className="text-danger bg_danger">Thanks for uploading the document, Your account is under review and  verification process will be completed shortly.</p>:null}
        </div>
{ user.isVerifiedDocument=="rejected"?<div className="text-center text-danger" ><p style={{fontSize:"17px"}}> Reason for Rejection: {user.reason}</p></div>:null}
        <div className="main_profile_page">
          <div className="row">
            
            <div className="col-md-4">
            <div className="education_name">
                      <div className="mb-2">
                        <h5 className="education_heading">
                          <span className="span_changes">Skills</span>
                        </h5>
                      </div>

                      <div className="d-flex ">
                        {user.skills && user.skills.length == 0 ? (
                          <div
                            className="add_icon"
                            onClick={(e) => setSkillsEditID(null)}
                            data-toggle="modal"
                            data-target="#skillsAdd"
                          >
                            <i class="material-icons new_icons">add_circle </i>
                          </div>
                        ) : (
                          <div
                            className="add_icon"
                            data-toggle="modal"
                            data-target="#skillsAdd"
                            onClick={(e) => setSkillsEditID(new Date())}
                          >
                            <i class="material-icons new_icons">mode_edit</i>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="multi_skills">
                      {user.skills &&
                        user.skills.map((item, index) => (
                          <div className="education_name_news">
                            <div>
                              <div className="headings">
                                <h5 className="tital_heading">{item.label}</h5>
                              </div>
                            </div> 
                          </div>
                        ))}
                        <br/>
                        <div className="text-right">
                        {user.skills&&user.skills.length>0&&user.role&&user.role.id=="64e83a928599356bddc2fa00"?<button onClick={e=>Navigate.push("/assessments")} className="btn btn-primary startTest p-1 pl-2 pr-2 mb-1" style={{cursor:"pointer"}}>Start Test</button>:null}
                        </div>
                        <hr />
                        <div className="mb-3">
                        <h5 className="education_heading">
                          <span className="span_changes"> Other Skills</span>
                        </h5>
                      </div> 
                            {user.otherSkills &&
                        user.otherSkills.map((item, index) => (
                          <div className="education_name_news">
                            <div>
                              <div className="headings">
                                <h5 className="tital_heading">{item}</h5>
                              </div>
                            </div> 
                          </div>
                        ))}
                    </div>
            {user.role && user.role.id == "64e83a928599356bddc2fa00" ? (
                <div className="right_profile">
                  <div>
                  <div className="education">
                  <div className="education_name">
                      <div className="mb-2">
                        <h5 className="education_heading">
                          <span className="span_changes">Upload Documents</span>
                        </h5>
                      </div>

                      <div className="d-flex ">
                       
                        
                      
                          <div
                            className="add_icon"
                            data-toggle="modal"
                            data-target="#documents" 
                          >
                            <i class="material-icons new_icons">mode_edit</i>
                          </div> 
                      </div>
                      </div>
                      <div className="row">
                      {user.document&&user.document.map((item, index) => (
                                    <div className="col-md-3">
                                      <p className="text-capitalize">
                                        <img
                                          style={{ cursor: "pointer" }}
                                          
                                          className="document_image w-100"
                                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5kekkj6iYr_ZSKfB7GRWEJ4q-7_2sruMm5Hbc2haxduVzPhmc1kS-7OKKJDI1FjTEVAg&usqp=CAU"
                                          onClick={(e) =>
                                            window.open(
                                              `${environment.api}images/document/${item}`
                                            )
                                          }
                                        />
                                     
                                      </p>
                                    </div>
                                  ))}
                        </div>
                   

              
                  </div>
                  <hr />
                  <div className="d-flex mb-2">
                    <h5 className="education_heading">
                      <span className="span_changes">Education</span>
                    </h5>
                    <div
                      className="add_icon"
                      onClick={(e) => setEducationId(null)}
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      <i class="material-icons new_icons_add">add_circle</i>
                    </div>
                  </div> 
                  <div className="multi_skills">
                    {EducationData.length>0&&EducationData.map((item, index) => (
                      <div className="education scroll_clas">
                        <div className="education_name">
                          <div></div>
                          <div></div>

                          <div className="d-flex "></div>
                        </div>

                        <div className="education_name_new">
                          <div className="data_edit">
                            <div>
                              <h5 className="education_heading">
                                {item.degree}
                              </h5>
                            </div>

                            <div className="edit_studies">
                            <a  class="  dropdown-toggle afterCls" data-toggle="dropdown" aria-expanded="false">
                            <span class='material-icons'>more_horiz</span>
                          </a>
                          <div class="dropdown-menu"> 
                          
                              <div
                                className="dropdown-item"
                                data-toggle="modal"
                                data-target="#exampleModal"
                                onClick={(e) => setEducationId(item.id)}
                              >
                                <i class="fa fa-edit eye">
                                   
                                </i> Edit
                              </div>
                              <div
                                className="dropdown-item"
                                onClick={(e) => EducationDelete(item.id)}
                              >
                                <i class="fa fa-trash eye"> </i> Delete
                              </div>
                              <div
                                className="dropdown-item"
                                data-toggle="modal"
                                data-target="#educationView"
                                onClick={(e) => setEducationViewId(item.id)}
                              >
                                <i class="fa fa-eye eye" aria-hidden="true"></i> View
                              </div>
                            </div>
                            </div>
                          </div>

                          <div>
                            {/* <h5 className="education_heading">{item.degree}</h5> */}
                            <p className="about_school mb-2">{item.school}</p>
                            <p className="about_school text-truncate">{item.description}</p>
                            <p className="about_school_year mt-2">
                              {moment(item.startDate).format("YYYY")}-
                              {moment(item.endDateDate).format("YYYY")}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <hr />

                  {/* <div className="multi_data">
 <a class="view_All_data" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
See More
  </a>

<div class="collapse" id="collapseExample">
  <div class="card card-body">
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  </div>
</div>
  </div> */}
                  <div className="education">
                    <div className="education_name">
                      <div>
                        <h5 className="education_heading">
                          <span className="span_changes">
                            Employment History
                          </span>
                        </h5>
                      </div>

                      <div className="d-flex ">
                        <div
                          className="add_icon"
                          onClick={(e) => setEmploymentId(null)}
                          data-toggle="modal"
                          data-target="#employmentAdd"
                        >
                          <i class="material-icons new_icons_add">add_circle </i>
                        </div>
                      </div>
                    </div>
                    <div className="multi_skills">
                      {EmploymentData?.length>0&&EmploymentData.map((item, index) => (
                        <div className="education_name_new">
                          <div className="data_edit">
                            <div className="headings">
                              <h5 className="education_heading">
                                {item.company}
                              </h5>

                              <h5 className="education_heading">
                                {item.country}
                              </h5>
                            </div>
                            <div className="edit_studies">

                            <a  class="  dropdown-toggle afterCls" data-toggle="dropdown" aria-expanded="false">
                            <span class='material-icons'>more_horiz</span>
                          </a>
                          <div class="dropdown-menu"> 
                          
                        
                              <div
                                className="dropdown-item"
                                data-toggle="modal"
                                data-target="#employmentAdd"
                                onClick={(e) => setEmploymentId(item.id)}
                              >
                                <i class="fa fa-edit eye"> 
                                </i> Edit
                              </div>
                              <div
                                className="dropdown-item"
                                onClick={(e) => EmploymentnDelete(item.id)}
                              >
                                <i class="fa fa-trash eye"> </i> Delete
                              </div>

                              <div
                                className="dropdown-item"
                                data-toggle="modal"
                                data-target="#employmentView"
                                onClick={(e) => setEmployeementViewId(item.id)}
                              >
                                <i class="fa fa-eye eye" aria-hidden="true"></i> View
                              </div>
                              </div>
                            </div>
                          </div>

                          <p className="about_school_year">
                            {moment(item.startDate).format("YYYY")}-
                            {item.currentlyWorking
                              ? "---"
                              : moment(item?.endDateDate).format("YYYY")}
                          </p>
                          <p className="about_school text-truncate">{item.description}</p>
                        </div>
                      ))}
                    </div>
                    {/* <div className="multi_data">
                      <a
                        class="view_All_data"
                        data-toggle="collapse"
                        href="#collapseExample1"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        See More
                      </a>

                      <div class="collapse" id="collapseExample1">
                        <div class="card card-body">
                          Anim pariatur cliche reprehenderit, enim eiusmod high
                          life accusamus terry richardson ad squid. Nihil anim
                          keffiyeh helvetica, craft beer labore wes anderson
                          cred nesciunt sapiente ea proident.
                        </div>
                      </div>
                    </div> */}
                  </div>

                  <hr/>
                  <div className="education ">
                    <div className="education_name">
                      <div>
                        <h5 className="education_heading">
                          <span className="span_changes">
                           Video   Introduction
                          </span>
                        </h5>
                      </div>

                      <div className="d-flex ">
                        <div
                          className="add_icon" 
                          data-toggle="modal"
                          data-target="#videoAdd"
                        >
                          {user.introLink==""&&user.introVideo==""?<i onClick={e=>setUpdateState(new Date())}  class="material-icons new_icons">add_circle </i>:<i class="material-icons new_icons">
                                  mode_edit
                                </i>}
                        </div>
                      </div>
                    </div>
                {user.introVideo==""&&user.introLink==""?null:    <div className="multi_skills"> 
                        <div className="">
                          <div className="">
                            <div className="about_school">
                          <label className="form-label mt-3">Video Url</label>
                          <div>
                          <p className="profile_data text-primary">{user.introLink}</p>
                          </div>
                            </div>
                            <div className="mt-3">
                          <label>Video</label>
                          <div >
{user.introVideo==""?null:<video className="video_style w-100" width={300} height={120} src={environment.api+"images/videos/"+user.introVideo} controls/>
}                          </div>
                          {/* <p>{user.introVideo}</p> */}
                            </div>
                            
                       
                          </div>
                        </div> 
                    </div> }
                  </div>
                </div>
             </div> 
            ) : null}
            </div>

            <div className="col-md-8">
              <div className="profile_img_side">
                <img
                  src={methodModel.userImg(data && data.image)}
                  className="profileImage"
                />

                <Link
                  to="/profile/edit"
                  className="btn btn-primary profiles_edit"
                  Title="Edit Profile"
                >
                  Edit Profile
                  {/* <i className="fa fa-edit" title='Edit Profile' /> */}
                </Link>
              </div>
              <div className="right_profile mt-3">
                <div className="row">
                  <div className="col-md-6">
                    <label className="label_profile">Name</label>
                    <div>
                      <p className="profile_data">{data && data.fullName}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="label_profile">Email</label>
                    <div>
                      <p className="profile_data">{data && data.email}</p>
                    </div>
                  </div>
                  <div className="col-md-6 mt-1">
                    <label className="label_profile">Role</label>
                    <div>
                      <p className="profile_data">{data && data.role.name}</p>
                    </div>
                  </div>
                     <div className="col-md-6 mt-1">
                    <label className="label_profile">TimeZone</label>
                    <div>
                      <p className="profile_data">{data && data.timeZone&&data.timeZone.label}</p>
                    </div>
                  </div>
                  <div className="col-md-6 mt-1">
                    <label className="label_profile">Address</label>
                    <div>
                      <p className="profile_data">{data && data.address}</p>
                    </div>
                  </div>
                  <div className="col-md-6 mt-1">
                    <label className="label_profile">Mobile No</label>
                    <div>
                      <p className="profile_data">
                        {data && data.dialCode!=""?`(${data.dialCode})`:null}{data && data.mobileNo}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 mt-1">
                        <label className="label_profile">HourlyRate</label>
                        <div>
                          <p className="profile_data">
                            ${data && data.hourlyRate}
                          </p>
                        </div>
                      </div>
                  {user.role && user.role.id == "64e83a928599356bddc2fa00" ? (
                    <>
                      {" "}
                      <div className="col-md-12 mt-1">
                        <label className="label_profile">Description</label>
                        <div>
                          <p className="profile_data">
                            {data && data.description}
                          </p>
                        </div>
                      </div>
                     
                    </>
                  ) : null}
                </div>
              </div>
{user.role&&user.role.id=="64e83a928599356bddc2fa00"? <>              <div className="right_profile mt-3">
                <div className="row">
                  <div className="col-md-12 text-right position-relative pr-4">
                    <div
                      className=""
                      data-toggle="modal"
                      data-target="#Portfoliomodal"
                    >
                      <i class="material-icons new_icons position-absolute">
                        mode_edit
                      </i>
                    </div>
                  </div>
                  <h5 className="education_heading border-bottom pb-3 ">Portfolio</h5>
                    
                  {user.portfolioUrl != "" ? (
                    <div className="col-md-12 mt-2">
                      <label className="label_profile">PortfolioUrl</label>
                      <div>
                        <p className="profile_data">
                          {user && user.portfolioUrl}
                        </p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {user.portfolioImage && user.portfolioImage.length != 0 ? (
                    <div className="col-md-12 mt-1">
                      <label className="label_profile"> Portfolio Documents</label>
                      <div>
                        <p className="profile_data">
                          {user.portfolioImage!="" &&
                            user.portfolioImage.map((item, index) => (
                              <img
                                style={{ cursor: "pointer" }}
                                width={40}
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5kekkj6iYr_ZSKfB7GRWEJ4q-7_2sruMm5Hbc2haxduVzPhmc1kS-7OKKJDI1FjTEVAg&usqp=CAU"
                                onClick={(e) =>
                                  window.open(
                                    `${environment.api}images/document/${item}`
                                  )
                                }
                              />
                            ))}
                        </p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

{/* resume */}

              <div className="right_profile mt-3">
                <div className="row">
                  <div className="col-md-12 text-right position-relative pr-4">
                    <div
                      className=""
                      data-toggle="modal"
                      data-target="#resumemodal"
                    >
                      <i class="material-icons new_icons position-absolute">
                        mode_edit
                      </i>
                    </div>
                  </div>
                  <h5 className="education_heading border-bottom pb-3">Resume</h5>
                  
                  {user.resume != "" ? (
                    <div className="col-md-12 mt-3">
                      <div>
                        <p className="profile_data">
                           {parse(`${user && user.resume}`)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {user.resumeDocument!=""? (
                    <div className="col-md-12 mt-1">
                      <label className="label_profile">Resume Document</label>
                      <div>
                        <p className="profile_data">
                          {/* {data && */}
                            {/* // data.resumeDocument.map((item, index) => ( */}
                              <img
                                style={{ cursor: "pointer" }}
                                width={40}
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5kekkj6iYr_ZSKfB7GRWEJ4q-7_2sruMm5Hbc2haxduVzPhmc1kS-7OKKJDI1FjTEVAg&usqp=CAU"
                                onClick={(e) =>
                                  window.open(
                                    `${environment.api}images/document/${user.resumeDocument}`
                                  )
                                }
                              />
                            {/* ))} */}
                        </p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div></>:
              <>
    <CompanyDetail/>
              </>
              }
            </div>
          </div>
        </div>
        <div className="form-row">
          {/* <div className="col-md-12 mb-3 inputFlex">
            <label>Image</label>
            <div>
              <label className="profileImageLabel">
                <img src={methodModel.userImg(data && data.image)} className="profileImage" />
              </label>
            </div>

          </div> */}
          {/* <div className="col-md-12 inputFlex">
            <label>Name</label>
            <div>
              <p className="profile_data">{data && data.fullName}</p>
            </div>

          </div> */}
          {/* <div className="col-md-6">
          <label>Role</label>
          <p className="bg-light rounded px-3 py-2">{data && data.role}</p>
        </div> */}

          {/* <div className="col-md-12 inputFlex">
            <label>Email</label>
            <div>
              <p className="profile_data">{data && data.email}</p>
            </div>

          </div> */}

          {/* <div className="col-md-12 inputFlex">
            <label>Role</label>
            <div>
            <p className="profile_data">{data && data.role.name}</p>
            </div>
          
          </div> */}

          {/* {data.mobileNo ? <div className="col-md-12 inputFlex">
            <label>Mobile No</label>
            <div>
              <p className="profile_data">{String(data && data.dialCode + data.mobileNo)}</p>
            </div>

          </div> : <></>} */}

          {/* <div className="col-md-12">
            <label>Created At</label>
            <p className="bg-light rounded px-3 py-2">{data && data.createdAt}</p>
          </div> */}
        </div>
      </div>

      {/* modal delete EducationId modal*/}

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header border-0 pt-0 pb-0">
              {/* <h5 class="modal-title" id="exampleModalLabel">Education</h5> */}
              <button
                type="button"
                class="close closeicon"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body pt-0">
              <AddEditEducation
                id={EducationId}
                GetEducationData={GetEducationData}
              />
            </div>
          </div>
        </div>
      </div>
      {/* end delete */}

      {/* --------------------------------------------------- ------*/}

      {/* modal delete EmploymentId modal*/}

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header border-0 pt-0 pb-0">
              {/* <h5 class="modal-title" id="exampleModalLabel">Education</h5> */}
              <button
                type="button"
                class="close closeicon"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body pt-0">
              <AddEditEducation
                id={EmploymentId}
                GetEmployementData={GetEmployementData}
              />
            </div>
          </div>
        </div>
      </div>
      {/* end delete EmploymentId*/}

      {/* --------------------------------------------------- ------*/}

      {/* modal education addedit*/}

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header border-0 pt-0 pb-0">
              {/* <h5 class="modal-title" id="exampleModalLabel">Education</h5> */}
              <button
                type="button"
                class="close closeicon"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body pt-0">
              <AddEditEducation
                id={EducationId}
                GetEducationData={GetEducationData}
              />
            </div>
          </div>
        </div>
      </div>
      {/* end education */}

      {/* --------------------------------------------------- ------*/}

      {/* modal education view*/}

      <div
        class="modal fade"
        id="educationView"
        tabindex="-1"
        role="dialog"
        aria-labelledby="educationViewLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header border-0 pt-0 pb-0">
              {/* <h5 class="modal-title" id="educationViewLabel">Education</h5> */}
              <button
                id="closeEducationmodal"
                type="button"
                class="close closeicon"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body pt-0">
              <EducationDetail Viewid={EducationViewId} />
            </div>
          </div>
        </div>
      </div>

      {/* end educationView */}

      {/* --------------------------------------------------- ------*/}

      {/* modal employment add*/}

      <div
        class="modal fade"
        id="employmentAdd"
        tabindex="-1"
        role="dialog"
        aria-labelledby="employmentAddLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header border-0 pt-0 pb-0">
              {/* <h5 class="modal-title" id="employmentAddLabel">Education</h5> */}
              <button
                type="button"
                id="closeEmploymentmodal"
                class="close closeicon"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body pt-0">
              <AddEditEmployment
                id={EmploymentId}
                GetEmployementData={GetEmployementData}
              />
            </div>
          </div>
        </div>
      </div>

      {/* end education*/}

      {/* --------------------------------------------------- ------*/}

      {/* end employmentView */}

      <div
        class="modal fade"
        id="employmentView"
        tabindex="-1"
        role="dialog"
        aria-labelledby="employmentViewLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header border-0 pt-0 pb-0">
              {/* <h5 class="modal-title" id="employmentViewLabel">Education</h5> */}
              <button
                type="button"
                class="close closeicon"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body pt-0">
              <EmploymentDetail ViewId={EmployeementViewId} />
            </div>
          </div>
        </div>
      </div>

      {/* end employmentView*/}

      {/* --------------------------------------------------- ------*/}

      {/* modal skills add*/}
      <div
        class="modal fade"
        id="skillsAdd"
        tabindex="-1"
        role="dialog"
        aria-labelledby="skillsAddLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header border-0 pt-0 pb-0">
              {/* <h5 class="modal-title" id="skillsAddLabel">Skills</h5> */}
              <button
                type="button"
                id="closeskillModal"
                class="close closeicon"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body pt-0">
              <AddEditSkills
                skillsEdit={SkillsEditID}
                CloseSkillModal={CloseSkillModal}
              />
            </div>
          </div>
        </div>
      </div>
      {/* end skillsadd*/}

      {/* --------------------------------------------------- ------*/}

      {/* modal Portfolio add*/}
      <div
        class="modal fade"
        id="Portfoliomodal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="PortfoliomodalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg " role="document">
          <div class="modal-content">
            <div class="modal-header border-0 pt-0 pb-0">
              {/* <h5 class="modal-title" id="PortfoliomodalLabel">Portfolio</h5> */}
              <button
                type="button"
                id="closePortfolio"
                class="close closeicon"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body pt-0">
              {/* <AddEditSkills
                portfolioEditID={PortfolioEditID}
                ClosePortfolioModal={ClosePortfolioModal}
              /> */}

              <Portfolio
                portfolioEditID={PortfolioEditID}
                ClosePortfolioModal={ClosePortfolioModal}
              />
            </div>
          </div>
        </div>
      </div>
      {/* end Portfolio*/}

      {/* ---------------------------------------------------------*/}


      

      <div
        class="modal fade"
        id="documents"
        tabindex="-1"
        role="dialog"
        aria-labelledby="ResumemodalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header border-0  d-flex">
            <h5 class="modal-title" id="PortfoliomodalLabel">Upload Document</h5> 
              <button
                type="button"
                id="closeDocumnet"
                class="close  "
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body pt-0">
            <div className="col-md-12 mt-3">
            <div className="col-md-12">
                              <label>National Id</label>
                              <div className={`profile_btn_portfolio `}>
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
                              </div>
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
                                  images.map((item, index) => (
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
                                        <i
                                          className="fa fa-trash text-danger shadow-danger delet_icon"
                                          style={{ cursor: "pointer" }}
                                          onClick={(e) =>
                                            HanldDocumentDelete(e, index)
                                          }
                                        ></i>
                                      </p>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                            {ProtofolioError ? (
                              <div className="text-danger text-center mt-3 ml-5">
                                Please enter Url or Upload Documents{" "}
                              </div>
                            ) : null}
                          </div>
                          <div className="text-right">
                          <button className="btn btn-primary" onClick={e=>HandleDocumentSubmit(e)}>Submit</button>
                          </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal resume add*/}
      <div
        class="modal fade"
        id="resumemodal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="ResumemodalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header border-0 pt-0 pb-0">
              <button
                type="button"
                id="closeResume"
                class="close closeicon"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body pt-0">
              <Resume
              setResume={setMyResume}
              Resume={MyResume}
                ResumeEditID={ResumeEditID}
                settime={settime}
                CloseResumeModal={CloseResumeModal}
              />
            </div>
          </div>
        </div>
      </div>
      {/* end resume*/}

{/* -------------------------------------------------- */}
      <div
        class="modal fade"
        id="videoAdd"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header border-0 pt-0 pb-0">
              <h3 class="ViewUser mt-3" id="exampleModalLabel"> Video and Audio Introduction</h3>
              <button
                type="button"
                class="close closeicon"
                id="closeVideomodal"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <VideoModal date={UpdateState}/>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
