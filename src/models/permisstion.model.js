const permissions = {
    prodMgmtRead:false,
    prodMgmtEdit:false,
    prodMgmtDelete:false,
    prodMgmtAdd:false,
    userMgmtRead:false,
    userMgmtDelete:false,
    userMgmtEdit:false,
    userMgmtAdd:false,
}

const roleUrl=[
    {
      url:'readDashboard',
      key:'readDashboard',
    },
    {
      url:'readSales',
      key:'readSales'
    },
    {
      url:'readReviews',
      key:'readReviews'
    },
    {
      url:'readProducts',
      key:'readProducts'
    },
    {
      url:'readMarketing',
      key:'readMarketing'
    },
    {
      url:'readFinancial',
      key:'readFinancial'
    },
    {
      url:'readDynamicPricing',
      key:'readDynamicPricing'
    },
    {
      url:'readCompany',
      key:'readCompany'
    },
    {
      url:'readCRM',
      key:'readCRM'
    },
    {
      url:'readAPI',
      key:'readAPI'
    },
    {
      url:'readBooking',
      key:'readBooking'
    },
    {
      url:'readPlan',
      key:'readPlan'
    },
    {
      url:'readBilling',
      key:'readBilling'
    },
    {
      url:'readRole',
      key:'readRole'
    },
    {
      url:'readAdmins',
      key:'readAdmins'
    },
  ]

  const urlAllow=(permissions,u='')=>{
    let url=u?u:window.location.href
    let value=true
    let ext=roleUrl.find(itm=>url.includes(itm.url))
    if(ext) value=permissions?.[ext.key]
    return value
  }

const permissionModel = { permissions,urlAllow }

export default permissionModel