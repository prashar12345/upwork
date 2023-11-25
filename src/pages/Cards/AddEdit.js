import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from 'react-redux';
import methodModel from "../../methods/methods";
import { featureType } from "../../models/type.model";
import { Link, useHistory, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import SelectDropdown from "../../components/common/SelectDropdown";
import statusModel from "../../models/status.model";

const AddEditCards = () => {
    const [images, setImages] = useState({ image: '', banner: '', icon: '' });
    const [features, setFeatures] = useState([{ name: 'Option 1️⃣', id: 1 }, { name: 'Option 2️⃣', id: 2 }])

    const defaultvalue = () => {
        let keys = { ...featureType }
        Object.keys(featureType).map(itm => {
            if (itm != 'permissions') keys[itm] = ''
        })
        keys.status = 'active'
        return keys
    }
    const { id } = useParams()
    const [form, setform] = useState(featureType)
    const history = useHistory()
    const [submitted, setSubmitted] = useState(false)
    const [country,setcountry] = useState()
    const user = useSelector((state) => state.user);
    const formValidation = [
        { key: 'status', required: true },
        { key: 'country', required: true },
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid) return
        let method = 'post'
        let url = 'api/add/card'
        let value = {
            ...form
        }
        if (value.id) {
            method = 'put'
            url = ''
        } else {
            delete value.id
        }

        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                history.push("/card")
            }
            loader(false)
        })
    }

    useEffect(() => {
        if (id) {
            loader(true)
            ApiClient.get('', { id }).then(res => {
                if (res.success) {
                    let value = res.data
                    let payload = featureType

                    Object.keys(payload).map(itm => {
                        payload[itm] = value[itm]
                    })
                    if (value.permissions) {
                        payload.permissions = { ...value.permissions[0] }
                        // payload.permissions={ ...payload.permissions,...value.permissions}
                    }
                    if(value.category){
                        payload.category = value.category._id
                    }
                    setform({
                        ...payload
                    })
                }
                loader(false)
            })
        } else {
            setform(defaultvalue())
        }

    }, [id])

    const onSelect = (e) => {
        console.log("onSelect", e)
    }

    const onRemove = (e) => {
        console.log("onRemove", e)
    }

    const getCountry=()=>{
        ApiClient.get(`api/country/listing`).then(res=>{
            setcountry(res.data)
        })
    }
    useEffect(()=>{
        getCountry()
    },[])

    return <>
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="pprofile1">
                    <h3 className="ViewUser mb-3">{form && form.id ? 'Edit' : 'Add'} Card</h3>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label>Card Number<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                minLength={16}
                                maxLength={16}
                                value={form.card_number}
                                onChange={e => setform({ ...form, card_number: methodModel.isNumber(e) })}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Expire Month<span className="star">*</span></label>
                            <input
                                type="text"
                                minLength={2}
                                maxLength={2}
                                className="form-control"
                                value={form.exp_month}
                                onChange={e => setform({ ...form, exp_month: methodModel.isNumber(e) })}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Expire Year<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                minLength={4}
                                maxLength={4}
                                value={form.exp_year}
                                onChange={e => setform({ ...form, exp_year: methodModel.isNumber(e) })}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>CVC<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                minLength={3}
                                maxLength={3}
                                value={form.cvc}
                                onChange={e => setform({ ...form, cvc: methodModel.isNumber(e) })}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Zip Code<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                minLength={6}
                                maxLength={6}
                                value={form.zip_code}
                                onChange={e => setform({ ...form, zip_code: methodModel.isNumber(e) })}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Country<span className="star">*</span></label>
                            <SelectDropdown
                                isSingle={true}
                                id="statusDropdown"
                                displayValue="name"
                                placeholder="Select Country"
                                intialValue={form.country}
                                result={e => { setform({ ...form, country: e.value }) }}
                                options={country}
                            />
                            {submitted && !form.country ? <div className="text-danger">Country is Required</div> : <></>}
                        </div>
                    </div>
                    <div className="text-right">
                    <button type="button" className="btn btn-secondary discard mr-2" onClick={e=>{history.goBack()}}>Back</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </div>
            </form>
        </Layout>
    </>
}

export default AddEditCards