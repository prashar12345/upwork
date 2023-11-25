import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";
import { useSelector } from 'react-redux';
import { Link, useHistory, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import ApiClient from "../../../methods/api/apiClient";
import loader from "../../../methods/loader";
import methodModel from "../../../methods/methods";
import SelectDropdown from "../../../components/common/SelectDropdown";
import { earlybirdpricingType } from "../../../models/type.model";
import requiredModel from "../../../models/required.model";
import countModel from "../../../models/count.model";
import './style.scss';
import countryModel from "../../../models/country.model";
import datepipeModel from "../../../models/datepipemodel";
import dynamicPriceModel from "../../../models/dynamicPrice.model";
import countryStateModel from "../../../models/countryState.model";

const AddEditEarlyBirdPricing = ({dynamicPricingId,isCopy=false,productData,dType='',result}) => {
    const { id, type, copy } = useParams()

    const getId=()=>{
        return dynamicPricingId?dynamicPricingId:id
    }

    const getType=()=>{
        return dType?dType:type
    }


    const getCopy=()=>{
        return dynamicPricingId?isCopy:JSON.parse(copy?copy:'false')
    }

    const getProductCode=()=>{
        return productData?productData.productCode:methodModel.getPrams('productCode')
    }

    const getProductId=()=>{
        return productData?productData.id:methodModel.getPrams('productId')
    }

    const defaultvalue = () => {
        let keys = { ...earlybirdpricingType }
        Object.keys(earlybirdpricingType).map(itm => {
            if (itm != 'permissions') keys[itm] = ''
        })
        keys.status = 'active'
        keys.applyToDaysTimeSlot = 'yes'
        return keys
    }

    const symbol = [
        { id: '<', name: '<' },
        { id: '>', name: '>' }
    ]
    const priceTypesList = dynamicPriceModel.priceTypesList
    const [form, setform] = useState(earlybirdpricingType)
    const history = useHistory()
    const [submitted, setSubmitted] = useState(false)
    const user = useSelector((state) => state.user);
    const [date, setdate] = useState([{ startDate: '', endDate: '' }])
    const [earlyBirdPricing, setearlyBirdPricing] = useState([{ symbol: '', symbolPercentage: '',discOrPre:'', percentOrAmount: '', percentOrAmountValue: '' }])
    const [availablity,setAvailabilty]=useState([...dynamicPriceModel.slots])
    const [priceTypes, setPriceTypes] = useState([...priceTypesList])
    const formValidation = [
        { key: 'name', required: true },
        { key: 'changesDate', required: true },
        { key: 'notApplicableFor', required: true },
        { key: 'amountOrPercent', required: true },
        { key: 'daysToApply', required: true },
        { key: 'timeSlots', required: true },
    ]

    // const applicables = ['Public Holidays', 'School Holidays', 'Events']
    const applicables = ['State', 'National']

    const setpricetype = (index, value, key) => {
        const field = [...priceTypes]
        field[index] = { ...field[index], [key]: value }
        setPriceTypes([...field]);
    }

    const handleSubmit = (e,override='no') => {
        if(e) e.preventDefault()
        setSubmitted(true)

        let dates=[]
        if(form.notApplicableFor.includes('National')){
            dates=nholidays
        }else if(form.notApplicableFor.includes('State')){
            dates=sholidays
        }


        let err=false
        earlyBirdPricing.map(itm=>{
            Object.keys(itm).map(oitm=>{
                if(!itm[oitm]) err=true
            })
        })

        if(form.applyPriceType=='no'){
            priceTypes.filter(itm=>itm.checked).map(itm=>{
                Object.keys(itm).map(oitm=>{
                    if(!itm[oitm]) err=true
                })
            })
        }

        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid || err) return
        let method = 'post'
        let url = 'api/dynamic/pricing'
        let value = {
            ...form, type: 'earlybirdinventory', 
            override:override,
            donotDates:dates,
            blackOutDates: date,
            applyEarlyBirdPricing: earlyBirdPricing,
            priceTypes:priceTypes.filter(itm=>itm.checked)
        }

        if (getCopy() && getProductCode()) {
            url='api/apply/template/multiple'
            value.dynamicPricingId=value.id
            value.productId=[getProductId()]
        }

        if (value.id && !getCopy()) {
            method = 'put'
            url = 'api/dynamic/pricing/update'
            if (getProductCode()) url = 'api/product/pricing/update'

        } else {
            delete value.id
        }
        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                if(dynamicPricingId){
                    result({type:'Submitted',value:res})
                }else{
                    history.goBack()
                }
            }else if(!res.error){
                let el=document.getElementById('overrideModalBtn')
                if(el) el.click()
            }
            loader(false)
        })
    }

    const getProductAvaialability=(s='',e='')=>{
        if(!getProductCode()) return
        if(!s || !e){
            setAvailabilty([])
            return
        }
        let sdate=`${datepipeModel.datetostring(s)} 00:00:00`
        let edate=`${datepipeModel.datetostring(e)} 23:59:00`
        let prm={
            productCode:'PWQF1Y',
            // productCode:productCode,
            startTimeLocal:sdate,
            endTimeLocal:edate
        }
        console.log("sdate",sdate)
        console.log("edate",edate)
        loader(true)
        ApiClient.get('api/product/availablity',prm).then(res=>{
            if(res.success){
                let data=res.data.map(itm=>{
                    let start=itm.startTimeLocal.split(' ')[1]
                    let end=itm.endTimeLocal.split(' ')[1]
    
                    const findpriceOption=(label)=>{
                        let ext=itm.priceOptions.find(itm=>itm.label==label)
                        return ext?ext:null
                    }
    
                    return {
                        time:`${start} to ${end}`,
                        start:start,
                        end:end,
                        seats:itm.seats,
                        seatsAvailable:itm.seatsAvailable,
                        id:itm.id,
                        allDay:itm.allDay,
                        endTime:itm.endTimeLocal,
                        startTime:itm.startTimeLocal,
                        adult:findpriceOption('Adult'),
                        student:findpriceOption('Student'),
                        child:findpriceOption('Child'),
                        family:findpriceOption('Family'),
                    }
                })
                console.log("data",data)
                setAvailabilty(data)
            }
            loader(false)
        })
    }


    const year = new Date().getFullYear()
    const [nholidays, setNHolidays] = useState([])
    const [sholidays, setSHolidays] = useState([])

    const getHolidays = (p = {}) => {
        let payload = { year:year, ...p }
        ApiClient.get("api/holidays/listing", payload).then(res => {
            if (res.success) {
                setSHolidays(res.data)
            }
        })
    }

    const getNHolidays = (p = {}) => {
        let payload = {year: year, ...p }
        ApiClient.get("api/holidays/listing", payload).then(res => {
            if (res.success) {
                setNHolidays(res.data)
            }
        })
    }

    useEffect(() => {
        if (getId()) {
            loader(true)
            let url = 'api/dynamic/pricing/detail'
            if (getProductCode() && !getCopy()) url = 'api/product/pricing/detail'
            ApiClient.get(url, { id:getId() }).then(res => {
                if (res.success) {
                    let value = res.data
                    let payload = earlybirdpricingType
                    Object.keys(payload).map(itm => {
                        payload[itm] = value[itm]
                    })
                    if (payload.changesDate) payload.changesDate = new Date(payload.changesDate)
                    if (payload.changesDateTo) payload.changesDateTo = new Date(payload.changesDateTo)

                    if(payload.changesDate && payload.changesDateTo){
                        // getProductAvaialability(payload.changesDate,payload.changesDateTo)
                    }

                    const getpriceType=(l,key)=>{
                        let ext=payload.priceTypes?.find(itm=>itm.label==l)
                        return ext?ext?.[key]:''
                    }

                    setPriceTypes([
                        ...priceTypesList.map(itm=>{
                            return {
                                ...itm,
                                checked:getpriceType(itm.label,'label')?true:false,
                                amountOrPercent:getpriceType(itm.label,'amountOrPercent'),
                                discOrPre:getpriceType(itm.label,'discOrPre'),
                                number:getpriceType(itm.label,'number'),

                            }
                        })
                    ])
                    
                    if(payload.blackOutDates){
                        setdate([...payload.blackOutDates.map(itm => {
                            return { startDate: new Date(itm.startDate), endDate: new Date(itm.endDate) }
                        })])
                    }
                    if (payload.applyEarlyBirdPricing?.length) {
                        setearlyBirdPricing([...payload.applyEarlyBirdPricing])
                    }
                    if (getCopy()) {
                        payload.name = `${getProductCode()?'Custom':'Copy of'} ${payload.name}`
                    }
                    if(!payload.applyToDaysTimeSlot){
                        payload.applyToDaysTimeSlot = 'yes'
                    }
                    setform({
                        ...payload
                    })
                }
                loader(false)
            })
        }
        let ext = countryModel.search(user.country)
        let country = 'us'
        if (ext) country = ext.cca2.toLowerCase()
        let counties=countryStateModel.stateIso(user.country,user.state)

        getHolidays({country:country,counties:counties})
        getNHolidays({country:country})
        setform({ ...defaultvalue(), country })
    }, [getId()])

    const selectAll = (checked) => {
        if (checked) {
            setform({ ...form, notApplicableFor: [...applicables] });
        } else {
            setform({ ...form, notApplicableFor: [] });
        }
    }

    const setchecks = (value, checked) => {
        let applyFor = form.notApplicableFor || []
        if (checked == true) {
            applyFor.push(value)
        }
        else {
            applyFor = applyFor.filter(itm => itm != value)
        }
        setform({ ...form, notApplicableFor: applyFor })
    }

    const addmore = () => {
        setdate([...date, { blackOutDates: '' }])
    }
    const remove = (index) => {
        const rows = [...date];
        rows.splice(index, 1);
        setdate(rows);
    }

    const setalldates = (index, value, key) => {
        const field = [...date]
        let endDate=value
        if(key=='startDate') endDate=value
        field[index] = { ...field[index], [key]: value,endDate:endDate }
        setdate([...field]);
    }

    const setalldays = (checked) => {
        if (checked) {
            setform({ ...form, daysToApply: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] });
        } else {
            setform({ ...form, daysToApply: [] });
        }
    }

    const setdays = (value, checked) => {
        let array = form.daysToApply || []
        if (checked == true) {
            array.push(value)
        }
        else {
            array = array.filter(item => item != value)
        }
        setform({ ...form, daysToApply: array })
    }

    const setTimeSlot = (data, checked) => {
        let timeslotarray = form.timeSlots || []
        if (checked == true) {
            timeslotarray.push(data)
        }
        else {
            timeslotarray = timeslotarray.filter(item => item.id != data.id)
        }
        setform({ ...form, timeSlots: timeslotarray })
    }

    const setAllTimeSlots = (checked) => {
        if (checked == true) {
            setform({ ...form, timeSlots: [...availablity]})
        }
        else {
            setform({ ...form, timeSlots: [] })
        }
    }

    const isAlltimeSlots = () => {
        let value = true
        availablity.map(itm=>{
            if(!form.timeSlots.find(titm=>titm.id==itm.id)){
                value=false
            }
        })        
        return value
    }

    // Add More EarlyBirdPricing
    const addEarlyBirdPricing = () => {
        setearlyBirdPricing([...earlyBirdPricing, { symbol: '', symbolPercentage: '', percentOrAmount: '', percentOrAmountValue: '',discOrPre:'' }])
    }
    const removeEarlyBirdPricing = (index) => {
        const rows = [...earlyBirdPricing];
        rows.splice(index, 1);
        setearlyBirdPricing(rows);
    }
    const setAllEarlyBirdPricing = (index, value, key) => {
        const field = [...earlyBirdPricing]
        field[index] = { ...field[index], [key]: value }
        setearlyBirdPricing([...field]);
    }


    const isAllNotApplicable = () => {
        let value = true
        if(form&&!form.notApplicableFor){
            return false
        }
        applicables.map(itm => {
            if (form && !form.notApplicableFor.find(titm => titm == itm)) {
                value = false
            }
        })
        return value
    }

    const back = () => {
        if(dynamicPricingId){
            result({type:'back',value:''})
        }else{
            history.goBack()
        }
     
    }

    return <>
            <form onSubmit={handleSubmit}>
                <div className="pprofile1">
                    <h3 className="ViewUser mb-3">{form && form.id && !getCopy() ? 'Edit' : 'Add'} Early Bird Pricing Inventory </h3>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label>Rule Name<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='Early Bird Pricing - Inventory'
                                value={form.name}
                                onChange={e => setform({ ...form, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Select date to & from when the rates need to be applied<span className="star">*</span></label>
                             <div className="form-row">
                                <div className="col-6">
                                    <DatePicker
                                        className="form-control"
                                        selected={form.changesDate}
                                        minDate={new Date()}
                                        placeholderText="Start Date"
                                        name="changesDate"
                                        required
                                        onChange={(date) => { setform({ ...form, changesDate: date, changesDateTo: '',timeSlots:[] });
                                        // getProductAvaialability(date,'') 
                                    }}
                                        onKeyDown={(e) => {
                                            e.preventDefault();
                                        }}
                                    />

                                </div>
                                <div className="col-6">
                                    <DatePicker
                                        className="form-control"
                                        placeholderText="End Date"
                                        selected={form.changesDateTo}
                                        minDate={form.changesDate || new Date()}
                                        onChange={(date) => { setform({ ...form, changesDateTo: date ,timeSlots:[]});
                                        // getProductAvaialability(form.changesDate,date)
                                     }}
                                        name="changesDateTo"
                                        required
                                        onKeyDown={(e) => {
                                            e.preventDefault();
                                        }}
                                    />
                                </div>
                            </div>
                            {submitted && (!form?.changesDate || !form?.changesDateTo) ? <div className="text-danger">Date Range is Required</div> : <></>}
                        </div>
                        <div className="col-md-12 mb-3">
                            <label>Apply early bird pricing if the number of available spaces is<span className="star">*</span></label>
                            {earlyBirdPricing && earlyBirdPricing.map((item, index) => {
                                return <div className="row mb-3">
                                    <div className="col">
                                        <SelectDropdown
                                            id="statusDropdown"
                                            displayValue="name"
                                            placeholder="Select One"
                                            className={`${!item.symbol && submitted?'invalid':''}`}
                                            intialValue={item.symbol}
                                            result={e => setAllEarlyBirdPricing(index, e.value, 'symbol')}
                                            options={symbol}
                                        />
                                    </div>
                                    <div className="col">
                                        <input
                                            type="text"
                                            className={`form-control ${!item.symbolPercentage && submitted?'invalid':''}`}
                                            placeholder='45'
                                            minLength={1}
                                            maxLength={10}
                                            value={item.symbolPercentage}
                                            onChange={e => setAllEarlyBirdPricing(index, methodModel.isNumber(e), 'symbolPercentage')}
                                        />
                                    </div>
                                    <div className="col">
                                    <SelectDropdown
                                        id="statusDropdownDiscount"
                                        displayValue="name"
                                        placeholder="Discount (-) Or Add Premium (+)"
                                        className={`${!item.discOrPre && submitted?'invalid':''}`}
                                        intialValue={item.discOrPre}
                                        result={e => setAllEarlyBirdPricing(index, e.value, 'discOrPre')}
                                        options={[
                                            { name: 'Discount', id: 'Discount' },
                                            { name: 'Premium', id: 'Premium' }
                                        ]}
                                    />
                                </div>
                                    <div className="col">
                                        <SelectDropdown
                                            id="statusDropdown"
                                            displayValue="name"
                                            placeholder="% or Amount"
                                            className={`${!item.percentOrAmount && submitted?'invalid':''}`}
                                            intialValue={item.percentOrAmount}
                                            result={e => setAllEarlyBirdPricing(index, e.value, 'percentOrAmount')}
                                            options={countModel.list}
                                        />
                                    </div>
                                   
                                    <div className="col">
                                        <input
                                            type="text"
                                            className={`form-control ${!item.percentOrAmountValue && submitted?'invalid':''}`}
                                            placeholder=''
                                            minLength={1}
                                            maxLength={10}
                                            value={item.percentOrAmountValue}
                                            onChange={e => setAllEarlyBirdPricing(index, methodModel.isNumber(e), 'percentOrAmountValue')}
                                        />
                                    </div>
                                    {index > 0 ?
                                        <i class="material-icons sidenv text-danger ml-1 pointer" title="Remove" onClick={e => removeEarlyBirdPricing(index)}>remove</i>
                                        : null}
                                </div>
                            })}
                            <div className="text-left col-md-6">
                                <i class="material-icons sidenv addIc bg-primary" title="Add More" onClick={e => addEarlyBirdPricing()}>add</i>
                            </div>
                            {submitted && !earlyBirdPricing.length ? <div className="text-danger">Early Bird Pricing is Required</div> : <></>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Do not apply early bird pricing<span className="star">*</span></label>
                            <div class="checkPrice d-flex">
                            <label>
                                <input type="checkbox" onChange={e => selectAll(e.target.checked)} checked={isAllNotApplicable()} className="mr-1" />
                                All
                            </label>
                            {applicables.map(itm => {
                                return <label>
                                    <input type="checkbox" className="mr-1" checked={form.notApplicableFor.includes(itm)} onChange={e => setchecks(itm, e.target.checked)} />
                                    {itm}
                                </label>
                            })}
                        </div>
                            {submitted && !form.notApplicableFor ? <div className="text-danger">Do not apply early is Required</div> : <></>}
                        </div>
                        <div className="col-md-12 mb-3">
                            <label>Add Block out Dates or Date Range<span className="star">*</span></label>
                            <div className="row">
                                {date && date.map((item, index) => {
                                    return <div className="row mb-3">
                                        <span className="col-md-6">
                                            <DatePicker
                                                className="form-control"
                                                placeholderText="Choose From Date"
                                                selected={item.startDate}
                                                minDate={new Date()}
                                                required
                                                onChange={(date) => { setalldates(index, date, 'startDate') }}
                                                onKeyDown={(e) => {
                                                    e.preventDefault();
                                                }}
                                            />
                                        </span>
                                        <span className="col-md-6">
                                            <DatePicker
                                                className="form-control"
                                                placeholderText="Choose To Date"
                                                selected={item.endDate}
                                                required
                                                minDate={item.startDate || new Date()}
                                                onChange={(date) => { setalldates(index, date, 'endDate') }}
                                                onKeyDown={(e) => {
                                                    e.preventDefault();
                                                }}
                                            />
                                        </span>
                                        {submitted && (!item?.startDate || !item?.endDate) ? <div className="text-danger">Black Out Dates Range is Required</div> : <></>}
                                        {index > 0 ?
                                            <i class="material-icons inputOverlapIcon text-danger pointer" title="Remove" onClick={e => remove(index)}>remove</i>
                                            : null}
                                    </div>
                                })}
                                <div className="col-md-6 text-left">
                                    <i class="material-icons bg-primary addIc" title="Add More" onClick={e => addmore()}>add</i>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-md-4 mb-3">
                            <label>Apply % or Amount<span className="star">*</span></label>
                            <SelectDropdown
                                id="statusDropdown"
                                displayValue="name"
                                placeholder="% or Amount"
                                intialValue={form.amountOrPercent}
                                result={e => { setform({ ...form, amountOrPercent: e.value }) }}
                                options={countModel.list}
                            />
                            {submitted && !form.amountOrPercent ? <div className="text-danger">Amount is Required</div> : <></>}
                        </div> */}
                        {/* <div className="col-md-4 mb-3">
                            <label>Add Number<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder=''
                                minLength={1}
                                maxLength={10}
                                required
                                value={form.number}
                                onChange={e => setform({ ...form, number: methodModel.isNumber(e) })}
                            />
                        </div> */}


<div className="col-md-6 mb-3">
                        <label>Apply to all price types<span className="star">*</span></label>
                        <SelectDropdown
                            id="statusDropdown"
                            displayValue="name"
                            placeholder="Select Yes/No"
                            intialValue={form.applyPriceType}
                            result={e => { setform({ ...form, applyPriceType: e.value }) }}
                            options={requiredModel.list}
                        />
                        {submitted && !form.applyPriceType ? <div className="text-danger">All Price Types is Required</div> : <></>}
                    </div>
                    {form?.applyPriceType == 'no' ?
                        <div className="col-md-12">
                            <table class="table table-striped">
                                <thead className="table_head">
                                    <tr className="heading_row">
                                        <th className="table_data" scope="col">Label</th>
                                        <th className="table_data" scope="col">Current Price</th>
                                        <th className="table_data" scope="col"></th>
                                        <th className="table_data" scope="col"></th>
                                        <th className="table_data" scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {priceTypes.map((itm, i) => {
                                        return <tr>
                                            <th scope="row"><label>
                                                <input 
                                                type='checkbox'
                                                className="mr-2"
                                                    checked={itm.checked ? true : false}
                                                    onChange={e => setpricetype(i, e.target.checked, 'checked')}
                                                />
                                                {itm.label}</label></th>
                                            <td>{productData?.advertisedPrice}</td>
                                            <td>
                                                <SelectDropdown
                                                    id="statusDropdown"
                                                    displayValue="name"
                                                    placeholder="Discount (-) Or Add Premium (+)"
                                                    name="discOrPre"
                                                    className={`${!itm.discOrPre && submitted && itm.checked?'invalid':''}`}
                                                    required={true}
                                                    disabled={itm.checked?false:true}
                                                    intialValue={itm.discOrPre}
                                                    result={e => {setpricetype(i, e.value, 'discOrPre')}}
                                                    options={[
                                                        { name: 'Discount', id: 'Discount' },
                                                        { name: 'Premium', id: 'Premium' }
                                                    ]}
                                                />
                                            </td>
                                            <td>
                                                <SelectDropdown
                                                    id="statusDropdown"
                                                    displayValue="name"
                                                    disabled={itm.checked?false:true}
                                                    className={`${!itm.amountOrPercent && submitted && itm.checked?'invalid':''}`}
                                                    placeholder="Discount % or $"
                                                    intialValue={itm.amountOrPercent}
                                                    result={e => { setpricetype(i, e.value, 'amountOrPercent') }}
                                                    options={countModel.list}
                                                />
                                            </td>
                                           
                                            <td>
                                                <input
                                                    type="text"
                                                    className={`form-control ${!itm.number && submitted && itm.checked?'invalid':''}`}
                                                    placeholder='Amount or %'
                                                    maxLength={10}
                                                    disabled={itm.checked?false:true}
                                                    value={itm.number}
                                                    onChange={e => setpricetype(i, methodModel.isNumber(e), 'number')}
                                                />
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                        : null}


                        <div className="col-md-4 mb-3">
                            <label>Apply to all days and all time slots<span className="star">*</span></label>
                            <SelectDropdown
                                id="statusDropdown"
                                displayValue="name"
                                placeholder="Select Yes/No"
                                intialValue={form.applyToDaysTimeSlot}
                                result={e => { setform({ ...form, applyToDaysTimeSlot: e.value }) }}
                                options={requiredModel.list}
                            />
                            {submitted && !form.applyToDaysTimeSlot ? <div className="text-danger">All days and all time slot is Required</div> : <></>}
                        </div>
                        {form.applyToDaysTimeSlot == 'no' && getProductCode()?
                        <>
                            <div className="col-md-12 mb-3">
                                <label>Select Days to apply<span className="star">*</span></label>
                                <div>
                                    <div className='d-flex'>
                                        <div class="form-check ml-1">
                                            <input type="checkbox" class="form-check-input" id="exampleCheck1" onClick={e => setalldays(e.target.checked)} checked={form.daysToApply.includes('monday') && form.daysToApply.includes('tuesday') && form.daysToApply.includes('wednesday') && form.daysToApply.includes('thursday') && form.daysToApply.includes('friday') && form.daysToApply.includes('saturday') && form.daysToApply.includes('sunday')} />
                                            <label class="form-check-label" for="exampleCheck1">All</label>
                                        </div>
                                        <div class="form-check ml-3">
                                            <input type="checkbox" class="form-check-input" id="Monday" checked={form.daysToApply.includes('monday')} onClick={e => setdays('monday', e.target.checked)} />
                                            <label class="form-check-label" for="Monday">Monday</label>
                                        </div>
                                        <div class="form-check ml-3">
                                            <input type="checkbox" class="form-check-input" id="Tuesday" checked={form.daysToApply.includes('tuesday')} onClick={e => setdays('tuesday', e.target.checked)} />
                                            <label class="form-check-label" for="Tuesday">Tuesday</label>
                                        </div>
                                        <div class="form-check ml-3">
                                            <input type="checkbox" class="form-check-input" id="Wednesday" checked={form.daysToApply.includes('wednesday')} onClick={e => setdays('wednesday', e.target.checked)} />
                                            <label class="form-check-label" for="Wednesday">Wednesday</label>
                                        </div>
                                        <div class="form-check ml-3">
                                            <input type="checkbox" class="form-check-input" id="Thursday" checked={form.daysToApply.includes('thursday')} onClick={e => setdays('thursday', e.target.checked)} />
                                            <label class="form-check-label" for="Thursday">Thursday</label>
                                        </div>
                                        <div class="form-check ml-3">
                                            <input type="checkbox" class="form-check-input" id="Friday" checked={form.daysToApply.includes('friday')} onClick={e => setdays('friday', e.target.checked)} />
                                            <label class="form-check-label" for="Friday">Friday</label>
                                        </div>
                                        <div class="form-check ml-3">
                                            <input type="checkbox" class="form-check-input" id="Saturday" checked={form.daysToApply.includes('saturday')} onClick={e => setdays('saturday', e.target.checked)} />
                                            <label class="form-check-label" for="Saturday">Saturday</label>
                                        </div>
                                        <div class="form-check ml-3">
                                            <input type="checkbox" class="form-check-input" id="Sunday" checked={form.daysToApply.includes('sunday')} onClick={e => setdays('sunday', e.target.checked)} />
                                            <label class="form-check-label" for="Sunday">Sunday</label>
                                        </div>
                                    </div>
                                </div>
                                {submitted && !form.daysToApply ? <div className="text-danger">Days to Apply is Required</div> : <></>}
                            </div>
                            <div className="col-md-12 mb-3">
                                <label>Select Time Slots to apply<span className="star">*</span></label>
                                <div class="form-check ml-1">
                                    <input type="checkbox" class="form-check-input" id="timeslot" checked={isAlltimeSlots()} onClick={e => setAllTimeSlots(e.target.checked)} />
                                    <label class="form-check-label" for="timeslot">All Slots</label>
                                </div>
                                <div className="table-responsive table_section border">
                                    <table class="table table-striped">
                                        <thead className="table_head">
                                            <tr className="heading_row">
                                            <th className="table_data" scope="col">Select</th>
                                                <th className="table_data" scope="col">Time</th>
                                                {form.daysToApply && form.daysToApply.map((item, index) => {
                                                    return <th scope="col" className="table_data text-capitalize">{item}</th>
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {availablity && availablity.map((itm, i) => {
                                                return <tr>
                                                    <th scope="row"><input type="checkbox" id="timeslotchecks" checked={form?.timeSlots && form?.timeSlots?.find(i => i.id == itm.id) ? true : false} onClick={e => setTimeSlot(itm, e.target.checked)} /></th>
                                                    <td>{datepipeModel.time(itm.start)} - {datepipeModel.time(itm.end)}</td>
                                                    {form.daysToApply && form.daysToApply.map((item, index) => {
                                                        return <td scope="row"><input type='checkbox' checked={form.timeSlots.find(titm=>titm.id==itm.id)?true:false} disabled/></td>
                                                    })}
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                {submitted && !form.timeSlots ? <div className="text-danger">Time Slot is Required</div> : <></>}
                            </div>
                        </>
                        :null}
                    </div>
                    <div className="text-right">
                        <a className="btn btn-secondary discard mr-2" onClick={e=>back()}>Back</a>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </div>
            </form>

<button type="button" class="btn btn-primary d-none" data-toggle="modal" data-target="#overrideModal" id="overrideModalBtn">
  Launch demo modal
</button>

<div class="modal fade" id="overrideModal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Message</h5>
        {/* <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button> */}
      </div>
      <div class="modal-body">
        Some Dates are overlapping. Do you want to override
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={e=>handleSubmit('','yes')}>Yes</button>
      </div>
    </div>
  </div>
</div>
    </>
}

export default AddEditEarlyBirdPricing