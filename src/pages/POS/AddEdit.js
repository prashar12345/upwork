import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from 'react-redux';
import {  posType } from "../../models/type.model";
import { Link, useHistory, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import methodModel from "../../methods/methods";

const AddEditPOS = () => {
    const defaultvalue = () => {
        let keys = { ...posType }
        Object.keys(posType).map(itm => {
            if (itm != 'permissions') keys[itm] = ''
        })
        keys.status = 'active'
        return keys
    }
    const { id } = useParams()
    const [tab, setTab] = useState('form')
    const [form, setform] = useState(posType)
    const [activePlan, setActivePlan] = useState()
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState([])
    const history = useHistory()
    const [submitted, setSubmitted] = useState(false)
    const user = useSelector((state) => state.user);
    const formValidation = [
        { key: 'name', required: true }
    ]

    const getActivePlan=()=>{
        ApiClient.get('api/my/plan').then(res=>{
            if(res.success){
                setActivePlan(res.data)
            }
        })
    }

    const getProducts=()=>{
        ApiClient.get('api/products/listing',{page:1,count:50}).then(res=>{
            if(res.success){
                setProducts(res.data)
            }
        })
    }

    const selectProduct=(id)=>{
        let sp=selectedProduct
        if(sp.find(itm=>itm==id)){
            sp= sp.filter(itm=>itm!=id)
        }else{
            sp.push(id)
        }
        setSelectedProduct([...sp])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid) return
        let method = 'post'
        let url = 'api/pos'
        let value = {
            ...form
        }
        if (value.id) {
            method = 'put'
            url = 'api/pos/update'
        } else {
            delete value.id
        }
        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                history.push("/pos")
            }
            loader(false)
        })
    }

    useEffect(() => {
        if (id) {
            loader(true)
            ApiClient.get('api/pos/detail', { id }).then(res => {
                if (res.success) {
                    let value = res.data
                    let payload = posType
                    Object.keys(payload).map(itm => {
                        payload[itm] = value[itm]
                    })
                    if (value.permissions) {
                        payload.permissions = { ...value.permissions[0] }
                        // payload.permissions={ ...payload.permissions,...value.permissions}
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
        getProducts()
        getActivePlan()
    }, [id])

    return <>
        <Layout>
            {tab=='form'?<>
            <form onSubmit={handleSubmit}>
                <div className="pprofile1">
                    <h3 className="ViewUser mb-3">{form && form.id ? 'Edit' : 'Add'} Booking System</h3>

                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label>Name<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.name}
                                onChange={e => setform({ ...form, name: e.target.value })}
                                required
                            />
                        </div>

                        {/* <div className="col-md-12 mb-3">
                            <label>Name<span className="star">*</span></label>
                            <SelectDropdown
                                id="statusDropdown"
                                displayValue="name"
                                placeholder="Select Booking System"
                                intialValue={form.name}
                                result={e => {setform({...form,name:e.value})}}
                                options={bookingSystemModel.list}
                            />
                             {submitted && !form.name?<div className="text-danger">Name is Required</div>:<></>}
                        </div> */}
                        <div className="col-md-12 mb-3">
                            <label>Api Key<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.apiKey}
                                onChange={e => setform({ ...form, apiKey: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-12 mb-3">
                            <label>Url<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.url}
                                onChange={e => setform({ ...form, url: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="text-right">
                    <Link to="/pos" className="btn btn-secondary discard mr-2">Back</Link>
                        <button type="submit" className="btn btn-primary">Next</button>
                    </div>
                </div>
            </form>
            </>:<>
            {activePlan?.id?<>
                <h4>Select Products</h4>
                <p>{selectedProduct.length} Selected {selectedProduct.length>activePlan?.planId?.allowedProducts?<span className="text-danger">({selectedProduct.length-activePlan?.planId?.allowedProducts} Extra Products) <i className="fa fa-info" title={`You Will pay exta ${activePlan?.planId?.extraProductPrice?.[activePlan?.subscription.currency]} ${activePlan?.subscription.currency} per product`} id="infoTooltip" onmouseover="tooltiphover('infoTooltip')" data-toggle="tooltip" data-placement="top"></i></span>:<></>}</p>
            <div className="table-responsive table-striped prodictable">
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Category / Sub Category</th>
                        <th>Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(itm=>{
                        return <tr>
                        <td> <input type="checkbox" checked={selectedProduct.includes(itm.id)} onChange={e=>selectProduct(itm.id)}/></td>
                        <td>{itm.name}</td>
                        <td>{itm.productType}</td>
                        <td>{itm.sale}</td>
                    </tr>
                    })}
                    
                </tbody>
            </table>
            </div>

            <div className="text-right mt-3">
                <button className="btn btn-primary">Save</button>
            </div>
            </>:<>
            Please Purchase a plan
            </>}
            </>}
        </Layout>
    </>
}

export default AddEditPOS