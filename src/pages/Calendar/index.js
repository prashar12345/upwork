import React, { useState, useEffect, useRef } from 'react';
import './style.scss'
import Html from './html';
import { Calendar } from 'fullcalendar'
import datepipeModel from '../../models/datepipemodel';
import dynamicPriceModel from '../../models/dynamicPrice.model';
import { useHistory } from 'react-router-dom';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';

const CalendarPage = ({ productData, deletePricing, editdynamicPricing }) => {
  const curentDate = new Date()
  const calendarRef = useRef()
  const dynamicPricingRef = useRef()
  const colors = dynamicPriceModel.list
  const views = [
    // { id: "dayGridMonth", name: "Month" },
    // { id: "dayGridWeek", name: "Week" },
    { id: "month", name: "Month" },
    { id: "week", name: "Week" },
    { id: "year", name: "Year" },
  ]
  const history = useHistory()
  const [filters, setFilter] = useState({ year: curentDate.getFullYear(), view: 'month', month: curentDate.getMonth() + 1 })
  const [exta, setExtra] = useState(new Date().getTime())
  const [years, setYears] = useState([])
  const [selectedDate, setSelectedDate] = useState('')
  const [detail, setDetail] = useState()
  const [events, setEvents] = useState([])

  const [initialDate, setInitialDate] = useState(datepipeModel.datetostring(new Date()))
  const [availablityAll, setAvailabiltyAll] = useState([])

  const getDetail = (date) => {
    let price = productData?.advertisedPrice
    let dprices = dynamicPriceModel.getDynamicPriceArr(date, price, dynamicPricingRef.current)
    let obj = {
      ...detail, dynamicPricing: dprices
    }
    setDetail(obj)
  }

  const handleDateClick = (e) => {
    setSelectedDate(datepipeModel.datetostring(e.date))
    getDetail(datepipeModel.datetostring(e.date))
  }

  const handleEventClick = (e) => {
    let evt = e.event._def.extendedProps
    let date = `${evt.year}-${evt.month}-${evt.day}`
    setSelectedDate(date)
    getDetail(date)
  }

  const getDynamicPrice = (date, price, dynamicPrice = dynamicPricingRef.current, type = 'price') => {
    return dynamicPriceModel.getDynamicPrice(date, price, dynamicPrice, type)
  }

  const getEventsArr=(start,end,dynamicPrice,availablity=availablityAll)=>{
    let dates = datepipeModel.getDateStringArray(start, end)

    const singleAvailablity=(date)=>{
      let ext=availablity.find(itm=>datepipeModel.datetostring(itm.startTimeLocal)==date)
      return ext
    }

    let evts = []
    dates.map(itm => {
      let split = itm.split('-')

      let price = productData?.advertisedPrice
      let dparr = getDynamicPrice(itm, price, dynamicPrice, 'array')
      let dprice = ''
      let dpobj = ''
      if (dparr.length) {
        dprice = dparr[0].price
        dpobj = dparr[0]
      }

       let availablity = singleAvailablity(itm)

      const getColors = () => {
        let html = `<div class="colorDivList">`
        dparr.map(ditm => {
          let color = dynamicPriceModel.list.find(citm => citm.id == ditm.type)?.color
          html += `<div class="colorDiv ${color}"></div>`
        })
        html+=`</div>`
        return html
      }

      let tooplip = ``
      if (dpobj?.priceTypes?.length && dpobj.applyPriceType == 'no') {
        dpobj.priceTypes.map(pitm => {
          tooplip += `${pitm.label}: $${dpobj[pitm.label]}\n`
        })
      }


      const getTitle = (id) => {
        let title = `<div class="titleDiv ${dpobj?.type || ''}" id="tooltip${id}" onmouseover="tooltiphover('tooltip${id}')" data-toggle="tooltip" data-placement="top" title="${tooplip}">
        ${getColors()}
     
        `
        title += `
        
        <div class="titleContent">
        ${dparr.length>1?'<div class="overlapDiv">Overlap</div>':''}
        <div class="price">$${dprice ? dprice : price}<br/></div>`
        // if(dpobj?.priceTypes?.length && dpobj.applyPriceType=='no'){
        //   dpobj.priceTypes.map(pitm=>{
        //     title+=`${pitm.label[0]}:$${dpobj[pitm.label]}<br/>`
        //   })
        // }
        title += `
        ${availablity?`<div class="spaces">${availablity.seatsAvailable} spaces left</div>`:''}

        </div>
        </div>
        `
        return title
      }

      if(dpobj){
        let obj = {
          date: itm,
          title: getTitle(itm),
          className: `${dprice ? 'dprice monthEvent' : ''} ${dpobj?.type || ''} ${dparr.length > 1 ? 'override' : ''}`,
          year: split[0],
          month: split[1],
          day: split[2],
        }

        if (dpobj?.applyToDaysTimeSlot == 'no' && dpobj?.timeSlots?.length) {
          obj.className = `${dprice ? 'dprice weekEvent' : ''} ${dpobj?.type || ''} ${dparr.length > 1 ? 'override' : ''}`
        } else {
          obj.className = `${dprice ? 'dprice monthEvent' : ''} ${dpobj?.type || ''} ${dparr.length > 1 ? 'override' : ''}`
        }
  
        if (dpobj?.applyToDaysTimeSlot == 'no' && dpobj?.timeSlots?.length) {
          dpobj.timeSlots.map(titm => {
            let id = itm + titm.start
            let title = `<div class="titleDiv ${dpobj?.type || ''}" id="tooltip${id}" onmouseover="tooltiphover('tooltip${id}')" data-toggle="tooltip" data-placement="top" title="${tooplip}">
            ${getColors()}
           
            <div class="titleContent">
            ${!dpobj?.priceTypes.length?`<div class="price">$${dprice ? dprice : price}</div>`:''}`
            if (dpobj?.priceTypes?.length && dpobj.applyPriceType == 'no') {
              dpobj.priceTypes.map(pitm => {
                title += `<div class="labelName">${pitm.label}</div>
            <div class="price">$${dpobj[pitm.label]}</div>`
              })
            }
            title += `
            ${availablity?`<div class="spaces">${availablity.seatsAvailable} spaces left</div>`:''}
            
            </div>
            </div>`

            let stime=titm.start
            if(stime=='14:00:00'){
              stime='11:00:00'
            }else if(stime=='15:00:00'){
              stime='12:00:00'
            }

            evts.push({
              ...obj,
              title: getTitle(id),
              // title: title,
              date: new Date(`${itm} ${stime}`),
              className: `slots ${dpobj?.type || ''} ${dparr.length > 1 ? 'override' : ''}`
            })
          })
        }

        evts.push(obj)
      }else{
       let obj = {
          date: itm,
          title: getTitle(itm),
          className: 'price',
          year: split[0],
          month: split[1],
          day: split[2],
        }
        evts.push(obj)
      }
    })

    return evts
  }

  const yearChange = (e, dynamicPrice = dynamicPricingRef.current, inview = '') => {
    let month = 1
    if (e == curentDate.getFullYear()) month = curentDate.getMonth() + 1 
    let indate = `${e}-${month < 10 ? '0' + month : month}-01`
    indate=inview ? inview : indate
    setFilter({ ...filters, year: e, month })
    getProductAvaialabilityAll(e, dynamicPrice,indate)
  }

  const viewChange = (e) => {
    let el = document.getElementById("calendar")
    if (el) {
      el.innerHTML = ''
    }
    if (e != 'year') {
      setCalendar('', '', e)
    }
    setFilter({ ...filters, view: e })
  }

  const calendarList = () => {
    let value = []
    let month = 1
    if (filters.year == curentDate.getFullYear()) month = curentDate.getMonth() + 1
    while (month <= 12) {
      value.push({ id: month, year: filters.year, name: datepipeModel.monthfind(month - 1) })
      month++
    }

    return value
  }

  const monthChange = (e) => {
    setFilter({ ...filters, month: e })
    let indate = `${filters.year}-${e < 10 ? '0' + e : e}-01`
    setInitialDate(indate)
    setCalendar(indate)
  }

  const monthInitialView = (month) => {
    let value = `${filters.year}-${month < 10 ? '0' + month : month}-01`
    return value
  }


  const setCalendar = (initdate = '', e = [], v = '') => {
    setTimeout(() => {
      setExtra(new Date().getTime())
      let elid = `calendar`
      let calendarEl = document.getElementById(elid)
      if (calendarEl) {
        let calendar = new Calendar(calendarEl, {
          initialView: (v ? v : filters.view) == 'week' ? 'timeGridWeek' : 'dayGridMonth',
          headerToolbar: {
            center: 'title',
            left: '',
            right: ''
          },
          initialDate: initdate ? initdate : initialDate,
          events: [
            ...(e?.length ? e : events)
          ],
          // slotDuration:'01:00:00',
          slotMinTime: '09:00:00',
          slotMaxTime: '13:00:00',
          dayHeaderFormat:(v ? v : filters.view) == 'week'? { weekday: 'short', day: 'numeric',month: 'short',  omitCommas: true }:{ weekday: 'short', omitCommas: true },
          dateClick: handleDateClick,
          eventClick: handleEventClick,
          eventContent: function (info) {
            return { html: `${info.event.title}` };
          }
        })
        calendarRef.current = calendar
        calendar.render()
      }
    }, 1)
  }

  const next = () => {
    let cyear = new Date().getFullYear()
    let precurrentDate = calendarRef.current.currentData.calendarApi.currentData.currentDate
    let d = `${cyear + 2}-12-01`
    if (filters.view == 'week') d = `${cyear + 2}-12-30`
    if (precurrentDate >= new Date(d)) return

    calendarRef.current.next()
    let currentDate = calendarRef.current.currentData.calendarApi.currentData.currentDate
    let date = datepipeModel.datetostring(currentDate)
    let year = date.split('-')[0]
    if (filters.year != year) {
      yearChange(year, dynamicPricingRef.current, date)
    }
  }
  const back = () => {
    let precurrentDate = calendarRef.current.currentData.calendarApi.currentData.currentDate
    if (new Date() >= precurrentDate) return

    calendarRef.current.prev()
    let currentDate = calendarRef.current.currentData.calendarApi.currentData.currentDate
    let date = datepipeModel.datetostring(currentDate)
    let year = date.split('-')[0]
    if (filters.year != year) {
      yearChange(year, dynamicPricingRef.current, date)
    }
  }

  const getProductAvaialabilityAll = (y = '', dynamicPrice, indate) => {
    let sdate = `${y ? y : filters.year}-01-01 00:00:00`
    let edate = `${y ? y : filters.year}-12-01 23:59:00`
    let start = `${y}-01-01`
    let end = `${y}-12-31`

    let prm = {
      productCode: 'PWQF1Y',
      // startTimeLocal:'2025-10-01 00:00:00',
      // endTimeLocal:'2025-10-03 00:00:00'
      // productCode:productCode,
      startTimeLocal: sdate,
      endTimeLocal: edate
    }
    loader(true)
    ApiClient.get('api/product/availablity', prm).then(res => {
      if (res.success) {
        let data = res.data.map(itm => {
          let start = itm.startTimeLocal.split(' ')[1]
          let end = itm.endTimeLocal.split(' ')[1]

          const findpriceOption = (label) => {
            let ext = itm.priceOptions.find(itm => itm.label == label)
            return ext ? ext : null
          }

          return {
            time: `${datepipeModel.time(itm.startTimeLocal)} - ${datepipeModel.time(itm.endTimeLocal)}`,
            start: start,
            end: end,
            seats: itm.seats,
            startTimeLocal: itm.startTimeLocal,
            endTimeLocal: itm.endTimeLocal,
            seatsAvailable: itm.seatsAvailable,
            id: itm.id,
            allDay: itm.allDay,
            adult: findpriceOption('Adult'),
            student: findpriceOption('Student'),
            child: findpriceOption('Child'),
            family: findpriceOption('Family'),
          }
        })
        let evts=getEventsArr(start,end,dynamicPrice,data)
        setAvailabiltyAll(data)
        setEvents([...evts])
        setCalendar(indate, [...(evts ? evts:[])])
      }
      loader(false)
    })
  }

  useEffect(() => {
    let year = curentDate.getFullYear()
    let years = []
    for (let i = 0; i < 3; i++) {
      let data = {
        name: year + i,
        id: year + i,
      }
      years.push(data)
    }
    setYears([...years])

    if (productData) {
      let dynamicPrice = []
      if (productData.dynamicPricing) {
        dynamicPrice = productData.dynamicPricing.map(itm => {
          return { ...itm, dateApplied: itm.createdAt }
        })
      }
      // console.log("productData",productData)
      dynamicPricingRef.current=dynamicPrice
      yearChange(curentDate.getFullYear(), dynamicPrice)
    }
  }, [productData])

  return (
    <>
      <div onClick={e => setCalendar()} id="setCalendar"></div>
      <Html
        colors={colors}
        detail={detail}
        exta={exta}
        back={back}
        next={next}
        handleDateClick={handleDateClick}
        handleEventClick={handleEventClick}
        initialDate={initialDate}
        events={events}
        monthInitialView={monthInitialView}
        deletePricing={deletePricing}
        filters={filters}
        editdynamicPricing={editdynamicPricing}
        selectedDate={selectedDate}
        setFilter={setFilter}
        years={years}
        views={views}
        calendarList={calendarList}
        viewChange={viewChange}
        yearChange={yearChange}
        monthChange={monthChange}
      />
    </>

  );
};

export default CalendarPage;
