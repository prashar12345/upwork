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
    statusChange,
    pageChange,
    filters,
    loaging,
    data,
    total,
    handlePay,
    history
}) => {
    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center mb-1">
                <h3 className="hedding">
                    Select Payment Method
                </h3>
            </div>
            {tab == 'grid' ? <>
            </> : <>
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
                                            <input type='radio' name='primary' onClick={() => statusChange(itm.card_id)} />
                                            // <button className='btn btn-primary' onClick={() => statusChange(itm.card_id)}>Set Primary</button>
                                            :
                                            <input type='radio' name='primary' checked/>
                                            // <button disabled className='btn btn-primary'>Primary</button>
                                        }
                                    </div></td>
                                </tr>
                            })
                            }
                        </tbody>
                    </table>
                    <span className='float-right'>
                        <button type="button" className="btn btn-secondary discard mr-2" onClick={e=>{history.goBack()}}>Back</button>
                        <Link className="btn btn-primary mr-2" to="/card/add">
                            Add Card
                        </Link>
                        <button className='btn btn-primary' onClick={e => handlePay()}>Pay</button>
                    </span>
                </div>
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
