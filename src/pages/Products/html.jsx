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
            <h3>Products</h3>

{!loaging?<>
    <div className="row">
                {data && data.map(item=>{
                    return <>
                    <div className="col-md-3 mb-3">
                    <div class="product-box shadow-lg">
                        <div class="img">
                            <img src={item.images.length?item.images[0].mediumSizeUrl:'/assets/img/placeholder.png'} onClick={e=>view(item.id)} />

                            {/* <div class="offprice" *ngIf="lis?.discount">10% off</div> */}

                            {/* <div class="img-over">
                                <label class="favorite-btn shadow">
                                    <input type="checkbox" height="0" width="0" class="d-none" />
                                    <i class="fa fa-heart"></i>
                                </label>

                                <a class="cart-btn shadow"><i class="fa fa-shopping-cart"></i></a>
                            </div> */}
                        </div>
                        <div class="content text-center mt-1 p-3">

                            {/* <div class="cat-title text-uppercase text-truncate">{item.supplierName}</div> */}
                            <a class="pro-name text-truncate" onClick={e=>view(item.id)}>{item.name}</a>

                            <div class="rating">
                                <i class="fa fa-star active"></i>
                                <i class="fa fa-star active"></i>
                                <i class="fa fa-star active"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <span class="ml-2">5 Reviews</span>
                            </div>


                            {/* <div class="price" *ngIf="lis?.discount"><del>$400</del> $370</div> */}
              <div class="price">{item.advertisedPrice} {item.currency}</div>
              <div className='text-truncate Shortdesc'>{item.shortDescription}</div>

                        </div>
                    </div>
                </div>
                    </>
                })}
                
            </div>


            {!total ? <div className="py-3 text-center">No Data</div> : <></>}
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
</>:<>
<div>Loading... <i className='fa fa-spinner fa-spin'></i></div>
</>}
        
        </Layout>
    );
};

export default Html;
