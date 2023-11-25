export const userType={ id:'',company:'',location:'',country:'',title:'',startDate:'',endDateDate:'' ,description:'',currentlyWorking:''}
export const eductionType={ id:'',school:'',degree:'',studyArea:'',title:'',startDate:'',endDate:'' ,description:''}
export const SkillType={ id:'',addedBy_name:'',name:'' ,description:''}
export const companyType={ id:'',companyName:'',financialYear:'',currency:'',companyAddress:'',contactName:'',contactemail:'',companydialcode:'',companymobileno:'',companytimezone:'',productcategory:'',website:'',country:'',city:'',state:'',zipcode:'',lat:'',lng:''}
export const CategoryType={id:'',name:'',catType:'',subParentCategory:'',description:'',image:'',order:'',parentCategory:'',status:'active',icon:'',banner:'',altImageName:'',altIconName:'',bannerOverlayHeading:'',bannerOverlayBody:'',description:'',featured:'No',urlKey:'',metaTitle:'',metaDescription:'',keywords:''}
export const roleType={id:'',name:'',status:'active',permissions:{
    readDashboard:false,
    readSales:false,
    editSales:false,
    deleteSales:false,
    addSales:false,
    readCustomer:false,
    addCustomer:false,
    editCustomer:false,
    deleteCustomer:false,
    readRole:false,
    addRole:false,
    editRole:false,
    deleteRole:false,
    readCategory:false,
    addCategory:false,
    editCategory:false,
    deleteCategory:false,
    readResellerCategory:false,
    addResellerCategory:false,
    editResellerCategory:false,
    deleteResellerCategory:false,
    readAdmins:false,
    addAdmins:false,
    editAdmins:false,
    deleteAdmins:false,
    readTypes:false,
    addTypes:false,
    editTypes:false,
    deleteTypes:false,
    readCategory:false,
    addCategory:false,
    editCategory:false,
    deleteCategory:false,
    readResellerCategory:false,
    addResellerCategory:false,
    editResellerCategory:false,
    deleteResellerCategory:false,
    readPlanFeatures:false,
    addPlanFeatures:false,
    editPlanFeatures:false,
    deletePlanFeatures:false,
    readPlan:false,
    addPlan:false,
    editPlan:false,
    deletePlan:false,
    readCoupons:false,
    addCoupons:false,
    editCoupons:false,
    deleteCoupons:false,
    readCurrency:false,
    addCurrency:false,
    editCurrency:false,
    deleteCurrency:false,
    readBooking:false,
    addBooking:false,
    editBooking:false,
    deleteBooking:false,
    refreshBooking:false,
    readContinents:false,
    addContinents:false,
    editContinents:false,
    deleteContinents:false,
    readCountries:false,
    addCountries:false,
    editCountries:false,
    deleteCountries:false,
    readRegion:false,
    addRegion:false,
    editRegion:false,
    deleteRegion:false,
    readCities:false,
    addCities:false,
    editCities:false,
    deleteCities:false,
    readEmailTemplate:false,
    addEmailTemplate:false,
    editEmailTemplate:false,
    
}}
export const resellerCategoryType={id:'',name:'',catType:'Reseller',description:'',image:''}
export const planType={id:'',name:'',price:'',status:'active',interval:'Monthly',currencyId:'',category:'',recomended:'',feature:[]}
export const continentType={id:'',name:'',status:'active'}
export const featureType={id:'',name:'',status:'active'}
export const emailType={id:'',subject:'',content:'',status:'active'}
export const cityType={id:'',name:'',status:'active',countryId:'',regionId:'',continent:''}
export const bookingSystemType={id:'',name:'',apiKey:'',secretKey:''}
export const posType={id:'',name:'',apiKey:'',url:''}
export const crmType={id:'',name:'',image:'',content:''}
export const couponType={id:'',title:'',status:'active',description:'',couponCode:'',usesPerCoupon:'',usesPerCustomer:'',dateFrom:'',dateTo:'',discountType:'',discountAmount:'',}
export const holidaysType={id:'',name:'',status:'active',discOrPre:'',type:'',amountOrPercent:'',number:'',applyFor:[],preOrPost:'',preDays:'',postDays:'',changesApply:'',changesDate:'',changesDateTo:'',country:''}
export const resellerType={id:'',name:"",logo:"",category:"",contractDate:"",booking:"",pax:"",country:'',contactPerson:'',contactPhone:'',contactEmail:''}
export const earlybirdpricingType={id:'',name:'',discOrPre:'',priceTypes:[],status:'active',changesDate:'',lastMinutePricingToDate:'',inventory:'',lastMinutePricingFromDate:'',applyPriceType:'',availablespaces:'',startDate:'',endDate:'',applyEarlyBirdPricing:[{}],changesDateTo:'',notApply:'',notApplyCondition:'',notApplicableFor:[],blackOutDates:[],amountOrPercent:'',number:'',applyToDaysTimeSlot:'yes',daysToApply:[],timeSlots:[],country:''}
