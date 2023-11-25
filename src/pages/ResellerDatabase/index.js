import React, { useState, useEffect } from 'react';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
import './style.scss'
import SelectDropdown from '../../components/common/SelectDropdown';
import loader from '../../methods/loader';
import methodModel from '../../methods/methods';
import datepipeModel from '../../models/datepipemodel';
import { useHistory } from 'react-router-dom';
import DatePicker from "react-datepicker";
import axios from 'axios';
import environment from '../../environment';
import { toast } from 'react-toastify';
import Select from "react-select";

const ResellerDatabase = () => {
    const [filters, setfilter] = useState({ page: 1, count: 50, search: '', country: '', contractStatus: '', status: '', contractDate: '' })
    const [data, setdata] = useState([])
    const [categories, setCategories] = useState([])
    const [resendForm, setResendForm] = useState({email:'',emails:[]})
    const [country, setCountry] = useState([
        { id: 'us', name: 'United States' }
    ])
    const contractStatus = [
        { id: 'Not Sent', name: 'Not Sent' },
        { id: 'Pending', name: 'Pending' },
        { id: 'Signed', name: 'Signed' },
    ]
    const status = [
        { id: 'active', name: 'Active' },
        { id: 'deactive', name: 'Inactive' },
    ]
    const history = useHistory()
    const getcategories = () => {
        const payload = {
            catType: '64b23b7d690d1d5f7ae76102',
        }
        ApiClient.get(`api/categories/listing`, payload).then(res => {
            if (res.success) {
                setCategories(res.data)
            }
        })
    }

    const getCountries = () => {
        ApiClient.get('api/country/listing', { status: 'active' }).then(res => {
            if (res.success) {
                setCountry(res.data.map(itm => {
                    return {
                        label: itm.name,
                        value: itm.id
                    }
                }))
            }
        })
    }
    useEffect(() => {
        getcategories()
        getCountries()
        getData()
    }, [])

    const handleUpdate = (p = {}) => {
        setfilter({ ...filters, ...p })
        getData({ ...p })
    }

    const statusChange = (itm) => {
        let status = 'active'
        if (itm.status == 'active') status = 'deactive'

        if (window.confirm(`Do you want to ${status == 'active' ? 'Activate' : 'Inactive'} this`)) {
            loader(true)
            ApiClient.put(`api/reseller/status/change`, { id: itm.id, status }).then(res => {
                if (res.success) {
                    getData()
                }
                loader(false)
            })
        }
    }

    const getData = (p) => {
        let filter = {
            ...filters,
            ...p
        }
        loader(true)
        ApiClient.get('api/reseller/data', filter).then(res => {
            if (res.success) {
                setdata(res.data)
            }
            loader(false)
        })
    }

    const resendConfirm=(itm)=>{
        document.getElementById("conformPupupBtn").click()
        setResendForm({
            emails:[itm.contactEmail],
            email:'',
            contractId:itm.contracts._id
        })
    }

    const resend = (e) => {
        if(!resendForm.emails.length){
            return
        }

        loader(true)
        ApiClient.put('api/resend/contract',{emails:resendForm.emails,contractId:resendForm.contractId}).then(res => {
            if (res.success) {
                toast.success(res.message)
                getData()
                document.getElementById("closeConfirm").click()
            } else {
                loader(true)
            }
        })
    }

    const addEmails=(e)=>{
        if(e) e.preventDefault()
        let emails=resendForm.emails
        emails.push(resendForm.email)
        setResendForm({...resendForm,emails:[...emails],email:''})
    }

    const removeEmail=(index)=>{
        let emails=resendForm.emails
        emails=emails.filter((itm,i)=>i!=index)
        setResendForm({...resendForm,emails:[...emails]})
    }

    const exportfun = async () => {
        const token = localStorage.getItem("token");
        loader(true)
        const req = await axios({
            method: "get",
            url: `${environment.api}api/reseller/excel`,
            responseType: "blob",
            body: { token: token }
        });
        var blob = new Blob([req.data], {
            type: req.headers["content-type"],
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `Reseller Database.xlsx`;
        link.click();
        loader(false)
    }
    const view = (id) => {
        history.push(`/databaseReseller/view/${id}`)
    }

    const edit = (id) => {
        history.push(`/databaseReseller/edit/${id}`)
    }

    const clearFilterKey = {
        search: '',
        country: '',
        contractStatus: '',
        status: '',
        contractDate: ''
    }

    const clear = () => {
        let filter = clearFilterKey
        Object.keys(clearFilterKey).map(itm => {
            filter[itm] = ''
        })
        setfilter({ ...filters, ...filter })
        getData(filter)
    }

    const showClear = () => {
        let value = false
        Object.keys(clearFilterKey).map(itm => {
            if (filters[itm]) value = true
        })

        return value
    }

    const handlecountry = () => {
        let value = ''
        if (filters.country) {
            value = country && country.find(item => item.value == filters.country)
        }
        return value
    }

    return (
        <Layout>
            <div className="container-fluid">
                <div className='d-flex justify-content-between border-bottom pb-3'>
                    <h3 className='hedding '>Reseller Database</h3>
                    <button className='btn btn-primary' onClick={e => exportfun()}>Export</button>
                </div>
                <div className='row mt-3'>
                    <div className='col-12 col-sm-6 col-md-3 mb-4'>
                        <input className='form-control' placeholder='Search' value={filters.search} onChange={e => setfilter({ ...filters, search: e.target.value })} />
                    </div>
                    <div className='col-12 col-sm-6 col-md-3 mb-4 dropDownSales'>
                        <div class="selectDropdown">
                            <Select
                                options={country}
                                placeholder="Select Country"
                                isClearable={true}
                                name="country"
                                required
                                value={handlecountry()}
                                onChange={e => handleUpdate({ country: e ? e.value : '' })}
                            />
                        </div>
                    </div>
                    <div className='col-12 col-sm-6 col-md-3 mb-4'>
                        <div className='form-row'>
                            <div className='col-md-6'><input className='form-control' placeholder='Commission Start' /></div>
                            <div className='col-md-6'><input className='form-control' placeholder='Commission End' /></div>
                        </div>
                    </div>
                    <div className='col-12 col-sm-6 col-md-3 mb-4'>
                        <DatePicker
                            className="form-control"
                            selected={filters.contractDate ? new Date(filters.contractDate) : ''}
                            placeholderText="Contract Date"
                            name="contractDate"
                            required
                            minDate={new Date()}
                            onChange={(date) => { handleUpdate({ contractDate: datepipeModel.datetostring(date) }) }}
                            onKeyDown={(e) => {
                                e.preventDefault();
                            }}
                        />
                    </div>
                    <div className='col-12 col-sm-6 col-md-3 mb-4 dropDownSales'>
                        <div class="selectDropdown">
                            <SelectDropdown
                                isSingle={true}
                                id="statusDropdown"
                                displayValue="name"
                                placeholder='Contract Status'
                                intialValue={filters.contractStatus}
                                result={e => handleUpdate({ contractStatus: e.value })}
                                options={contractStatus}
                            />
                        </div>
                    </div>
                    <div className='col-12 col-sm-6 col-md-3 mb-4 dropDownSales'>
                        <div class="selectDropdown">
                            <SelectDropdown
                                isSingle={true}
                                id="statusDropdown"
                                displayValue="name"
                                placeholder='Reseller Status'
                                intialValue={filters.status}
                                result={e => handleUpdate({ status: e.value })}
                                options={status}
                            />
                        </div>
                    </div>
                    <div className='col-12 col-sm-6 col-md-3 mb-4'>
                        <button className='btn btn-primary' onClick={e => getData()}>Search</button>
                        {showClear() ? <button className='btn btn-secondary ml-2' onClick={e => clear()}>Clear</button> : <></>}

                    </div>

                    <div className="table-responsive table_section">
                        <table class="table table-striped">
                            <thead className='table_head'>
                                <tr className='heading_row'>
                                    <th scope="col" className='table_data'>Name of Reseller</th>
                                    <th scope="col" className='table_data'>Reseller Type</th>
                                    <th scope="col" className='table_data'>Contact Person</th>
                                    <th scope="col" className='table_data'>Contact Details</th>
                                    <th scope="col" className='table_data'>Country</th>
                                    <th scope="col" className='table_data'>Start Date of Contract</th>
                                    <th scope="col" className='table_data'>Contract Status</th>
                                    <th scope="col" className='table_data'>Contract Sent Date</th>
                                    <th scope="col" className='table_data'>Contract Signed Date</th>
                                    <th scope="col" className='table_data'>Commissions(%)</th>
                                    <th scope="col" className='table_data'>Life time Sales</th>
                                    <th scope="col" className='table_data'>Last Order Date</th>
                                    <th scope="col" className='table_data'>Contract Copy</th>
                                    <th scope="col" className='table_data'>Status</th>
                                    <th scope="col" className='table_data'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(itm => {
                                    return <tr className='data_row'>
                                        <td className='table_dats' onClick={e => view(itm.id)}>{itm.name}</td>
                                        <td className='table_dats'>{itm?.category?.name || '--'}</td>
                                        <td className='table_dats'>{itm.contactPerson || '--'}</td>
                                        <td className='table_dats'>
                                            <div className='user_detail'>
                                                <img src={methodModel.userImg(itm.logo)} className="user_imgs" />

                                                <div className='user_name'>
                                                    <h4 className='user mb-1'>
                                                        {itm.contactEmail}
                                                    </h4>
                                                    <p className='user_info'>
                                                        {itm.contactPhone}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='table_dats'>{itm?.country?.name || '--'}</td>
                                        <td className='table_dats'> {datepipeModel.date(itm.contracts?.createdAt)} </td>
                                        <td className='table_dats'>{itm.contracts?.status || '--'}</td>
                                        <td className='table_dats'>{datepipeModel.date(itm.contracts?.contractSentAt) || '--'}</td>
                                        <td className='table_dats'>{datepipeModel.date(itm.contracts?.contractSignedAt) || '--'}</td>
                                        <td className='table_dats'>{itm?.commisionPersent ? itm.commisionPersent?.toFixed(2) + '%' : '--'}  </td>
                                        <td className='table_dats'>{itm.lifeTimeSale || '--'}</td>
                                        <td className='table_dats'>{datepipeModel.date(itm.lastOrderDate)}</td>
                                        <td className='table_dats'>N/A</td>
                                        <td className='table_dats'>{itm.status}</td>

                                        <td className='table_dats'>
                                            <div className="action_icons">
                                                <a className="edit_icon ml-1" title='Edit' onClick={e => edit(itm.id)}>
                                                    <i class="material-icons edit">edit</i>
                                                </a>
                                                <a className="edit_icon ml-1" title='View' onClick={e => view(itm.id)}>
                                                    <i class="material-icons edit">visibility</i>
                                                </a>
                                                <a className="edit_icon ml-1" title={itm.status == 'active' ? 'Active' : 'Inactive'} onClick={e => statusChange(itm)}>
                                                    <i class="material-icons edit">{itm.status == 'active' ? 'toggle_on' : 'toggle_off'}</i>
                                                </a>
                                                {itm.contracts?.status == 'Signed' || itm.contracts?.status?.toLowerCase() == 'pending' ? <>
                                                    <a className="edit_icon ml-1" title='Resend Signed contract' onClick={e => resendConfirm(itm)}>
                                                        <i class="material-icons edit">send</i>
                                                    </a>
                                                </> : <></>}

                                            </div>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <button type="button" class="btn btn-primary d-none" data-toggle="modal" data-target="#confirmPopup" id='conformPupupBtn'></button>

            <div class="modal fade" id="confirmPopup" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Resend Contract</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" id='closeConfirm'>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                       
                            <div class="modal-body">
                                <label>Email</label>
                                <form onSubmit={addEmails}>
                                <div className='d-flex'>
                                <input type="email" className='form-control' required value={resendForm.email} onChange={e=>setResendForm({...resendForm,email:e.target.value})} />
                                <button className='btn btn-primary ml-2' type='submit'>
                                    Add
                                </button>
                                </div>
                                </form>
                                <div>
                                    {resendForm.emails.map((itm,i)=>{
                                        return <span className='badge badge-primary m-1'>{itm}
                                        {i!=0?<i className='fa fa-times ml-2' onClick={e=>removeEmail(i)}></i>:<></>}
                                        </span>
                                    })}
                                    
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onClick={e=>resend()}>Send</button>
                            </div>
                        
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ResellerDatabase;
