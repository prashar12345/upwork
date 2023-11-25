import React from 'react';
import './style.scss';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Html from './Html';
import permissionModel from "../../../models/permisstion.model"

const Sidebar = () => {
  const user = useSelector(state => state.user)
  const history=useHistory()
  const menus={
    user:['roles','users/subAdmin'],
    sales:['sales','saleData'],
    catalogue:['types','categories','category/Reseller'],
    productdashboard:['productdashboard','products','productData','product/detail'],
    dynamicPricing:['dynamicprice'],
    reviews:['reviews','reviewDashboard'],
    plan:['plans','card'],
    crm:['crm','reseller','databaseReseller'],
    api:['product','pos','review'],
    geo:['continents','countries','regions','cities']
  }

  const ListItemLink = ({ to, type = 'link',disabled=false, ...rest }) => {
    let url = location.href
    const host = location.host
    url = url.split(host)[1]
    return (<>
      {type == 'link' ? <li className={`nav-item  ${url.includes(to) ? 'active' : ''}`}>
        {/* {...rest} */}
        <Link to={to} {...rest} className={`nav-link hoverclass ${disabled?'disabled':''}`} disabled={disabled} />
      </li> : <li className={`nav-item main `} {...rest}></li>}
    </>
    );
  };

  const matchUrl = (to, exact = false) => {
    let url = location.href
    const host = location.host
    url = url.split(host)[1]
    if (exact) return url == to
    if (!exact) return url.includes(to)
  }

  const tabclass=(tab)=>{
    let url = location.href
    let value=false
    menus[tab].map(itm=>{
      if(url.includes(itm)) value=true
    })
    return value
  }

  const urlAllow=(url)=>{
    let permissions=user.subRole?.permissions[0]
    let arr=url.split(',')
    let value = false
    arr.map(itm=>{
      if(permissionModel.urlAllow(permissions,itm)) value=true
    })
    if(user.subRole){
      return value
    }
    else{
      return true
    }
  }

  const route=(p)=>{
    history.push(p)
  }

  return <>
  <Html
  route={route}
  tabclass={tabclass}
  ListItemLink={ListItemLink}
  urlAllow={urlAllow}
  />
  </>
};

export default Sidebar;
