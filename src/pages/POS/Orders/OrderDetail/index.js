import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Layout from '../../../../components/global/layout';
import ApiClient from '../../../../methods/api/apiClient';
import loader from '../../../../methods/loader';
import Html from './html';
const OrderDetail = (p) => {
    const history=useHistory()
    const [detail,setDetail]=useState()
    const {id} =useParams()

    const back = () => {
        history.goBack()
    }
    const getDetail=()=>{
        loader(true)
        ApiClient.get('api/order/detail',{id:id}).then(res=>{
            if(res.success){
                setDetail(res.data)
            }
            loader(false)
        })
    }

    useEffect(()=>{
        getDetail()
    },[])
    return <>
        <Layout>
            <Html
            back={back}
            detail={detail}
            />
        </Layout>
    </>
};

export default OrderDetail;
