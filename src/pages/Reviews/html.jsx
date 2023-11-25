import React from 'react';
import Layout from '../../components/global/layout';
import Pagination from "react-pagination-js";
import './style.scss';
import SelectDropdown from "../../components/common/SelectDropdown";
import DatePicker from "react-datepicker";
import datepipeModel from '../../models/datepipemodel';
import Select from "react-select";

const Html = ({
    view,
    ChangeStatus,
    statusChange,
    pageChange,
    filters,
    loaging,
    data,
    handleUpdate,
    exportfun,
    reply,
    products,
    setProducts,
    total = { total }
}) => {

    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="hedding">
                    Reviews Listing
                </h3>

                <article className="d-flex">
                    <button className="btn btn-primary mr-2" onClick={() => exportfun()}>
                        Export
                    </button>
                    <div className="dropdown addDropdown mr-2">
                        <button className="btn btn-primary dropdown-toggle removeBg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {filters.status ? filters.status == "deactive" ? "Inactive" : filters.status : 'All Status'}
                        </button>
                        <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                            <a className={filters.status == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("")}>All Status</a>
                            <a className={filters.status == 'active' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("active")} >Active</a>
                            <a className={filters.status == 'Inactive' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("deactive")} >Inactive</a>
                        </div>
                    </div>
                </article>
            </div>

            <hr />
            <div className="form-row">
                <div className="col-md-4 mb-3">
                    <input
                        type="text"
                        value={filters.search}
                        placeholder="Search by  reseller, contact..."
                        onChange={e => handleUpdate({ search: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="col-md-4 mb-3">
                    <SelectDropdown
                        isSingle={true}
                        id="statusDropdown"
                        displayValue="name"
                        placeholder='Platform'
                        intialValue={filters.platform}
                        result={e => handleUpdate({ platform: e.value })}
                        options={[
                            { id: 'TripAdvisor', name: 'TripAdvisor' },
                            { id: 'Google Reviews', name: 'Google Reviews' },
                        ]}
                    />
                </div>
                <div className="col-md-4 mb-3">
                    <div className="form-row">
                        <div className="col-6">
                            <DatePicker
                                className="form-control"
                                selected={filters.start ? new Date(filters.start) : ''}
                                minDate={new Date()}
                                placeholderText="Start Date"
                                name="changesDate"
                                required
                                onChange={(date) => {
                                    handleUpdate({ start: datepipeModel.datetostring(date), end: datepipeModel.datetostring(date) })
                                }}
                                onKeyDown={(e) => {
                                    e.preventDefault();
                                }}
                            />
                        </div>
                        <div className="col-6">
                            <DatePicker
                                className="form-control"
                                selected={filters.end ? new Date(filters.end) : ''}
                                minDate={filters.start ? new Date(filters.start) : new Date()}
                                placeholderText="End Date"
                                name="changesDate"
                                required
                                onChange={(date) => {
                                    handleUpdate({ end: datepipeModel.datetostring(date) })
                                }}
                                onKeyDown={(e) => {
                                    e.preventDefault();
                                }}
                            />
                        </div>
                    </div>

                </div>
                <div className="col-md-4 mb-3">
                    <SelectDropdown
                        isSingle={true}
                        id="statusDropdown"
                        displayValue="name"
                        placeholder='Ratings'
                        intialValue={filters.rating}
                        result={e => handleUpdate({ rating: e.value })}
                        options={[
                            { id: '1', name: "1 Star" },
                            { id: '2', name: "2 Star" },
                            { id: '3', name: "3 Star" },
                            { id: '4', name: "4 Star" },
                            { id: '5', name: "5 Star" },
                        ]}
                    />
                </div>
                <div className="col-md-4 mb-3">
                    <Select
                        options={products}
                        placeholder="All Products"
                        isClearable={true}
                        name="Product"
                        onChange={e => setProducts(e ? e.value : '')}
                    />
                </div>
                <div className="col-md-4 mb-3">
                    <SelectDropdown
                        isSingle={true}
                        id="statusDropdown"
                        displayValue="name"
                        placeholder='Type'
                        intialValue={filters.type}
                        result={e => handleUpdate({ type: e.value })}
                        options={[
                            { id: 'Product', name: "Product" },
                            { id: 'Site', name: "Site" }
                        ]}
                    />
                </div>
                <div className="col-md-4 mb-3">
                    <SelectDropdown
                        isSingle={true}
                        id="statusDropdown"
                        displayValue="name"
                        placeholder='Replied'
                        intialValue={filters.replied}
                        result={e => handleUpdate({ replied: e.value })}
                        options={[
                            { id: 'Yes', name: "Yes" },
                            { id: 'No', name: "No" }
                        ]}
                    />
                </div>
                <div className="col-md-12 text-right">
                    <button className='btn btn-primary mr-2'>Search</button>
                    <button className='btn btn-secondary'>Clear</button>
                </div>
            </div>

            <div className="table-responsive table_section">
                <table class="table table-striped">
                    <thead className='table_head'>
                        <tr className='heading_row'>
                            <th scope="col" className='table_data'>Source</th>
                            <th scope="col" className='table_data'>Product</th>
                            <th scope="col" className='table_data'>Rating</th>
                            <th scope="col" className='table_data'>Date</th>
                            <th scope="col" className='table_data'>Name Of Reviewer</th>
                            <th scope="col" className='table_data'>Trip Type</th>
                            <th scope="col" className='table_data'>Replied</th>
                            <th scope="col" className='table_data'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loaging && data && data.map((itm, i) => {
                            return <tr className='data_row'>
                                <td className='table_dats' onClick={e => view(itm.id)}>{itm.platform || '--'}</td>
                                <td className='table_dats'>--</td>
                                <td className='table_dats'><i className='fa fa-star'></i> {itm.rating || '--'}</td>
                                <td className='table_dats'>{datepipeModel.date(itm.reviewDate)}</td>
                                <td className='table_dats'>{itm?.user?.username}</td>
                                <td className='table_dats'>{itm.trip_type || '--'}</td>
                                <td className='table_dats'>--</td>

                                {/* dropdown */}
                                <td className='table_dats'>
                                    <div className="action_icons">
                                        <a className="edit_icon" title="View" onClick={e => view(itm.id)}>
                                            <i class="material-icons edit">visibility</i>
                                        </a>
                                        <a className="edit_icon" title="Reply" onClick={e => reply(itm?.url)}>
                                            <i class="material-icons edit">reply</i>
                                        </a>
                                    </div>
                                </td>
                                {/* end */}
                            </tr>
                        })
                        }
                    </tbody>
                </table>
            </div>

            {!loaging && total == 0 ? <div className="py-3 text-center">No Data</div> : <></>}
            {
                !loaging && total > filters.count ? <div className='paginationWrapper'>
                    <span>Show {filters.count} from {total} Categories</span>
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
