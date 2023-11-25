import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import dynamicPriceModel from "../../../models/dynamicPrice.model";

const Html = ({ ListItemLink, tabclass, urlAllow, route }) => {
  const loication = useLocation()
  const pathname=location.pathname;
  const user = useSelector(state => state.user)
  const navigate = useHistory();
  return (
    <div className="side_bar">
<ul className="nav flex-column" component="siderbar">
       <>
        <ListItemLink to="/dashboard" className={`${pathname=="/dashboard"?"active":""}`}>
          <i class="material-icons  mr-2" title="Dashboard">dashboard</i>
          <span class="side_head">Dashboard</span>
        </ListItemLink>

        {user.role && user.role.id != "64e83a928599356bddc2fa00"?<ListItemLink to="/project" className={`mt-4 ${pathname=="/project"?"active":""}`}>
          <i class="material-icons  mr-2" title="Dashboard">assignment</i>
          <span class="side_head">Job Posts</span>
        </ListItemLink>:null}
        <ListItemLink to="/invites" className={`${pathname=="/invites"?"active":""}`}>
        <i class="fa fa-user-plus mr-2" aria-hidden="true"></i>
          <span class="side_head">Invitations</span>
        </ListItemLink>

        {/* <ListItemLink to="/contracts" className={`${pathname=="/contracts"?"active":""}`}>
        <i class="fa fa-file mr-2" aria-hidden="true"></i>
          <span class="side_head">Contracts</span>
        </ListItemLink> */}
      </> 

      {/* <ListItemLink to="/employment">
      <i class="fa fa-user mr-2" aria-hidden="true"></i>
          <span class="side_head">Employment</span>
        </ListItemLink>

        <ListItemLink to="/education">
      <i class="fa fa-user mr-2" aria-hidden="true"></i>
          <span class="side_head">Education</span>
        </ListItemLink> */}


        {/* <ListItemLink to="/skills">
      <i class="fa fa-user mr-2" aria-hidden="true"></i>
          <span class="side_head">Skills</span>
        </ListItemLink>         */}


      {/* {urlAllow('readSales') ? <>
        <li className="nav-item">
          <a className={`col_side ${tabclass('sales') ? '' : 'collapsed'}`} data-bs-toggle="collapse" href="#pricing" role="button" aria-expanded="false" aria-controls="pricing">
            <div className="sidees">
              <i class="material-icons  sidenv mr-2" title="Sales Dashboard">point_of_sale</i>
              <span >Sales Dashboard</span>
            </div>
            <div>
              <span className="side_icon">
                <i class="material-icons ">keyboard_arrow_right</i>
              </span>
            </div>
          </a>
          <div id="pricing" class={`collapse ${tabclass('sales') ? 'show' : ''}`}>
            <div class="card card-body sides">
              <ListItemLink to="/sales" >
                <i class="material-icons sidenv mr-2" title="Sales Dashboard">point_of_sale</i>
                <span class="side_head">Sales</span>
              </ListItemLink>
              <ListItemLink to="/saleData" >
                <i class="material-icons sidenv mr-2" title="Sales Data">receipt</i>
                <span class="side_head">Sales Data</span>
              </ListItemLink>
            </div>
          </div>
        </li>
      </> : <></>}

      {urlAllow('readReviews') ? <>
        <li className="nav-item">
          <a className={`col_side ${tabclass('reviews') ? '' : 'collapsed'}`} data-bs-toggle="collapse" href="#review" role="button" aria-expanded="false" aria-controls="pricing">
            <div className="sidees">
              <i class="material-icons  sidenv mr-2" title="Reviews">star</i>
              <span >Reviews</span>
            </div>
            <div>
              <span className="side_icon">
                <i class="material-icons ">keyboard_arrow_right</i>
              </span>
            </div>
          </a>
          <div id="review" class={`collapse ${tabclass('reviews') ? 'show' : ''}`}>
            <div class="card card-body sides">
              <ListItemLink to="/reviewDashboard">
                <i class="material-icons sidenv mr-2" title="Review Dashboard">star</i>
                <span class="side_head">Review Dashboard</span>
              </ListItemLink>
              <ListItemLink to="/reviews">
                <i class="material-icons sidenv mr-2" title="Sales Dashboard">star</i>
                <span class="side_head">Reviews</span>
              </ListItemLink>

            </div>
          </div>
        </li>
      </> : <></>}

      {urlAllow('readProducts') ? <>
        <li className="nav-item">
          <a className={`col_side ${tabclass('productdashboard') ? '' : 'collapsed'}`} data-bs-toggle="collapse" href="#product" role="button" aria-expanded="false" aria-controls="product">
            <div className="sidees">
              <i class="material-icons  sidenv mr-2" title="Product Dashboard">space_dashboard</i>
              <span >Product Dashboard</span>
            </div>
            <div>
              <span className="side_icon">
                <i class="material-icons ">keyboard_arrow_right</i>
              </span>
            </div>
          </a>
          <div id="product" class={`collapse ${tabclass('productdashboard') ? 'show' : ''}`}>
            <div class="card card-body sides">
              <ListItemLink to="/productdashboard" >
                <i class="material-icons sidenv mr-2" title="Product Dashboard">inventory</i>
                <span class="side_head">Product</span>
              </ListItemLink>

              <ListItemLink to="/productData" >
                <i class="material-icons sidenv mr-2" title="Product Data">receipt</i>
                <span class="side_head">Product Data</span>
              </ListItemLink>

            </div>
          </div>
        </li>
      </> : <></>}

      {urlAllow('readMarketing') ? <>
        <ListItemLink to="/marketing" >
          <i class="material-icons  mr-2" title="Marketing Dashboard">line_axis</i>
          <span class="side_head">Marketing Dashboard</span>
        </ListItemLink>
      </> : <></>}

      {urlAllow('readFinancial') ? <>
        <ListItemLink to="/financial" >
          <i class="material-icons  mr-2" title="Financial Dashboard">monetization_on</i>
          <span class="side_head">Financial Dashboard</span>
        </ListItemLink>
      </> : <></>}

      {urlAllow('readDynamicPricing') ? <>
        <ListItemLink to={`/dynamicpricelist`}>
          <i class="material-icons mr-2" title="Dynamic Pricing">subscriptions</i>
          <span>Dynamic Pricing</span>
        </ListItemLink>
      </> : <></>} */}

      {/* <li className="nav-item">
        {urlAllow('features,plans') ? <>
          <a class={`col_side ${tabclass('dynamicPricing') ? '' : 'collapsed'}`} onClick={e => route('/dynamicpricelist')} data-bs-toggle="collapse" href="#collapseExampledynamicPricing" role="button" aria-expanded="false" aria-controls="collapseExampledynamicPricing">
            <div className="sidees">
              <i class="material-icons mr-2" title="Dynamic Pricing" >subscriptions</i>
              <span >Dynamic Pricing</span>
            </div>
            <div>
              <span className="side_icon">
                <i class="material-icons">keyboard_arrow_right</i>
              </span>
            </div>
          </a>
        </> : <></>}
      </li>
      <div class={`collapse ${tabclass('dynamicPricing') ? 'show' : ''}`} id="collapseExampledynamicPricing">
        <div class="card card-body sides">
          {urlAllow(`dynamicpricelist`) ? <>
            <ListItemLink to={`/dynamicpricelist`}>
              <i class="material-icons sidenv" title="Dynamic Pricing">subscriptions</i>
              <span>Dynamic Pricing</span>
            </ListItemLink>
          </> : <></>}
          {dynamicPriceModel.list.map(itm => {
            return <>
              {urlAllow(`dynamicprice/${itm.id}`) ? <>
                <ListItemLink to={`/dynamicprice/${itm.id}/add`} title={itm.name}>
                  <i class="material-icons sidenv" title={itm.name}>{itm.icon}</i>
                  <span className="text-truncate">{itm.name}</span>
                </ListItemLink>
              </> : <></>}
            </>
          })}
        </div>
      </div> */}

      {/* {urlAllow('readCompany') ? <>
        <ListItemLink to="/company">
          <i class="material-icons  mr-2">business</i>
          <span class="side_head">Company Details</span>
        </ListItemLink>
      </> : <></>} */}



      {/* {urlAllow('readAPI') ? <>
        <li className="nav-item">
          <a className={`col_side ${tabclass('api') ? '' : 'collapsed'}`} data-bs-toggle="collapse" href="#booking" role="button" aria-expanded="false" aria-controls="booking">
            <div className="sidees">
              <i class="material-icons  mr-2" title="Booking">menu_book</i>
              <span >API Integrations</span>
            </div>
            <div>
              <span className="side_icon">
                <i class="material-icons">keyboard_arrow_right</i>
              </span>
            </div>
          </a>
          <div id="booking" class={`collapse ${tabclass('api') ? 'show' : ''}`}>
            <div class="card card-body sides">
              {urlAllow('readBilling') ? <>
                <ListItemLink to="/pos">
                  <i class="material-icons  mr-2">book</i>
                  <span class="side_head">Booking System</span>
                </ListItemLink>
              </> : <></>}
              <ListItemLink to="/review">
                <i class="material-icons  mr-2">star</i>
                <span class="side_head">Reviews</span>
              </ListItemLink>
            </div>
          </div>
        </li>
      </> : <></>}

      {urlAllow('readBooking') ? <>
        <ListItemLink to="/activeplan">
          <i class="material-icons  mr-2">subscriptions</i>
          <span class="side_head">Plans</span>
        </ListItemLink>
      </> : <></>} */}
      {/* {urlAllow('readPlan') ? <>
        <ListItemLink to="/card">
          <i class="material-icons  mr-2">monetization_on</i>
          <span class="side_head">Billing</span>
        </ListItemLink>
      </> : <></>}
      {urlAllow('readRole') ? <>
        <ListItemLink to="/roles">
          <i class="material-icons  mr-2">manage_accounts</i>
          <span class="side_head">User and Permission</span>
        </ListItemLink>
      </> : <></>}
      {urlAllow('readAdmins') ? <>
        <ListItemLink to="/users">
          <i class="material-icons  mr-2">groups</i>
          <span class="side_head">Users</span>
        </ListItemLink>
      </> : <></>} */}
    </ul>
    </div>
    
  );
}

export default Html