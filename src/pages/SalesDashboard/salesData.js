import axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Layout from '../../components/global/layout';
import environment from '../../environment';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import methodModel from '../../methods/methods';

const SalesData = () => {
    let user = useSelector(state => state.user)
    const searchState = useSelector((state) => state.search);
    const [orderslist, setOrderlist] = useState([])
    const [filters, setFilter] = useState({ page: 1, count: 50, search:'' })
    const history = useHistory()

    const getOrders = (p = {}) => {
        loader(true)
        let filter = { ...filters, ...p }
        ApiClient.get('api/orders', filter).then(res => {
            if (res.success) {
                let data=res.data.map(itm=>{
                    let totalQuantity=0
                    itm?.items?.map(oitm=>{
                      totalQuantity=totalQuantity+oitm.totalQuantity
                    })
                    return{
                      ...itm,
                      totalQuantity:totalQuantity
                    }
                  })
                setOrderlist(data)
            }
            loader(false)
        })
    }
    useEffect(() => {
        getOrders()
    }, [])

    const vieworder=(id)=>{
        history.push("/dashboard/orderdetail/"+id)
    }

    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getOrders({ search: searchState.data, page: 1 })
        }
    }, [searchState])

    const filter=(p={})=>{
        getOrders(p)
    }

    const isClear=()=>{
        let value=false
        let p={
            search:'',
        }
        Object.keys(p).map(itm=>{
            if(filters[itm]) value=true 
        })
        return value
    }

    const clear=()=>{
        let p={
            search:'',
            page:1
        }
        setFilter({...filters,...p})
        getOrders(p)
    }

    const exportfun=async()=>{
        const token=await localStorage.getItem("token");
        const req = await axios({
            method: "get",
            url: `${environment.api}api/orders/export`,
            responseType: "blob",
            body:{token:token}
          });
          var blob = new Blob([req.data], {
            type: req.headers["content-type"],
          });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `Sales Data.xlsx`;
          link.click();
    }

    return (
        <Layout>
            <div className="container-fluid">
                <div className='d-flex justify-content-between border-bottom pb-3'>
                    <h3 className='hedding '>Sales Data</h3>
                    <button className='btn btn-primary' onClick={e=>exportfun()}>Export</button>
                </div>
                <div className='row mt-3'>
                    <div className='col-md-6 mb-3'>
                        <label>Search by Reseller Name</label>
                        <input className='form-control' value={filters.search} onChange={e=>setFilter({...filters,search:e.target.value})} placeholder='search...' />
                    </div>
                    <div className='col-md-6 mb-4'>
                        <label>Date Range</label>
                        <input type='date' className='form-control' placeholder='search...' />
                    </div>
                    <div className='col dropDownSales'>
                        <div class="selectDropdown">
                            <div class="dropdown addDropdown">
                                <button class="btn btn-primary dropdown-toggle removeBg w-100" type="button" id="dropdownMenuButtonstatusDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sales Channel</button>
                                <div class="dropdown-menu shadow bg_hover leftAlignDrop" aria-labelledby="dropdownMenuButtonstatusDropdown">
                                    <a class="dropdown-item">Select </a>
                                    <a class="dropdown-item">sales1</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col dropDownSales'>
                        <div class="selectDropdown">
                            <div class="dropdown addDropdown">
                                <button class="btn btn-primary dropdown-toggle removeBg w-100" type="button" id="dropdownMenuButtonstatusDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Product Name</button>
                                <div class="dropdown-menu shadow bg_hover leftAlignDrop" aria-labelledby="dropdownMenuButtonstatusDropdown">
                                    <a class="dropdown-item">Select </a>
                                    <a class="dropdown-item">sales1</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col dropDownSales'>
                        <div class="selectDropdown">
                            <div class="dropdown addDropdown">
                                <button class="btn btn-primary dropdown-toggle removeBg w-100" type="button" id="dropdownMenuButtonstatusDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Category</button>
                                <div class="dropdown-menu shadow bg_hover leftAlignDrop" aria-labelledby="dropdownMenuButtonstatusDropdown">
                                    <a class="dropdown-item">Select </a>
                                    <a class="dropdown-item">sales1</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col dropDownSales'>
                        <div class="selectDropdown">
                            <div class="dropdown addDropdown reseller_status">
                                <button class="btn btn-primary dropdown-toggle removeBg w-100" type="button" id="dropdownMenuButtonstatusDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Coupon Code</button>
                                <div class="dropdown-menu shadow bg_hover leftAlignDrop" aria-labelledby="dropdownMenuButtonstatusDropdown">
                                    <a class="dropdown-item">Select </a>
                                    <a class="dropdown-item">coupon</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-sm-6 col-md-3 mb-4'>
                        <button className='btn btn-primary' onClick={e=>filter()}>Search</button>
                        {isClear()?<button className='btn btn-secondary ml-2' onClick={e=>clear()}>Clear</button>:<></>}
                        
                    </div>
                </div>
            </div>
            <div className="table-responsive table_section">
                <table class="table table-striped">
                    <thead className='table_head'>
                        <tr className='heading_row'>
                            <th scope="col" className='table_data'>Order Id</th>
                            <th scope="col" className='table_data'>Order Date & Time</th>
                            <th scope="col" className='table_data'>Customer Name</th>
                            <th scope="col" className='table_data'>Customer Email</th>
                            <th scope="col" className='table_data'>Product Name</th>
                            <th scope="col" className='table_data'>Number of Pax</th>
                            <th scope="col" className='table_data'>Order Amount</th>
                            <th scope="col" className='table_data'>Discounts</th>
                            <th scope="col" className='table_data'>Booking Date & Time</th>
                            <th scope="col" className='table_data'>Reseller & Reseller commissions</th>
                            <th scope="col" className='table_data'>Order Status</th>
                            <th scope="col" className='table_data'>Waiver Status</th>

                            {/* <th scope="col" className='table_data'>Gross Amount</th>
                            <th scope="col" className='table_data'>Surcharge</th>
                            <th scope="col" className='table_data'>Customer Contact No.</th>
                            <th scope="col" className='table_data'>Payment Method</th> */}
                            <th scope="col" className='table_data'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderslist && orderslist.map((itm, i) => {
                            return <tr className='data_row'>
                                <td className='table_dats' onClick={e => vieworder(itm.id)}>{itm.orderNumber}</td>
                                <td className='table_dats'>{moment(itm.dateCreated).format('MM-DD-YYYY')}<p className='phone_no'>{moment(itm.dateCreated).format('LT')}</p></td>
                                <td className='table_dats'>{itm?.customerName}</td>
                                <td className='table_dats'>{itm?.customer.email}<p className='phone_no'>{itm?.customer.phone}</p></td>
                                <td className='table_dats'>{itm?.items[0]?.productName}</td>
                                <td className='table_dats'>{itm.totalQuantity}</td>
                                <td className='table_dats'>{Number(itm.totalPaid)-Number(itm.commission)}</td>
                                <td className='table_dats'>--</td>
                                <td className='table_dats'>{moment(itm.dateConfirmed).format('MM-DD-YYYY')}<p className='phone_no'>{moment(itm.dateConfirmed).format('LT')}</p></td>
                                <td className='table_dats'>{itm?.sourceChannel}<p className='phone_no'>{itm?.commission} {itm?.totalCurrency}</p></td>
                                <td className='table_dats'> <div className={`user_hours ${itm.status}`}>
                                    <span className='contract'>
                                        {itm.status}
                                    </span>
                                </div></td>
                                <td className='table_dats'>--</td>

                                {/* <td className='table_dats'>{itm?.totalAmount}</td>
                                <td className='table_dats'>--</td>
                                <td className='table_dats'>{itm?.customer.phone}</td>
                                <td className='table_dats'>{itm.payments?<>
                                    {itm.payments[0].type}
                                </>:<></>}</td> */}
                                <td className='table_dats'><i class="material-icons" onClick={e => vieworder(itm.id)}>visibility</i></td>
                            </tr>
                        })
                        }
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default SalesData;
