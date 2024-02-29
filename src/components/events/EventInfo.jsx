import Maps from "./Maps"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export default function EventInfo({ events, getEvents, user }) {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [rsvpCount, setRsvpCount] = useState(0)
    const [eventPicture, setEventPicture] = useState(null)
    const accessToken = sessionStorage.getItem("accessToken")

    console.log("EventInfo events:", id)

    const navigate = useNavigate()

    useEffect(() => {
        getEvents().then(() => setLoading(false))
    }, [getEvents])

    useEffect(() => {
        if (events[id]) {
            setEventPicture(events[id].pictureUrl)
        } else {
            setEventPicture(null)
        }
    }, [events, id])

    if (loading) {
        return <div>Loading...</div>
    }

    async function addRSVP(eventId, accessToken) {
        if (!accessToken) {
            throw new Error("Access token not found. Please login.")
        }
        await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/events/${eventId}/rsvp-add`, {
            method: "POST",
            headers: {
                contentType: "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => {
            response.json()
            getEvents(eventId)
        })
        .then(data => console.log(data))
    }

    async function removeRSVP(eventId, accessToken) {
        if (!accessToken) {
            throw new Error("Access token not found. Please login.")
        }
        await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/events/${eventId}/rsvp-remove`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`, // Add the token in the request
            },
        })
        .then(response => {
            response.json()
            getEvents(eventId)
        })
        .then(data => console.log(data))
        .catch(err => console.error(err))
    }

    async function getRSVP(eventId) {
        await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/events/${eventId}/rsvp-count`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(data => setRsvpCount(data.count ?? 0))
        .catch(err => console.error(err))
    }

    getRSVP(events[id]._id)

    // Function to upload profile picture
    const uploadEventPicture = async (event, eventId) => {
        const file = event.target.elements.image.files[0]
        const formData = new FormData()
        formData.append('image', file)

        // Send the image to the server
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/images/event/${eventId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                }
            })
            console.log('Event picture uploaded:', response.data)
        } catch (error) {
            console.error('Error uploading event picture:', error)
        }
    }

    // Function to handle profile picture change
    const handleEventPictureChange = async (event) => {
        event.preventDefault()
        await uploadEventPicture(event, events[id]._id)
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
                                    <span>No profile picture</span>
                                )}
                            </div>
                            <form onSubmit={handleEventPictureChange}>
                                <input type="file" accept="image/*" name='image' />
                                <div >
                                    <button type='submit' >Upload</button>
                                </div>
                            </form>
                        </div>
                    
                    <div className="animate-in slide-in-from-left fade-in-25 ease-out duration-1000 my-4">
                        <Maps coords={ events[id].coords }/>
                    </div>
                    </div>
                    <div className="my-8 mr-8 animate-in slide-in-from-top fade-in-25 ease-out duration-1000">
                        <button onClick={() => addRSVP(events[id]._id, accessToken)}  className='bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 m-4 border-b-4 border-green-700 hover:border-green-500 rounded'>Interested</button>
                        <button onClick={() => removeRSVP(events[id]._id, accessToken)} className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 m-4 border-b-4 border-red-700 hover:border-red-500 rounded'>Not for me</button>
                        <ul>
                            <li>
                                <div className='p-4 max-w-[500px] rounded-md border-2 border-gray-300 bg-white'>
                                    <div className='mb-4'>
                                        <h3 className='text-lg font-bold'>When is it?</h3>
                                        <p>{events[id].date}</p>
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
                                    <div className='text-lg font-bold'>
                                        <h3 className='text-lg font-bold'>RSVP count</h3>
                                        <p>{rsvpCount}</p>
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
