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

  // Hover function handler (specific to Fullcalendar component)
  function handleMouseEnter(arg) {
    // Display 'tippy' popover component with event title
    tippy(arg.el, {
      content: arg.event.title,
      allowHTML: true
    })
  }

  // Click event handler for user click on calendar event
  function handleClick(event) {
    // Extract title from event that was clicked
    const eventTitle = event.event.title
    // Find index of event title from full events list
    let index 
    events.some((event, idx) => {
      if (event.title === eventTitle) {
        index = idx
        return true
      }
    })
    // Navigate to event page based on found event index
    navigate(`/events/${index}`)
  }
 
  // Fullcalendar component
  return (
    <div className="w-1/3 h-1/3 p-4 border-solid border-gray-300 border-2 rounded-lg m-4 animate-in slide-in-from-top duration-700 ease-out bg-white" id="calendar">
      <Fullcalendar 
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView={"dayGridMonth"}
      displayEventTime={false}
      // 'events' prop passed in to events
      events={events}
      eventMouseEnter={handleMouseEnter}
      eventClick={handleClick}
      />
    </div>
  )
}
