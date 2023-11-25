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
import Header from "../../components/global/header";
import { useHistory } from "react-router-dom";

const Html = ({
  setForm,
  form,
  setProtofolioError,
  images,
  setimages,
  categoriesdata,
  CatType,
  data,
  searchHandle,
  search,
  searchChange,
  clear,
  filters,
  handleLike,
  handleDislike,
  liked,
  disliked,
  isActive,
}) => {
  const [DoumentUploadLoading, setDocumentUploadLoading] = useState(false);
  const [documents, setdocuments] = useState([]);
  const pathname = location.pathname;

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
            setdocuments(new Date());
            if (files.length == images.length) {
              setDocumentUploadLoading(false);
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

  const Navigate = useHistory();
  
  return (
    <>
      <Header />
      <section className="faq-section mainfaq">
        <div className="container">
          <div className="row">
            <div className="col-md-12 ">
              <div className="faq-title text-center pb-3">
                <h2>FAQs</h2>
              </div>
            </div>
            <div className="col-md-9 ">
              <div className="text-center w-100 mb-3 d-flex justify-content-between">
          

                <form className="headerSearch " onSubmit={searchHandle}>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={filters.search}
                    onChange={(e) => {
                      searchChange(e.target.value);
                    }}
                    className="Searchbar"
                  ></input>
                  <i
                    className="fa fa-search"
                    onClick={searchHandle}
                    aria-hidden="true"
                  ></i>
                  {search ? (
                    <i
                      className="fa fa-times"
                      onClick={clear}
                      aria-hidden="true"
                    ></i>
                  ) : (
                    <></>
                  )}
                </form>

 
                
              </div>
              {data &&
                data.map((item, index) => {
                  return (
                    <div className="faq" id="accordion">
                      <div className="card">
                      <div className="d-flex justify-content-end mt-2 ">
                   
                     <i class={`fa fa-thumbs-up thumbs like-button ${isActive ? 'active' : ''}`} aria-hidden="true" onClick={(e) => handleLike(item.id)} disabled={liked} > </i>
                   
           
            <i class="fa fa-thumbs-down thumbs like-button ml-3 mr-4 mt-1" aria-hidden="true" onClick={(e) => handleDislike(item.id)} disabled={disliked}></i>
            </div>
                        <div className="faqdown">
                          <i
                            class="fa fa-caret-down"
                            aria-hidden="true"
                            data-toggle="collapse"
                            data-target={"#faqCollapse-1" + index}
                            data-aria-expanded="true"
                            data-aria-controls={"faqCollapse-1" + index}
                          ></i>
                        </div>
                        <div className="card-header" id="faqHeading-1">
                          <div className="mb-0">
                            <h5
                              className="faq-title"
                              data-toggle="collapse"
                              data-target={"#faqCollapse-1" + index}
                              data-aria-expanded="true"
                              data-aria-controls={"faqCollapse-1" + index}
                            >
                              {item.question}
                            </h5>
                          </div>
                        </div>
                        <div
                          id={"faqCollapse-1" + index}
                          className="collapse"
                          aria-labelledby="faqHeading-1"
                          data-parent="#accordion"
                        >
                          <div className="card-body">
                            <p>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item.answer,
                                }}
                              ></div>
                            </p>
                          </div>
                        </div>
                      </div>
 
                    </div>
                  );
                })}
            </div>


            <div className="col-md-3 position-sticky">
           
              <ul className="category_name  p-3 mt-5" >
                <h6 className=" mt-1 mb-3 font-weight-bold">FAQs Category</h6>
                {categoriesdata && categoriesdata.map((item, index) => (
                <li className="text-capitalize"   onClick={(e) => CatType(item.id)} >{item.name} </li>
                 ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Html;
