import { useEffect, useState } from "react"
import EventList from "./EventList"

function EventsLandingContainer({ events, categories, getEvents }) {
    // State for search
    const [search, setSearch] = useState("")
    const [filteredEvents, setFilteredEvents] = useState(events)
    const [filteredCategories, setFilteredCategories] = useState(null)

    // onChange handler function listening to input box
    function changeHandler(event) {
        event.persist()
        // Set 'search' term with each change of the input field
        setSearch(event.target.value)
    }

    function categoryHandler(event) {
        setFilteredCategories(event.target.value)
    }

    // Filter list function
    function filterList(events) {
        // Filter and return event titles and description that include the 'search' term state
        const filtered = events.filter((event) => {
            return `${event.title.toLowerCase()} ${event.description.toLowerCase()} ${event.anime.toLowerCase()}`.includes(search.toLowerCase())
        })
        // Set filteredEvents to filtered events; which will now be passed to the EventList component to render
        setFilteredEvents(filtered)
    }


    // Use effect to re-filter events
    useEffect(() => {
        // Run filterList function when 'search' state is updated
        filterList(events)
    }, [search])

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <>
            <input type='text' placeholder='🔎 Search Anime and Events' onChange={changeHandler} value={search} className='w-72 px-4 py-2 mt-4 mx-8 bg-gray-200 rounded-lg animate-in slide-in-from-top fade-in-25 ease-out duration-1000'></input>
            <div className='p-4 animate-in slide-in-from-left ease-out duration-1000'>
                <div className='py-2 mx-4 rounded-t-lg bg-blue-600 px-4 text-xl max-w-[500px] text-white '>Events</div>
                <div className='mx-4 rounded-b-lg bg-blue-50 max-w-[500px] border-2 border-x-gray-300 border-b-gray-300'>
                    <EventList events={filteredEvents} />
                </div>
            </div>
        </>
    )
}

export default EventsLandingContainer
