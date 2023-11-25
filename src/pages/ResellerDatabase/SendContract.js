import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import ApiClient from "../../methods/api/apiClient"
import loader from "../../methods/loader"
import methodModel from "../../methods/methods"
import SignatureCanvas from 'react-signature-canvas';
import PageLayout from "../../components/global/PageLayout";
import datepipeModel from "../../models/datepipemodel";

const SendContract = () => {
    const [detail, setDetail] = useState()
    const [form, setForm] = useState({sign:''})
    const [submitted, setSubmitted] = useState(false)

    const sigRef = useRef();
    
    const handleSignatureEnd = () => {
        setForm({...form,sign:sigRef.current.toDataURL()})
    }
    const clearSignature = () => {
        sigRef.current.clear();
        setForm({...form,sign:null})
    }

    const history = useHistory()
    const back = () => {
        history.goBack()
    }

    const getDetail = () => {
        loader(true)
        ApiClient.get('api/contract', { id: methodModel.getPrams('id') }).then(res => {
            if (res.success) {
                let data=res.data
                let content=data.contract.content
    
                content=content.replaceAll('${resellerName}',data.reseller.name)
               content=content.replaceAll('${contractStartDate}',datepipeModel.date(data.createdAt))
                data.contract.content=content
                console.log("data",data)
                setDetail(data)
            }
            loader(false)
        })
    }


    const send = (e) => {
        let payload = {
            contractId: methodModel.getPrams('id'),
            sign: form.sign,
        }
        // console.log("payload",payload)
        // return
        loader(true)
        ApiClient.put('api/contract?id='+payload.contractId, payload).then(res => {
            if (res.success) {
                toast.success(res.message)
                history.push('/thanku')
            }
            loader(false)
        })
    }

    useEffect(() => {
        getDetail()
    }, [])

    return <>
        <PageLayout>
            <div className="container">

      
            <div className="d-flex justify-content-between align-items-center mb-3">
        
                {/* <button className="btn btn-primary profiles" onClick={back}>
                    Back
                </button> */}
            </div>
            <div className="company_cards p-3">
            <h3 className='hedding mb-3'>Contract Sign</h3>
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <p className="company_details">Contract</p>
                        <div>{detail?.contract?.name}</div>
                    </div>
                    <div className="col-md-12 mb-3">
                        <p className="company_details">Body</p>
                        <div className="p-2 border" dangerouslySetInnerHTML={{ __html: detail?.contract?.content }}></div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <p className="company_details">Supplier Sign</p>
                        <div>
                            <img src={detail?.sellerSign} width="250" />
                        </div>
                        <div className="signName">{detail?.addedBy?.fullName}</div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <p className="company_details">Signature</p>
                        <SignatureCanvas
                            penColor="green"
                            canvasProps={{ width: 300, height: 80,className: 'signature' }}
                            ref={sigRef}
                            onEnd={handleSignatureEnd}
                        />
                            <div className="signName">{detail?.reseller?.name}</div>
                    </div>
                    <div className="col-md-12 mb-3 text-right">
                        <button className="btn btn-secondary mr-2" type="button" onClick={clearSignature}>Clear Signature</button>
                        <button className="btn btn-primary" onClick={send}>Send</button>
                    </div>
                </div>
            </div>
            </div>
        </PageLayout>
    </>
}

export default SendContract