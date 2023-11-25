import React from 'react';
import Layout from '../../components/global/layout';
import Pagination from "react-pagination-js";
import './style.scss';
import { Link } from 'react-router-dom';
import userTableModel from '../../models/table.model';
import methodModel from '../../methods/methods';
import datepipeModel from '../../models/datepipemodel';
import statusModel from '../../models/status.model';
import SelectDropdown from '../../components/common/SelectDropdown';
import planTypeModel from '../../models/planType.model';

const Html = ({
    tab,
    edit,
    reset,
    filter,
    currencys,
    view,
    tabChange,
    colClick,
    ChangeRole,
    ChangeStatus,
    openModal,
    statusChange,
    pageChange,
    addCol,
    deleteItem,
    exportCsv,
    uTableCols,
    removeCol,
    filters,
    tableCols,
    loaging,
    data,
    types,
    exportfun,
    total
}) => {
    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="hedding">
                    Billing
                </h3>
            </div>
            {tab == 'grid' ? <>
            </> : <>
                <div class="card bg-white mb-3">
                    <div class="card-header bg-white font-weight-bold">Payment methods</div>
                    <div class="card-body">
                    {data&&data.map(item=>{
                        return <div className='d-flex align-items-center border-bottom pb-3 justify-content-between pt-3'>
                           
                                 <div className='d-flex align-items-center'>
                                    <img src="/assets/img/visa.png" className='visa' alt="" />
                                    <div className='ml-3'>
                                        <h5 class="card-title mb-0"><span className='visaText'>{item.last4}</span>{item?.isDefault?<span class="badge badge-primary ml-2">Primary</span>:<button className='badge badge-primary ml-2' onClick={()=>statusChange(item.card_id)} >Set Primary</button>}
                                        {item?.isDefault?<></>:<i class="material-icons delete pointer ml-3" title='Delete' onClick={() => deleteItem(item.card_id)}> delete</i>}
                                        </h5>
                                        <p class="card-text">Ending in {item.exp_year}</p>
                                    </div>
                                </div>
                       
                            <div className='text-right'>
                                {/* <i class="fa fa-ellipsis-h" aria-hidden="true"></i> */}
                            </div>
                        </div>
                             })}
                        <Link className="btn btn-primary mt-3" to="/card/add">
                        Add Payment Method
                    </Link>
                    </div>
                </div>
                <div class="card bg-white mb-3">
                    <div class="card-header bg-white font-weight-bold">Billing currency <i class="fa fa-info-circle" aria-hidden="true"></i></div>
                    <div class="card-body">
                        <span>Your current billing currency is set to <b>USD (US Dollar).</b></span>
                    </div>
                </div>
                {/* <div className='mt-5'>
                    <b>Invoices</b>
                    <div className="table-responsive table_section mt-2">
                        <ul class="nav nav-pills mb-3 billing_tab" id="pills-tab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">All</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Paid</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Open</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-Failed-tab" data-toggle="pill" href="#pills-Failed" role="tab" aria-controls="pills-Failed" aria-selected="false">Failed</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-Processing-tab" data-toggle="pill" href="#pills-Processing" role="tab" aria-controls="pills-Processing" aria-selected="false">Processing</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-Refunded-tab" data-toggle="pill" href="#pills-Refunded" role="tab" aria-controls="pills-Refunded" aria-selected="false">Refunded</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-Canceled-tab" data-toggle="pill" href="#pills-Canceled" role="tab" aria-controls="pills-Canceled" aria-selected="false">Canceled</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                <div className="selectDropdown">
                                    <div className="dropdown addDropdown ">
                                        <button className="btn btn-primary dropdown-toggle removeBg pr-5 pl-3" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Filter
                                        </button>
                                        <div className="dropdown-menu shadow bg_hover leftAlignDrop leftBilling" aria-labelledby="dropdownMenuButton">
                                            <a className="dropdown-item">Billing  </a>
                                        </div>
                                    </div>
                                </div>
                                <table class="table table-striped">
                                    <thead className='table_head'>
                                        <tr className='heading_row'>
                                            <th scope="col" className='table_data'>Last Digits</th>
                                            <th scope="col" className='table_data'>Brand</th>
                                            <th scope="col" className='table_data'>Expire Month</th>
                                            <th scope="col" className='table_data'>Expire Year</th>
                                            <th scope="col" className='table_data'>Primary</th>
                                            <th scope="col" className='table_data'></th>
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
                                                        <input type='radio' name='primary' onClick={() => statusChange(itm.card_id)} />
                                                        :
                                                        <input type='radio' name='primary' checked />
                                                    }
                                                </div>
                                                </td>
                                                <td className='table_dats'>
                                                    <div className="action_icons">
                                                        <span className='edit_icon pointer' onClick={() => deleteItem(itm.id)}>
                                                            <i class="material-icons delete" title='Delete'> delete</i>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">...</div>
                            <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
                            <div class="tab-pane fade" id="pills-Failed" role="tabpanel" aria-labelledby="pills-Failed-tab">...</div>
                            <div class="tab-pane fade" id="pills-Processing" role="tabpanel" aria-labelledby="pills-Processing-tab">...</div>
                            <div class="tab-pane fade" id="pills-Refunded" role="tabpanel" aria-labelledby="pills-Refunded-tab">...</div>
                            <div class="tab-pane fade" id="pills-Canceled" role="tabpanel" aria-labelledby="pills-Canceled-tab">...</div>
                        </div>
                    </div>
                </div> */}
            </>}
            {!loaging && !total ? <div className="py-3 text-center">No Data</div> : <></>}
            {
                !loaging && total > filters.count ? <div className='paginationWrapper'>
                    <span>Show {filters.count} from {total} Cards</span>
                    <Pagination
                        currentPage={filters.page}
                        totalSize={total}
                        sizePerPage={filters.count}
                        changeCurrentPage={pageChange}
                    />
                </div> : <></>
            }
            {loaging ? <div className="text-center py-4">
                <img src="/assets/img/loader.gif" className="pageLoader" />
            </div> : <></>}
        </Layout>
    );
};

export default Html;
