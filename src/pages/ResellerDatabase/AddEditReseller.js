import React, { useEffect, useState } from 'react'
import Layout from '../../components/global/layout'
import { useHistory, useParams } from 'react-router'
import SelectDropdown from '../../components/common/SelectDropdown';
import loader from '../../methods/loader';
import ApiClient from '../../methods/api/apiClient';
import { toast } from 'react-toastify';
import methodModel from '../../methods/methods';
import Select from "react-select";
import { resellerType } from '../../models/type.model';
import GooglePlaceAutoComplete from "../../components/common/GooglePlaceAutoComplete";

export default function AddEditReseller() {
  const { id } = useParams();
  const Navigate = useHistory();
  const [submit, setsubmit] = useState(false);
  const defaultValue = () => {
    let value = resellerType
    Object.keys(value).map(itm => {
      value[itm] = ''
    })
    return value
  }
  const [form, setform] = useState({ ...defaultValue() });
  const [Categories, setCategories] = useState([]);
  const [countries, setContries] = useState([]);
  //  For Handle Submit the Reseller Data
  const HandleSubmit = (e) => {
    e.preventDefault();
    setsubmit(true);
    let payload = { ...form, id: id };
    let method = "post";
    let url = "api/reseller";

    if (!payload.category || !payload.country) return

    if (id) { method = "put"; url = `api/reseller/update` } else { delete payload.id }

    loader(true);
    ApiClient.allApi(url, payload, method).then(response => {
      if (response.success) {
        Navigate.goBack()
        toast.success(`Reseller ${method == "post" ? "Added" : "Updated"} Successfully`)
      }
      loader(false);
    })

  }
  const GetCountries = () => {
    ApiClient.get(`api/country/listing`, { status: 'active' }).then(res => {
      if (res.success) {
        setContries(res.data.map(itm => {
          return {
            label: itm.name,
            value: itm.id
          }
        }))
      }
    })
  }

  const GetCategories = () => {
    ApiClient.get(`api/categories/listing?catType=64b23b7d690d1d5f7ae76102&sortBy=order%20asc&status=active`).then(res => {
      let newarray = [];
      res.data.map((item, index) => {
        newarray.push({ id: item.id, name: item.name })
      })
      setCategories(newarray)
    })
  }

  //  For Getting the Data if user want to edit Reseller
  const GetEditData = () => {
    loader(true);
    ApiClient.get(`api/reseller/detail?id=${id}`).then(res => {
      if (res.success) {
        const data = res.data
        let payload = resellerType
        Object.keys(payload).map(itm => {
          payload[itm] = data[itm]
        })
        if (payload.address) payload.address = payload.address
        if (payload.country) payload.country = payload.country.id
        if (payload.category) payload.category = payload.category.id

        setform({ ...payload })
      }
      loader(false);
    })
  }
  useEffect(() => {
    GetCategories()
    GetCountries()
    if (id) {
      GetEditData()
    }
  }, []);

  const handlecountry = () => {
    let value = ''
    if (form.country) {
      value = countries && countries.find(item => item.value == form.country)
    }
    return value
  }

  const uploadImage = (e) => {
    let files = e.target.files
    let file = files.item(0)
    if (!file) return
    loader(true)
    ApiClient.postFormData('api/upload/image?modelName=users', { file: file, modelName: 'users' }).then(res => {
      if (res.fileName) {
        let image = res.fileName
        setform({ ...form, logo: image })
      } else {
        setform({ ...form, logo: '' })
      }
      loader(false)
    })
  }

  const back = () => {
    Navigate.goBack()
  }

  const addressResult=(e)=>{
    setform({
      ...form,
      address: e.value
    })
  }

  return (
    <div>
      <Layout>
        <h3 className="ViewUser mb-3">
          {id ? 'Edit' : 'Add'} Reseller
        </h3>
        <div>
          <form onSubmit={e => HandleSubmit(e)} name="resellerForm">
            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label>Name<span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name='name'
                  value={form.name}
                  onChange={e => setform({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Contact Person<span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name='contactPerson'
                  value={form.contactPerson}
                  onChange={e => setform({ ...form, contactPerson: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Contact Email<span className="text-danger">*</span></label>
                <input
                  type="email"
                  className="form-control"
                  name='contactEmail'
                  value={form.contactEmail}
                  onChange={e => setform({ ...form, contactEmail: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Contact Phone<span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name='contactPhone'
                  value={form.contactPhone}
                  maxLength="10"
                  onChange={e => setform({ ...form, contactPhone: methodModel.isNumber(e) })}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Reseller Type<span className="text-danger">*</span></label>
                <SelectDropdown
                  isSingle={true}
                  id="statusDropdown"
                  displayValue="name"
                  name='category'
                  placeholder="Select Reseller Type"
                  intialValue={form.category}
                  result={e => { setform({ ...form, category: e.value }) }}
                  options={Categories}
                />
                {submit && !form.category ? <span className='text-danger' style={{ fontSize: "13px" }}>Category is Required</span> : null}
              </div>
              <div className="col-md-6 mb-3">
                <label>Address<span className="text-danger">*</span></label>
                <GooglePlaceAutoComplete
                  value={form.address}
                  result={addressResult}
                  id="address"
                  placeholder=""
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Country<span className="text-danger">*</span></label>
                <Select
                  options={countries}
                  placeholder="Select Country"
                  isClearable={true}
                  name="country"
                  required
                  value={handlecountry()}
                  onChange={e => setform({ ...form, country: e ? e.value : '' })}
                />
                {submit && !form.country ? <span className='text-danger' style={{ fontSize: "13px" }}>Country is Required</span> : null}
              </div>
              {/* <div className="col-md-6 mb-3">
                <label>Contract Date<span className="text-danger">*</span></label>
                <DatePicker
                  className="form-control"
                  selected={form.contractDate?new Date(form.contractDate):''}
                  placeholderText="Contract Date"
                  name="contractDate"
                  required
                  onChange={(date) => { setform({ ...form, contractDate: datepipeModel.datetostring(date) }) }}
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                />
              </div> */}

              {/* <div className="col-md-6 mb-3">
                <label>Booking<span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name='booking'
                  value={form.booking}
                  onChange={e => setform({ ...form, booking: e.target.value })}
                  required
                />
              </div> */}
              <div className="col-md-6 mb-3">
                <label>Pax<span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name='pax'
                  value={form.pax}
                  onChange={e => setform({ ...form, pax: e.target.value })}
                  required
                />
              </div>
              <div className='maininutcls'>
                <label className="profileImageLabel">
                  <img src={methodModel.userImg(form && form.logo)} className="profileImage" />
                </label>
                <div className='profile_btn'>

                  <div>
                    <label className="btn btn-primary edit ml-3">
                      <input
                        id="bannerImage"
                        type="file"
                        className="d-none"
                        accept="image/*"
                        onChange={(e) => { uploadImage(e); }}
                      />{form.image ? 'Change' : 'Upload'} Logo</label>
                  </div>
                  <div>
                    {form.logo ? <label className="btn btn-primary  delete ml-3" onClick={e => setform({ ...form, logo: "" })}>Remove Logo</label> : <></>}
                  </div>
                </div>



              </div>





            </div>
            <div className="text-right">
              <button type="button" className="btn btn-secondary discard mr-2" onClick={e => back()}>Back</button>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>

          </form>
        </div>

      </Layout>
    </div>
  )
}
