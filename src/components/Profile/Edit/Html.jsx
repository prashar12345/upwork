import React, { useState } from "react";
import methodModel from "../../../methods/methods";
import { Link } from "react-router-dom";
import "./style.scss";
import Layout from "../../global/layout";
import Select from "react-select";
import { toast } from "react-toastify";
import ApiClient from "../../../methods/api/apiClient";
import { User } from "../../../methods/auth";
import { useSelector } from "react-redux";
import environment from "../../../environment";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import GooglePlaceAutoComplete from "../../common/GooglePlaceAutoComplete";
import addressModel from "../../../models/address.model";
import TimezoneSelect from 'react-timezone-select'


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
  setAddressSellected,
  addressSellected,
}) => {

  const [DoumentUploadLoading, setDocumentUploadLoading] = useState(false);
  const [documents, setdocuments] = useState([]);
  const user = useSelector((state) => state.user);


  const imageResult = (e) => {
    if (e.target.files.length > 0) {
      setDocumentUploadLoading(true);
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
        ApiClient.multiImageUpload("single/documents?modelName=document", {
          data: file,
        }).then((res) => {
          if (res.success) {
            console.log(res?.data?.imagePath, "THis is Image Path");
            const path = res?.data?.imagePath;
            newarray.push(path);
            original.push(path);
            setDocumentUploadLoading(false);
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
  //  For Deleting the Document
  const HanldDocumentDelete = (e, index) => {
    e.preventDefault();
    const array = [...images];
    array.splice(index, 1);
    setimages(array);
  };
  const addressResult = async (e) => {
    let address = {}
    if (e.place) {
      address = addressModel.getAddress(e.place)
      setAddressSellected(true)
    } else {
      setAddressSellected(false)
    }
    setForm({
      ...form,
      address: e.value,
      country: address.country || '',
      city: address.city || '',
      state: address.state || '',
      zipcode: address.zipcode || '',
      lat: address.lat || '',
      lng: address.lng || ''
    })
    if (e.place) {
      // setTimezoneLoader(true)
      const apires = await addressModel.gettimeZone(e.place)
      // setTimezoneLoader(false)
      setForm({
        ...form,
        address: e.value,
        country: address.country || '',
        city: address.city || '',
        state: address.state || '',
        zipcode: address.zipcode || '',
        lat: address.lat || '',
        lng: address.lng || '',
        // companytimezone: apires?.data?.timeZoneId || ''
      })
    }
  }
  return (
    <Layout>
      <>
        {/* <div className="pprofile1">
          <div className="d-flex justify-content-between align-items-center ">
            <h3 className="ViewUser">Basic Information</h3>
            <Link to="/profile" className="btn btn-primary ">
              <i className="fa fa-arrow-left text-light" title="View Profile" />
            </Link>
          </div>

          <form className="form-row" onSubmit={handleSubmit}>
            <div className="col-md-12 mb-3 inputFlex">
              <label>Image</label>
              <div>
                <div className="maininutcls">
                  <label className="profileImageLabel">
                    <img
                      src={methodModel.userImg(form && form.image)}
                      className="profileImage"
                    />
                  </label>
                  <div className="profile_btn">
                    <div>
                      <label className="btn btn-primary edit ml-3">
                        <input
                          id="bannerImage"
                          type="file"
                          className="d-none"
                       
                          value={form.baseImg ? form.baseImg : ""}
                          onChange={(e) => {
                            uploadImage(e);
                          }}
                        />
                        {form.image ? "Change" : "Upload"} Image
                      </label>
                    </div>
                    <div>
                      {form.image ? (
                        <label
                          className="btn btn-primary  delete ml-3"
                          onClick={(e) => setForm({ ...form, image: "" })}
                        >
                          Remove Image
                        </label>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 mb-3 inputFlex">
              <label>
                Name<span className="star">*</span>
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  value={form.fullName ? form.fullName : ""}
                  onChange={(e) =>
                    setForm({ ...form, fullName: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="col-md-12 mb-3 inputFlex">
              <label>Email</label>
              <div>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Name"
                  value={form.email ? form.email : ""}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-12 mb-3 inputFlex">
              <label>
                Mobile No<span className="star">*</span>
              </label>
              <div>
                <div className="phoneInput">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="+1"
                    value={(form && form.dialCode) || ""}
                    title="Phone number with + and remaing 9 digit with 0-9"
                    maxLength={4}
                    onChange={(e) =>
                      setForm({ ...form, dialCode: e.target.value })
                    }
                    required
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mobile No."
                    value={(form && form.mobileNo) || ""}
                    maxLength={12}
                    onChange={(e) =>
                      setForm({ ...form, mobileNo: methodModel.isNumber(e) })
                    }
                    required
                  />
                </div>
                {submitted && getError("dialCode").invalid ? (
                  <div className="invalid-feedback d-block">
                    invalid country code
                  </div>
                ) : (
                  <></>
                )}
                {submitted &&
                getError("mobileNo").invalid &&
                !getError("dialCode").invalid ? (
                  <div className="invalid-feedback d-block">
                    Min Length is 10
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="col-md-12 mb-3 inputFlex">
              <label>Role</label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  value={form.role}
                  disabled
                />
              </div>
            </div>

            {user.role && user.role.id == "64e83a928599356bddc2fa00" ? (
              <>
                {" "}
                <div className="col-md-12 mb-3 inputFlex">
                  <label>Hourly Rate</label>
                  <div className="d-flex">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Hourly Rate in $"
                      value={form.hourlyRate}
                      onChange={(e) =>
                        setForm({ ...form, hourlyRate: e.target.value })
                      }
                      required={
                        user.role && user.role.id == "64e83a928599356bddc2fa00"
                      }
                    />
                    <span className="mt-2 ml-1"></span>
                  </div>
                </div>
                <div className="col-md-12 mt-3">
                <h3 className="Portfolioheding">Portfolio</h3>
                <hr />
                </div>
               
                <br/>
                <div className="col-md-12 mt-3">
                  <label>URL</label>
                  <input className="form-control" type="url" name="portfolioUrl" onChange={e=>setForm({...form,portfolioUrl:e.target.value})} value={form.portfolioUrl}/>

                </div>
                <div className="col-md-12 mt-3">
                  <label className="btn btn-primary edit  mt-3">
                    <input
                      id="bannerImage"
                      type="file"
                      multiple={true}
                      className="d-none"
                    
                      onChange={(e) => imageResult(e)}
                    />
                    Upload documents
                  </label>
                </div>
                <div>
                  <br />
                  <div class="imagesRow mt-3 mr-5">
                    {DoumentUploadLoading == true ? (
                      <div className="text-success">
                        Uploading... <i className="fa fa-spinner fa-spin"></i>
                      </div>
                    ) : (
                      images.map((item, index) => (
                        <div>
                          <p className="text-capitalize">
                          <img
                                  style={{ cursor: "pointer" }}
                                  width={40}
                                  height={40}
                                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5kekkj6iYr_ZSKfB7GRWEJ4q-7_2sruMm5Hbc2haxduVzPhmc1kS-7OKKJDI1FjTEVAg&usqp=CAU"
                                  onClick={(e) =>
                                    window.open(
                                      `${environment.api}images/document/${item}`
                                    )
                                  }
                                />
                            <i
                              className="fa fa-trash text-danger shadow-danger"
                              style={{ cursor: "pointer" }}
                              onClick={(e) => HanldDocumentDelete(e, index)}
                            ></i>
                          </p>
                        </div>
                      ))
                    )}
                  </div>
          
                </div>
                {ProtofolioError ? (
                    <div className="text-danger text-center mt-3 ml-5">Please enter Url or Upload Documents </div>
                  ) : null}
              </>
            ) : null}

        
            <div className="col-md-12 text-right mt-3">
              <Link to="/profile" className="btn btn-primary reset">
                Discards
              </Link>
              <button type="submit" className="btn btn-primary edit ml-3">
                Update
              </button>
            </div>
          </form>
        </div> */}

        <div className="pprofile1">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="ViewUser">Basic Information</h3>
          </div>
          <form className="form-row" onSubmit={handleSubmit}>
            <div className="main_profile_page">
              <div className="row"> 
              <div className="col-md-4">
                  <div className="profile_img_side">
                    {/* <Link to="/profile">
                      <div className="back_page" title="Back">
                        <i class="material-icons back_pb">arrow_back_ios</i>
                      </div>
                    </Link> */}

                    <img
                      src={methodModel.userImg(form && form.image)}
                      className="profileImage"
                    />

                    <div>
                      <label className="new_images edit ml-3">
                        <input
                          id="bannerImage"
                          type="file"
                          className="d-none "
                          accept="image/*"
                          value={form.baseImg ? form.baseImg : ""}
                          onChange={(e) => {
                            uploadImage(e);
                          }}
                        />
                        <span className="uploader" title="Upload">
                          {/* {form.image ? 'Change' : 'Upload'} */}
                          <i class="material-icons">camera_alt</i>
                        </span>
                      </label>
                    </div>
                    <div className="changes_image">
                      <div>
                        {form.image ? (
                          <label
                            className="deleticon  delete "
                            onClick={(e) => setForm({ ...form, image: "" })}
                          >
                            {/* <span className="remove" title="Remove">
                              {" "}
                              <i class="material-icons">close</i>
                            </span> */}
                          </label>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                  </div>
                  <div className="col-md-8">
                  <div className="right_profile">
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label className="label_profile">Name</label>
                        <div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Name"
                            value={form.fullName ? form.fullName : ""}
                            onChange={(e) =>
                              setForm({ ...form, fullName: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
           
                      <div className="col-md-6 mb-4">
                        <label className="label_profile">Email</label>
                        <div>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Name"
                            value={form.email ? form.email : ""}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <label className="label_profile">TimeZone</label>
                        <div>
                        <TimezoneSelect
          value={form.timeZone}
          onChange={e=>setForm({...form,timeZone:e})}
        />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <label className="label_profile">Address</label>
                        <div>
                        <GooglePlaceAutoComplete
                      value={form.address}
                      result={addressResult}
                      id="address"
                      placeholder=""
                    />
                    {/* {!addressSellected && submitted ? <div className="invalid-feedback d-block">Please Select Location Suggestion</div> : <></>}          */}
                                   </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <label className="label_profile">Mobile No </label>
                        <div className="phoneInput_cls d-flex">
                          {/* <PhoneInput
                            international
                            value={form.dialCode}
                           
                            placeholder="+91"
                            onChange={(e) => {
                              console.log(e);
                              setForm({ ...form, dialCode: e });
                            }}
                            required
                          /> */}

                          <PhoneInput 
                          value={form.dialCode}
                          countryCodeEditable={false}
                          enableSearch={true}
                          placeholder=""
                          // country='us' 
                        //   onChange={e=>{console.log(e)}}
                        onChange={(phone, country) => {
                            // setFieldValue('country', country.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
                            // setFieldValue('phoneNumber', {
                            //   countryCodeID: country.dialCode,
                            //   number: phone.replace(country.dialCode, ''),
                            // });
                            // if(country.dialCode!=form.dialCode){
                            console.log(country.dialCode,"This is dialcode")
                            setForm({...form,dialCode:country.dialCode})
 
                           
                          }}
                          required
                      />
                 
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Mobile No."
                            value={(form && form.mobileNo) || ""}
                            maxLength={12}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                mobileNo: methodModel.isNumber(e),
                              })
                            }
                            required
                          />

                       
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <label className="label_profile">Role</label>
                        <div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Name"
                            value={form.role}
                            disabled
                          />
                        </div>
                      </div>

                      {/* new */}
                      <div className="col-md-6 mb-4">
                            <label className="label_profile">
                              Hourly Rate{" "}
                            </label>
                            <span className="dolaricon">$</span>
                            <div className="d-flex">
                              {/* <input
                                type="number"
                                className="form-control"
                                placeholder="Hourly Rate in $"
                                value={form.hourlyRate}
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    hourlyRate: e.target.value,
                                  })
                                }
                                required={
                                  user.role &&
                                  user.role.id == "64e83a928599356bddc2fa00"
                                }
                              /> */}

                              <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">$</span>
                                </div>
                                <input
                                  type="text"
                                  placeholder="Hourly Rate"
                                  className="form-control"
                                  aria-label="Amount (to the nearest dollar)"
                                  value={form.hourlyRate}
                                  onChange={(e) =>
                                    setForm({
                                      ...form,
                                      hourlyRate: e.target.value,
                                    })
                                  }
                                  required={
                                  user.role &&
                                  user.role.id == "64e83a928599356bddc2fa00"
                                }
                                />
                                <div className="input-group-append">
                                  <span className="input-group-text">/hr</span>
                                </div>
                              </div>
 
                            </div>
                          </div>
                      {user.role &&
                      user.role.id == "64e83a928599356bddc2fa00" ? (
                        <>
                          {" "}
                          <div className="col-md-12 mb-2">
    <label>Description</label>
    <textarea
    className="form-control"
    value={form.description}
    rows={4}
    onChange={e=>setForm({...form,description:e.target.value})}
    required={user.role&&user.role.id=="64e83a928599356bddc2fa00"}
    >

    </textarea>
                          </div>
                     
                          {/* <div className="col-md-12 mt-3">
                            <h3 className="Portfolioheding">Portfolio</h3>
                            <hr />
                          </div>
                          <br />
                          <div className="col-md-12 mt-3">
                            <label>URL</label>
                            <input
                              className="form-control"
                              type="url"
                              name="portfolioUrl"
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  portfolioUrl: e.target.value,
                                })
                              }
                              value={form.portfolioUrl}
                            />
                          </div>
                          <div className="col-md-12 mt-3">
                            <label>Document</label>
                            <div
                              className={`profile_btn_portfolio `}
                            >
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
                            <div class="imagesRow mt-3 mr-5 d-flex flex-wrap">
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
                                        height={40}
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
                          ) : null} */}
                        </>
                      ) : null}

                      {/* end */}
                      {/* <div className='col-md-4 mb-4'>
  <label className='label_profile'>Hourly Rate </label>
            <div>
            <input
                  type="number"
                  className="form-control"
                  placeholder="Hourly Rate"
                  value={form.hourlyRate}
                  
                />
            </div>
  </div> */}

                      <div className="col-md-12 text-right">
                        <Link to="/profile" className="btn btn-primary reset">
                          Discard
                        </Link>
                        <button
                          type="submit"
                          className="btn btn-primary edit ml-3"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div> 
                  </div>
              </div>
            </div>
          </form>
        </div>
      </>
    </Layout>
  );
};

export default Html;
