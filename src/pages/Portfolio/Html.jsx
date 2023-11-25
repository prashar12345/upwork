import React, { useState } from "react";
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
  const [DoumentUploadLoading, setDocumentUploadLoading] = useState(false);
  const [documents, setdocuments] = useState([]);
  const user = useSelector((state) => state.user);

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
  //  For Deleting the Document
  const HanldDocumentDelete = (e, index) => {
    e.preventDefault();
    const array = [...images];
    array.splice(index, 1);
    setimages(array);
  };
  return (
    <>
      <>
        
        <div className="pprofile1">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="ViewUser">Portfolio</h3>
          </div>
          <form className="form-row" onSubmit={handleSubmit}>
            <div className="main_profile_page">
              <div className="row">
                <div className="col-md-12">
                
                  <div className="">
                    <div className="row">
                      {/* new */}

                      {user.role &&
                      user.role.id == "64e83a928599356bddc2fa00" ? (
                        <>
                          {" "}
                         
                          <div className="col-md-12 mt-3">
                            {/* <h3 className="Portfolioheding">Portfolio</h3> */}
                            {/* <hr /> */}
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
                            <label>PortfolioDocument</label>
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
                        </>
                      ) : null}

          

                      <div className="col-md-12 text-right mt-3 " >
                        <button className="btn btn-secondary discard mr-2" data-dismiss="modal">
                          Back 
                          </button>  
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
    </>
  );
};

export default Html;
