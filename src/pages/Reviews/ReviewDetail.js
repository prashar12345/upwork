import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import Layout from "../../components/global/layout";
import ApiClient from "../../methods/api/apiClient";

const ReviewDetail = () => {
    const {id} = useParams()
    const history = useHistory()
    const [data, setdata] = useState()

    const back = () => {
        history.goBack()
    }

    useEffect(()=>{
        getReviewDetails()
    },[])

    const getReviewDetails=()=>{
        ApiClient.get(`api/review/detail?id=${id}`).then(res=>{
            if(res.success){
                setdata(res.data)
            }
        })
    }

    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className='hedding'>Review Detail</h3>
                <button className="btn btn-primary profiles" onClick={e => back()}>Back</button>
            </div>
            <div className="row">
                {/* <div className="text-center mb-3">
                    <img src={data?.user?.avatar?.large} />
                </div> */}
                <div className="col-md-6 mb-3">
                    <p className="company_details">Rating</p>
                    <h4 className="company_name">{data?.rating} <i className='fa fa-star'></i></h4>
                </div>
                <div className="col-md-6 mb-3">
                    <p className="company_details">Title</p>
                    <h4 className="company_name">{data?.title}</h4>
                </div>
                <div className="col-md-6 mb-3">
                    <p className="company_details">Trip Type</p>
                    <h4 className="company_name">{data?.trip_type}</h4>
                </div>
                <div className="col-md-6 mb-3">
                    <p className="company_details">Travel Date</p>
                    <h4 className="company_name">{moment(data?.travel_date).format('DD MMM YYYY')}</h4>
                </div>
                <div className="col-md-6 mb-3">
                    <p className="company_details">Platform</p>
                    <h4 className="company_name">{data?.platform}</h4>
                </div>
                <div className="col-md-6 mb-3">
                    <p className="company_details">Review Date</p>
                    <h4 className="company_name">{moment(data?.reviewDate).format('DD MMM YYYY')}</h4>
                </div>
                <div className="col-md-6 mb-3">
                    <p className="company_details">Votes</p>
                    <h4 className="company_name text-capitalize">{data?.helpful_votes}</h4>
                </div>
                <div className="col-md-6 mb-3">
                    <p className="company_details">Status</p>
                    <h4 className="company_name text-capitalize">{data?.status}</h4>
                </div>
                <div className="col-md-12 mb-3">
                    <p className="company_details">Description</p>
                    <h4 className="company_name">{data?.text}</h4>
                </div>
            </div>
        </Layout>
    )
}
export default ReviewDetail