import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Layout from '../../../components/global/layout';
import ApiClient from '../../../methods/api/apiClient';
import loader from '../../../methods/loader';
import './style.scss';
import { useSelector } from 'react-redux';
import methodModel from '../../../methods/methods';
import rolesModel from '../../../models/roles.model';

const EducationDetail = ({Viewid}) => {
    const history = useHistory()
    const user = useSelector(state => state.user) 
    const [data, setData] = useState()
    const getDetail = () => {
        loader(true)
        ApiClient.get(`education`, { id: Viewid }).then(res => {
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
        if(Viewid){
        getDetail()
        }
    }, [Viewid])

    return (
        <>
            <div className="text-right">
               
            </div>
            <div className="row">
                <div className="sideclass col-md-12">
                    <h3 className="Profilehedding mt-3 ">
                    Education
                    </h3>

                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">school</label>
                            <div className='profiledetailscls'>{data && data.school}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Degree</label>
                            <div className='profiledetailscls'>{data && data.degree}</div>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">StudyArea</label>
                            <div className='profiledetailscls'>{data && data.studyArea}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">startDate</label>
                            <div className='profiledetailscls'>{data && data.startDate}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">end Date</label>
                            <div className='profiledetailscls'>{data && rolesModel.name(data.endDate)}</div>
                        </div>
                        
                       
                    

                       
                        <div className="col-md-12 mb-3">
                            <label className="profileheddingcls">Description</label>
                            <div className='profiledetailscls'>{data && data.description}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default EducationDetail;
