import React from 'react'
import EventList from './EventList'

function EventsLandingContainer({ events}) {
  return (
    <>
    <div className="p-4">
      <div className="py-2 mx-4 rounded-t-lg bg-blue-600 px-4 text-xl max-w-[500px] text-white ">Events</div>
      <div className="mx-4 rounded-b-lg bg-blue-50 max-w-[500px] border-2 border-x-gray-300 border-b-gray-300">
        <EventList events={ events } />
      </div>
    </div>
    </>
  )
}

export default EventsLandingContainer