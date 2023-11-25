import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import loader from "../../methods/loader";
import ApiClient from "../../methods/api/apiClient";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./style.scss";
import environment from "../../environment";
export default function SignUp() {
  const params = new URLSearchParams(window.location.search);
  const showrole = params.get("role");
  const [email,setemail]=useState("")
  const navigate = useHistory();
  const Virtual = "64e83a928599356bddc2fa00";
  const employeerid = "64e5cdfc5bb9a041a39046d5";
  const [role, setrole] = useState(employeerid);
  useEffect(() => {
    if (showrole == "virtual") {
      document.getElementById("profile-tab").click();
      setrole(Virtual);
    } else {
      document.getElementById("home-tab").click();
      setrole(employeerid);
    }
  }, []);
  
  const [eyes, setEyes] = useState({
    password: false,
    confirmPassword: false,
    currentPassword: false,
  });
  const [form, setForm] = useState({ id: "" });
  const [DoumentUploadLoading, setDocumentUploadLoading] = useState(false);
  const [images, setimages] = useState([]);
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

  const HandleCLickhere=(e)=>{
    e.preventDefault();
    loader(true)
    ApiClient.post(`resend/verification`,{email:email}).then(response => {
      if(response.success){
        toast.success(response.message)
      }
      loader(false);
    })
  }

  return (
    <div className="bg_img">
      <div className="main_signup">
      <div className="tab_clas ml-auto">
              <ul className="d-none"
                class="nav nav-tabs tabs mb-2 mt-4 justify-content-end mr-4 d-flex signup_tab"
                id="myTab"
                role="tablist"
              >
                <li class="nav-item  d-none" role="presentation">
                  <button
                    class="nav-link signuptab active "
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home"
                    type="button"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                    onClick={(e) =>{ setrole(employeerid);document.getElementById("resetForm").click()}}
                  >
                    Employer
                  </button>
                </li>
                <li class="nav-item d-none " role="presentation">
                  <button
                    class={`nav-link signup-tab_cls`}
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile"
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                    onClick={(e) => {setrole(Virtual);document.getElementById("resetForm").click()}}
                  >
                    Virtual Assistant
                  </button>
                </li>
              </ul>
            </div>
        <div className="row align-items-center justify-content-center ">
          <div className="col-md-12 p-0 ">
            <div className="top_section">
              <div className="right_side">
                <Link to="/"><div className="logo_image mb-3">
                  <img src="/assets/img/Logo_new.png" className="logo_name" />
                </div></Link>

                <Formik
                  enableReinitialize
                  initialValues={{
                    email: "",
                    firstname: "",
                    lastname: "",
                    password: "",
                    role: "",
                    check: "",
                  }}
                  onSubmit={(values,{resetForm}) => {
                    const payload = {
                      email: values.email,
                      password: values.password,
                      firstName: values.firstname,
                      lastName: values.lastname,
                      fullName: `${values.firstname} ${values.lastname}`,
                      role: role,
                      document: images,
                    };

                    console.log("values", values);
                    if (!values.check.length) {
                      toast.error(
                        "Please Accepted The Terms Of Use And Privacy Policy"
                      );
                      return;
                    }

                    loader(true);
                    ApiClient.post(`register`, payload).then((res) => {
                      
                      if (res.message) {
                        setemail(payload.email)
                        document.getElementById("openSigupmodal").click();
                        resetForm()
                        // navigate.push("/login?message=" + res.message);
                      }
                      loader(false)
                    });
                  }}
                >
                  {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    resetForm,
                  }) => (
                    <form className="centerLogin" onSubmit={handleSubmit}>
                      <div className="text-center mb-2">
                        <h3 className="text-center lgtext">
                          Create your account.
                        </h3>
                        <p className="accopunt text-center">
                          Already have an account?{" "}
                          <Link class="sign_up" to="/login">
                            {" "}
                            Sign In
                          </Link>
                        </p>
                      </div>

                      {/* tab */}
        
                      <div class="tab-content mt-3" id="myTabContent">
                        <div
                          class="tab-pane fade show active"
                          id="home"
                          role="tabpanel"
                          aria-labelledby="home-tab"
                        >
                          <div className="">
                            <label className="form-label ml-2">
                              Email<span className="text-danger">*</span>
                            </label>
                            <input
                              type="email"
                              value={values.email}
                              required
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Email Address"
                              className="form-control bginput chnages"
                            />

                            <div className="row mt-3">
                              <div className="col-md-6">
                                <label className="form-label ml-2">
                                  First Name
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={values.firstname}
                                  required
                                  name="firstname"
                                  placeholder="First Name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="form-control bginput chnages"
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="form-label ml-2">
                                  Last Name
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={values.lastname}
                                  required
                                  name="lastname"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  placeholder="Last Name"
                                  className="form-control bginput chnages"
                                />
                              </div>
                            </div>

                            <div className="col-md-12 p-0 mt-3 inputWrapper">
                              <label className="form-label ml-2">
                                Password<span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control mb-0 bginput chnages"
                                type={!eyes.password ? "password" : "text"}
                                required
                                value={values.password}
                                name="password"
                                minLength="8"
                                onChange={handleChange}
                                placeholder="Password"
                                onBlur={handleBlur}
                              />
                              <i
                                className={
                                  eyes.password
                                    ? "fa fa-eye eyeicon"
                                    : "fa fa-eye-slash slashicon"
                                }
                                onClick={() =>
                                  setEyes({ ...eyes, password: !eyes.password })
                                }
                              ></i>
                            </div>
                            
                            <div className="mt-4 d-flex align-items-baseline">
                              <input
                                type="checkbox"
                                className="checkBox"
                                name="check"
                                onChange={handleChange}
                              />
                              <label className="clickBox ml-2 mb-0">
                                By clicking Create account, I agree that I have
                                read and accepted the Terms of Use and Privacy
                                Policy.
                              </label>
                            </div>
                            <div>
     
                              <button
                                type="submit" 
                                className="btn btn-primary loginclass mt-3"
                              >
                                Sign Up
                              </button>
                            </div>

                            <div className="borderCls mt-3">
                              <span className="or">or</span>
                            </div>
                            <div className="text-center d-flex justify-content-center mt-3 mb-3">
                              <a className="btn btn-outline google_id mr-3 ">
                                <img src="/assets/img/gogle.png" />
                                <span className="google_heading"></span>
                              </a>
                              <a className="btn btn-outline google_id">
                                <img src="/assets/img/facebooklogo.png" />
                                <span className="google_heading"></span>
                              </a>
                            </div>
                            {/* <div className="text-center mt-2"><p className="text-primary sign_users" onClick={e=>  document.getElementById("profile-tab").click()}>Sign up as a Virtual Assistant</p></div> */}
                          </div>
                        </div>
                        <div
                          class="tab-pane fade"
                          id="profile"
                          role="tabpanel"
                          aria-labelledby="profile-tab"
                        >
                          <div className="">
                            <label className="form-label ml-2">
                              Email<span className="text-danger">*</span>
                            </label>
                            <input
                              type="email"
                              value={values.email}
                              required
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Email Address"
                              className="form-control bginput chnages"
                            />

                            <div className="row mt-3">
                              <div className="col-md-6">
                                <label className="form-label ml-2">
                                  First Name
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={values.firstname}
                                  required
                                  name="firstname"
                                  placeholder="First Name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="form-control bginput chnages"
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="form-label ml-2">
                                  Last Name
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={values.lastname}
                                  required
                                  name="lastname"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  placeholder="Last Name"
                                  className="form-control bginput chnages"
                                />
                              </div>
                            </div>

                            <div className="col-md-12 p-0 mt-2 inputWrapper">
                              <label className="form-label ml-2">
                                Password<span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control mb-0 bginput chnages"
                                type={!eyes.password ? "password" : "text"}
                                required
                                value={values.password}
                                name="password"
                                minLength="8"
                                onChange={handleChange}
                                placeholder="Password"
                                onBlur={handleBlur}
                              />
                              <i
                                className={
                                  eyes.password
                                    ? "fa fa-eye eyeicon"
                                    : "fa fa-eye-slash slashicon"
                                }
                                onClick={() =>
                                  setEyes({ ...eyes, password: !eyes.password })
                                }
                              ></i>
                            </div>

                            {/* {user.role &&
                      user.role.id == "64e83a928599356bddc2fa00" ? (
                        <>
                          {" "} */}

                            <br />
                            <button
                              onClick={resetForm}
                              type="button"
                              id="resetForm"
                              className="d-none"
                            >
                              {" "}
                            </button>


                            {/* <div className="col-md-12">
                              <label>National Id</label>
                              <div className="d-flex">
                              <div className={`profile_btn_portfolio mt-0`}>
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
                              <div class="imagesRow ml-3 mt-3">
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
                            </div> */}

                            
                            <div> 
                              
                            </div>
                            {ProtofolioError ? (
                              <div className="text-danger text-center mt-3 ml-5">
                                Please enter Url or Upload Documents{" "}
                              </div>
                            ) : null}
                            {/* </>
                      ) : null} */}
                                 
                            <div>
                              <div className="mt-1 d-flex align-items-baseline">
                                <input
                                  type="checkbox"
                                  className="checkBox"
                                  name="check"
                                  onChange={handleChange}
                                />
                                <label className="clickBox ml-2 mb-0">
                                  By clicking Create account, I agree that I
                                  have read and accepted the Terms of Use and
                                  Privacy Policy.
                                </label>
                              </div>
                              <button
                                type="submit"
                                className="btn btn-primary loginclass mt-3"
                              >
                                Sign Up
                              </button>
                            </div>

                            <div className="borderCls mt-3">
                              <span className="or">or</span>
                            </div>
                            <div className="text-center d-flex justify-content-center mt-3 mb-3">
                              <a className="btn btn-outline google_id mr-3 ">
                                <img src="/assets/img/gogle.png" />
                                <span className="google_heading"></span>
                              </a>
                              <a className="btn btn-outline google_id">
                                <img src="/assets/img/facebooklogo.png" />
                                <span className="google_heading"></span>
                              </a>
                            </div>
                            {/* <div className="text-center mt-2"><p className="text-primary sign_users" onClick={e=>document.getElementById("home-tab").click()}>Sign up as a Employer</p></div> */}
                          </div>
                        </div>
                      </div>

                      {/* end tab */}
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div> 
      <button data-toggle="modal" className="d-none" data-target="#exampleModal" id="openSigupmodal"></button>
      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content"> 
      <div className="modal-body"> 
      <div className="text-center p-3">
        <img src="assets/img/success.png" alt="success" className="iconSignup" />
        <div className="modal-body pb-3">
            <h2 className="glad">Glad you'll be joining us!  
            </h2>
            <h2 className="glad mb-4">You're almost there, verify your email.</h2>
            <h4 className="glads "><b>Next Step:</b> Verify Your Email. We’ve sent you an email. Click the link in the email to continue setting up your account.</h4>
            
        </div>
        <button type="button" className="btn btn-primary pl-5 pr-5 mb-3" data-toggle="modal" data-target="#exampleModal" >OK</button>
        <p className="mt-2">Didn’t receive an email? <a className="text-primary" onClick={e=>HandleCLickhere(e)}>Click Here.</a></p>
        <p className="mt-2 mb-0">Be sure to check your spam and promotions folders if you don’t see your verification email shortly.
        </p>
    </div>
      </div> 
    </div>
  </div>
</div>
    </div>
    
  );
}
