import React from 'react'
import Fullcalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default function Calendar({ events }) {
  console.log(events)
  return (
    <div className="w-1/3 h-1/3 p-4 border-solid border-gray-300 border-2 rounded-lg m-4">
      <Fullcalendar 
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView={"dayGridMonth"}
      height={"60vh"}
      displayEventTime={false}
      events={events}/>
    </div>
  )
}
