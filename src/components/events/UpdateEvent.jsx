import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import getGeo from '../../utils/getGeo'
import axiosInstance from "../../utils/axiosInstance"

export default function UpdateEvent({ categories, user }) {
    const { id } = useParams()
    const [coords, setCoords] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [skipSearch, setSkipSearch] = useState(false)
	const [updateEvent, setUpdateEvent] = useState([{}])
    
    const navigate = useNavigate()

    const currentDate = new Date().toISOString().split('T')[0] // Get current date in YYYY-MM-DD format
    
	async function getOneEvent() {
        await axios.get(import.meta.env.VITE_BACKEND_API_URL+`/events/${id}`)
        .then(response => setUpdateEvent(response.data))
        .catch(err => console.error(err))
	}

	useEffect(() => {
		getOneEvent()
	},[])

    function changeHandler(event) {
        const { name, value } = event.target
        setUpdateEvent((previousState) => ({
            ...previousState,
            [name]: value,
        }))
		
    }

    useEffect(() => {
        if (!skipSearch) {
            const delayTimer = setTimeout(() => {
                if (searchTerm) { // Only search if there's input
                setIsLoading(true)
                axios.get(`https://api.jikan.moe/v4/anime?q=${searchTerm}`)
                    .then(res => {
                    setSearchResults(res.data.data.slice(0,5)) // Limit to top 5 results
                    setIsLoading(false)
                    })
                    .catch(err => console.error(err)); 
                } else {
                setSearchResults([]) // Clear results if no search term
                }
            }, 500) // Delay API call slightly

            return () => clearTimeout(delayTimer)
        }
    }, [searchTerm, skipSearch])

    const handleSearchChange = (event) => {
        setSkipSearch(false)
        setSearchTerm(event.target.value)
    }

    const handleSelectAnime = (anime) => {
        setUpdateEvent((previousState) => ({
            ...previousState,
            anime: anime.title,
        }))
        setSkipSearch(true) // Skip search on select
        setSearchTerm(anime.title) // Set the input value
        setSearchResults([]) // Clear results
    }

    // Use effect to re-run getGeo on venue input change
    useEffect(() => {
        // Re-run getGeo function every time event venue is updated
        getGeo(updateEvent.venue, setCoords)
    }, [updateEvent.venue])

    // Submit event function (form submit)
    async function submitEvent(event) {
        event.preventDefault()
        try {
            // User token handling
            const accessToken = sessionStorage.getItem("accessToken") // Retrieve the session's access token
            if (!accessToken) {
                throw new Error("Access token not found. Please login.")
            }
            await axiosInstance.put(`/events/${id}`, {
                title: updateEvent.title,
                description: updateEvent.description,
                category: updateEvent.category,
                date: updateEvent.date,
                venue: updateEvent.venue,
                coords: coords ? {
                    lat: coords.lat,
                    lng: coords.lng,
                } : {
                    lat: 0,
                    lng: 0
                },
                anime: updateEvent.anime,
                organiser: updateEvent.organiser,
                price: updateEvent.price,
            })
            console.log(id)
            handleEventPictureChange(event, id)
            navigate("/events")
            // Catch response:
        } catch (error) {
            console.error("Problem creating event", error.message)
        }
    }

    // Delete event function
    async function deleteEvent(event) {
        event.preventDefault()

        // Console log coordinates on submit from the coordinates state
        console.log(updateEvent)
        try {
            // User token handling
            const accessToken = sessionStorage.getItem("accessToken") // Retrieve the session's access token
            console.log("Access token:", accessToken)
            if (!accessToken) {
                throw new Error("Access token not found. Please login.")
            }
            await axiosInstance.delete(`/events/${id}`)
            navigate('/events')
            // Catch response:
        } catch (error) {
            console.error("Problem deleting event", error.message)
        }
    }

    // Function to handle profile picture change
    async function handleEventPictureChange(event, eventId) {
        event.preventDefault()
        await uploadEventPicture(event, eventId)
    }

    // Function to upload profile picture
    const uploadEventPicture = async (event, eventId) => {
        const file = event.target.elements.image.files[0]
        const formData = new FormData()
        formData.append('image', file)

        // Send the image to the server
        try {
            // const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/images/event/${eventId}`, formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            //     }
            // })
            const response = await axiosInstance.post(`/images/event/${eventId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log('Event picture uploaded:', response.data)
        } catch (error) {
            console.error('Error uploading event picture:', error)
        }
    }

    return (
        <>
            {/* Check if user is Admin or Organiser */}
            {(!user || (!user.isAdmin && !user.isOrganiser)) ? (
                navigate("/unauth")
            ) : ( 
                <div className="flex justify-center">
                <div className='p-4 w-[500px] animate-in slide-in-from-top duration-1s'>
                    <div className='py-2 mx-4 rounded-t-lg bg-green-600 px-4 text-xl max-w-[500px] text-white  shadow-lg'>Edit Event</div>
                    <div className='mx-4 rounded-b-lg bg-green-50 max-w-[500px] border-2 border-x-gray-300 border-b-gray-300  shadow-lg'>
                        {/* Edit event container */}
                        <form className='space-y-4 md:space-y-4' onSubmit={submitEvent}>
                            <div className='m-4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Title</label>
                                <input
                                    name='title'
                                    id='title'
                                    value={updateEvent.title}
                                    onChange={changeHandler}
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                    placeholder={updateEvent.title}
                                    required=''
                                />
                            </div>
                            <div className='m-4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900 '>Description</label>
                                <textarea
                                    name='description'
                                    id='description'
                                    value={updateEvent.description}
                                    onChange={changeHandler}
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-40'
                                    placeholder={updateEvent.description}
                                    required=''
                                />
                            </div>
                            <div className="mx-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Upload Event image</label>
                                    <p className="my-2">Images should be uploaded as 200 x 300 px</p>
                                    <input type="file" accept="image/*" name='image'/>
                                </div>
                            <select
                                name='category'
                                onChange={changeHandler}
                                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 m-4'>
                                <option value='' disabled selected>
                                    Confirm Event Type
                                </option>
                                {categories.map((category) => (
                                    <option name='category' id='category' key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <div className='m-4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Venue</label>
                                <input
                                    name='venue'
                                    id='venue'
                                    value={updateEvent.venue}
                                    onChange={changeHandler}
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                    placeholder={updateEvent.venue}
                                    required=''
                                />
                            </div>
                            <div className='m-4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Confirm Date</label>
                                <input
                                    type='date'
                                    name='date'
                                    id='date'
                                    pattern='\d{4}-\d{2}-\d{2}'
                                    value={updateEvent.date}
                                    onChange={changeHandler}
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                    // placeholder={updateEvent.date.toISOString().substring(0,10)}
                                    required=''
                                    min={currentDate}
                                />
                            </div>
                            <div className='m-4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Anime</label>
                                <input 
                                    type="text" 
                                    value={searchTerm} 
									placeholder={updateEvent.anime}
                                    onChange={handleSearchChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                />
                                {isLoading && <p>Loading...</p>}
                                {searchResults.length > 0 && (
                                    <ul className="search-results">
                                    {searchResults.map(anime => (
                                        <li key={anime.mal_id} onClick={() => handleSelectAnime(anime)}>
                                        {anime.title}
                                        </li>
                                    ))}
                                    </ul>
                                )}
                            </div>
                            <div className='m-4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Organiser</label>
                                <input
                                    name='organiser'
                                    id='organiser'
                                    value={updateEvent.organiser}
                                    onChange={changeHandler}
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                    placeholder={updateEvent.organiser}
                                    required=''
                                />
                            </div>
                            <div className='m-4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Price</label>
                                <input
                                    name='price'
                                    id='price'
                                    value={updateEvent.price}
                                    onChange={changeHandler}
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                    placeholder={updateEvent.price}
                                    required=''
                                />
                                <div className="flex justify-between">
                                    <button
                                    type='submit'
                                    className='text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4 duration-300'>
                                    Save Event Details
                                    </button>
                                    <button
                                    type='Delete'
                                    onClick={deleteEvent}
                                    className='text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4 duration-300'>
                                    Delete Event
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
            )}
        </>
    )
}