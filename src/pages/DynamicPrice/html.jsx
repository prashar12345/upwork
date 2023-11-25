import React from 'react';
import Layout from '../../components/global/layout';
import Pagination from "react-pagination-js";
import './style.scss';
import { Link } from 'react-router-dom';
import dynamicPriceModel from '../../models/dynamicPrice.model';
import datepipeModel from '../../models/datepipemodel';
import SelectDropdown from '../../components/common/SelectDropdown';
import environment from '../../environment';

const Html = ({
    ChangeStatus,
    statusChange,
    deleteItem,
    edit,
    pageChange,
    filters,
    filter,
    loaging,
    data,
    exportfun,
    country,
    setFilter,
    years,
    type,
    total,
    reset
}) => {
    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="hedding">{dynamicPriceModel.name(type)}</h3>
                <article className="d-flex">
                    <Link to={`/dynamicprice/add`} className='btn btn-primary mr-2'>Add</Link>
                    <button className="btn btn-primary mr-2" onClick={()=>exportfun()}>
                        Export  
                    </button>
                    {/* <span className='mr-2'>
                        <SelectDropdown
                            isSingle={true}
                            id="statusDropdown"
                            displayValue="name"
                            placeholder='All Countries'
                            intialValue={filters.country}
                            result={e => filter({ country: e.value })}
                            options={country}
                        />
                    </span> */}
                    {/* <span className='mr-2'>
                        <SelectDropdown
                            isSingle={true}
                            id="statusDropdown"
                            displayValue="year"
                            placeholder='All Years'
                            intialValue={filters.year}
                            result={e => filter({ year: e.value })}
                            options={years}
                        />
                    </span> */}
                    <div className="dropdown addDropdown mr-2">
                        <button className="btn btn-primary dropdown-toggle removeBg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {filters.status ? filters.status=="deactive"?"Inactive":filters.status : 'All Status'}
                        </button>
                        <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                            <a  className={filters.status == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("")}>All Status</a> 
                                <a className={filters.status == 'active' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("active")} >Active</a>
                                <a className={filters.status == 'Inactive' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("deactive")} >Inactive</a>
                        </div>
                    </div>

                    {filters.status? <button className="btn btn-primary mr-2" onClick={()=>reset()}>
                        Reset  
                    </button>:<></>}
                </article>

            </div>
            <div className="table-responsive table_section">
                <table class="table table-striped">
                    <thead className='table_head'>
                        <tr className='heading_row'>
                            <th scope="col" className='table_data'>Name</th>
                            <th scope="col" className='table_data'>Date Created</th>
                            <th scope="col" className='table_data'>Date Updated</th>
                            <th scope="col" className='table_data'>Status</th>
                            <th scope="col" className='table_data'>Updated By</th>
                            <th scope="col" className='table_data'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loaging && data && data.map((itm, i) => {
                            return <tr className='data_row'>
                                <td className='table_dats'>{itm.name}</td>
                                <td className='table_dats'>{datepipeModel.date(itm.createdAt)}</td>
                                <td className='table_dats'>{datepipeModel.date(itm.updatedAt)}</td>
                                <td className='table_dats'> <div className={`user_hours ${itm.status}`} onClick={() => statusChange(itm)}>
                                    <span className='contract'>
                                        {itm.status == 'deactive' ? 'inactive' : 'active'}
                                    </span>
                                </div></td>
                                <td className='table_dats'>{itm.updatedBy?.fullName}</td>
                                <td className='table_dats'>
                                    <div className="dropdown">
                                        <div className="action_icons">
                                            {environment.adminRoleId==itm?.addedBy?.role?<></>:<>
                                            <a className='edit_icon' title="Edit" onClick={e => edit(itm,false)}>
                                                <i class="material-icons edit" title="Edit">edit</i>
                                            </a>
                                            <span className='edit_icon' onClick={() => deleteItem(itm.id)}>
                                                <i class="material-icons delete" title='Delete'> delete</i>
                                            </span>
                                            </>}
                                        
                                            <a className="edit_icon ml-2" onClick={e => edit(itm,true)}>
                                                <i class="fa fa-copy" title="Copy"></i>
                                            </a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        })
                        }
                    </tbody>
                </table>
            </div>
            {!loaging && total == 0 ? <div className="py-3 text-center">No Data</div> : <></>}
            {
                !loaging && total > filters.count ? <div className='paginationWrapper'>
                    <span>Show {filters.count} from {total} Dynamic Price</span>
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
