import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function EventList({ fullEvents, events, max, user, isLoggedIn }) {
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

    function findIndex(event) {
        const eventId = event._id
        let index
        fullEvents.some((fullEvent, idx) => {
            if (fullEvent._id === eventId) {
                index = idx
                return true
            }
        })
        return index
    }
    return (
        <>
            <ul>
                {events.slice(0, max).map((event, index) => (
                    <li key={index} className='odd:bg-white'>
                        
                            <div className='p-4 transition-all delay-150 hover:-translate-y-1 hover:scale-105 hover:rounded-lg  hover:bg-blue-100 hover:shadow-lg'>
                                <div>{findIndex(event)}</div>
                                <Link to={`/events/${findIndex(event)}`}>
                                    <div className="flex justify-between">
                                        <p className="text-sm">{event.anime}</p>
                                        <p className="text-sm">{dateMod(event.date)}</p>
                                    </div>
                                    <h1 className='text-xl py-2'>{event.title}</h1>
                                    <p>{event.description}</p>
                                </Link>
                                <div className="flex justify-end">
                                    {isLoggedInState && (userState.isAdmin || (userState.isOrganiser && user._id === event.createdBy)) && (
                                    <button className='bg-red-600 py-1 px-2 hover:bg-red-500 rounded-md text-white hover:rounded-md' onClick={() => navigate(`/events/edit/${event._id}`)}>
                                        Edit Event
                                    </button>
                                    )}
                                </div>
                            </div>
                    </li>
                ))}
            </ul>
        </>
    )
}
