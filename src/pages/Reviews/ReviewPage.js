import React, { useState } from "react";
import Layout from "../../components/global/layout";
import ApiClient from "../../methods/api/apiClient";
import { useHistory } from "react-router-dom";

const ReviewPage = () => {
    const [data, setData] = useState()
    const [loading, setLoader] = useState(false)
    const history = useHistory()
    const [total, settotal] = useState('1')
    const [id, setid] = useState([])

    const findAddress = (address) => {
        if (address) {
            setLoader(true)
            ApiClient.get(`api/tripadvisior/locations?address=${address}`,{},'',true).then(res => {
                if (res.success) {
                    setData(res.data)
                }
                else{
                    setData([])
                    settotal('0')
                }
                setLoader(false)
            })
        }
    }

    const getLocation = () => {
        let payload = {
            locationId: data.filter(item=>{
                if(id.includes(item.location_id)){
                    return (item)
                }
            })
        }
        ApiClient.post(`api/tripadvisior/reviews`, payload).then(res => {
            if (res.success) {
                history.push(`/reviews`)
            }
        })
    }

    const back = () => {
        history.goBack()
    }

    const checksAll=()=>{
        let value = true
        data && data.find(item => {
            if (id.includes(item.location_id)) {
            }
            else (
                value = false
            )
        })
        return value
    }

    const checksAllLocation=(checked)=>{
        if (checked) {
            console.log(data,'Data is here');
            setid(data.map(item=>item.location_id))
        }
        else {
            setid([])
        }
    }

    const checksLocation=(item,checked)=>{
        let array = id
        if (checked) {
            array.push(item.location_id)
        }
        else {
            array = array.filter(itm => itm != item.location_id)
        }
        setid([...array])
    }

    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="">Review Page</h1>
                <button type="button" className="btn btn-primary float-right" onClick={e => back()}>Back</button>
            </div>
            <div className="pprofile1">
                <div className="form-row">
                    <div className="col-md-6 d-flex">
                        {/* <GooglePlaceAutoComplete
                                value={form.address}
                                result={addressResult}
                                id="address"
                                placeholder=""
                            /> */}
                        <input type='text' onChange={e => findAddress(e.target.value)} placeholder="Search here" className="form-control" />
                        {/* <button type="submit" className="btn btn-primary ml-3 search-btn">Search</button> */}
                    </div>
                </div>
                {data ?
                    <div className="table-responsive table_section">
                        {id.length!=0?<button type="button" onClick={e=> getLocation()} className="btn btn-primary float-right">Get Review</button>:null}
                        <table class="table table-striped">
                            <thead className='table_head'>
                                <tr className='heading_row'>
                                    <th scope="col" className='table_data'><input type='checkbox' checked={checksAll()} onClick={e=> checksAllLocation(e.target.checked)}/></th>
                                    <th scope="col" className='table_data'>Location</th>
                                    <th scope="col" className='table_data'>Country</th>
                                    <th scope="col" className='table_data'>City</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.map((itm, i) => {
                                    return <tr className='data_row'>
                                        <td className='table_dats'><input type='checkbox' checked={id.includes(itm.location_id)} onClick={e=> checksLocation(itm,e.target.checked)}/></td>
                                        <td className='table_dats'>{itm?.name}</td>
                                        <td className='table_dats pointer'>{itm?.address_obj?.country}</td>
                                        <td className='table_dats pointer'>{itm?.address_obj?.city}</td>
                                    </tr>
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                    : null}
            </div>
            {loading ? <div className="text-center py-4">
                <img src="/assets/img/loader.gif" className="pageLoader" />
            </div> : <></>}
            {data?.length==0 && total == '0' && !loading?
            <p className="text-center">Data Not Found</p>:null}
        </Layout>
    )
}

export default ReviewPage