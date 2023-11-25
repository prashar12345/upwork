import React, { useEffect, useState } from "react";
import Layout from '../../components/global/layout';
import { Link } from 'react-router-dom';
import ApiClient from "../../methods/api/apiClient";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

const BuyExtraProdcts = () => {
    const [loaging, setLoader] = useState(false)
    const [total, setTotal] = useState(0)
    const [data,setData] = useState()
    const history = useHistory()

    useEffect(()=>{
        getData()
    },[])
    const getData = (p = {}) => {
        setLoader(true)
        ApiClient.get(`api/cards/listing`).then(res => {
            if (res.success) {
                setData(res.data.map(itm => {
                    itm.id = itm.id
                    return itm
                }))
                setTotal(res.data.length)
            }
            setLoader(false)
        })
    }

    const statusChange = (itm) => {
        if (window.confirm(`Do you want to set this card primary`)) {
            setLoader(true)
            ApiClient.put(`api/primary/card`, { card_id: itm }).then(res => {
                if (res.success) {
                    getData()
                }
                setLoader(false)
            })
        }
    }

    const handlePay=()=>{
        alert('Payment Done')
        // ApiClient.post(``).then(res=>{
        //     if(res.success){
        //         toast.success(res.message)
        //         history.push(`productData`)
        //     }
        // })
    }

    return (
        <>
            <Layout>
                <div className="d-flex justify-content-between align-items-center mb-1">
                    <h3 className="hedding">
                        Select Payment Method
                    </h3>
                </div>
                <div className="table-responsive table_section">
                    <table class="table table-striped">
                        <thead className='table_head'>
                            <tr className='heading_row'>
                                <th scope="col" className='table_data'>Last Digits</th>
                                <th scope="col" className='table_data'>Brand</th>
                                <th scope="col" className='table_data'>Expire Month</th>
                                <th scope="col" className='table_data'>Expire Year</th>
                                <th scope="col" className='table_data'>Primary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loaging && data && data.map((itm, i) => {
                                return <tr className='data_row'>
                                    <td className='table_dats'>{itm.last4}</td>
                                    <td className='table_dats pointer'>{itm.brand}</td>
                                    <td className='table_dats pointer'>{itm.exp_month}</td>
                                    <td className='table_dats pointer'>{itm.exp_year}</td>
                                    <td className='table_dats'><div className={`user_hours`} >
                                        {itm.isDefault == false ?
                                            <input type='radio' name='primary' checked={false} onClick={() => statusChange(itm.card_id)} />
                                            :
                                            <input type='radio' name='primary' checked />
                                        }
                                    </div></td>
                                </tr>
                            })
                            }
                        </tbody>
                    </table>
                    <span className='float-right'>
                        <button type="button" className="btn btn-secondary discard mr-2" onClick={e => { history.goBack() }}>Back</button>
                        <Link className="btn btn-primary mr-2" to="/card/add">
                            Add Card
                        </Link>
                        <button className='btn btn-primary' onClick={e => handlePay()}>Pay</button>
                    </span>
                </div>
                {!loaging && !total ? <div className="py-3 text-center">No Data</div> : <></>}
                {loaging ? <div className="text-center py-4">
                    <img src="/assets/img/loader.gif" className="pageLoader" />
                </div> : <></>}
            </Layout>
        </>
    )
}
export default BuyExtraProdcts
