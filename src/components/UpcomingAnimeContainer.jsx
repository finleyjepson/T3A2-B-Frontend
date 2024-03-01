export default function UpcomingAnimeContainer({ events }) {
    // Extract only events that have an anime tag
    let animeList = []

    // Loop through events and exclude adding events with an anime tag of "Other"
    for (let i = 0; i < events.length; i++) {
        if (events[i].anime && events[i].anime !== "Other") {
            animeList.push(events[i])
        }
    }

    return (
        <>
            {/* <!-- [Previous] Upcoming Anime Container --> */}
            {/* <div className='py-4 animate-in slide-in-from-top ease-out duration-1.5s'>
                <div className='py-2 mx-4 rounded-t-lg bg-green-600 px-4 text-xl max-w-[500px] text-white shadow-lg'>Upcoming Anime</div>
                <div className=' mx-4 py-2 rounded-b-lg bg-green-50 max-w-[500px] border-2 border-x-gray-300 border-b-gray-300 h-[300px] shadow-lg'>
                    {
                        // Limit showing only the top 5 items
                        animeList.slice(0, 10).map((event, index) => (
                            <li key={index} className='px-6'>
                                {event.anime}
                            </li>
                        ))
                    }
                </div>
            </div> */}

           {/* <!-- Upcoming Anime Container --> */}
            <div class="max-w-[85rem] px-4 py-2 sm:px-4 lg:px-4 lg:py-2 mx-auto animate-in slide-in-from-top ease-out duration-1.5s">
            <div class="flex flex-col">
                <div class="-m-1.5 overflow-x-auto">
                <div class="p-1.5 min-w-full inline-block align-middle">
                    <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden ">
                    {/* <!-- Header --> */}
                    <div class="px-6 py-4 border-b border-gray-200 bg-slate-900">
                        <h2 class="text-3xl font-semibold text-gray-800">
                        <span className='bg-gradient-to-t from-[#c7d2fe] to-[#8678f9] bg-clip-text text-transparent'>
                            Upcoming Anime
                        </span></h2>
                        <p class="text-sm text-gray-300">
                        Don't miss out on these exciting new shows.
                        </p>
                    </div>
                    {/* <!-- End Header --> */}

                    {/* <!-- Body --> */}
                    <div class="w-full min-h-[300px] flex flex-col mx-auto px-6 py-1">
                        <h2 class="mt-5 font-semibold text-gray-800">
                        {
                            // Limit showing only the top items
                            animeList.slice(0, 10).map((event, index) => (
                                <li key={index} className='px-6'>
                                    {event.anime}
                                </li>
                            ))
                        }
                        </h2>
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
