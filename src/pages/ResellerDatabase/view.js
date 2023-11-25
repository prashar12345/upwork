import React, { useEffect, useRef, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import SelectDropdown from "../../components/common/SelectDropdown"
import Layout from "../../components/global/layout"
import ApiClient from "../../methods/api/apiClient"
import loader from "../../methods/loader"
import datepipeModel from "../../models/datepipemodel"
import SignatureCanvas from 'react-signature-canvas';
import Resellerdashboard from "../ResellerDashboard"
import methodModel from "../../methods/methods"
import { useSelector } from "react-redux"

const ViewReseller = () => {
    const user = useSelector((state) => state.user);
    const [detail, setDetail] = useState()
    const contractType = { reseller: '', contract: '', sellerSign: '' }
    const [form, setForm] = useState({ ...contractType })
    const [contracts, setContracts] = useState([])
    const [tab, setTab] = useState('detail')
    const [contractTab, setContractTab] = useState('form')
    const [previewData, setPreviewData] = useState()
    const [submitted, setSubmitted] = useState(false)
    const [resendForm, setResendForm] = useState({ email: '', emails: [] })
    const sigRef = useRef();

    const handleSignatureEnd = () => {
        setForm({ ...form, sellerSign: sigRef.current.toDataURL() })
    }
    const clearSignature = () => {
        sigRef.current.clear();
        setForm({ ...form, sellerSign: null })
    }


    const history = useHistory()
    const { id } = useParams()
    const back = () => {
        history.goBack()
    }

    const tabChange=(t)=>{
        setTab(t)
        history.push(`/databaseReseller/view/${id}?tab=${t}`)
    }

    const getDetail = () => {
        loader(true)
        ApiClient.get('api/reseller/detail', { id: id }).then(res => {
            if (res.success) {
                let data=res.data
                setDetail(data)
                setPreviewData({
                    content: data.contracts?.contract.content,
                    contractId:data.contracts?.contract._id,
                    sellerSign: data.contracts?.sellerSign,
                    sign: data.contracts?.sign
                })

                let t=methodModel.getPrams('tab')
                if(t){
                    tabChange(t)
                    if(t=='contract'){
                        setContractTab('preview')
                    }
                }
            }
            loader(false)
        })
    }

    const getcontracts = () => {
        ApiClient.get('api/contract/templates/listing', { status: 'active' }).then(res => {
            if (res.success) {
                setContracts(res.data)
            }
        })
    }

    const sendContact = (id, next = false) => {
        if (!next) {
            setContractTab('preview')
            setPreviewData({
                content: detail.contracts?.contract.content,
                contractId:detail.contracts?.contract._id,
                sellerSign: detail.contracts?.sellerSign,
                sign: detail.contracts?.sign
            })
            return
        }
        loader(true)
        ApiClient.post('api/send/contract', { contractId: id, emails: [detail.contactEmail] }).then(res => {
            if (res.success) {
                toast.success(res.message)
                getDetail()
            } else {
                loader(true)
            }
        })
    }

    const resendConfirm = (next = false) => {
        if (!next) {
            setContractTab('preview')
            setPreviewData({
                content: detail.contracts?.contract.content,
                contractId:detail.contracts?.contract._id,
                sellerSign: detail.contracts?.sellerSign,
                sign: detail.contracts?.sign
            })
            return
        }

        document.getElementById("conformPupupBtn").click()
        setResendForm({
            emails: [detail.contactEmail],
            email: '',
            contractId: detail.contracts.id
        })
    }

    const resend = (e) => {
        if (!resendForm.emails.length) {
            return
        }

        loader(true)
        ApiClient.put('api/resend/contract', { emails: resendForm.emails, contractId: resendForm.contractId }).then(res => {
            if (res.success) {
                toast.success(res.message)
                getDetail()
                setContractTab('form')
                document.getElementById("closeConfirm").click()
            } else {
                loader(true)
            }
        })
    }

    const addEmails = (e) => {
        if (e) e.preventDefault()
        let emails = resendForm.emails
        emails.push(resendForm.email)
        setResendForm({ ...resendForm, emails: [...emails], email: '' })
    }

    const removeEmail = (index) => {
        let emails = resendForm.emails
        emails = emails.filter((itm, i) => i != index)
        setResendForm({ ...resendForm, emails: [...emails] })
    }

    const addContract = (e = '', submit = false) => {
        if (e) e.preventDefault()
        setSubmitted(true)
        if (!form.contract || !form.sellerSign) return

        let payload = {
            reseller: id,
            contract: [form.contract],
            sellerSign: form.sellerSign
        }

        if (!submit) {
            setContractTab('preview')
            let contract = contracts.find(itm => itm.id = form.contract)
            setPreviewData({
                content: contract?.content,
                sellerSign: form.sellerSign,
                contractId:detail.contracts?.contract._id
            })
            return
        }

        loader(true)
        ApiClient.post('api/contract/create', payload).then(res => {
            if (res.success) {
                toast.success(res.message)
                getDetail()
                setContractTab('form')
            } else {
                loader(false)
            }

        })
    }

    useEffect(() => {
        getcontracts()
        getDetail()
    }, [])


    const Preview = () => {
        return <>
            <h5>Preview</h5>
            <div className="form-row">
                <div className="col-md-12 mb-3">
                    <div className="p-3 border">
                        <div className="text-right">
                            <Link to={`/crm/edit/${previewData.contractId}`}><i className="fa fa-edit"></i></Link>
                        </div>
                        <div className="mb-3" dangerouslySetInnerHTML={{ __html: previewData?.content }}></div>
                    </div>
                </div>
                <div className="col-md-6">
                    <label>Supplier Sign</label>
                    <div>
                        <img src={previewData.sellerSign} width="250" />
                    </div>
                    <div className="signName">{user.fullName}</div>
                </div>
                <div className="col-md-6">
                    <label>Seller Sign</label>
                    <div>
                        <img src={previewData.sign} width="250" />
                    </div>
                    <div className="signName">{detail.name}</div>
                    
                </div>
            </div>
        </>
    }

    return <>
        <Layout>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className='hedding'>Reseller Detail</h3>
                <button className="btn btn-primary profiles" onClick={back}>
                    Back
                </button>
            </div>
            <div className="company_cards p-3">

                <ul class="nav nav-tabs mb-3">
                    <li class="nav-item">
                        <a class={`nav-link ${tab == 'dashboard' ? 'active' : ''}`} onClick={e => tabChange('dashboard')}>Dashboad</a>
                    </li>
                    <li class="nav-item">
                        <a class={`nav-link ${tab == 'detail' ? 'active' : ''}`} onClick={e => tabChange('detail')}>Basic Information</a>
                    </li>
                    <li class="nav-item">
                        <a class={`nav-link ${tab == 'contract' ? 'active' : ''}`} onClick={e => tabChange('contract')}>Contract</a>
                    </li>
                </ul>

                {tab == 'dashboard' ? <>
                    <Resellerdashboard />
                </> : <></>}

                {tab == 'detail' ? <>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <p className="company_details">Name of Reseller</p>
                            <h4 className="company_name">{detail?.name || '--'}</h4>
                        </div>
                        <div className="col-md-6 mb-3">
                            <p className="company_details">Reseller Type</p>
                            <h4 className="company_name">{detail?.category?.name || '--'}</h4>
                        </div>
                        <div className="col-md-6 mb-3">
                            <p className="company_details">Contact Person</p>
                            <h4 className="company_name">{detail?.contactPerson}</h4>
                        </div>
                        <div className="col-md-6 mb-3">
                            <p className="company_details">Contact Email</p>
                            <h4 className="company_name">{detail?.contactEmail || '--'}</h4>
                        </div>
                        <div className="col-md-6 mb-3">
                            <p className="company_details">Contact Phone</p>
                            <h4 className="company_name">{detail?.contactPhone || '--'}</h4>
                        </div>
                        <div className="col-md-6 mb-3">
                            <p className="company_details">Country</p>
                            <h4 className="company_name">{detail?.country?.name || '--'}</h4>
                        </div>
                        <div className="col-md-6 mb-3">
                            <p className="company_details">Commissions(%)</p>
                            <h4 className="company_name">{detail?.commisionPersent?.toFixed(2) || '--'}</h4>
                        </div>
                        <div className="col-md-6 mb-3">
                            <p className="company_details">Life time Sales</p>
                            <h4 className="company_name">{detail?.lifeTimeSale || '--'}</h4>
                        </div>
                        <div className="col-md-6 mb-3">
                            <p className="company_details">Last Order Date</p>
                            <h4 className="company_name">{datepipeModel.date(detail?.lastOrderDate)}</h4>
                        </div>
                        <div className="col-md-6 mb-3">
                            <p className="company_details">Status</p>
                            <h4 className="company_name">{detail?.status || '--'}</h4>
                        </div>
                    </div>
                </> : <></>}

                {tab == 'contract' ? <>
                    {detail?.contracts ? <>

                        {contractTab == 'form' ? <>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <p className="company_details">Start Date of Contract</p>
                                    <h4 className="company_name">{datepipeModel.date(detail?.contracts?.createdAt)}</h4>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <p className="company_details">Contact Status</p>
                                    <h4 className="company_name">{detail?.contracts?.status || '--'}</h4>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <p className="company_details">Contract Template</p>
                                    <h4 className="company_name">{detail?.contracts?.contract?.name || '--'}</h4>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <p className="company_details">Contract Sent Date</p>
                                    <h4 className="company_name">{datepipeModel.date(detail?.contracts?.contractSentAt)}</h4>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <p className="company_details">Contract Signed Date</p>
                                    <h4 className="company_name">{datepipeModel.date(detail?.contracts?.contractSignedAt)}</h4>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <p className="company_details">Supplier Sign</p>
                                    <div>
                                        {detail?.contracts?.sellerSign ? <img src={detail?.contracts?.sellerSign} className="border" /> : '--'}
                                    </div>
                                    <div className="signName">{user.fullName}</div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <p className="company_details">Reseller Sign</p>
                                    <div>
                                        {(detail?.contracts?.sign && detail?.contracts?.status == 'Signed') ? <img src={detail?.contracts?.sign} className="border" /> : '--'}
                                    </div>
                                    <div className="signName">{detail.name}</div>
                                </div>
                                <div className="col-md-12 mb-3 text-right">
                                    {detail?.contracts?.status != 'Signed' && detail?.contracts?.status?.toLowerCase() != 'pending' ? <>
                                        <button className="btn btn-primary" onClick={e => sendContact(detail?.contracts.id)}>Preview</button>
                                    </> : <>
                                        <button className="btn btn-primary" onClick={e => resendConfirm()}>Preview</button>
                                    </>}

                                </div>
                            </div>
                        </> : <>
                            <Preview />
                            <div className="text-right mt-3">
                                <button className="btn btn-secondary mr-2" type="button" onClick={e => setContractTab('form')}>Back</button>
                                {detail?.contracts?.status != 'Signed' && detail?.contracts?.status?.toLowerCase() != 'pending' ? <>
                                    <button className="btn btn-primary" onClick={e => sendContact(detail?.contracts.id, true)}>Send Contact</button>
                                </> : <>
                                    <button className="btn btn-primary" onClick={e => resendConfirm(true)}>Resend Contract</button>
                                </>}
                            </div>
                        </>}
                    </> : <>
                        {contractTab == 'form' ? <>
                            <form onSubmit={addContract}>
                                <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                        <label>Contract Template</label>
                                        <SelectDropdown
                                            isSingle={true}
                                            id="statusDropdown"
                                            displayValue="name"
                                            name='contract'
                                            placeholder="Select Contract"
                                            intialValue={form.contract}
                                            result={e => { setForm({ ...form, contract: e.value }) }}
                                            options={contracts}
                                        />
                                        {submitted && !form.contract ? <div className="text-danger">Contract is Required</div> : <></>}
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <p className="company_details">Signature</p>
                                        <SignatureCanvas
                                            penColor="green"
                                            canvasProps={{ width: 300, height: 80, className: 'signature' }}
                                            ref={sigRef}
                                            onEnd={handleSignatureEnd}
                                        />
                                        {submitted && !form.sellerSign ? <div className="text-danger">Signature is Required</div> : <></>}
                                    </div>
                                    <div className="col-md-12 mb-3 text-right">
                                        <button className="btn btn-secondary mr-2" type="button" onClick={clearSignature}>Clear Signature</button>
                                        <button className="btn btn-primary">Preview</button>
                                    </div>
                                </div>
                            </form>
                        </> : <>
                            <Preview />
                            <div className="text-right">
                                <button className="btn btn-secondary mr-2" type="button" onClick={e => setContractTab('form')}>Back</button>
                                <button className="btn btn-primary" onClick={e => addContract('', true)}>Create</button>
                            </div>
                        </>}

                    </>}
                </> : <></>}
            </div>
        </Layout>

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
                                <input type="email" className='form-control' required value={resendForm.email} onChange={e => setResendForm({ ...resendForm, email: e.target.value })} />
                                <button className='btn btn-primary ml-2' type='submit'>
                                    Add
                                </button>
                            </div>
                        </form>
                        <div>
                            {resendForm.emails.map((itm, i) => {
                                return <span className='badge badge-primary m-1'>{itm}
                                    {i != 0 ? <i className='fa fa-times ml-2' onClick={e => removeEmail(i)}></i> : <></>}
                                </span>
                            })}

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onClick={e => resend()}>Send</button>
                    </div>

                </div>
            </div>
        </div>
    </>
}

export default ViewReseller