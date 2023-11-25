import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Layout from '../../../components/global/layout';
import ApiClient from '../../../methods/api/apiClient';
import loader from '../../../methods/loader';
import './style.scss';
import { useSelector } from 'react-redux';
import methodModel from '../../../methods/methods';
import Header from '../../../../src/components/global/header';

const BlogDetails = (p) => {
    const history = useHistory()
    const user = useSelector(state => state.user)
    const { id, userId } = useParams()
    const [data, setData] = useState()
    const getDetail = (did) => {
        loader(true)
        ApiClient.get(`blog`, { id: did }).then(res => {
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
   <>
   <Header />
<main className="container mt-5 mb-5"> 
<div className="col-md-12">
  <header className="header w-100 d-flex align-items-center justify-content-between">
  <div>
  <h2 className="heading">Blog Detail</h2>
    <p className="subheading">{data && data.title}</p>
    </div>
  <a to="/blog" onClick={back}>  <i className="fa fa-arrow-left mr-4 mb-3 " title='Back' aria-hidden="true"></i></a>
                

  </header>
  <section className="content mt-5">
    <div className='row'>
        <div className='col-md-7'>
        <img src={methodModel.noImage(data && data?.image)} className="uploadimage w-100"/>
        </div>
        <div className='col-md-5'>
        <p> <div className='profiledetailscls mt-3' dangerouslySetInnerHTML={{__html: data && data.description}}></div> </p>
        </div>
    </div>
    {/* <img src='https://images.unsplash.com/photo-1466436578965-5cba086a1824?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=ac7f8b732c22f512fd982ffddc2078d6' alt='large-image' class="poster-image"/> */}

    
  </section>
</div>



</main>

   </>

    );
};

export default BlogDetails;
