import React, { useState, useEffect } from 'react';
import Layout from '../../components/global/layout';
import './style.scss'
import Html from './html';
import { companyType } from '../../models/type.model';
import methodModel from '../../methods/methods';
import ApiClient from '../../methods/api/apiClient';
import { toast } from 'react-toastify';
import loader from '../../methods/loader';
import { useHistory } from 'react-router-dom';
import environment from '../../environment';
import { useDispatch, useSelector } from 'react-redux';
import { login_success } from '../../actions/user';
import addressModel from '../../models/address.model';

const CompanyDetails = () => {
  const user = useSelector((state) => state.user)
  const [form, setForm] = useState({ ...companyType })
  const [tab, setTab] = useState('')
  const [years, setYears] = useState([])
  const [addressSellected, setAddressSellected] = useState(true)
  const [currency, setcurrency] = useState([])
  const formValidation = [
    { key: 'companymobileno', minLength: 10 },
    { key: 'companydialcode', dialCode: true },
  ]
  const history = useHistory()
  const dispatch = useDispatch()
  const [submitted, setSubmitted] = useState(false)
  const [categories, setCategories] = useState([])
  const [timezoneLoader, setTimezoneLoader] = useState(false)

  const getError = (key) => {
    return methodModel.getError(key, form, formValidation)
  }

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true)
    let invalid = methodModel.getFormError(formValidation, form)
    if (invalid && (!addressSellected && form.address && tab == 'info') || timezoneLoader) return
    let value = { ...form }
    loader(true)
    ApiClient.put('api/user/profile', value).then(res => {
      if (res.success) {
        let uUser = { ...user, ...value }
        dispatch(login_success(uUser))
        toast.success(res.message)
        setTab('')
      }
      loader(false)
    })
  };

  const getCategories = () => {
    ApiClient.get('api/categories/listing', { catType: environment.productTypeId, status: 'active' }).then(res => {
      if (res.success) {
        setCategories(res.data)
      }
    })
  }

  const getCurrency=()=>{
    ApiClient.get(`api/currency/listing`,{status:'active'}).then(res=>{
      if(res.success){
        setcurrency(res.data)
      }
    })
  }

  const tabChange = (t) => {
    let value = t
    if (tab == t) value = ''
    setTab(value)
  }

  const categoryname = (p) => {
    let value = '--'
    let ext = categories.find(itm => itm.id == p)
    if (ext) value = ext?.name
    return value
  }

  const currencyName = (p) => {
    let value = '--'
    let ext = currency.find(itm => itm.id == p)
    if (ext) value = ext?.currency
    return value
  }

  const addressResult = async (e) => {
    let address = {}
    if (e.place) {
      address = addressModel.getAddress(e.place)
      setAddressSellected(true)
    } else {
      setAddressSellected(false)
    }
    setForm({
      ...form,
      companyAddress: e.value,
      country: address.country || '',
      city: address.city || '',
      state: address.state || '',
      zipcode: address.zipcode || '',
      lat: address.lat || '',
      lng: address.lng || ''
    })
    if (e.place) {
      setTimezoneLoader(true)
      const apires = await addressModel.gettimeZone(e.place)
      setTimezoneLoader(false)
      setForm({
        ...form,
        companyAddress: e.value,
        country: address.country || '',
        city: address.city || '',
        state: address.state || '',
        zipcode: address.zipcode || '',
        lat: address.lat || '',
        lng: address.lng || '',
        companytimezone: apires?.data?.timeZoneId || ''
      })
    }
  }

  useEffect(() => {
    getCategories()
    getCurrency()
    loader(true)

    let year=new Date().getFullYear()
    let arr=[]
    for(let i=1;i<=10;i++){
      arr.push({
        id:year,
        name:year
      })
      year=year-1
    }
console.log("arr",arr)
    setYears([...arr])

    ApiClient.get('api/user/profile', { id: user._id }).then(res => {
      if (res.success) {
        let payload = companyType
        let value = res.data
        Object.keys(payload).map(itm => {
          payload[itm] = value[itm]
        })
        setForm(payload)
      }
      loader(false)
    })
  }, [])

  return (
    <Layout>
      <Html
        user={user}
        years={years}
        timezoneLoader={timezoneLoader}
        addressSellected={addressSellected}
        addressResult={addressResult}
        categoryname={categoryname}
        currencyName={currencyName}
        form={form}
        setTab={tabChange}
        tab={tab}
        setForm={setForm}
        handleSubmit={handleSubmit}
        getError={getError}
        submitted={submitted}
        categories={categories}
        currency={currency}
      />
    </Layout>
  );
};

export default CompanyDetails;
