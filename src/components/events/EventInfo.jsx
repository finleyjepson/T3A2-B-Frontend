import Maps from "./Maps"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import defaultProfilePicture from '../../assets/default-placeholder.png'
import axiosInstance from "../../utils/axiosInstance"

export default function EventInfo({ events, getEvents, user }) {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [rsvpCount, setRsvpCount] = useState(0)
    const [eventPicture, setEventPicture] = useState(null)
    const accessToken = sessionStorage.getItem("accessToken")

    console.log("EventInfo events:", id)

    const navigate = useNavigate()

    // Set loading state to false once events fetched
    useEffect(() => {
        getEvents().then(() => setLoading(false))
    }, [getEvents])

    // Get event picture
    useEffect(() => {
        if (events[id]) {
            setEventPicture(events[id].pictureUrl)
        } else {
            setEventPicture(null)
        }
    }, [events, id])

    // Display loading comment if events not yet fetched
    if (loading) {
        return <div>Loading...</div>
    }

    // Add RSVP function
    async function addRSVP(eventId, accessToken) {
        if (!accessToken) {
            throw new Error("Access token not found. Please login.")
        }
        await axiosInstance.post(`/events/${eventId}/rsvp-add`)
        .then(response => {
            response.json()
            getEvents(eventId)
        })
        .then(data => console.log(data))
    }

    // Remove RSVP function
    async function removeRSVP(eventId, accessToken) {
        if (!accessToken) {
            throw new Error("Access token not found. Please login.")
        }
        await axiosInstance.post(`/events/${eventId}/rsvp-remove`)
        .then(response => {
            response.data
            getEvents(eventId)
        })
        .catch(err => console.error(err))
    }

    // Get RSVP count
    async function getRSVP(eventId) {
        await axiosInstance.get(`/events/${eventId}/rsvp-count`)
        .then(response => response.data)
        .then(data => setRsvpCount(data.count ?? 0))
        .catch(err => console.error(err))
    }

    getRSVP(events[id]._id)

    // Format date function
    function dateMod(date) {
        return date.split("T")[0]
    }

    return (
        <div className="flex justify-center py-4">
            
            <div className='py-4 mx-4 border-2  rounded-xl shadow-lg bg-white animate-in slide-in-from-top fade-in-25 ease-out duration-1.25s max-w-[600px]'>
                <div className="bg-amber-300">
                <h1 className='text-[32px] py-4 animate-in slide-in-from-top fade-in-25 ease-out duration-1.25s mx-8'>{events[id].title}</h1>
                </div>
                <div className="flex justify-between">
                <h3 className='text-lg  pt-2 animate-in slide-in-from-top fade-in-25 ease-out duration-1.25s mx-8'>{events[id].anime}</h3>
                    <div className="flex justify-end p-2">
                    {(user.isAdmin || (user.isOrganiser && user._id === events[id].createdBy)) && (
                    <button className='bg-red-600 py-1 px-2 hover:bg-red-500 rounded-md text-white hover:rounded-md' onClick={() => navigate(`/events/edit/${events[id]._id}`)}>
                        Edit Event
                    </button>
                    )}
                    </div>
                </div>
                <div className="flex">
                <div className="mx-8 my-8 ">
                    {/* Profile Picture Box */}
                    <div >
                        <div className="h-[300px] w-[200px] bg-slate-500 animate-in slide-in-from-left fade-in-25 ease-out duration-1000 my-4">
                            {/* If profile picture is not null, show the profile picture */}
                            {eventPicture ? (
                                // Need to figure out how this links with the AWS image host
                                <img src={eventPicture} alt="Profile Picture" className="h-full object-cover" />
                                // If null, show 'no profile picture'
                            ) : (
                                <img src={defaultProfilePicture} alt="Profile Picture" className="h-full object-cover" />
                            )}
                        </div>
                    </div>
                    <div className="animate-in slide-in-from-left fade-in-25 ease-out duration-1000 my-4">
                        <Maps coords={ events[id].coords }/>
                    </div>
                    </div>
                    {/* Event Info box */}
                    <div className="my-8 mr-8 animate-in slide-in-from-top fade-in-25 ease-out duration-1000">
                        <button onClick={() => addRSVP(events[id]._id, accessToken)}  className='bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 m-4 border-b-4 border-green-700 hover:border-green-500 rounded'>Interested</button>
                        <button onClick={() => removeRSVP(events[id]._id, accessToken)} className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 m-4 border-b-4 border-red-700 hover:border-red-500 rounded'>Not for me</button>
                        <div className='text-lg font-bold mb-2'>
                                        <p>{rsvpCount} people are interested</p>
                        </div>
                        <ul>
                            <li>
                                <div className='p-4 max-w-[500px] rounded-md border-2 border-gray-300 bg-white'>
                                    <div className='mb-4'>
                                        <h3 className='text-lg font-bold'>When is it?</h3>
                                        <p>{dateMod(events[id].date)}</p>
                                    </div>
                                    <div className='mb-4'>
                                        <h3 className='text-lg font-bold'>Where is it?</h3>
                                        <p>{events[id].venue}</p>
                                    </div>
                                    <div className='mb-4'>
                                        <h3 className='text-lg font-bold'>What is it?</h3>
                                        <p>{events[id].description}</p>
                                    </div>
                                    <div className='mb-4'>
                                        <h3 className='text-lg font-bold'>Entry price</h3>
                                        <p>{events[id].price}</p>
                                    </div>
                                    <div className="text-md text-gray-500 mt-8">
                                        <p>Organiser:</p>
                                        <p>{events[id].organiser}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
