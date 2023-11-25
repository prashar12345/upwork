import React from 'react';
import Layout from '../../components/global/layout';
import './style.scss';
import './plan.scss';
import SelectDropdown from '../../components/common/SelectDropdown';
import datepipeModel from '../../models/datepipemodel';
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
const Html = ({
    interval,
    getPrice,
    loaging,
    data,
    total,
    getplandetails,
    activeplan,
    cancelplan,
    appliedcurrency,
    setcurrencyiso,
    currencyiso,
    features,
    changeInterval,
    isChecked
}) => {
    return (
        <Layout>
            <div className="container-fluid">
                <section id="pricing" class="pricing-content section-padding">
                    <div class="container">
                        <div class="section-title text-left mb-3">
                            <h2>Plan
                                <span className='float-right mr-3'>
                                    <SelectDropdown
                                        isSingle={true}
                                        id="statusDropdown"
                                        displayValue="currency"
                                        placeholder="Select Currency"
                                        intialValue={currencyiso}
                                        result={e => setcurrencyiso(e.value)}
                                        options={appliedcurrency}
                                    />
                                </span>
                            </h2>
                        </div>


                        <div className="table-responsive table_section">

                            <table class="table table-stripeds table-bordered planTable">
                                <thead className='table_head'>
                                    <tr className='heading_row'>
                                        <th scope="col" className='table_data'>
                                            <div className='tab'>
                                                <ul class="nav nav-pills mb-3 d-block">
                                                    <li class="nav-item">
                                                        <a class={`nav-link ${interval==1?'active':''}`} onClick={e=>changeInterval(1)}>1 Month</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class={`nav-link ${interval==3?'active':''}`} onClick={e=>changeInterval(3)}>3 Months</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class={`nav-link ${interval==6?'active':''}`} onClick={e=>changeInterval(6)}>6 Months</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class={`nav-link ${interval==12?'active':''}`} onClick={e=>changeInterval(12)}>12 Months</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </th>

                                        {data && data.map((item, index) => {
                                            return <>
                                                <th scope="col" className='table_data'>
                                                    <div className='text-center tableHeading'>
                                                        <b>{item.name}</b>
                                                        <h2 className='mt-2'>{getPrice(item)} {currencyiso?.toUpperCase()}</h2>
                                                        {/* <small className='d-block'>/month/user</small> */}
                                                        {item.id==activeplan?.planId?._id?<>
                                                            Valid Upto : <span className='text-primary'>{datepipeModel.date(activeplan?.validUpTo)}</span><br />
                                                        {activeplan?.isActive?<>
                                                            <button class="btn btn-primary mt-1" onClick={e => cancelplan(item.id)}>Cancel Subscription</button>
                                                        </>:<></>}
                                                            
                                                        </>:<>
                                                        <button className='btn btn-primary mt-4 w-100' disabled={getPrice(item)?false:true} onClick={e=>getplandetails(item)}>{activeplan?.isActive?'Upgrade':'Get Started'}</button>
                                                        </>}
                                                        
                                                       
                                                    </div>
                                                </th>
                                            </>
                                        })}

                                    </tr>
                                </thead>
                                <tbody className='planData'>
                                    {features && Object.keys(features).map(oitm => {
                                        return <>
                                            <tr className='bg-gray'>
                                                <td><b>{oitm}</b></td>
                                                {data && data.map((item, index) => {
                                                    return <>
                                                        <td></td>
                                                    </>
                                                })}
                                            </tr>
                                            {features[oitm].map(fitm => {
                                                return <>
                                                    <tr>
                                                        <td>{fitm.name}
                                                            {fitm.description ? <>
                                                                <a id={`app-title_${fitm.id}`} className='borderI'><i class="fa fa-info" aria-hidden="true"></i></a>
                                                                <ReactTooltip
                                                                    anchorId={`app-title_${fitm.id}`}
                                                                    place="top"
                                                                    content={fitm.description}
                                                                />
                                                            </> : <></>}

                                                        </td>
                                                        {data && data.map((item, index) => {
                                                            return <>
                                                                <td className='text-center'>
                                                                    <i class={`material-icons ${isChecked(item,fitm)?'text-success':'text-danger'} planIcon`}>{isChecked(item,fitm)?'check':'close'}</i>
                                                                </td>
                                                            </>
                                                        })}
                                                    </tr>
                                                </>
                                            })}

                                        </>
                                    })}


                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>

            {!loaging && total == 0 ? <div className="py-3 text-center">No Data</div> : <></>}
           
        </Layout>
    );
};

export default Html;
