import React, { useEffect, useState } from "react"
import Html from "./html"
import ApiClient from '../../../methods/api/apiClient';
import { useHistory, useParams } from "react-router-dom";
import loader from "../../../methods/loader";
import "./style.scss";
import { toast } from "react-toastify";
import countryModel from "../../../models/country.model"
import { useSelector } from "react-redux";
import datepipeModel from "../../../models/datepipemodel";
import Layout from "../../../components/global/layout";
const ProductDetail=()=>{
    const user = useSelector(state => state.user)
    const {id}=useParams()
    const [detail,setDetail]=useState()
    const [dynamicPrice,setDynamicPrice]=useState([])
    const [loading,setLoader]=useState([])
    const [selectedDynamicPrice,setSelectedDynamicPrice]=useState({id:''})
    const [tab,setTab]=useState('location')
    const history=useHistory()
    const [image,setImage]=useState('/assets/img/placeholder.png')

    const getData=(tab='')=>{
        loader(true)
        setLoader(true)
        ApiClient.get('api/product/detail',{id:id}).then(res=>{
            if(res.success){
                setDetail(res.data)
                if(res.data?.images?.length){
                    setImage(res.data.images[0].largeSizeUrl)
                }
            }
            loader(false)
            setTimeout(() => {
                setLoader(false)
                if(tab) tabChange(tab)
            }, 100);
          
        })
    }

    const tabChange=(t)=>{
        setTab(t)
        setSelectedDynamicPrice({ id: '' })
        if(t=='calendar'){
            setTimeout(()=>{
                let el=document.getElementById("setCalendar")
                if(el) el.click()
            },1)
        }
    }

    useEffect(()=>{
        getData()
        getDynamicPriceList()
        let day=datepipeModel.day('2023-08-02')
        console.log("day",day)
    },[])

    const editdynamicPricing=(item)=>{
        setTab('dynamicPricing')
        setSelectedDynamicPrice({...item,isCopy:false})
        // history.push(`/dynamicprice/${item?.dynamicPricingId?.type}/edit/${item?.id}/false?page=product&productCode=${detail?.productCode}`)
    }

    const deletePricing=(id)=>{
        if(window.confirm("Do you Want to Delete this Dynamic Pricing")){
            ApiClient.delete('api/product/pricing/delete',{id:id}).then(res=>{
                if(res.success){
                    toast.success(res.message)
                    getData()
                }
            })
        }
    }

    const getDynamicPriceList = () => {
        let ext = countryModel.search(user.country)
        let country = 'us'
        if (ext) {
            country = ext.cca2.toLowerCase()
        }
        ApiClient.get(`api/dynamic/pricings/dropdown`, {country:country}).then(res => {
            if (res.success) {
                setDynamicPrice(res.data)
            }
        })
    }

    const apply=(id)=>{
        let ext = dynamicPrice.find(itm => itm.id == id)
        if (ext){
            // delete ext.id
            // delete ext._id
        }
        setSelectedDynamicPrice({...ext,isCopy:true})

        // history.push(`/dynamicprice/${ext?.type}/edit/${selectedDynamicPrice.id}/true?page=product&productCode=${detail?.productCode}&productId=${id}`)
    }

    return <>
    <Layout>
    <Html
    apply={apply}
    tab={tab}
    loading={loading}
    getData={getData}
    selectedDynamicPrice={selectedDynamicPrice}
    setSelectedDynamicPrice={setSelectedDynamicPrice}
    dynamicPrice={dynamicPrice}
    deletePricing={deletePricing}
    editdynamicPricing={editdynamicPricing}
    tabChange={tabChange}
    detail={detail}
    image={image}
    setImage={setImage}
    />
    </Layout>
    </>
}

export default ProductDetail