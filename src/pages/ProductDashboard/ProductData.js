import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import { useSelector } from 'react-redux';
import axios from 'axios';
import environment from '../../environment';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelectDropdown from '../../components/common/SelectDropdown';
import dynamicPriceModel from '../../models/dynamicPrice.model';
import datepipeModel from '../../models/datepipemodel';
import countryModel from '../../models/country.model';
import Pagination from "react-pagination-js";

const ProductData = () => {
    const user = useSelector(state => state.user)
    const searchState = useSelector((state) => state.search);
    const [filters, setFilter] = useState({ page: 1, count: 48, search: '' })
    const [data, setdata] = useState()
    const history = useHistory()
    const [total, setTotal] = useState(0)
    const currentDate = moment(new Date()).format('MM-DD-YYYY')
    const [id, setid] = useState([])
    const [price, setprice] = useState()
    const [activePlan, setActivePlan] = useState()
    const [dynamicId, setdynamicId] = useState()

    const getProducts = (p = {}) => {
        loader(true)
        let filter = { ...filters, ...p }
        ApiClient.get(`api/products/listing`, filter).then(res => {
            if (res.success) {
                setdata(res.data)
                setTotal(res.total)
            }
            loader(false)
        })
    }
    useEffect(() => {
        getProducts()
        getPrice()
    }, [])

    const getPrice = () => {
        let ext = countryModel.search(user.country)
        let country = 'us'
        if (ext) {
            country = ext.cca2.toLowerCase()
        }
        ApiClient.get(`api/dynamic/pricings/dropdown`, { country: country }).then(res => {
            if (res.success) {
                setprice(res.data)
            }
        })
    }

    const openProduct = (id) => {
        history.push(`/product/detail/${id}`)
    }

    const filter = (p = {}) => {
        getProducts(p)
    }

    const isClear = () => {
        let value = false
        let p = {
            search: '',
        }
        Object.keys(p).map(itm => {
            if (filters[itm]) value = true
        })
        return value
    }

    const clear = () => {
        let p = {
            search: '',
            page: 1
        }
        setFilter({ ...filters, ...p })
        getProducts(p)
    }

    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getProducts({ search: searchState.data, page: 1 })
            getActivePlan()
        }
    }, [searchState])

    const exportfun = async () => {
        const token = await localStorage.getItem("token");
        const req = await axios({
            method: "get",
            url: `${environment.api}api/product/export`,
            responseType: "blob",
            body: { token: token }
        });
        var blob = new Blob([req.data], {
            type: req.headers["content-type"],
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `Products.xlsx`;
        link.click();
    }

    const getprice = (data) => {
        let date = datepipeModel.datetostring(new Date())
        return dynamicPriceModel.getDynamicPrice(date, data.advertisedPrice, data.dynamicPricing) || data.advertisedPrice
    }

    const checkProducts = (item, checked) => {
        let array = id
        if (checked) {
            array.push(item._id)
        }
        else {
            array = array.filter(itm => itm != item._id)
        }
        setid([...array])
    }

    const checkAllProducts = (checked) => {
        if (checked) {
            setid(data.map(itm => itm._id))
        }
        else {
            setid([])
        }
    }

    const apply = () => {
        if (!dynamicId) {
            toast.error('Please Select Price First.')
            return
        }
        ApiClient.get(`api/dynamic/pricing/detail`, { id: dynamicId }).then(res => {
            if (res.success) {
                ApiClient.post(`api/apply/template/multiple`, { ...res.data, name: `Custom ${res.data.name}`, dynamicPricingId: dynamicId, productId: id, }).then(res => {
                    if (res.success) {
                        setTimeout(() => {
                            toast.success(res.message)
                        }, 200);
                        getProducts()
                        setid([])
                        setdynamicId('')
                    }
                })
            }
        })
    }

    const ChecksAll = () => {
        let value = true
        data && data.find(item => {
            if (id.includes(item._id)) {
            }
            else (
                value = false
            )
        })
        return value
    }

    const pageChange = (e) => {
        setFilter({ ...filters, page: e })
        getProducts({ page: e })
    }

    const getActivePlan = () => {
        ApiClient.get('api/my/plan').then(res => {
            if (res.success) {
                let data=res.data
                // To Convert Uppcase case to Lower Case
                let currency = {}
                Object.keys(data.planId.extraProductPrice).map(item=>{
                    currency[item.toLowerCase()] = data.planId.extraProductPrice[item]
                })
                data.planId.extraProductPrice = currency
                setActivePlan(data)
            }
        })
    }

    const checkAllowedProducts = (id, allowedProducts) =>{
        if (id.length > allowedProducts){
            document.getElementById('OpenModel').click()
        }
        else{
            enableProduct()
        }
    }

    const enableProduct = () => {
        ApiClient.put(`api/enable/products`, { productIds: id }).then(res => {
            if (res.success) {
                getProducts()
                setid([])
                document.getElementById('CloseModel').click()
                toast.success(res.message)
            }
        })
    }

    return (
        <Layout>
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="hedding">Product Data</h3>
                    <article className="d-flex">
                        <button className='btn btn-primary' onClick={e => exportfun()}>Export</button>
                        <span className='float-right ml-2'>
                            <SelectDropdown
                                isSingle={true}
                                id="statusDropdown"
                                displayValue="name"
                                placeholder="Select Price"
                                intialValue={dynamicId}
                                result={e => setdynamicId(e.value)}
                                options={price}
                            />
                        </span>
                        {id.length ?
                            <button type='button' className='btn btn-primary ml-2' onClick={e => apply()}>Apply</button>
                            : null}
                    </article>
                </div>
                <div className='row mt-3'>
                    <div className='col-md-3 mb-4'>
                        <input className='form-control' value={filters.search} onChange={e => setFilter({ ...filters, search: e.target.value })} placeholder='Search by Product Name or ID' />
                    </div>
                    <div className='col-12 col-sm-6 col-md-3 mb-4 dropDownSales'>
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
                    <div className='col-12 col-sm-6 col-md-3 mb-4 dropDownSales'>
                        <div class="selectDropdown">
                            <div class="dropdown addDropdown">
                                <button class="btn btn-primary dropdown-toggle removeBg w-100" type="button" id="dropdownMenuButtonstatusDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Country</button>
                                <div class="dropdown-menu shadow bg_hover leftAlignDrop" aria-labelledby="dropdownMenuButtonstatusDropdown">
                                    <a class="dropdown-item">Select </a>
                                    <a class="dropdown-item">sales1</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-sm-6 col-md-3 mb-4 dropDownSales'>
                        <div class="selectDropdown">
                            <div class="dropdown addDropdown">
                                <button class="btn btn-primary dropdown-toggle removeBg w-100" type="button" id="dropdownMenuButtonstatusDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Region</button>
                                <div class="dropdown-menu shadow bg_hover leftAlignDrop" aria-labelledby="dropdownMenuButtonstatusDropdown">
                                    <a class="dropdown-item">Select </a>
                                    <a class="dropdown-item">sales1</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-sm-6 col-md-3 mb-4  dropDownSales'>
                        <div class="selectDropdown">
                            <div class="dropdown addDropdown">
                                <button class="btn btn-primary dropdown-toggle removeBg w-100" type="button" id="dropdownMenuButtonstatusDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">City</button>
                                <div class="dropdown-menu shadow bg_hover leftAlignDrop" aria-labelledby="dropdownMenuButtonstatusDropdown">
                                    <a class="dropdown-item">Select </a>
                                    <a class="dropdown-item">reseller</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-sm-6 col-md-3  mb-4 dropDownSales'>
                        <div class="selectDropdown">
                            <div class="dropdown addDropdown">
                                <button class="btn btn-primary dropdown-toggle removeBg w-100" type="button" id="dropdownMenuButtonstatusDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Status</button>
                                <div class="dropdown-menu shadow bg_hover leftAlignDrop" aria-labelledby="dropdownMenuButtonstatusDropdown">
                                    <a class="dropdown-item">Select </a>
                                    <a class="dropdown-item">coupon</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-sm-6 col-md-3 mb-4'>
                        <input type='date' className='form-control' />
                    </div>
                    <div className='col-12 col-sm-6 col-md-3 mb-4'>
                        <button className='btn btn-primary' onClick={e => filter()}>Search</button>
                        {isClear() ? <button className='btn btn-secondary ml-2' onClick={e => clear()}>Clear</button> : <></>}
                    </div>
                </div>

                {id.length ? activePlan?.isActive ? <>
                    <div className='d-flex filterFlex'>
                        <button className='btn btn-primary' onClick={e => checkAllowedProducts(id, activePlan?.planId?.allowedProducts)}>{id.length > activePlan?.planId?.allowedProducts ? 'Pay' : 'Enable Selected Products'}</button>
                    </div>
                    <p className='mt-3'>{id.length} Selected {id.length > activePlan?.planId?.allowedProducts ? <span className="text-danger">({id.length - activePlan?.planId?.allowedProducts} Extra Products) <i className="fa fa-info" title={`You Will pay exta ${activePlan?.planId?.extraProductPrice?.[activePlan?.subscription.currency.toLowerCase()]} ${activePlan?.subscription.currency} per product`} id="infoTooltip" onmouseover="tooltiphover('infoTooltip')" data-toggle="tooltip" data-placement="top"></i></span> : <></>}</p>
                </> : <>
                    <p><b>To Enable Products Please <Link to="/plans" className='text-decoration-underline'>Purchase Plan</Link> First</b></p>
                </>
                    : <></>}

                <div className="table-responsive table_section">
                    <table class="table table-striped">
                        <thead className='table_head'>
                            <tr className='heading_row'>
                                <th scope="col" className='table_data'><input type='checkbox' checked={ChecksAll()} onClick={e => checkAllProducts(e.target.checked)} /></th>
                                <th scope="col" className='table_data'>Image</th>
                                <th scope="col" className='table_data'>Name of Product</th>
                                <th scope="col" className='table_data'>Enabled</th>
                                <th scope="col" className='table_data'>Number of Pax</th>
                                <th scope="col" className='table_data'>Category / Sub Category</th>
                                <th scope="col" className='table_data'>Price</th>
                                <th scope="col" className='table_data'>Dynamic Pricing</th>
                                <th scope="col" className='table_data'>Number of Orders</th>
                                {/* <th scope="col" className='table_data'>Number of Bookings</th> */}
                                <th scope="col" className='table_data'>Sales</th>
                                <th scope="col" className='table_data'>Commissions Paid</th>
                                <th scope="col" className='table_data'>Sales % (of total sales of all products)</th>
                                <th scope="col" className='table_data'>Average Order Value</th>
                                <th scope="col" className='table_data'>Lead Time</th>
                                <th scope="col" className='table_data'>Top Reseller</th>
                                <th scope="col" className='table_data'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((item, index) => {
                                return <tr className='data_row'>
                                    <td className='table_dats'><input type='checkbox' checked={id.includes(item._id)} onClick={e => checkProducts(item, e.target.checked)} /></td>
                                    <td className='table_dats'><img src={`${item.images[0]?.itemUrl}`} height="30px" width="30px" /></td>
                                    <td className='table_dats' onClick={e => openProduct(item._id)}>{item?.name}</td>
                                    <td className='table_dats'>{item.isEnabled ? item.isEnabled == true ? 'Yes' : 'No' : 'No'}</td>
                                    <td className='table_dats'>{item.leadTime}</td>
                                    <td className='table_dats'>{item.productType}</td>
                                    <td className='table_dats'>{getprice(item)}</td>
                                    <td className='table_dats'>{(item.dynamicPricing).length > 0 ? 'Applied' : 'N/A'}</td>
                                    <td className='table_dats'>{item.numberOfOrders}</td>
                                    {/* <td className='table_dats'>--</td> */}
                                    <td className='table_dats'>{item.sale}</td>
                                    <td className='table_dats'>{item.commissionPaid}</td>
                                    <td className='table_dats'>{item.salePercent?.toFixed(2)}</td>
                                    <td className='table_dats'>{item?.avgOrderValue?.toFixed(2)}</td>
                                    <td className='table_dats'>{item.leadTime}</td>
                                    <td className='table_dats'>{item.resellerName}</td>
                                    <td className='table_dats'>
                                        <i class="material-icons" onClick={e => openProduct(item._id)}>visibility</i>
                                        {/* <span className='edit_icon ml-2' onClick={e => applyProduct(item._id)}>
                                            <i class="material-icons edit" title='Apply Product'>approval</i>
                                        </span> */}
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>

                {total > filters.count ? <div className='paginationWrapper'>
                    <span>Show {filters.count} from {total} Sub Admin’s</span>
                    <Pagination
                        currentPage={filters.page}
                        totalSize={total}
                        sizePerPage={filters.count}
                        changeCurrentPage={pageChange}
                    />
                </div> : <></>
                }
            </div>
            <button type="button" id="OpenModel" class="btn btn-primary display-none" data-toggle="modal" data-target="#exampleModal">dfdf</button>
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Extra Products</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body h6"><b>You have to pay {activePlan?.planId?.extraProductPrice?.[activePlan?.subscription.currency.toLowerCase()]} {activePlan?.subscription.currency} for extra {id.length - activePlan?.planId?.allowedProducts} products</b></div>
                        <div class="modal-footer">
                            <button type="button" id="CloseModel" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" onClick={e=> enableProduct()} class="btn btn-primary">Pay</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductData;
