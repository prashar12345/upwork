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
                Skills
                </h3>

                <article className="d-flex filterFlex phView">
                    {isAllow('addAdmins') ? <>
                        <Link className="btn btn-primary" to={`/Skills/add`}>
                            Add Skills
                        </Link>
                    </> : <></>}

              
                </article>


            </div>


            {tab == 'grid' ? <>
          
            </> : <>

                <div className="table-responsive table_section">

                    <table class="table table-striped">
                        <thead className='table_head'>
                            <tr className='heading_row'>
                                <th scope="col" className='table_data'>Name</th>                               
                                <th scope="col" className='table_data'>Skill</th>
                           
                                <th scope="col" className='table_data'>Descreption</th>
                               
                                <th scope="col" className='table_data'>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {!loaging && data && data.map((itm, i) => {
                                return <tr className='data_row'>
                                    <td className='table_dats' onClick={e => edit(itm.id)}>
                                        <div className='user_detail'>
                                         
                                            <div className='user_name'>
                                                <h4 className='user'>{itm.addedBy_name}</h4>
                                            
                                            </div>
                                        </div>
                                    </td>
                                    <td className='table_dats'>{itm.name}</td>
                                 
                                    <td className='table_dats'>{itm.description}</td>
                                    
                                  
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
