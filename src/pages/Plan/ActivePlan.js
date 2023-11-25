import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import './style.scss'


const ActivePlan = () => {
    const [activeplan,setActivePlan]=useState()
    const [card,setCard]=useState()
    const history=useHistory()

  useEffect(()=>{
    loader(true)
    ApiClient.get('api/my/plan').then(res=>{
        if(res.success){
            setActivePlan(res.data)
            if(!res.data.id){
                history.push('/plans')
            }
        }
        loader(false)
    })

    ApiClient.get('api/cards/listing',{isDefault:true}).then(res=>{
        if(res.success){
            if(res.data.length){
                setCard(res.data[0])
            }
        }
        loader(false)
    })
  },[])

  return (
    <Layout> 
        <div className="container-fluid">
           <h2 className='border-bottom pb-3'>Plan</h2>
           <p><b>Plan details</b></p>

           <div class="card">
        <div class="card-header bg-white">
       <b> Basic</b>
        <div className='d-flex justify-content-between w-100'>
            <p className='w-75'>All the basics for starting a new business, including online store, sales channels, gift cards, and the Shopify POS app for in-person selling.</p>
             <span className='ml-1 usdPrice'><span className='text-uppercase'>{activeplan?.subscription?.plan?.currency}</span><b className='dollarPrice'>{activeplan?.subscription?.plan?.amount}</b>/{activeplan?.subscription?.plan?.interval_count} mo</span>   
        </div>
        </div>
        <div class="card-body bgGrayPlan">
            <p class="card-title mb-3 font-weight-bold">Your plan includes</p>
             
             <div className='row'>
                {activeplan?.planId && Object.keys(activeplan?.planId?.feature).map(oitm=>{
                    return <div className='col-md-3 mb-3'>
                     <h6>{oitm}</h6>
                    <ul className='listStyle'>
                        {activeplan?.planId?.feature[oitm].map(itm=>{
                            if(itm.checked)
                            return <>
                             <li> 
                       
                        <i className={'fa fa-check-circle text-success mr-2'}></i> {itm.name}</li>
                            </>
                        })}
                    
                        </ul>
                    </div>
                })}
               </div>
      
        </div>
        {/* <div class="card-body borderCard">
            <div className='d-flex justify-content-between w-100'>
                <div className='leftBilling'>
            <h5 class="card-title">Billing cycle</h5>
             <p>Monthly for $39.00 USD.</p>
             </div>
                <a>Change billing cycle</a>
             </div>
        </div> */}
        <div class="card-body borderCard">
            <div className='d-flex justify-content-between w-100'>
                <div className='leftBilling'>
            <h5 class="card-title">Payment method</h5>
             <p>
                <img src="/assets/img/visa.png" className='masterCard' />
                {card?.brand} ending in {card?.last4}</p>
             </div>
                <Link to='/card'>Change payment method</Link>
             </div>
        </div>  

        <div class="card-body borderCard text-right">
        {/* <button className='btn btn-secondary mr-2 discard'>Deactive store</button> */}
                <Link className='btn btn-primary' to='/plans'>Change Plan</Link>
            </div>
        </div>
        </div>
    </Layout>
  );
};

export default ActivePlan;
