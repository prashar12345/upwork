import moment from "moment"
import React from "react"
import SelectDropdown from "../../../components/common/SelectDropdown"
import datepipeModel from "../../../models/datepipemodel"
import CalendarPage from "../../Calendar"
import AddEditDynamicPricing from "../../DynamicPrice/AddEditDynamicPricing"

const Html = ({ detail, image, loading, setImage, tab, tabChange, editdynamicPricing, deletePricing, dynamicPrice, selectedDynamicPrice, setSelectedDynamicPrice, apply, getData }) => {
  return <>
    <section class="pb-3">
      <div class="container">
        <div class="row gx-5">
          <aside class="col-lg-6 position-sticky">
            <div class="border rounded-4 mb-3">
              <a data-fslightbox="mygalley" class="rounded-4" target="_blank" data-type="image" href={image}>
                {!loading ? <img class="rounded-4 fit w-100" src={image} /> : <div className="shine productImageShine"></div>}
              </a>
            </div>
            {loading ? <></> : <>
              <div class="d-flex justify-content-center mb-3">
                {detail?.images.map(itm => {
                  return <>
                    <a class={`mx-1 rounded-2 item-thumb ${image == itm.largeSizeUrl ? 'active' : ''}`} onClick={e => setImage(itm.largeSizeUrl)} >
                      <img width="60" height="60" class="rounded-2" src={itm.thumbnailUrl} />
                    </a>
                  </>
                })}
              </div>
            </>}

          </aside>
          <main class="col-lg-6">
            {loading ? <>
              <div className="shine mb-2"></div>
              <div className="shine mb-2"></div>
              <div className="shine"></div>
            </> : <>
              <div class="ps-lg-3">
                <h4 class="title text-dark">
                  {detail?.name}
                </h4>
                {detail?.tags.length ?
                  <p className="catCls"><b>{detail?.tags[0].split(':')[1]} {detail?.tags?.[1]?.split(':')[1] ? '/ ' + detail?.tags?.[1]?.split(':')[1] : ''}</b></p>
                  : null}

                <p className="mb-1 mt-1">Product Code: {detail?.productCode}</p>
                <p className="mb-1">Internal Code: {detail?.internalCode}</p>
                <p className="mb-1">Tim: N/A</p>
                <div class="d-flex flex-row my-1">
                  <div class="text-warning mb-1 me-2">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                    <span class="ms-1">
                      4.5
                    </span>
                  </div>
                </div>
                <div class="mb-2">
                  <span class="h5">{detail?.advertisedPrice} {detail?.currency}</span>
                </div>

              </div>
            </>}

          </main>
        </div>
      </div>
    </section>
    <div className="m-auto d-flex justify-content-center">
      <ul class="nav nav-pills mb-3 ProductData" id="pills-tab" role="tablist">
        <li class="nav-item">
          <a className={`nav-link ${tab == 'location' ? 'active' : ''}`} onClick={e => tabChange('location')}>Location</a>
        </li>
        <li class="nav-item">
          <a className={`nav-link ${tab == 'detail' ? 'active' : ''}`} onClick={e => tabChange('detail')}>Product Details</a>
        </li>
        <li class="nav-item">
          <a className={`nav-link ${tab == 'pricing' ? 'active' : ''}`} onClick={e => tabChange('pricing')}>Pricing</a>
        </li>
        <li class="nav-item">
          <a className={`nav-link ${tab == 'calendar' ? 'active' : ''}`} onClick={e => tabChange('calendar')}>Calendar</a>
        </li>
        <li class="nav-item">
          <a className={`nav-link ${tab == 'dynamicPricing' ? 'active' : ''}`} onClick={e => tabChange('dynamicPricing')}>Dynamic Pricing</a>
        </li>
      </ul>
    </div>

    <div className="container">
      {loading ? <>
        <div className="text-center">Loading... <i className="fa fa-spinner fa-spin"></i></div>
      </> : <>
        <div class="tab-content mb-5" id="pills-tabContent">
          <div class={`tab-pane fade ${tab == 'location' ? 'show active' : ''}`}>
            <h6 className="font-weight-bold">Country / Region / City</h6>
            <p>{detail?.locationAddress?.countryCode} / {detail?.locationAddress?.state} / {detail?.locationAddress?.city}</p>
            <h6 className="font-weight-bold">Time Zone</h6>
            <p>{detail?.timezone}</p>
            <h6 className="font-weight-bold">Pickup locations</h6>
            <p>{detail?.locationAddress?.addressLine} - {detail?.locationAddress?.postCode}</p>
            <h6 className="font-weight-bold">Meeting Point</h6>
            <p>N/A</p>
          </div>

          <div class={`tab-pane fade ${tab == 'detail' ? 'show active' : ''}`}>
            <div class="">
              <h6 className="font-weight-bold">Short Description</h6>
              <p>{detail?.shortDescription}</p>

              <h6 className="font-weight-bold">Long Description</h6>
              <p dangerouslySetInnerHTML={{ __html: detail?.description }} className="shadow p-3 mb-3"></p>

              <h6 className="mt-2 font-weight-bold">Additional products</h6>
              <div className="row product_location">
                <div className="col-md-4">Name  </div>
                <div className="col-md-8"> : N/A</div>
                <div className="col-md-4">Price  </div>
                <div className="col-md-8"> : N/A</div>
              </div>
              <h6 className="mt-4 font-weight-bold">Terms & Conditions</h6>
              <p>{detail?.terms || '--'}</p>
              <h6 className="mt-4 font-weight-bold">Cancellation Policy</h6>
              <p>{detail?.cancellationPolicyDays ? detail?.cancellationPolicyDays + ' Day(s)' : '--'}</p>

            </div>
          </div>

          <div class={`tab-pane fade ${tab == 'pricing' ? 'show active' : ''}`}>
            <div className="pricing">
              <div className="table-responsive">

                <table class="table table-striped">
                  <thead className='table_head'>
                    <tr className='heading_row'>
                      <th scope="col" className='table_data'>Labels</th>
                      <th scope="col" className='table_data'>Price</th>
                      <th scope="col" className='table_data'>Seats Used</th>
                      <th scope="col" className='table_data'>Valid Until</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail?.priceOptions.map(item => {
                      return <tr>
                        <td className="text-truncate">{item.label}</td>
                        <td>{item.price}</td>
                        <td>{item.seatsUsed}</td>
                        <td>N/A</td>
                      </tr>
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {tab == 'calendar' ? <>
            <div class={`tab-pane fade ${tab == 'calendar' ? 'show active' : ''}`}>
              <CalendarPage productData={detail} deletePricing={deletePricing} editdynamicPricing={editdynamicPricing} />
            </div>
          </> : <></>}

          {tab == 'dynamicPricing' ? <>
            <div className={`tab-pane fade show active`}>
              <div className="text-right mb-3">
                {selectedDynamicPrice.name ? <></> : <>
                  <article className="d-inline-flex">
                    <span className="mr-2 my-auto">Apply Dynamic Price</span>
                    <span className='float-right'>
                      <SelectDropdown
                        isSingle={true}
                        id="statusDropdown"
                        displayValue="name"
                        placeholder="Select Dynamic Pricing"
                        intialValue={selectedDynamicPrice.id}
                        result={e => {
                          // setSelectedDynamicPrice({id:e.value});
                          apply(e.value)
                        }}
                        options={dynamicPrice}
                      />
                    </span>

                  </article>
                </>}

              </div>

              {selectedDynamicPrice.name ? <>
                <div className="pricingForm">
                  <AddEditDynamicPricing
                    dynamicPricingId={selectedDynamicPrice.id}
                    dType={selectedDynamicPrice.type}
                    isCopy={selectedDynamicPrice.isCopy}
                    productData={detail}
                    result={e => {
                      setSelectedDynamicPrice({ id: '' });
                      if (e.type == 'Submitted') {
                        getData('calendar')
                        // tabChange('calendar')
                      }
                    }}
                  />
                </div>
              </> : <>
                <div className="mb-2">Custom Dynamic Pricing</div>
                {detail?.dynamicPricing.length ?
                  (detail?.dynamicPricing.map(item => {
                    return <div className="p-3 shadow mb-3">
                      <div className="row product_location">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-4">Name of Rule </div>
                            <div className="col-md-8"> : {item?.name}</div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-4">Date Applied </div>
                            <div className="col-md-8"> : {datepipeModel.date(item.createdAt)}</div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-4">Applied By</div>
                            <div className="col-md-8"> : {item.addedBy?.fullName}</div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-4">Updated At</div>
                            <div className="col-md-8"> : {item.updatedAt ? moment(item.updatedAt).format('DD MMM YYYY') : ''}</div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-4">Rule Valid date </div>
                            <div className="col-md-8"> : {item.changesApply == 'now' ? datepipeModel.date(new Date()) : datepipeModel.date(item.changesDate)}</div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-4">Country</div>
                            <div className="col-md-8 text-capitalize"> : {item?.country}</div>
                          </div>
                        </div>
                        {item.amountOrPercent ?
                          <div className="col-md-6">
                            <div className="row">
                              <div className="col-md-4">Percent Or Amount</div>
                              <div className="col-md-8 text-capitalize"> : {item?.amountOrPercent == 'per' ? 'Percent' : 'Amount'}</div>
                            </div>
                          </div>
                          : null}
                        {item.number ?
                          <div className="col-md-6">
                            <div className="row">
                              <div className="col-md-4">Value</div>
                              <div className="col-md-8 text-capitalize"> : {item?.number}</div>
                            </div>
                          </div>
                          : null}
                        {item.notApplyCondition ?
                          <div className="col-md-6">
                            <div className="row">
                              <div className="col-md-4">Available Spaces Is</div>
                              <div className="col-md-8 text-capitalize"> : {item?.notApplyCondition}</div>
                            </div>
                          </div>
                          : null}
                        {item.notApply ?
                          <div className="col-md-6">
                            <div className="row">
                              <div className="col-md-4">Available Spaces Value</div>
                              <div className="col-md-8 text-capitalize"> : {item?.notApply}</div>
                            </div>
                          </div>
                          : null}
                        {!(item.notApplicableFor).length ? null :
                          <div className="col-md-6">
                            <div className="row">
                              <div className="col-md-4">Not Applicable On</div>
                              <div className="col-md-8 text-capitalize"> : {item?.notApplicableFor?.map(item => {
                                return <span className='badge badge-primary m-1'>{item}</span>
                              })}</div>
                            </div>
                          </div>
                        }
                        {!(item.blackOutDates).length ? null :
                          <div className="col-md-6">
                            <div className="row">
                              <div className="col-md-4">Blackout Dates</div>
                              <div className="col-md-8 text-capitalize"> : {item?.blackOutDates?.map(item => {
                                return <span className='badge badge-primary m-1'>{datepipeModel.date(item.startDate)} - {moment(item.endDate).format('DD MMM YYYY')}</span>
                              })}</div>
                            </div>
                          </div>
                        }
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-4">Status </div>
                            <div className="col-md-8 text-capitalize"> : {item?.status}</div>
                          </div>
                        </div>
                        {item.applyToDaysTimeSlot ?
                          <div className="col-md-6">
                            <div className="row">
                              <div className="col-md-4">Applied to All Time Slots</div>
                              <div className="col-md-8 text-capitalize"> : {item?.applyToDaysTimeSlot}</div>
                            </div>
                          </div>
                          : null}
                        {item.timeSlots.length && item?.applyToDaysTimeSlot != 'yes' ? <>
                          <div className="col-md-6">
                            <div className="row">
                              <div className="col-md-4">Time Slots</div>
                              <div className="col-md-8 text-capitalize"> : {item?.timeSlots?.map(item => {
                                return <span className='badge badge-primary m-1'>{item?.time}</span>
                              })}</div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="row">
                              <div className="col-md-4">Days To Apply</div>
                              <div className="col-md-8 text-capitalize"> : {item?.daysToApply?.map(item => {
                                return <span className='badge badge-primary m-1'>{item}</span>
                              })}</div>
                            </div>
                          </div>
                        </>
                          : <></>
                        }
                        <div className="col-md-12 text-right">
                          <i className="fa fa-pen mr-2" onClick={e => editdynamicPricing(item)}></i>
                          <i className="fa fa-trash" onClick={e => deletePricing(item.id)}></i>
                        </div>
                      </div>
                    </div>

                  }))
                  : null}

              </>}


            </div>
          </> : <></>}

        </div>
      </>}

    </div>


    {/* <section class="bg-light border-top py-4">
  <div class="container">
    <div class="row gx-4">
      <div class="col-lg-12 mb-4">
        <div class="border rounded-2 px-3 py-2 bg-white"> 
            <h4 className="border-bottom pb-3 pt-3 mb-3">Description</h4>
          <div class="tab-content" id="ex1-content">
            <div class="tab-pane fade show active" id="ex1-pills-1" role="tabpanel" aria-labelledby="ex1-tab-1">
              <p dangerouslySetInnerHTML={{__html:detail?.description}}></p> 
            </div>
          
          </div> 
        </div>
      </div> 
    </div>
  </div>
</section>   */}


  </>
}

export default Html