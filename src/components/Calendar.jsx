import React from 'react'
import Fullcalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import { useNavigate } from "react-router-dom"

export default function Calendar({ events }) {

  const navigate =  useNavigate()

  function handleMouseEnter(arg) {
    tippy(arg.el, {
      content: arg.event.title,
      allowHTML: true
    })
  }

  function handleClick(event) {
    const eventTitle = event.event.title
    console.log(events)
    let index 
    events.some((event, idx) => {
      if (event.title === eventTitle) {
        index = idx
        return true
      }
    })
    console.log(index)
    navigate(`/events/${index}`)
  }
 
  return (
    <div className="w-1/3 h-1/3 p-4 border-solid border-gray-300 border-2 rounded-lg m-4">
      <Fullcalendar 
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView={"dayGridMonth"}
      height={"60vh"}
      displayEventTime={false}
      events={events}
      eventMouseEnter={handleMouseEnter}
      eventClick={handleClick}
      />
    </div>
  )
}
