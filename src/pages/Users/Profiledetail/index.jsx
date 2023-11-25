import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Layout from '../../../components/global/layout';
import ApiClient from '../../../methods/api/apiClient';
import loader from '../../../methods/loader';
import './style.scss';
import { useSelector } from 'react-redux';
import methodModel from '../../../methods/methods';
import rolesModel from '../../../models/roles.model';

const CustomerDetail = (p) => {
    const history = useHistory()
    const user = useSelector(state => state.user)
    const { id, userId } = useParams()
    const [data, setData] = useState()
    const getDetail = (did) => {
        loader(true)
        ApiClient.get(`api/user/profile`, { id: did }).then(res => {
            if (res.success) {
                setData(res.data)
            }
            loader(false)
        })
    };

    const back = () => {
        history.goBack()
    }

    useEffect(() => {
        getDetail(userId ? userId : id)
    }, [id, userId])

    return (
        <Layout>
            <div className="text-right">
                <div>
                    <a to="/users" onClick={back}>  <i className="fa fa-arrow-left mr-4 mb-3 " title='Back' aria-hidden="true"></i></a>
                </div>
            </div>
            <div className="row">
                <div className="sideclass col-md-12">
                    <h3 className="Profilehedding mt-3 ">
                    User Detail
                    </h3>

                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Name</label>
                            <div className='profiledetailscls'>{data && data.fullName}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Mobile No</label>
                            <div className='profiledetailscls'>({data && data.dialCode}) {data && data.mobileNo}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Email</label>
                            <div className='profiledetailscls'>{data && data.email}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Role</label>
                            <div className='profiledetailscls'>{data && rolesModel.name(data.role)}</div>
                        </div>
                        
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Address</label>
                            <div className='profiledetailscls'>{data && data.address}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Image</label>
                            <div>
                                <div className="imagethumbWrapper">
                                    <img src={methodModel.noImg(data && data.image, 'users')} className="thumbnail" />
                                </div>
                            </div>
                        </div>

                       
                        {/* <div className="col-md-12 mb-3">
                            <label className="profileheddingcls">About Us</label>
                            <div className='profiledetailscls'>{data && data.aboutUs}</div>
                        </div> */}
                    </div>
                </div>
            </div>
        </Layout>

    );
};

export default CustomerDetail;
