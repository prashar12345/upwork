import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from 'react-redux';
import { holidaysType } from "../../models/type.model";
import { Link, useHistory, useParams } from "react-router-dom";
import SelectDropdown from "../../components/common/SelectDropdown";
import requiredModel from "../../models/required.model";
import daysModel from "../../models/days.modal";
import NowLaterModel from "../../models/nowlater.model";
import countModel from "../../models/count.model";
import dynamicPriceModel from "../../models/dynamicPrice.model";
import datepipeModel from "../../models/datepipemodel";
import formModel from "../../models/form.model";
import methodModel from "../../methods/methods";
import countryModel from "../../models/country.model";
import DatePicker from "react-datepicker";
import countryStateModel from "../../models/countryState.model";

const AddEditPrice = ({dynamicPricingId,isCopy=false,productData,dType='',result}) => {
    const { id, type, copy } = useParams()
    const year = new Date().getFullYear()

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
        let keys = { ...holidaysType }
        Object.keys(holidaysType).map(itm => {
            if (itm != 'permissions') keys[itm] = ''
        })
        keys.status = 'active'
        keys.type = getType()
        return keys
    }

    const [form, setform] = useState(holidaysType)
    const history = useHistory()
    const [submitted, setSubmitted] = useState(false)
    const [holidays, setHolidays] = useState([])
    const [nholidays, setNHolidays] = useState([])
    const [sholidays, setSHolidays] = useState([])
    const [selectedHoliday, setSelectedHolidy] = useState([])
    const user = useSelector((state) => state.user);
    const [filter, setFilter] = useState({ country: 'us', year: year,type:'national',counties:'' })

    const handleSubmit = (e,override='no') => {
        if(e) e.preventDefault()
        setSubmitted(true)
        let invalid = formModel.getFormError('dynamicPricing')
        if (invalid) return
        let method = 'post'
        let url = 'api/dynamic/pricing'
        let value = {
            ...form,
            override,
            country: filter.country,
            dates: selectedHoliday.map(itm=>{
                return{
                    ...itm,
                    isState:sholidays.find(sitm=>sitm._id==itm._id)?true:false
                }
            })
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

    const getError = (key) => {
        return formModel.getError('dynamicPricing', key)
    }

    const getHolidays = (p = {}) => {
        let payload = { ...filter, ...p,type:'' }
        ApiClient.get("api/holidays/listing", payload).then(res => {
            if (res.success) {
                setSHolidays(res.data)
            }
        })
    }

    const getNHolidays = (p = {}) => {
        let payload = {country: filter.country, year: year, ...p }
        ApiClient.get("api/holidays/listing", payload).then(res => {
            if (res.success) {
                setNHolidays(res.data)
                setHolidays(res.data)
            }
        })
    }

    const holidayType=(t)=>{
        setFilter({...filter,type:t})
        let value=sholidays
        if(t=='national') value=nholidays
        setHolidays([...value])
    }

    useEffect(() => {
        if (getId()) {
            loader(true)
            let url = 'api/dynamic/pricing/detail'
            if (getProductCode() && !getCopy()) url = 'api/product/pricing/detail'

            ApiClient.get(url, { id:getId() }).then(res => {
                if (res.success) {
                    let value = res.data
                    let payload = holidaysType
                    Object.keys(payload).map(itm => {
                        payload[itm] = value[itm]
                    })

                    if (payload.changesDate) payload.changesDate = new Date(payload.changesDate)
                    if (payload.changesDateTo) payload.changesDateTo =  new Date(payload.changesDateTo)
                    if (getCopy()) {
                        payload.name = `${getProductCode()?'Custom':'Copy of'} ${payload.name}`
                    }
                    setform({
                        ...payload
                    })
                    setSelectedHolidy(value.dates || [])
                }
                loader(false)
            })
        } else {
            setform(defaultvalue())
            setSelectedHolidy([])
        }


        let cext = countryModel.search(user.country)
        let prm = {country:'us'}
        if (cext) {
            prm = {
                country: cext?.cca2?.toLowerCase(),
                counties:countryStateModel.stateIso(user.country,user.state)
            }
            setFilter({ ...filter, ...prm })
        }

        getHolidays(prm)
        getNHolidays({country:prm.country})
    }, [getId(), getType()])

    const selectAll = (checked) => {
        if (checked) {
            setform({ ...form, applyFor: ['state', 'national'] });
            setSelectedHolidy([
                ...nholidays
            ])
        } else {
            setform({ ...form, applyFor: [] });
            setSelectedHolidy([])
        }
    }

    const setchecks = (value, checked) => {
        let applyFor = form.applyFor || []
        if (checked == true) {
            applyFor.push(value)
        }
        else {
            applyFor = applyFor.filter(itm => itm != value)
        }

        if(applyFor.includes('national')){
            setSelectedHolidy([...nholidays])
        }else if(applyFor.includes('state')){
            setSelectedHolidy([...sholidays])
        }
        console.log("applyFor",applyFor)
        setform({ ...form, applyFor: applyFor })
    }

    const back = () => {
        if(dynamicPricingId){
            result({type:'back',value:''})
        }else{
            history.goBack()
        }
     
    }


    const holidayCheck = (item) => {
        let ext = selectedHoliday.find(itm => itm._id == item._id)
        let value = selectedHoliday
        if (ext) {
            value = value.filter(itm => itm._id != item._id)
        } else {
            value.push(item)
        }
        setSelectedHolidy([...value])
    }

    const holdayAllCheckValue = () => {
        let value = true
        holidays.map(itm => {
            let ext = selectedHoliday.find(sitm => sitm._id == itm._id)
            if (!ext) value = false
        })
        return value
    }

    const holdayAllCheck = () => {
        let checked = holdayAllCheckValue()
        if (!checked) {
            setSelectedHolidy([
                ...holidays
            ])
        } else {
            let arr = []
            setSelectedHolidy([...arr])
        }
    }

    return <>
            {getType() ? <>
                <div className="pprofile1">
                    <div className="row">
                        <div className="col-md-8">
                            <h3 className="ViewUser mb-3">{getId() && !getCopy() ? 'Edit' : 'Add'} {dynamicPriceModel.name(getType())}</h3>
                            <form onSubmit={handleSubmit} name="dynamicPricing">
                                <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                        <label>Rule Name<span className="star">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder={dynamicPriceModel.name(form.type)}
                                            value={form.name}
                                            onChange={e => setform({ ...form, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    {/* <div className="col-md-6 mb-3">
                                        <label>Country<span className="star">*</span></label>
                                        <SelectDropdown
                                            id="statusDropdown"
                                            displayValue="name"
                                            placeholder="Select Country"
                                            name="amountOrPercent"
                                            required={true}
                                            intialValue={filter.country}
                                            result={e => { setCountry({ country: e.value ? e.value : country[0].id }); setform({ ...form, country: e.value }) }}
                                            options={country}
                                        />
                                    </div> */}
                                    <div className="col-md-6 mb-3">
                                        <label>Would you like to Apply Discount (-) or Add Premium (+)<span className="star">*</span></label>
                                        <SelectDropdown
                                            id="statusDropdown"
                                            displayValue="name"
                                            placeholder="Discount (-) Or Add Premium (+)"
                                            name="discOrPre"
                                            required={true}
                                            intialValue={form.discOrPre}
                                            result={e => { setform({ ...form, discOrPre: e.value }) }}
                                            options={[
                                                {name:'Discount',id:'Discount'},
                                                {name:'Premium',id:'Premium'}
                                            ]}
                                        />
                                        {submitted && !form?.discOrPre ? <div className="text-danger">Discount (-) or Add Premium (+) is Required</div> : <></>}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Apply % or Amount<span className="star">*</span></label>
                                        <SelectDropdown
                                            id="statusDropdown"
                                            displayValue="name"
                                            placeholder="% or Amount"
                                            name="amountOrPercent"
                                            required={true}
                                            intialValue={form.amountOrPercent}
                                            result={e => { setform({ ...form, amountOrPercent: e.value }) }}
                                            options={countModel.list}
                                        />
                                        {submitted && !form?.amountOrPercent ? <div className="text-danger">Amount is Required</div> : <></>}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Add Number(please add number only not $ or % sign)<span className="star">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder=""
                                            minLength={1}
                                            maxLength={10}
                                            value={form.number}
                                            onChange={e => setform({ ...form, number: methodModel.isNumber(e) })}
                                        />
                                    </div>
                                    
                                    <div className="col-md-12 mb-3">
                                        <label>Apply for {dynamicPriceModel.name(form.type)}<span className="star">*</span></label>
                                        <div class="form-check ml-1 chekss">
                                            <div className="inside_check">
                                                <input class="form-check-input" type="checkbox" id="all" name="all" onChange={e => selectAll(e.target.checked)} checked={form.applyFor.includes('state') && form.applyFor.includes('national')} />
                                                <label class="form-check-label" for="all">
                                                    All
                                                </label>
                                            </div>
                                            <div className="inside_check">
                                                <input class="form-check-input" type="checkbox" id="state" name="state" checked={form.applyFor.includes('state')} onChange={e => setchecks('state', e.target.checked)} />
                                                <label class="form-check-label" for="state">
                                                    State
                                                </label>
                                            </div>
                                            <div className="inside_check">
                                                <input class="form-check-input" type="checkbox" id="national" name="national" checked={form.applyFor.includes('national')} onChange={e => setchecks('national', e.target.checked)} />
                                                <label class="form-check-label" for="national">
                                                    National
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="hidden" name="applyFor" value={form?.applyFor} required />
                                    {submitted && !form?.applyFor?.length ? <div className="text-danger">Apply for is Required</div> : <></>}
                                    <div className="col-md-6 mb-3">
                                        <label>Apply pre and post days?<span className="star">*</span></label>
                                        <SelectDropdown
                                            id="statusDropdown"
                                            displayValue="name"
                                            placeholder="Select Yes/No"
                                            name="preOrPost"
                                            required={true}
                                            intialValue={form.preOrPost}
                                            result={e => { setform({ ...form, preOrPost: e.value }) }}
                                            options={requiredModel.list}
                                        />
                                        {submitted && !form?.preOrPost ? <div className="text-danger">Pre Or Post is Required</div> : <></>}
                                    </div>
                                    {form.preOrPost == 'yes' ?
                                        <>
                                            <div className="col-md-6 mb-3">
                                                <label>Apply to days preceding {dynamicPriceModel.name(form.type)}<span className="star">*</span></label>
                                                <SelectDropdown
                                                    id="statusDropdown"
                                                    displayValue="name"
                                                    placeholder="Select days"
                                                    name="preDays"
                                                    required={true}
                                                    intialValue={form.preDays}
                                                    result={e => { setform({ ...form, preDays: e.value }) }}
                                                    options={daysModel.list}
                                                />
                                                {submitted && !form?.preDays ? <div className="text-danger">Preceding days are Required</div> : <></>}
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label>Apply to days post {dynamicPriceModel.name(form.type)}<span className="star">*</span></label>
                                                <SelectDropdown
                                                    id="statusDropdown"
                                                    displayValue="name"
                                                    placeholder="Select days"
                                                    name="postDays"
                                                    intialValue={form.postDays}
                                                    result={e => { setform({ ...form, postDays: e.value }) }}
                                                    options={daysModel.list}
                                                />
                                                {submitted && !form?.postDays ? <div className="text-danger">Post days are Required</div> : <></>}
                                            </div>
                                        </>
                                        : null}
                                    <div className="col-md-6 mb-3">
                                        <label>Apply change Now or later?<span className="star">*</span></label>
                                        <div>
                                            <SelectDropdown
                                                id="statusDropdown"
                                                displayValue="name"
                                                placeholder="Select Now/Later"
                                                intialValue={form.changesApply}
                                                name="changesApply"
                                                required={true}
                                                result={e => { setform({ ...form, changesApply: e.value,changesDate:'' }) }}
                                                options={NowLaterModel.list}
                                            />
                                            {submitted && !form?.changesApply ? <div className="text-danger">Apply change is Required</div> : <></>}
                                        </div>
                                    </div>
                                    {form.changesApply=='now'?<></>:<>
                                    <div className="col-md-6 mb-3">
                                        <label>Select Date to apply this rule from<span className="star">*</span></label>
                                        <div className="form-row">
                                            <div className="col-12">
                                                <DatePicker
                                                    className="form-control"
                                                    selected={form.changesDate}
                                                    minDate={new Date()}
                                                    placeholderText="Start Date"
                                                    name="changesDate"
                                                    required
                                                    disabled={form.changesApply=='now'?true:false}
                                                    onChange={(date) => { setform({ ...form, changesDate: date, changesDateTo: '' }) }}
                                                    onKeyDown={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                />

                                            </div>
                                            {/* <div className="col-6">
                                                <DatePicker
                                                    className="form-control"
                                                    placeholderText="End Date"
                                                    selected={form.changesDateTo}
                                                    minDate={form.changesDate || new Date()}
                                                    onChange={(date) => { setform({ ...form, changesDateTo: date }) }}
                                                    name="changesDateTo"
                                                    required
                                                    onKeyDown={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                />
                                            </div> */}
                                        </div>
                                        {submitted && (!form?.changesDate) ? <div className="text-danger">Date is Required</div> : <></>}
                                    </div>
                                    </>}
                                    <div className="text-right col-md-12">
                                        <button type="button" className="btn btn-secondary discard mr-2" onClick={e => back()}>Back</button>
                                        <button type="submit" className="btn btn-primary">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <ul class="nav nav-tabs">
                                    {/* <li class="nav-item">
                                        <a className={`nav-link ${filter.type==''?'active':''}`} onClick={e=>holidayType('')}>All</a>
                                    </li> */}
                                    <li class="nav-item">
                                        <a className={`nav-link ${filter.type=='state'?'active':''}`} onClick={e=>holidayType('state')}>State</a>
                                    </li>
                                    <li class="nav-item">
                                        <a className={`nav-link ${filter.type=='national'?'active':''}`} onClick={e=>holidayType('national')}>National</a>
                                    </li>
                                </ul>
                                <div className="p-3 overLapList">
                                    <h5>List of {dynamicPriceModel.name(getType())}</h5>
                                    <p className="small mb-1">
                                        Choose Holidays
                                    </p>
                                    <div onClick={e => holdayAllCheck()} className={`holidays ${holdayAllCheckValue() ? 'active' : ''}`}>
                                        <input type="checkbox" checked={holdayAllCheckValue()} />
                                        All</div>
                                    {holidays.map(itm => {
                                        return <div onClick={e => holidayCheck(itm)} className={`holidays ${selectedHoliday.find(sitm => itm._id == sitm._id) ? 'active' : ''}`}>
                                            <input type="checkbox" checked={selectedHoliday.find(sitm => itm._id == sitm._id) ? true : false} />
                                            {itm.name} <span className="bold">({datepipeModel.date(itm.date)})</span></div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </> : <>
                <div className="pprofile1">
                    <h3 className="ViewUser mb-3">Select Pricing Rule</h3>
                    {/* <article className="d-flex">
                        <span className='mr-2'>
                            <SelectDropdown
                                isSingle={true}
                                id="statusDropdown"
                                displayValue="name"
                                placeholder='All Countries'
                                intialValue={filter.country}
                                result={e => { setCountry({ country: e.value ? e.value : country[0].id }); setform({ ...form, country: e.value }) }}
                                options={country}
                            />
                        </span>
                        <SelectDropdown
                            isSingle={true}
                            id="statusDropdown"
                            displayValue="year"
                            placeholder='All Years'
                            intialValue={filter.year}
                            result={e => { setYear({ year: e.value ? e.value : years[0].id }); setform({ ...form, year: e.value }) }}
                            options={years}
                        />
                    </article> */}
                    <div className="text-center">
                        {dynamicPriceModel.list.map(itm => {
                            return <Link className="btn btn-secondary discard m-1" to={`/dynamicprice/${itm.id}/add`}>{itm.name}</Link>
                        })}
                    </div>
                </div>
            </>}

<button type="button" class="btn btn-primary d-none" data-toggle="modal" data-target="#overrideModal" id="overrideModalBtn">
  Launch demo modal
</button>

<div class="modal fade" id="overrideModal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
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

export default AddEditPrice