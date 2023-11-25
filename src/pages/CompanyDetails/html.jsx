import React from 'react';
import methodModel from '../../methods/methods';
import MultiSelectDropdown from "../../components/common/MultiSelectDropdown"
import GooglePlaceAutoComplete from "../../components/common/GooglePlaceAutoComplete"
import SelectDropdown from "../../components/common/SelectDropdown"
import datepipeModel from '../../models/datepipemodel';
const Html = ({ handleSubmit, getError, form, setForm, submitted, categories, setTab, tab, user, categoryname, currency, currencyName, addressResult, addressSellected, timezoneLoader,years }) => {
  return (
    <div className="container-fluid">
      <form
        onSubmit={handleSubmit}
      >
        <div className='pprofile12'>
          <h3 className='hedding'>Company Details</h3>
          <div className='company_cards'>
            <div class="info_detail">
              <h3 className='company_heading'>
                Company Profile
              </h3>
              <a className='Edit_section' onClick={e => setTab('profile')}>
                {tab == 'profile' ? 'View' : 'Edit'}
              </a>
            </div>
            <hr className='company_line' />

            {tab == 'profile' ? <>
              {/* EDIT DETAILS */}
              <div className="edit_company_detail">
                {/* <h3 className='company_heading'>Edit Company Details</h3> */}
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className='user_company'>
                      Company Name
                    </label>
                    <div className='col-md-12  mb-3 p-0'>
                      <input type='text' className='form-control'
                        placeholder='Company name'
                        value={form.companyName}
                        onChange={e => setForm({ ...form, companyName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className='user_company'>
                      Contact Phone Number
                    </label>
                    <div className="phoneInput">
                      <input
                        type="text"
                        className="form-control" placeholder='+1'
                        // pattern="[0-9]{3}[+]"
                        title="Phone number with + and remaing 9 digit with 0-9"
                        maxLength={4}
                        value={form && form.companydialcode}
                        onChange={e => setForm({ ...form, companydialcode: e.target.value })}
                        required
                      />
                      <input
                        type="text"
                        className="form-control" placeholder='Mobile No.'
                        maxLength={12}
                        value={form && form.companymobileno}
                        onChange={e => setForm({ ...form, companymobileno: methodModel.isNumber(e) })}
                        required
                      />
                    </div>
                    {submitted && getError('companydialcode').invalid ? <div className="invalid-feedback d-block">invalid country code</div> : <></>}
                    {submitted && getError('companymobileno').invalid && !getError('companydialcode').invalid ? <div className="invalid-feedback d-block">Min Length is 10</div> : <></>}
                  </div>
                  <div className="col-md-6">
                    <label className='user_company'>
                      Company Email
                    </label>
                    <div className='col-md-12  mb-3 p-0'>
                      <input type='email' className='form-control' placeholder='Contact email'
                        value={form.contactemail}
                        onChange={e => setForm({ ...form, contactemail: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className='col-md-12 text-right'>
                    <button className='btn btn-primary'>Save</button>
                  </div>
                </div>
              </div>
              {/* END */}
            </> : <>
              <div className="row p-4">
                <div className="col-md-6 mb-3">
                  <div class="company_detail">
                    <div className='company_icons'>
                      <span className='comapny_logos'>
                        <i class="material-icons">business</i>
                      </span>
                    </div>
                    <div className='company_discription ml-4'>
                      <p className='company_details'>
                        Company Name
                      </p>
                      <h4 className='company_name'>
                        {user?.companyName}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div class="company_detail">
                    <div className='company_icons'>
                      <span className='comapny_logos'>
                        <i class="material-icons ">call</i>
                      </span>
                    </div>
                    <div className='company_discription ml-4'>
                      <p className='company_details'>
                        Contact Phone Number
                      </p>
                      <h4 className='company_name'>
                        {user?.companydialcode} {user?.companymobileno}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div class="company_detail">
                    <div className='company_icons'>
                      <span className='comapny_logos'>
                        <i class="material-icons">email</i>
                      </span>
                    </div>
                    <div className='company_discription ml-4'>
                      <p className='company_details'>
                        Company Email
                      </p>
                      <h4 className='company_name'>
                        {user?.contactemail}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </>}
          </div>
          {/* company Information */}
          <div className='company_cards'>
            <div class="info_detail">
              <h3 className='company_heading'>
                Company Information
              </h3>
              <a className='Edit_section' onClick={e => setTab('info')}>
                {tab == 'info' ? 'View' : 'Edit'}
              </a>
            </div>
            <hr className='company_line' />
            {tab == 'info' ? <>
              {/* EDIT DETAILS */}
              <div className="edit_company_detail">
                <div className='row align-items-center'>
                  <div className="col-md-6 mb-3">
                    <label>Address<span className="star">*</span></label>
                    <GooglePlaceAutoComplete
                      value={form.companyAddress}
                      result={addressResult}
                      id="address"
                      placeholder=""
                    />
                    {!addressSellected && form.companyAddress ? <div className="invalid-feedback d-block">Please Select Location Suggestion</div> : <></>}
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label>Contact Name</label>
                    <input type='text' className='form-control' placeholder='Contact name'
                      value={form.contactName}
                      onChange={e => setForm({ ...form, contactName: e.target.value })}
                      required
                    />
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label> Time Zone {timezoneLoader ? <><i className='fa fa-spinner fa-spin'></i></> : <></>}</label>
                    <input type='text' className='form-control' placeholder='Time zone'
                      value={form.companytimezone}
                      onChange={e => setForm({ ...form, companytimezone: e.target.value })}
                      required
                      disabled
                    />
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label>Currency</label>
                    <MultiSelectDropdown
                      id="currency"
                      displayValue="currency"
                      intialValue={form.currency}
                      result={e => setForm({ ...form, currency: e.value })}
                      options={currency}
                    />
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label>Product Categories</label>
                    <MultiSelectDropdown
                      options={categories}
                      intialValue={form.productcategory}
                      displayValue="name"
                      id="productCat"
                      result={e => setForm({ ...form, productcategory: e.value })}
                    />
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label>Website URL</label>
                    <input type='text' className='form-control' placeholder='Website URL'
                      value={form.website}
                      onChange={e => setForm({ ...form, website: e.target.value })}
                      required
                    />
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label>Financial Year Start</label>
                    {/* <input type='text' className='form-control' placeholder='2023'
                      value={form.financialYear}
                      maxLength="4"
                      minLength="4"
                      onChange={e => setForm({ ...form, financialYear: methodModel.isNumber(e) })}
                      required
                    /> */}
                    <SelectDropdown
                      id="financialYear"
                      displayValue="name"
                      placeholder="Select Month"
                      name="financialYear"
                      required={true}
                      intialValue={form.financialYear}
                      result={e => { setForm({ ...form, financialYear: e.value }) }}
                      options={datepipeModel.monthArray.map(itm=>{
                        return {
                          ...itm,
                          id:itm.id+1
                        }
                      })}
                    />
                  </div>

                  <div className='col-md-12 text-right'>
                    <button className='btn btn-primary'>Save</button>
                  </div>
                </div>
              </div>
            </> : <>
              <div className="row p-4">
                <div className="col-md-6 mb-3">
                  <div class="company_detail">
                    <div className='company_discription '>
                      <p className='company_details'>
                        Address
                      </p>
                      <h4 className='company_name'>
                        {user?.companyAddress}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div class="company_detail">
                    <div className='company_discription '>
                      <p className='company_details'>
                        Contact Name
                      </p>
                      <h4 className='company_name'>
                        {user?.contactName}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div class="company_detail">
                    <div className='company_discription '>
                      <p className='company_details'>
                        Time Zone
                      </p>
                      <h4 className='company_name text-capitalize'>
                        {user?.companytimezone}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div class="company_detail">
                    <div className='company_discription'>
                      <p className='company_details'>
                        Currency
                      </p>
                      <h4 className='company_name'>
                        {user?.currency?.map(itm => {
                          return <span className='badge badge-primary mr-1 text-capitalize'>{currencyName(itm)}</span>
                        })}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div class="company_detail">
                    <div className='company_discription'>
                      <p className='company_details'>
                        Product Categories
                      </p>
                      <h4 className='company_name'>
                        {user?.productcategory?.map(itm => {
                          return <span className='badge badge-primary mr-1 text-capitalize'>{categoryname(itm)}</span>
                        })}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div class="company_detail">
                    <div className='company_discription '>
                      <p className='company_details'>
                        Website URL
                      </p>
                      <h4 className='company_name'>
                        {user?.website}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div class="company_detail">
                    <div className='company_discription '>
                      <p className='company_details'>
                      Financial Year Start
                      </p>
                      <h4 className='company_name'>
                        {datepipeModel.monthname(user?.financialYear?user?.financialYear-1:'')}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </>}
            {/* END */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Html;
