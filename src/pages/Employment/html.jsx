import React from 'react';
import Layout from '../../components/global/layout';
import Pagination from "react-pagination-js";
import './style.scss';
import rolesModel from '../../models/roles.model';
import methodModel from '../../methods/methods';
import datepipeModel from '../../models/datepipemodel';
import environment from '../../environment';
import { Link } from 'react-router-dom';

const Html = ({
    view,
    edit,
    reset,
    colClick,
    tab,
    tabChange,
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
    blockunblock,
    loaging,
    data,
    exportfun,
    roles,
    isAllow,
    total = { total }
}) => {
    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="hedding">
                Employment
                </h3>

                <article className="d-flex filterFlex phView">
                    {isAllow('addAdmins') ? <>
                        <Link className="btn btn-primary" to={`/employment/add`}>
                            Add Employment
                        </Link>
                    </> : <></>}

                    {/* <button onClick={exportfun} className="btn btn-primary">
                        Export
                    </button> */}
                    {/* <div className="dropdown addDropdown chnagesg">
                        <button className="btn btn-primary dropdown-toggle removeBg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {filters.status ? filters.status == "deactive" ? "Inactive" : filters.status : 'All Status'}
                        </button>
                        <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                            <a className={filters.status == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("")}>All Status</a>
                            <a className={filters.status == 'active' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("active")} >Active</a>
                            <a className={filters.status == 'Inactive' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("deactive")} >Inactive</a>
                        </div>
                    </div>
                    <div className="dropdown addDropdown chnagesg">
                        <button className="btn btn-primary dropdown-toggle removeBg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {filters.subRole ? methodModel.find(roles, filters.subRole, 'id')?.name : 'All User'}
                        </button>
                        <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                            <a className={filters.subRole == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeRole('')}>All User</a>
                            {roles && roles.map(itm => {
                                if (itm.id != environment.userRoleId)
                                    return <a className={filters.subRole == itm.id ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeRole(itm.id)}>{itm.name}</a>
                            })}
                        </div>
                    </div> */}


                    {/* {filters.status || filters.subRole ? <>
                        <a className="btn btn-primary" onClick={e => reset()}>
                            Reset
                        </a>
                    </> : <></>} */}


                    {/* <div className='icons_tab'>
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class={`nav-link ${tab == 'grid' ? 'active' : ''}`} id="employee-tab" onClick={e => tabChange('grid')}>
                                    <i className="fa fa-th"></i>
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class={`nav-link staff ${tab == 'list' ? 'active' : ''}`} id="staff-tab" onClick={e => tabChange('list')}>
                                    <i className="fa fa-list"></i>
                                </button>
                            </li>

                        </ul>
                    </div> */}

                    {/* <div className="dropdown addDropdown mr-2">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuColumns" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Add Columns
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuColumns">
                            {uTableCols().map(itm => {
                                return <a className="dropdown-item" onClick={() => addCol(itm)} key={itm.value}>{itm.value}</a>
                            })}
                        </div>
                    </div> */}
                    {/* <button onClick={exportCsv} className="btn btn-primary" type="button">
                        Export
                    </button> */}
                </article>


            </div>


            {tab == 'grid' ? <>
                {/* <div className="cardList">
                    <div className='row'>
                        {!loaging && data && data.map((itm, i) => {
                            return <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 mb-4'>
                                <div className='new_cards'>
                                    <div className='user_card'>
                                        <div className='user_detail' onClick={e => edit(itm.id)}>
                                          
                                            <div className='user_name'>
                                                <h4 className='user'>
                                                    {itm.company}
                                                </h4>
                                              
                                            </div>
                                        </div>

                                    </div>


                                    <div className='user_proff user_proff1'>
                                        <div className='id_name'>
                                            <ul className='user_list'>
                                                <li className='list_name'>
                                                    <a className='id'>
                                                        Role
                                                    </a>
                                                </li>
                                                <li className='list_name'>
                                                    <a className='id'>
                                                        Phone number
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='detail_list'>
                                            <ul className='user_list'>
                                                <li className='list_names'>
                                                    <a className='id_name' onClick={e => edit(itm.id)}>
                                                        {itm.subRole?.name}

                                                    </a>
                                                </li>
                                                <li className='list_names'>
                                                    <a className='id_name' onClick={e => edit(itm.id)}>
                                                        <span className='call_icon'></span>
                                                        {itm.mobileNo ?
                                                            <>
                                                                <i class="fa fa-phone" aria-hidden="true"></i>
                                                                {itm.dialCode} {itm.mobileNo}
                                                            </>
                                                            :
                                                            ''
                                                        }
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}

                    </div>

                </div> */}
            </> : <>

                <div className="table-responsive table_section">

                    <table class="table table-striped">
                        <thead className='table_head'>
                            <tr className='heading_row'>
                                <th scope="col" className='table_data'>Company</th>
                               
                                <th scope="col" className='table_data'>Title</th>
                                <th scope="col" className='table_data'>Descreption</th>
                                <th scope="col" className='table_data'>Status</th>
                                <th scope="col" className='table_data'>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {!loaging && data && data.map((itm, i) => {
                                return <tr className='data_row'>
                                    <td className='table_dats' onClick={e => edit(itm.id)}>
                                        <div className='user_detail'>
                                         
                                            <div className='user_name'>
                                                <h4 className='user'>{itm.company}</h4>
                                            
                                            </div>
                                        </div>
                                    </td>
                                    <td className='table_dats'>{itm.title}</td>
                                    <td className='table_dats'>{itm.description}</td>
                                    <td className='table_dats'>
                                        <div className={`user_hours ${itm.status}`} onClick={() => statusChange(itm)}>
                                            <span className='contract'>{itm.status == 'deactive' ? 'inactive' : 'active'}</span>
                                        </div>
                                    </td>
                                  
                                    {/* <td className='table_dats'> <span className='call_icon'></span>
                                        {itm.mobileNo ?
                                            <>
                                                <i class="fa fa-phone" aria-hidden="true"></i>
                                                {itm.dialCode} {itm.mobileNo}
                                            </>
                                            :
                                            ''
                                        }
                                    </td> */}

                                   


                                    {/* dropdown */}
                                    <td className='table_dats'>
                                        <div className="action_icons">
                                           
                                                <a className='edit_icon' title="Edit" onClick={e => edit(itm.id)}>
                                                    <i class="material-icons edit" title="Edit">edit</i>
                                                </a>
                                    

                                         
                                                <span className='edit_icon' onClick={() => deleteItem(itm.id)}>
                                                    <i class="material-icons delete" title='Delete'> delete</i>
                                                </span>
                                           

                                           
                                        
                                                <a className='edit_icon' title="view" onClick={e => view(itm.id)}>
                                                <i class="fa fa-eye " aria-hidden="true"></i>
                                                </a>
                                         
                                        </div>
                                    </td>

                                </tr>

                            })
                            }
                        </tbody>
                    </table>


                </div>

            </>}





            {!loaging && total == 0 ? <div className="py-3 text-center">No Data</div> : <></>}

            {
                !loaging && total > filters.count ? <div className='paginationWrapper'>
                    <span>Show {filters.count} from {total} Sub Admin’s</span>
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
