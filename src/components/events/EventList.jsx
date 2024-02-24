import { Link } from "react-router-dom"

export default function EventList({ events, max }) {
    return (
        <>
            <ul>
                {events.slice(0, max).map((event, index) => (
                    <li key={index} className='odd:bg-white'>
                        <Link to={`/events/${index}`}>
                            <div className='p-4 transition-all delay-150 hover:-translate-y-1 hover:scale-105 hover:rounded-lg  hover:bg-purple-100 hover:shadow-lg'>
                                <h1 className='text-xl'>{event.title}</h1>
                                <p>{event.description}</p>
                                <p>{event.date}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}
