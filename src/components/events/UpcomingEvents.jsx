import { Link } from "react-router-dom"

export default function UpcomingEvents({ events, max }) {

    // Format date function
    function dateMod(date) {
        return date.split("T")[0]
    }

    return (
        <>
            {/* Upcoming Events list */}
            <ul>
                {events.slice(0, max).map((event, index) => (
                    <li key={index} className='odd:bg-white'>
                        <Link to={`/events/${index}`}>
                            <div className='px-4 py-1 transition-all delay-150 hover:-translate-y-1 hover:scale-105 hover:rounded-lg hover:bg-blue-100 hover:shadow-lg'>
                                <div className="flex justify-between">
                                    <p className="text-sm">{event.anime}</p>
                                    <p className="text-sm">{dateMod(event.date)}</p>
                                </div>
                                <h1 className='text-sm font-bold py-2'>{event.title}</h1>

                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}
