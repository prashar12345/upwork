import React from 'react';
import datepipeModel from '../../../../models/datepipemodel';

const Html = ({ detail, back }) => {
    return (<>
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className='hedding'>Order Detail</h3>
            <button className="btn btn-primary profiles" onClick={back}>
                Back
            </button>
        </div>
        
        <div className="company_cards shadow-sm border rounded p-3 mx-0 mb-3">
            <div className="info_detail">
                <h3 className='company_heading'>Customer Detail</h3>
            </div>
            <hr className="company_line" />
            <div className="p-4">
                <div className="row">
                    <div className="col-md-3">
                        <p className="company_details">Customer Name</p>
                        <h4 className="company_name">{detail?.customer?.name}</h4>
                    </div>
                    <div className="col-md-3">
                        <p className="company_details">Email</p>
                        <h4 className="company_name">--</h4>
                    </div>
                    <div className="col-md-3">
                        <p className="company_details">Phone Number</p>
                        <h4 className="company_name">{detail?.customer?.phone}</h4>
                    </div>
                    <div className="col-md-3">
                        <p className="company_details">Country of Origin</p>
                        <h4 className="company_name">--</h4>
                    </div>
                </div>
            </div>
            <div className="info_detail">
                <h3 className='company_heading'>Name of all pax on tour</h3>
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Pax Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Passport number</th>
                        <th scope="col">Dietary Requirements</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">--</th>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                    </tr>
                    <tr>
                        <th scope="row">--</th>
                        <td>--</td>
                        <td>-</td>
                        <td>--</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div className="company_cards shadow-sm border rounded p-3 mx-0 mb-3">
            <div className="info_detail">
                <h3 className='company_heading'>Products Details</h3>
            </div>
            <hr className="company_line" />
            <table class="table table-striped mb-0 ">
                <thead>
                    <tr>
                        <th scope="col" className="topheads" >Name of product</th>
                        <th scope="col" className="topheads" >Order date</th>
                        <th scope="col" className="topheads" >Order ID</th>
                        <th scope="col" className="topheads" >Reseller reference</th>
                        <th scope="col" className="topheads" >Discount code</th>
                        <th scope="col" className="topheads" >Ancillary Revenue ($)</th>
                    </tr>
                </thead>
                <tbody>
                    {detail?.items.map(item => {
                        return <tr>
                            <th scope="row">{item?.productName}</th>
                            <td>{datepipeModel.date(detail?.dateCreated)}</td>
                            <td>{detail?.orderNumber}</td>
                            <td>--</td>
                            <td>--</td>
                            <td>--</td>
                        </tr>
                    })}
                </tbody>
            </table>
            {/* <h6 className='ml-2 number_pax'>Number of pax (--)</h6> */}
            <table class="table newtable table-striped">           
                <thead className="newtable">
                <tr> <td colspan="3" className='ml-2 number_pax'>Number of pax (--)</td></tr>
                    <tr>
                        <th scope="col" className="tophead">Labels</th>
                        <th scope="col" className="tophead">Pax</th>
                        <th scope="col" className="tophead">Amount</th>
                    </tr>
                </thead>
                <tbody className="newtable">
                    {detail?.items.map(item => {
                        return item?.quantities.map(itm => {
                            return <tr>
                                <th scope="row">{itm?.optionLabel}</th>
                                <td>{itm?.value}</td>
                                <td>{itm?.optionPrice}</td>
                            </tr>
                        })
                    })}
                </tbody>
            </table>
{/* 
            <table class="table">
  <tbody>
    <tr>
      <td>Total</td>
      <td>{detail?.totalAmount}</td>
    </tr>
    <tr>
      <td>Ancillary Revenue ($)</td>
      <td>--</td>
    </tr>
    <tr>
      <td>Commissions Paid</td>
      <td>{detail?.commission}</td>
    </tr>
  </tbody>
</table> */}
          

            <div className='row ml-1'>
                <div className='col-md-6'>
                    <p>Total</p>
                </div>
                <div className='col-md-6'>
                    <p>{detail?.totalAmount}</p>
                </div>
                <div className='col-md-6'>
                    <p>Ancillary Revenue ($)</p>
                </div>
                <div className='col-md-6'>
                    <p>--</p>
                </div>
                <div className='col-md-6'>
                    <p>Commissions Paid</p>
                </div>
                <div className='col-md-6'>
                    <p>{detail?.commission}</p>
                </div>
                <div className='col-md-6'>
                    <p>Net amount</p>
                </div>
                <div className='col-md-6'>
                    <p>{detail?.totalAmount}</p>
                </div>
            </div>
        </div>

        <div className="company_cards shadow-sm border rounded p-3 mx-0 mb-3">
            <div className="info_detail">
                <h3 className='company_heading'>Booking Details</h3>
            </div>
            <hr className="company_line" />
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Order Date</th>
                        <th scope="col">Booking time & date</th>
                        <th scope="col">Lead times (days)</th>
                        <th scope="col">Booked from where?</th>
                        <th scope="col">Pickup location</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">{datepipeModel.date(detail?.dateCreated)}</th>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div className="company_cards shadow-sm border rounded p-3 mx-0 mb-3">
            <div className="info_detail">
                <h3 className='company_heading'>Payments Details</h3>
            </div>
            <hr className="company_line" />
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Payment Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">{detail?.paymentOption}</th>
                    </tr>
                </tbody>
            </table>
        </div>

        <div className="company_cards shadow-sm border rounded p-3 mx-0 mb-3">
            <div className="info_detail">
                <h3 className='company_heading'>Reseller Information</h3>
            </div>
            <hr className="company_line" />
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name of reseller</th>
                        <th scope="col">Reseller Commission</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">{detail?.resellerName}</th>
                        <th scope="row">{detail?.commission}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
    );
};

export default Html;
