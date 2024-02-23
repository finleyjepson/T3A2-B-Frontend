import { useEffect, useState } from 'react'
import EventList from './EventList'
import DropdownList from './DropdownList'

function EventsLandingContainer({ events }) {

  // State for search
  const [search, setSearch] = useState("")
  const [filteredEvents, setFilteredEvents] = useState(events)

  // State for categories list
  const [categories, setCategories] = useState([])


  // onChange handler function listening to input box
  function changeHandler(event) {
    event.persist()
    // Set 'search' term with each change of the input field
    setSearch(event.target.value)
  }

  // Filter list function
  function filterList(events) {
    // Filter and return event titles and description that include the 'search' term state
    const filtered = events.filter(event => {
      return `${event.title.toLowerCase()} ${event.description.toLowerCase()}`.includes(search.toLowerCase())
    })

    // Set filteredEvents to filtered events; which will now be passed to the EventList component to render
    setFilteredEvents(filtered)
    
  }
  
  // Use effect to re-filter events
  useEffect(() => {
    // Run filterList function when 'search' state is updated
    filterList(events)
  },[search])

  
  return (
    <>
      <input type="text" placeholder="🔎 Search Anime and Events" onChange={changeHandler} value={search} className="w-72 px-4 py-2 mt-4 mx-8 bg-gray-200 rounded-lg"></input>
      <div className="p-4">
        {/* Commented out dropdown list for now as backend may need to change to accomodate category search */}
        {/* <DropdownList setCategories={ setCategories } categories={ categories }/> */}
        <div className="py-2 mx-4 rounded-t-lg bg-blue-600 px-4 text-xl max-w-[500px] text-white ">Events</div>
        <div className="mx-4 rounded-b-lg bg-blue-50 max-w-[500px] border-2 border-x-gray-300 border-b-gray-300">
          <EventList events={ filteredEvents } />
        </div>
      </div>
    </>
  )
}

export default EventsLandingContainer