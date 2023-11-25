import React, { useEffect } from "react";
import { Calendar } from 'fullcalendar';
const SingleCalendar = ({ id,initialDate,handleDateClick,handleEventClick,events,exta }) => {
    const setCalendar = (initdate = '', e = '',view='') => {
        setTimeout(() => {
          let elid = `calendar_${id}`
          let calendarEl = document.getElementById(elid)
          if(calendarEl){
            let calendar = new Calendar(calendarEl, {
              initialView: 'dayGridMonth',
              headerToolbar: {
                center: 'title',
                left: '',
                right: ''
              },
              initialDate: initdate ? initdate : initialDate,
              events: [
                ...(e ? e : events)
              ],
              dateClick: handleDateClick,
              eventClick: handleEventClick,
              eventContent: function( info ) {
                return {html: `${info.event.title}`};
            }
            })
            calendar.render()
          }
        
        }, 1)
    }

    useEffect(() => {
        setCalendar()
    }, [id,exta])

    return <>
        <div id={`calendar_${id}`}></div>
    </>
}

export default SingleCalendar