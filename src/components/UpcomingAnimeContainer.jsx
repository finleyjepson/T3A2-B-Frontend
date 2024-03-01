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
            <div className='py-4 animate-in slide-in-from-top ease-out duration-1.5s'>
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
            </div>
        </>
    )
}
