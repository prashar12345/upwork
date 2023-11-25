import React, { useEffect, useState } from "react";
import methodModel from "../../../methods/methods";
import ImageUpload from "../../../components/common/ImageUpload";
import GooglePlaceAutoComplete from "../../../components/common/GooglePlaceAutoComplete";
import Layout from "../../../components/global/layout";
import SelectDropdown from "../../../components/common/SelectDropdown";
import { Select } from "antd";
import loader from "../../../methods/loader";
import ApiClient from "../../../methods/api/apiClient";

const Html = ({
  form,
  handleSubmit,
  setform,
  roles,
  addressResult,
  submitted,
  images,
  imageResult,
  getError,
  setEyes,
  eyes, 
  emailErr,
  emailLoader,
  detail,
  
}) => {
  const [DegreeData,setDegreeData]=useState([]);
  const [StudyAreaData,setStudyAreaData]=useState([]);

  const GetDegreeData=(p={})=>{
    loader(true);
    let array=[]
    ApiClient.get(`degrees`,p).then(res=>{
      if(res.success){
  if(res.success){
    const data=res.data;
    data.map((item,index)=>{
      array.push({value:item.name,label:item.name})
    })
    setDegreeData(array);
    loader(false)
  }
      }
    })
  }

  const GetStudyAreaData=()=>{
    loader(true);
    let array=[]
    ApiClient.get(`areaofstudy`).then(res=>{
      if(res.success){
        const data=res.data;
        data.map((item,index)=>{
          array.push({value:item.name,label:item.name})
        })
   setStudyAreaData(array);
      }
    })
  }
  useEffect(()=>{
  GetDegreeData();
  GetStudyAreaData();
  },[])
  return (
    <>
      <>
        <form onSubmit={handleSubmit}>
          <div className="pprofile1">
            <h3 className="ViewUser">
              {form && form.id ? "Edit" : "Add"} Education
            </h3>
            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label>
                Institution/school<span className="star">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={form.school}
                  onChange={(e) =>
                    setform({ ...form, school: e.target.value })
                  }
                  required
                />
              </div>

         

              <div className="col-md-6 mb-3">
                <label>
                StudyArea<span className="star">*</span>
                </label>
                <br/>
                <Select 
                showSearch
                allowClear 
                value={form.studyArea}
                onSelect={(e) =>{ setform({ ...form, studyArea: e});}}
                filterOption={(input, option) =>
                  option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                options={StudyAreaData}
                
                className="marginleft"
                />
                {/* <input
                  type="text"
                  className="form-control"
                  value={form.studyArea}
                  onChange={(e) => setform({ ...form, studyArea: e.target.value })}
                  required
                /> */}
              </div>

              <div className="col-md-6 mb-3">
                <label>
                  Start Date<span className="star">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={form.startDate}
                  onChange={(e) =>
                    setform({ ...form, startDate: e.target.value })
                  }
                  required
                />
              </div>
         
          
                <div className="col-md-6 mb-3">
                  <label>
                    End Date<span className="star">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={form.endDate}
                    min={form.startDate}
                    onChange={(e) =>
                      setform({ ...form, endDate: e.target.value })
                    }
                    
                  />
                </div>
              
                <div className="col-md-6 mb-3">
                <label>
                  Degree
                </label>
              <br/>

                <Select 
                showSearch
                allowClear 
                value={form.degree}
                onSelect={(e) =>{ setform({ ...form, degree: e});}}
                filterOption={(input, option) =>
                  option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                
                options={DegreeData}
                
                className="marginleft"
                />
                {/* <input
                  type="text"
                  className="form-control"
                  value={form.degree}
                  onChange={(e) => setform({ ...form, degree: e.target.value })}
                  required
                /> */}
              </div>
            

            
              {/* <div className="col-md-6 mb-3">
                            <label>Role<span className="star">*</span></label>
                            <SelectDropdown
                                    id="statusDropdown"
                                    displayValue="name"
                                    placeholder="Select Role"
                                    intialValue={form.subRole}
                                    disabled={form.id ? true : false}
                                    result={e => { setform({ ...form, subRole: e.value }) }}
                                    options={roles}
                                />
                                 {submitted && !form.subRole ? <div className="invalid-feedback d-block">Role is Required</div> : <></>}
                        </div> */}
              {/* 
              <div className="col-md-12 mb-3">
              <label>
                      Location<span className="star">*</span>
                    </label>
                <div className="row">
                  <div className="col-md-6">
                   
                    <SelectDropdown
                      id="statusDropdown"
                      displayValue="name"
                      placeholder="City"
                      intialValue={form.subRole}
                      disabled={form.id ? true : false}
                      result={(e) => {
                        setform({ ...form, subRole: e.value });
                      }}
                      options={roles}
                    />
                    {submitted && !form.subRole ? (
                      <div className="invalid-feedback d-block">
                        Country is Required
                      </div>
                    ) : (
                      <></>
                    )}
                    
                  </div>

                  <div className="col-md-6">
                   
                   <SelectDropdown
                     id="statusDropdown"
                     displayValue="name"
                     placeholder="Select Country"
                     intialValue={form.subRole}
                     disabled={form.id ? true : false}
                     result={(e) => {
                       setform({ ...form, subRole: e.value });
                     }}
                     options={roles}
                   />
                   {submitted && !form.subRole ? (
                     <div className="invalid-feedback d-block">
                       Country is Required
                     </div>
                   ) : (
                     <></>
                   )}
                   
                 </div>
                </div>
              </div>


              <div className="col-md-12 mb-3">
              <label>
                      Period<span className="star">*</span>
                    </label>
                <div className="row">
                  <div className="col-md-6">
                   
                    <SelectDropdown
                      id="statusDropdown"
                      displayValue="name"
                      placeholder="from, month"
                      intialValue={form.subRole}
                      disabled={form.id ? true : false}
                      result={(e) => {
                        setform({ ...form, subRole: e.value });
                      }}
                      options={roles}
                    />
                    {submitted && !form.subRole ? (
                      <div className="invalid-feedback d-block">
                        Country is Required
                      </div>
                    ) : (
                      <></>
                    )}
                    
                  </div>

                  <div className="col-md-6">
                   
                   <SelectDropdown
                     id="statusDropdown"
                     displayValue="name"
                     placeholder="From year"
                     intialValue={form.subRole}
                     disabled={form.id ? true : false}
                     result={(e) => {
                       setform({ ...form, subRole: e.value });
                     }}
                     options={roles}
                   />
                   {submitted && !form.subRole ? (
                     <div className="invalid-feedback d-block">
                       Country is Required
                     </div>
                   ) : (
                     <></>
                   )}
                   
                 </div>
                </div>
              </div> */}
              {/* <div className="col-md-6 mb-3">
                            <label>Address<span className="star">*</span></label>
                            <GooglePlaceAutoComplete
                                value={form.address}
                                result={addressResult}
                                id="address"
                                placeholder=""
                            />
                        </div> */}
              <div className="col-md-12 mb-3">
                <label>
                  Description<span className="star">*</span>
                </label>
                <textarea
                  className="form-control"
                  value={form.description}
                  onChange={(e) =>
                    setform({ ...form, description: e.target.value })
                  }
                  required
                />
              </div>
              {/* <div className="col-md-6  mb-3">
                <label className="lablefontcls">Image</label>
                <br></br>
                <ImageUpload
                  model="users"
                  result={(e) => imageResult(e, "image")}
                  value={images.image || form.image}
                  multiple={false}
                />
              </div> */}
            </div>

            <div className="text-right">
              <button
                type="button"
                id="closeeducationmodal"
                className="btn btn-secondary discard mr-2" 
                data-dismiss="modal" aria-label="Close"
              >
                Back
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </form>
      </>
    </>
  );
};

export default Html;
