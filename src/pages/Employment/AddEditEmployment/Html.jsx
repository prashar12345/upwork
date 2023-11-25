import React from "react";
import methodModel from "../../../methods/methods";
import ImageUpload from "../../../components/common/ImageUpload";
import GooglePlaceAutoComplete from "../../../components/common/GooglePlaceAutoComplete";
import Layout from "../../../components/global/layout";
import SelectDropdown from "../../../components/common/SelectDropdown";

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
  back,
  emailErr,
  emailLoader,
  detail,
  
}) => {
  return (
    <>
      <>
        <form onSubmit={handleSubmit}>
          <div className="pprofile1">
            <h3 className="ViewUser">
              {form && form.id ? "Edit" : "Add"} Employment
            </h3>
            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label>
                  Company<span className="star">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={form.company}
                  onChange={(e) =>
                    setform({ ...form, company: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>
                  Title<span className="star">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={form.title}
                  onChange={(e) => setform({ ...form, title: e.target.value })}
                  required
                />
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
         
              {!form.currentlyWorking ? (
                <div className="col-md-6 mb-3">
                  <label>
                    End Date<span className="star">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={form.endDateDate}
                    min={form.startDate}
                    onChange={(e) =>
                      setform({ ...form, endDateDate: e.target.value })
                    }
                    required={!form.currentlyWorking}
                    
                  />
                </div>
              ) : (
                ""
              )}
              <div className="col-md-6 mb-3 ml-4 ">
                <input
                  className="form-check-input mb-2 "
                  type="checkbox"
                  checked={form.currentlyWorking}
                  onChange={(e) =>{
                    setform({ ...form, currentlyWorking: e.target.checked,endDateDate:"" });}
                  }
                  id="defaultCheck1"
                />
                <label for="vehicle1" className="m-1 ">
                  {" "}
                  I currently work here
                </label>
                <br />
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
                className="btn btn-secondary discard mr-2" 
                data-dismiss="modal"
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
