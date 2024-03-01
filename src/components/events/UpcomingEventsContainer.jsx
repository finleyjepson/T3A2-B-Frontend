import UpcomingEvents from "./UpcomingEvents"
import { Link } from "react-router-dom"

// Events container on home page
function UpcomingEventsContainer({ events, user, isLoggedIn }) {
    return (
        <>  
            {/* Previous Upcoming Events Container */}
            {/* <div className='py-4 animate-in slide-in-from-top ease-out duration-1000 '>                
                <div className='py-2 mx-4 rounded-t-lg bg-orange-600 px-4 text-xl max-w-[500px] text-white shadow-lg'>
                    <Link to='/events'>Upcoming Events</Link>
                </div>
                <div className='mx-4 rounded-b-lg bg-orange-50 max-w-[500px] border-2 border-x-gray-300 border-b-gray-300 shadow-lg'>
                    <UpcomingEvents events={events} max={5} isLoggedIn={isLoggedIn} user={user} />
                </div>
            </div> */}

            {/* <!-- Upcoming Events Container --> */}
            <div class="max-w-[85rem] px-14 py-2 sm:px-4 lg:px-4 lg:py-2 mx-auto animate-in slide-in-from-top ease-out duration-1.5s">
                <div class="flex flex-col">
                    <div class="-m-1.5 overflow-x-auto">
                    <div class="p-1.5 min-w-full inline-block align-middle">
                        <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden ">
                        {/* <!-- Header --> */}
                        <div class="px-6 py-4 border-b border-gray-200 bg-slate-900">
                            <h2 class="text-3xl font-semibold text-gray-800">
                            <span className='bg-gradient-to-t from-[#bfdbfe] to-[#3b82f6] bg-clip-text text-transparent'>
                                <Link to='/events'>Upcoming Events</Link>
                            </span></h2>
                            <p class="text-sm text-gray-300">
                                Book your spot at these events coming soon.
                            </p>
                        </div>
                        {/* <!-- End Header --> */}

                        {/* <!-- Body --> */}
                        <div class="w-full min-h-[300px] flex flex-col mx-auto mx-4 bg-blue-50">
                            {/* Pass in number of items to show as 'max'  */}
                            {
                                <UpcomingEvents events={events} max={5} isLoggedIn={isLoggedIn} user={user} />
                            }
                        </div>
                        {/* <!-- End Body --> */}
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            
        </>
    )
}

export default UpcomingEventsContainer
