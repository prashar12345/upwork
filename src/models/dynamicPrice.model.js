import datepipeModel from "./datepipemodel"

const list = [
  { id: 'publicHoliday', name: 'Public Holiday', icon: 'public', color: 'publicHColor' },
  { id: 'schoolHoliday', name: 'School Holiday', icon: 'school', color: 'schoolColor' },
  { id: 'events', name: 'Event', icon: 'event', color: 'eventsColorBg' },
  { id: 'earlyBirdCustomDates', name: 'Early Bird Pricing Custom Dates', icon: 'today', color: 'customDatesColorBg' },
  { id: 'earlybirdtimeframes', name: 'Early Bird Pricing Time Frames', icon: 'timelapse', color: 'mainColorBg' },
  { id: 'earlybirdinventory', name: 'Early Bird Pricing Inventory', icon: 'inventory', color: 'earlyInventoryColorBg' },
  { id: 'lastminutefixeddates', name: 'Last Minute Pricing Fixed Dates', icon: 'fixed', color: 'lastFixedBg' },
  { id: 'lastminuteinventory', name: 'Last Minute Pricing Inventory Discounting', icon: 'inventory', color: 'lastInventoryBg' },
]

const slots = [
  { id: '9T10', time: '09:00 to 10:00', start: '09:00:00', end: '10:00:00' },
  { id: '10T11', time: '10:00 to 11:00', start: '10:00:00', end: '11:00:00' },
  { id: '14T15', time: '14:00 to 15:00', start: '14:00:00', end: '15:00:00' },
  { id: '15T16', time: '15:00 to 16:00', start: '15:00:00', end: '16:00:00' },
]

const priceTypesList = [
  { label: 'Adult', amountOrPercent: '', discOrPre: '', number: '' },
  { label: 'Child', amountOrPercent: '', discOrPre: '', number: '' },
  { label: 'Family', amountOrPercent: '', discOrPre: '', number: '' },
  { label: 'Student', amountOrPercent: '', discOrPre: '', number: '' }
]

const findSlot = (id) => {
  let ext = slots.find(itm => itm.id == id)
  return ext
}

const find = (key) => {
  let ext = list.find(itm => itm.id == key)
  return ext
}

const name = (key) => {
  let ext = list.find(itm => itm.id == key)
  return ext ? ext.name : key
}

const getDynamicPrice = (date, price, dynamicPrice, type = 'price') => {
  let value = 0
  let arr = []
  dynamicPrice.map(itm => {
    let p = 0
    if (itm.amountOrPercent == "amount") {
      if (itm.discOrPre == 'Premium') {
        p = price + itm.number
      } else {
        p = price > itm.number ? price - itm.number : price
      }
    } else {
      if (price) {
        let peramt = price * itm.number / 100
        if (itm.discOrPre == 'Premium') {
          p = price + peramt
        } else {
          p = price - peramt
        }
      }
    }

    const getPriceType = (l) => {
      let value = price
      let ext = itm?.priceTypes?.find(pitm => pitm.label == l)
      if (ext) {
        let p = price
        if (ext.amountOrPercent == "amount") {
          if (ext.discOrPre == 'Premium') {
            p = price + Number(ext.number)
          } else {
            p = price > Number(ext.number) ? price - Number(ext.number) : price
          }
        } else {
          if (price) {
            let peramt = price * Number(ext.number) / 100
            if (ext.discOrPre == 'Premium') {
              p = price + peramt
            } else {
              p = price - peramt
            }
          }
        }

        value = p
      }

      return Number(value.toFixed(2))
    }

    let priceType = {}

    priceTypesList.map(ptitm => {
      priceType = {
        ...priceType,
        [ptitm.label]: getPriceType(ptitm.label)
      }
    })

    // console.log("itm", itm)
    // console.log("priceType", priceType)

    let allobj = {}
    if (type == 'array') allobj = itm
    let obj = {
      ...allobj,
      ...priceType,
      applyFor: itm.applyFor,
      priceTypes: itm.priceTypes,
      applyPriceType: itm.applyPriceType,
      date: datepipeModel.datetostring(itm.changesDate),
      applyToDaysTimeSlot: itm.applyToDaysTimeSlot,
      timeSlots: itm.timeSlots,
      changesDate: itm.changesDate,
      changesDateTo: itm.changesDateTo,
      type: itm.type,
      price: Number(p.toFixed(2))
    }

    let dates = []

    if (itm.type == 'publicHoliday' || itm.type == 'schoolHoliday' || itm.type == 'events') {
      if (itm?.dates) {
        let cdate = itm.changesApply == 'now' ? new Date() : new Date(datepipeModel.datetostring(itm.changesDate))
        itm.dates.map(ditm => {
          const holidaysCondition = () => {
            let value = true
            if (!ditm.isState) {
              if (!itm.applyFor.includes('national')) value = false
            } else {
              if (!itm.applyFor.includes('state')) value = false
            }
            return value
          }
          if (holidaysCondition()) {
            if (new Date(datepipeModel.datetostring(ditm.date)) >= cdate) {
              dates.push({ ...obj, date: datepipeModel.datetostring(ditm.date) })
              if (itm.preOrPost == 'yes') {
                let preArr = datepipeModel.getprepostdays(ditm.date, Number(itm.preDays), 'pre').map(itm => {
                  return { ...obj, date: itm }
                })

                let postArr = datepipeModel.getprepostdays(ditm.date, Number(itm.postDays), 'post').map(itm => {
                  return { ...obj, date: itm }
                })

                preArr = preArr.filter(pitm => new Date(pitm.date) >= cdate)
                postArr = postArr.filter(pitm => new Date(pitm.date) >= cdate)

                dates = [...dates, ...preArr, ...postArr]
              }
            }
          }

        })


      }

    } else if (itm.type == 'earlyBirdCustomDates'
      || itm.type == 'earlybirdtimeframes'
      || itm.type == 'earlybirdinventory'
      || itm.type == 'lastminuteinventory'
      || itm.type == 'lastminutefixeddates'
    ) {

      dates = datepipeModel.getDateStringArray(itm.changesDate, (itm.changesDateTo || itm.changesDate)).map(ditm => {
        return { ...obj, date: ditm }
      })

      if (itm.notApplyCondition && itm.notApply) {
        let conditon = false
        if (itm.notApplyCondition == '>') {
          if (price > Number(itm.notApply)) conditon = true
        } else if (itm.notApplyCondition == '<') {
          if (price < Number(itm.notApply)) conditon = true
        }

        if (!conditon) dates = []
      }

      if (itm.type == 'lastminuteinventory' || itm.type == 'earlybirdinventory') {
        let carr = []
        itm?.applyEarlyBirdPricing.map(citm => {
          if (citm.symbol && citm.percentOrAmount && citm.percentOrAmountValue && citm.symbolPercentage) {
            let conditon = false
            if (citm.symbol == '>') {
              if (price > Number(citm.symbolPercentage)) conditon = true
            } else if (citm.symbol == '<') {
              if (price < Number(citm.symbolPercentage)) conditon = true
            }

            if (conditon) {
              let p = 0
              if (citm.percentOrAmount == "amount") {

                if (citm.discOrPre == 'Premium') {
                  p = price + Number(citm.percentOrAmountValue)
                } else {
                  p = price > Number(citm.percentOrAmountValue) ? price - Number(citm.percentOrAmountValue) : price
                }
              } else {
                if (price) {
                  let peramt = price * Number(citm.percentOrAmountValue) / 100

                  if (citm.discOrPre == 'Premium') {
                    p = price + peramt
                  } else {
                    p = price - peramt
                  }
                }
              }
              carr.push({
                ...citm,
                price: Number(p.toFixed(2)),
              })
            }

          }
        })

        carr = carr.sort((a, b) => {
          return b.price - a.price
        })
        if (carr.length) {
          dates = dates.map(ditm => {
            return {
              ...ditm,
              price: carr[0].price
            }
          })
        } else {
          dates = []
        }
      }

      if (itm.type == 'lastminuteinventory' || itm.type == 'lastminutefixeddates') {
        let dateArr = datepipeModel.getDateStringArray(itm.lastMinutePricingFromDate, (itm.lastMinutePricingToDate || itm.lastMinutePricingFromDate))
        dates = dates.filter(ditm => dateArr.includes(ditm.date))
        // console.log("dateArr",dateArr)
        // console.log("dates",dates)
      }

      if (itm.blackOutDates) {
        let blockdates = []
        itm.blackOutDates.map(bitm => {
          blockdates = [...blockdates, ...datepipeModel.getDateStringArray(bitm.startDate, (bitm.endDate || bitm.startDate))]
        })
        dates = dates.filter(ditm => !blockdates.includes(ditm.date))
      }

      if(itm?.donotDates?.length){
        let blockdates = itm?.donotDates.map(ditm=>{
          return datepipeModel.datetostring(ditm.date)
        })
        dates = dates.filter(ditm => !blockdates.includes(ditm.date))
      }

      if (itm.applyToDaysTimeSlot == 'no') {
        dates = dates.filter(ditm => itm.daysToApply?.includes(datepipeModel.day(ditm.date)))
      }
    }


    arr = [...arr, ...dates]
  })

  arr = arr.sort(function (a, b) { return b.price - a.price })
  let ext = arr.find(itm => itm.date == date)
  if (ext) {
    value = ext.price
  }

  const getValue = () => {
    if (type == 'array') {
      return arr.filter(itm => itm.date == date)
    } else if (type == 'object') {
      return ext
    } else {
      return ext?.price || 0
    }
  }

  return getValue()
}


const getDynamicPriceArr = (date, price, dynamicPrice) => {
  let ext = getDynamicPrice(date, price, dynamicPrice, 'array')
  return ext
}

const dynamicPriceModel = { list, find, name, getDynamicPrice, getDynamicPriceArr, slots, findSlot, priceTypesList }
export default dynamicPriceModel