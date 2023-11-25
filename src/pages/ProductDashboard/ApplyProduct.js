import Layout from '../../components/global/layout';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SelectDropdown from '../../components/common/SelectDropdown';
import ApiClient from '../../methods/api/apiClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApplyProduct = () => {
    const { id } = useParams()
    const [price, setprice] = useState()
    const history = useHistory()
    const [dynamicId, setdynamicId] = useState()
    const [filter, setFilter] = useState({ page: 1, count: 50, search: '', year: '', type: '' })

    const getPrice = () => {
        ApiClient.get(`api/dynamic/pricing/listing`, filter).then(res => {
            if (res.success) {
                setprice(res.data)
            }
        })
    }
    useEffect(() => {
        getPrice()
    }, [])

    const apply = () => {
        if (!dynamicId) {
            toast.error('Please Select Dynamic Price First.')
            return
        }
        ApiClient.post(`api/apply/template`, { dynamicPricingId: dynamicId, productId: id }).then(res => {
            if (res.success) {
                setTimeout(() => {
                    toast.success(res.message)
                }, 200);
                history.push('/productData')
            }
        })
    }

    const goBack = () => {
        history.goBack()
    }

    return (
        <Layout>
            <div className="container-fluid">
                <div className='d-flex justify-content-between border-bottom pb-3'>
                    <h3 className='hedding '>Apply Dynamic Pricing</h3>
                </div>
                <div className='row mt-3'>
                    <div className='col-md-6'>
                        <SelectDropdown
                            isSingle={true}
                            id="statusDropdown"
                            displayValue="name"
                            placeholder="Select Price"
                            intialValue={dynamicId}
                            result={e => setdynamicId(e.value)}
                            options={price}
                        />
                    </div>
                </div>
                <div className='mt-3 float-right'>
                    <button type='button' className='btn btn-secondary mr-2 discard' onClick={e => goBack()}>Back</button>
                    <button type='button' className='btn btn-primary' onClick={e => apply()}>Apply</button>
                </div>
            </div> 
        </Layout>
    )

}
export default ApplyProduct