import { useState, useEffect } from "react"
import Axios from "axios"

export default function CreateEvent({ getEvents, categories}) {
    const [coords, setCoords] = useState({lat: 0, lng: 0})
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [skipSearch, setSkipSearch] = useState(false)

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
        setEventInfo((previousState) => ({
            ...previousState,
            [name]: value,
        }))
    }

    useEffect(() => {
        if (!skipSearch) {
            const delayTimer = setTimeout(() => {
                if (searchTerm) { // Only search if there's input
                setIsLoading(true)
                Axios.get(`https://api.jikan.moe/v4/anime?q=${searchTerm}`)
                    .then(res => {
                    setSearchResults(res.data.data.slice(0,5)) // Limit to top 5 results
                    setIsLoading(false)
                    console.log(res.data.data)
                    })
                    .catch(err => console.error(err))
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
        setEventInfo((previousState) => ({
            ...previousState,
            anime: anime.title,
        }))
        setSkipSearch(true) // Skip search on select
        setSearchTerm(anime.title) // Set the input value
        setSearchResults([]) // Clear results
    }

    // Geocode getter function
    async function getGeo(venue) {
        // Import API_KEY from .env file
        const api = import.meta.env.VITE_GOOGLE_API_KEY
        const parsedVenue = venue.replace(/ /g, "%20")
        if (venue) {
            try {
                // Make call to Google Maps Geocode, taking in 'venue' as parameter
                const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${parsedVenue}&key=${api}`)
                console.log("Response:", response)
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

    // Use effect to re-run getGeo on venue input change
    useEffect(() => {
        // Re-run getGeo function every time event venue is updated
        getGeo(eventInfo.venue)
    }, [eventInfo.venue])

    async function submitEvent(event) {
        event.preventDefault()

        // Console log coordinates on submit from the coordinates state
        console.log(coords)
        // console.log(eventInfo)
        try {
            // User token handling
            const accessToken = sessionStorage.getItem("accessToken") // Retrieve the session's access token
            console.log("Access token:", accessToken)
            if (!accessToken) {
                throw new Error("Access token not found. Please login.")
            }

            const response = await fetch(import.meta.env.VITE_BACKEND_API_URL+"/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`, // Add the token in the request
                },
                body: JSON.stringify({
                    title: eventInfo.title,
                    description: eventInfo.description,
                    category: eventInfo.category,
                    date: eventInfo.date,
                    venue: eventInfo.venue,
                    // Commenting out coords as this is breaking event creation. Something to do with the mapping.
                    coords: coords ? {
                        lat: coords.lat,
                        lng: coords.lng,
                    } : {
                        lat: 0,
                        lng: 0
                    },
                    anime: eventInfo.anime,
                    // createdBy:
                    createdBy: user._id,
                    organiser: eventInfo.organiser,
                    price: eventInfo.price,
                }),
            })
            console.log(response)
            getEvents()
            // Catch response:
        } catch (error) {
            console.error("Problem creating event", error.message)
        }
    }

    return (
        <>
            {(!user || (!user.isAdmin && !user.isOrganiser)) ? (
                <h1>Unauthorised</h1>
            ) : ( 
                <div className="flex justify-center">
                    <div className='p-4 w-[500px] animate-in slide-in-from-top duration-1s'>
                        <div className='py-2 mx-4 rounded-t-lg bg-red-600 px-4 text-xl max-w-[500px] text-white '>Create Event</div>
                        <div className='mx-4 rounded-b-lg bg-red-50 max-w-[500px] border-2 border-x-gray-300 border-b-gray-300'>
                            <form className='space-y-4 md:space-y-4' onSubmit={submitEvent}>
                                <div className='m-4'>
                                    <label className='block mb-2 text-sm font-medium text-gray-900'>Title</label>
                                    <input
                                        name='title'
                                        id='title'
                                        value={eventInfo.title}
                                        onChange={changeHandler}
                                        className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                        placeholder=''
                                        required=''
                                    />
                                </div>
                                <div className='m-4'>
                                    <label className='block mb-2 text-sm font-medium text-gray-900 '>Description</label>
                                    <textarea
                                        name='description'
                                        id='description'
                                        value={eventInfo.description}
                                        onChange={changeHandler}
                                        className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-40'
                                        placeholder=''
                                        required=''
                                    />
                                </div>
                                <select
                                    name='category'
                                    onChange={changeHandler}
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 m-4'>
                                    <option value='' disabled selected>
                                        Select a category
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
                                        value={eventInfo.venue}
                                        onChange={changeHandler}
                                        className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                        placeholder=''
                                        required=''
                                    />
                                </div>
                                <div className='m-4'>
                                    <label className='block mb-2 text-sm font-medium text-gray-900'>Date</label>
                                    <input
                                        type='date'
                                        name='date'
                                        id='date'
                                        pattern='\d{4}-\d{2}-\d{2}'
                                        value={eventInfo.date}
                                        onChange={changeHandler}
                                        className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                        placeholder=''
                                        required=''
                                    />
                                </div>
                                <div className='m-4'>
                                    <label className='block mb-2 text-sm font-medium text-gray-900'>Anime</label>
                                    <input 
                                        type="text" 
                                        value={searchTerm} 
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
                                        value={eventInfo.organiser}
                                        onChange={changeHandler}
                                        className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                        placeholder=''
                                        required=''
                                    />
                                </div>
                                <div className='m-4'>
                                    <label className='block mb-2 text-sm font-medium text-gray-900'>Price</label>
                                    <input
                                        name='price'
                                        id='price'
                                        value={eventInfo.price}
                                        onChange={changeHandler}
                                        className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                        placeholder=''
                                        required=''
                                    />
                                    <button
                                    type='submit'
                                    className='text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4 duration-300'>
                                    Create Event
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