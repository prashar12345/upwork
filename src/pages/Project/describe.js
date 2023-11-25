import React, { useState, useEffect, useReducer, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import { ToastsStore } from 'react-toasts';
import methodModel from '../../methods/methods';
import { login_success } from '../../actions/user';
import './style.scss';
import { userType } from '../../models/type.model';
import Html from './Html';
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import { toast } from 'react-toastify';
import Header from '../../components/global/header';

const Describe = ({setCount,setMyForm,MyForm}) => {
  const OpenDocumentRef=useRef();
      //  for Document 
      const [DoumentUploadLoading, setDocumentUploadLoading] = useState(false);
      const [images1, setimages1] = useState(MyForm.documents);
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
          setMyForm({...MyForm,documents:newarray})
        } else {
          // toast.error({ message: "Please Upload the Documents" });
        }

      };
   
  return (
    <>  
       <div className="bg-white pt-4">
     <div className="container pl-5 pr-5 mt-5">
      <div className="row ">
        <div className="col-md-6">
      <p>Job Post</p>
      <h2>Start the conversation.</h2>
      <p>Talent are looking fro:</p>
      <ul className='pl-3'>
        <li className='mb-1'>Clear expectations about your task or deliverables</li>
        <li className='mb-1'>The skills required for your work</li>
        <li className='mb-1'>Good communication</li>
        <li className='mb-1'>Details about how you or your team like to wrok</li>
      </ul>
        </div>
        <div className="col-md-6">
        <b>Describe what you need</b>
          <textarea cols='4' rows='4' value={MyForm.description} onChange={e=>setMyForm({...MyForm,description:e.target.value})} className='form-control mt-2 mb-4'></textarea>
 
             <button className='btn btn-outline-primary d-flex align-items-center' onClick={e=>OpenDocumentRef.current.click()}> <span class="material-icons attachment">attachment</span>Attach file</button>
             <div className="col-md-12 mt-3">
            <div className="col-md-12"> 

                             <div className={`profile_btn_portfolio d-none `}>
                                <label className="add_portfolio edit ml-3">
                                  <input
                                    id="bannerImage"
                                    type="file"
                                    multiple={true}
                                    ref={OpenDocumentRef}
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
                          </div>
            <p className='mt-2'>Max file size: 100 MB</p>
        </div>
      </div>
     </div>
     </div>
     <div className="footer_btn">
      <button className="btn btn-outline-primary" onClick={e=>setCount(2)}>Back</button>
      <button className="btn btn-primary" disabled={MyForm.description==""||MyForm.documents.length==0}  onClick={e=>setCount(4)} >Review Job Post</button>
     </div>

    </>
  );
};

export default Describe;