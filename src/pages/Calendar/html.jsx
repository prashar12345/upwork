import React from 'react';
import SelectDropdown from "../../components/common/SelectDropdown"
import datepipeModel from '../../models/datepipemodel';
import SingleCalendar from './SingleCalendar';
const Html = ({ filters, yearChange, years, views, viewChange, calendarList, monthChange, selectedDate, detail, editdynamicPricing, deletePricing, handleDateClick, handleEventClick, initialDate, events, exta, monthInitialView, next, back, colors }) => {

  return (
    <>
      <ul class="nav nav-tabs">
        {views.map(itm => {
          return <li class="nav-item">
            <a class={`nav-link ${itm.id == filters.view ? 'active' : ''}`} onClick={e => viewChange(itm.id)}>{itm.name}</a>
          </li>
        })}
      </ul>

      <div className="row mt-3">
        <div className="col-md-8">
          <div className='calendarFilter'>
            <SelectDropdown
              isSingle={true}
              id="statusDropdown"
              displayValue="name"
              placeholder="Year"
              noDefault={true}
              intialValue={filters.year}
              result={e => { yearChange(e.value) }}
              options={years}
            />

            {filters.view != 'year' ? <>
              <div className='d-flex justify-content-between relativeCls'>
              <i className='fa fa-chevron-left' onClick={e => back()}></i>
                <i className='fa fa-chevron-right' onClick={e => next()}></i>
              </div>
            </> : <></>}
          </div>
          {filters.view != 'year' ? <>
            <div id="calendar"></div>
          </> : <>
            <div className="row w-100 pt-4 m-0">
              {calendarList()?.map(itm => {
                return <>
                  <div className="col-md-12 mb-3">
                    <div className='shadow bg-white p-3'>
                      <SingleCalendar
                        id={`cal1_${itm.id}`}
                        initialDate={monthInitialView(itm.id)}
                        handleDateClick={handleDateClick}
                        handleEventClick={handleEventClick}
                        events={events}
                        exta={exta}
                      />
                    </div>
                  </div>
                </>
              })}

            </div>
          </>}
        </div>
        <div className="col-md-4">
          <div className='shadow p-3 mb-3'>
            {/* <div className='colorItem'>
              <div className={`color overrideBg`}></div>
              <span>Overlap</span>
            </div> */}
            {colors && colors.map(itm => {
              return <div className='colorItem'>
                <div className={`color ${itm.color}`}></div>
                <span>{itm.name}</span>
              </div>
            })}
          </div>
          <div className='shadow p-2'>
            {selectedDate ? <>
              <h5>{datepipeModel.date(selectedDate)}</h5>
              <label className='font-weight-bold'>Dynamic Pricing</label>
              {detail?.dynamicPricing?.map((itm,i) => {
                return <div className='shadow p-2 mb-3 dpricingCard'>
                  <div className="text-right">
                    <a onClick={e => editdynamicPricing(itm)}><i className="fa fa-pen"></i></a>
                    <i className="fa fa-trash m-2" onClick={e => deletePricing(itm.id)}></i>
                  </div>
                  {detail?.dynamicPricing?.length>1?<>  
                  <label>Overlap</label>
                  <p className='mb-2'>{i==0?'Yes':'No'}</p>
                  </>:<></>}
                  <label>Name of Rule</label>
                  <p className='mb-2'>{itm.name}</p>
                  <label>Date Applied</label>
                  <p className='mb-2'>{datepipeModel.date(itm.dateApplied)}</p>
                  <label>Rule Valid date</label>
                  <p className='mb-2'>{itm.changesApply == 'now' ? datepipeModel.date(new Date()) : datepipeModel.date(itm.changesDate)}</p>
                  <label>Status</label>
                  <p className='mb-2 text-capitalize'>{itm.status}</p>
                  <label>Price</label>
                    <p>{itm.price}</p>
                  {itm?.priceTypes?.length && itm.applyPriceType == 'no' ? <>
                    {itm?.priceTypes.map(pitm => {
                      return <>
                        <label>{pitm.label}</label>
                        <p className='mb-2 text-capitalize'>{itm[pitm.label]}</p>
                      </>
                    })}
                   
                  </> : <></>}

                </div>
              })}
              {!detail?.dynamicPricing?.length ? <>
                <p className='mb-2'>Dynamic Pricing is not Applied for this date</p>
              </> : <></>}

            </> : <>
              <h5>Select Date</h5>
            </>}

          </div>
        </div>
      </div>

    </>
  );
};

export default Html;
