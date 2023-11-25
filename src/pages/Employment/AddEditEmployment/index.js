import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../../methods/api/apiClient";
import loader from "../../../methods/loader";
import { useSelector } from 'react-redux';
import methodModel from "../../../methods/methods";
import { userType } from "../../../models/type.model";
import Html from "./Html";
import { useHistory, useParams } from "react-router-dom";
import environment from "../../../environment";
import { toast } from "react-toastify";

const AddEditEmployment = ({id,GetEmployementData}) => {
    // const { id } = useParams()
    const [images, setImages] = useState({ image: '',});
    const defaultvalue = userType
    const [form, setform] = useState(userType)
    const [eyes, setEyes] = useState({ password: false, confirmPassword: false });
    const [submitted, setSubmitted] = useState(false)
    const history = useHistory()
    const [roles, setRoles] = useState([])
    const [emailLoader, setEmailLoader] = useState(false) 
    const [emailErr, setEmailErr] = useState('') 
    const [detail, setDetail] = useState() 
    const user = useSelector((state) => state.user);
    const formValidation = [
        { key: 'name', minLength: 10 },
       
    ]
    console.log(form,"dijsdlgsdjfldj");
    const getError = (key) => {
        return methodModel.getError(key, form, formValidation)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
      
        if (invalid || emailErr) return
        let method = 'post'
        let url = 'employment'
        let value = {
            ...form,
            ...images,currentlyWorking:form?.currentlyWorking?form?.currentlyWorking:false
        }
        if (value.id) {
            method = 'put'
            url = 'employment'
        } else {
            delete value.id
        }

        loader(true)
        // ApiClient.allApi(url, value, method).then(res => {
        //     if (res.success) {
        //         ToastsStore.success(res.message)
        //         let url='/profile'
        //         history.push(url)
        //     }
        //     loader(false)
        // })

        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                GetEmployementData();
                document.getElementById("closeEmploymentmodal").click()
                toast.success(res.message)
            }
            loader(false)
        })
    }
    
    const imageResult = (e, key) => {
        images[key] = e.value
        setImages(images)
        console.log("imageResult", e)
    }

    const addressResult = (e) => {
        setform({ ...form, address: e.value })
    }

    const back=()=>{
        history.goBack()
    }

    // const getRoles=()=>{
    //     ApiClient.get('api/user/roles/listing',{status:'active'}).then(res=>{
    //         if(res.success){
    //             setRoles(res.data)
    //         }
    //     })
    // }

    // const emailCheck=(email)=>{
    //     let isValid=methodModel.emailvalidation(email)
    //     if(isValid){
    //         setEmailLoader(true)
    //         ApiClient.get('api/check/email',{email:email}).then(res=>{
    //             if(!res.success){
    //                 if(detail?.email!=email){
    //                     setEmailErr(res.error.message)
    //                 }
    //             }else{
    //                 setEmailErr('')
    //             }
    //             setEmailLoader(false)
    //         })
    //     }
    // }

    useEffect(() => {
        setSubmitted(false)
        if (id) {
            loader(true)
            ApiClient.get("employment", { id }).then(res => {
                if (res.success) {
                    let value=res.data
                    setDetail(value)
                    let payload = defaultvalue
                    let oarr = Object.keys(defaultvalue)
                    oarr.map(itm => {
                        payload[itm] = value[itm] || ''
                    })
                   
                    setform({ ...payload })
                   
                    setImages(images)
                }
                loader(false)
            })
        }
        else{setform({ id:'',company:'',location:'',country:'',title:'',startDate:'',endDateDate:'' ,description:''})}
        // getRoles()
    }, [id])

    return <>
        <Html
            form={form}
            detail={detail}
            // emailCheck={emailCheck}
            emailLoader={emailLoader}
            emailErr={emailErr}
            back={back}
            setEyes={setEyes}
            eyes={eyes}
            setform={setform}
            // roles={roles}
            submitted={submitted}
            images={images}
            addressResult={addressResult}
            handleSubmit={handleSubmit}
            imageResult={imageResult}
            getError={getError}
        />
    </>
}

export default AddEditEmployment