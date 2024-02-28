import { useState, useEffect } from "react"
import axios from "axios"

export default function UpdateEvent({ getEvents, categories, id}) {
    const [coords, setCoords] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [skipSearch, setSkipSearch] = useState(false)

	const [updateEvent, setUpdateEvent] = useState("")

	async function getOneEvent() {
		await fetch(`http://localhost:4000/events/${id}`)
		.then(response => response.json())
		.then(data => setUpdateEvent(data))
	}

	useEffect(() => {
		getOneEvent()
	},[])

    const user = JSON.parse(sessionStorage.getItem("user"))

    const [eventInfo, setEventInfo] = useState({
        title: "",
        description: "",
        date: "",
        venue: "",
        category: "",
        anime: "Other",
        createdBy: "",
        organiser: "",
        price: 0,
    })

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
                    console.log(res.data.data)
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
        getGeo(eventInfo.venue)
    }, [eventInfo.venue])

    async function submitEvent(event) {
        event.preventDefault()

        // Console log coordinates on submit from the coordinates state
        console.log(updateEvent)
        console.log(eventInfo)
        try {
            // User token handling
            const accessToken = sessionStorage.getItem("accessToken") // Retrieve the session's access token
            console.log("Access token:", accessToken)
            if (!accessToken) {
                throw new Error("Access token not found. Please login.")
            }

            const response = await fetch(import.meta.env.VITE_BACKEND_API_URL+`/events/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`, // Add the token in the request
                },
                body: JSON.stringify({
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
                    // createdBy:
                    createdBy: user._id,
                    organiser: updateEvent.organiser,
                    price: updateEvent.price,
                }),
            })
            console.log(response)
            getEvents()
            // Catch response:
        } catch (error) {
            console.error("Problem creating event", error.message)
        }
    }

    // Geocode getter function
    async function getGeo(venue) {
        // Import API_KEY from .env file
        const api = import.meta.env.VITE_GOOGLE_API_KEY
        if (venue) {
            try {
                // Make call to Google Maps Geocode, taking in 'venue' as parameter
                const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${venue}&key=${api}`)
                const data = await response.json()
                // Extract lat and long and set to coords state
                let lat = data.results[0].geometry.location.lat
                let lng = data.results[0].geometry.location.lng
                setCoords({lat: lat, lng: lng})
            } catch (error) {
                // This is the hacky bit; disguising error as 'listening for location'
                console.log("Listening for location")
                console.log("Error fetching geocode, address not valid:", error)
            }
        }
    }

    return (
        <>
            {(!user || (!user.isAdmin && !user.isOrganiser)) ? (
                <h1>Unauthorised</h1>
            ) : ( 
                <div className="flex justify-center">
                <div className='p-4 w-[500px] animate-in slide-in-from-top duration-1s'>
                    <div className='py-2 mx-4 rounded-t-lg bg-green-600 px-4 text-xl max-w-[500px] text-white '>Edit Event</div>
                    <div className='mx-4 rounded-b-lg bg-green-50 max-w-[500px] border-2 border-x-gray-300 border-b-gray-300'>
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
                                <button
                                type='submit'
                                className='text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4 duration-300'>
                                Save Event Details
                            </button>
                            </div>
    
 
                        </form>
                    </div>
                </div>
                </div>
            )}
        </>
    )
}