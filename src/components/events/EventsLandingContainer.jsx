import { useEffect, useState } from "react"
import EventList from "./EventList"

function EventsLandingContainer({ events, user, isLoggedIn }) {
    // State for search
    const [search, setSearch] = useState("")
    const [filteredEvents, setFilteredEvents] = useState(events)

    // onChange handler function listening to input box
    function changeHandler(event) {
        event.persist()
        // Set 'search' term with each change of the input field
        setSearch(event.target.value)
    }

    // Use effect to re-filter events
    useEffect(() => {
            // Filter list function
        function filterList(events) {
            // If search term is empty, set filteredEvents to events
            if (search === "") {
                setFilteredEvents(events)
            } else {
                // If search term is not empty, filter events
                setFilteredEvents(events.filter((event) => {
                    // Check if search term is included in event title or anime
                    return event.title.toLowerCase().includes(search.toLowerCase()) || event.anime.toLowerCase().includes(search.toLowerCase())
                }))
            }
        }
        // Run filterList function when 'search' state is updated
        filterList(events)
    }, [search, events])

    return (
        <div className="flex justify-center">
            <div>
                <input type='text' placeholder='🔎 Search Anime and Events' onChange={changeHandler} value={search} className='w-96 px-4 py-2 mt-4 mx-8 bg-gray-200 rounded-lg animate-in slide-in-from-top fade-in-25 ease-out duration-1000'></input>
                <div className='p-4 animate-in slide-in-from-left ease-out fade-in-25 duration-1000 '>
                    <div className='py-2 mx-4 rounded-t-lg bg-blue-600 px-4 text-[32px] w-[500px] text-white '>Events</div>
                    <div className='mx-4 rounded-b-lg bg-blue-50 w-[500px] border-2 border-x-gray-300 border-b-gray-300 shadow-lg'>
                        <EventList events={filteredEvents} user={user} isLoggedIn={isLoggedIn} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventsLandingContainer
