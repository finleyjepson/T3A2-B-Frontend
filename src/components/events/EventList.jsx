import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function EventList({ events, max, user, isLoggedIn }) {
    const [userState, setUserState] = useState({})
    const [isLoggedInState, setIsLoggedInState] = useState()

    useEffect(() => {
        setIsLoggedInState(isLoggedIn)
        setUserState(user)
    }, [isLoggedIn ,user, events])

    const navigate = useNavigate()

    function dateMod(date) {
        return date.split("T")[0]
    }

    return (
        <>
            <ul>
                {events.slice(0, max).map((event, index) => (
                    <li key={index} className='odd:bg-white'>
                        <Link to={`/events/${index}`}>
                            <div className='p-4 transition-all delay-150 hover:-translate-y-1 hover:scale-105 hover:rounded-lg  hover:bg-blue-100 hover:shadow-lg'>
                                <div className="flex justify-between">
                                    <p className="text-sm">{event.anime}</p>
                                    <p className="text-sm">{dateMod(event.date)}</p>
                                </div>
                                <h1 className='text-xl py-2'>{event.title}</h1>
                                <p>{event.description}</p>
                                
                            </div>
                        </Link>
                        {isLoggedInState && (userState.isAdmin || (userState.isOrganiser && user._id === events.organiserId)) && (
                            <button className='bg-red-600 py-1 px-2 rounded-md text-white' onClick={() => navigate(`/events/edit/${event._id}`)}>
                                Edit Event
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </>
    )
}
