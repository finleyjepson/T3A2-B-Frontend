import EventList from "./EventList"
import { Link } from "react-router-dom"

// Events container on home page
function UpcomingEventsContainer({ events }) {
    return (
        <>
            <div className='py-4 animate-in slide-in-from-top ease-out duration-1000'>
                {/* <div className="py-2 mx-4 rounded-t-lg bg-orange-600 px-4 text-xl max-w-[500px] text-white ">Upcoming Events</div> */}
                <div className='py-2 mx-4 rounded-t-lg bg-orange-600 px-4 text-xl max-w-[500px] text-white '>
                    <Link to='/events'>Upcoming Events</Link>
                </div>
                <div className='mx-4 rounded-b-lg bg-orange-50 max-w-[500px] border-2 border-x-gray-300 border-b-gray-300'>
                    {/* Pass in number of items to show as 'max'  */}
                    <EventList events={events} max={5} />
                </div>
            </div>
        </>
    )
}

export default UpcomingEventsContainer
