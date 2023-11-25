import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Layout from '../../../components/global/layout';
import ApiClient from '../../../methods/api/apiClient';
import loader from '../../../methods/loader';
import './style.scss';
import { useSelector } from 'react-redux';
import methodModel from '../../../methods/methods';

const RoleDetail = (p) => {
    const history = useHistory()
    const user = useSelector(state => state.user)
    const { id, userId } = useParams()
    const [data, setData] = useState()
    const getDetail = (did) => {
        loader(true)
        ApiClient.get(`api/role/detail`, { id: did }).then(res => {
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
                    Category Detail
                    </h3>

                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Name</label>
                            <div className='profiledetailscls'>{data && data.name}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Type</label>
                            <div className='profiledetailscls'>{data && data.catType}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Order</label>
                            <div className='profiledetailscls'>{data && data.order}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Parent Category</label>
                            <div className='profiledetailscls'>{data && data.parentCategory?.name}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Status</label>
                            <div className='profiledetailscls'>{data && data.status}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Featured</label>
                            <div className='profiledetailscls'>{data && data.featured}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Banner</label>
                            <div>
                                <div className="imagethumbWrapper">
                                    <img src={methodModel.noImg(data && data.banner, 'users')} className="thumbnail" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Icon</label>
                            <div>
                                <div className="imagethumbWrapper">
                                    <img src={methodModel.noImg(data && data.icon, 'users')} className="thumbnail" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Alt Image Name</label>
                            <div className='profiledetailscls'>{data && data.altImageName}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Alt Icon Name</label>
                            <div className='profiledetailscls'>{data && data.altIconName}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Banner Overlay Text Heading</label>
                            <div className='profiledetailscls'>{data && data.bannerOverlayHeading}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Banner Overlay Text Body</label>
                            <div className='profiledetailscls' dangerouslySetInnerHTML={{__html: data && data.bannerOverlayBody}}></div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Category Description</label>
                            <div className='profiledetailscls' dangerouslySetInnerHTML={{__html: data && data.description}}></div>
                        </div>
                        {/* <div className="col-md-12 mb-3">
                            <label className="profileheddingcls">Description</label>
                            <div className='profiledetailscls'>{data && data.description}</div>
                        </div> */}
                    </div>
                </div>
            </div>
        </Layout >

    );
};

export default RoleDetail;
