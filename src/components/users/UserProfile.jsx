import { useEffect, useState } from 'react'
import axios from 'axios'
import defaultProfilePicture from '../../assets/default-placeholder.png'

const UserProfilePage = ({ user, setUser }) => {
    const [profilePicture, setProfilePicture] = useState(null) // State for profile picture
    const [favouriteAnime, setFavouriteAnime] = useState([]) // State for favourite anime list
    const [favouriteCharacters, setFavouriteCharacters] = useState([]) // State for favourite characters list
    const [isDataFetched, setIsDataFetched] = useState(false)
    const [showAnimeMaxLimitMessage, setShowAnimeMaxLimitMessage] = useState(false) // State for showing anime max limit message
    const [showCharacterMaxLimitMessage, setShowCharacterMaxLimitMessage] = useState(false) // State for showing character max limit message
    const [upComingEvents, setUpComingEvents] = useState([]) // State for upcoming events

    // Function to upload profile picture
    const uploadProfilePicture = async (event) => {
        const file = event.target.elements.image.files[0]
        const formData = new FormData()
        formData.append('image', file)

        // Send the image to the server
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/images/pfp`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                }
            })
            console.log('Profile picture uploaded:', response.data)
        } catch (error) {
            console.error('Error uploading profile picture:', error)
        }
    }

    // Function to handle profile picture change
    const handleProfilePictureChange = async (event) => {
        event.preventDefault()
        await uploadProfilePicture(event)
        const updateUser = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/users/${user._id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        })
        setUser(updateUser.data.user)
    }

    // Fetch Profile picture
    useEffect(() => {
        setProfilePicture(user.pictureUrl)
    }, [user])

    useEffect(() => {
        getUpComingEvents(user.rsvp)
    }, [user.rsvp])

    // Fetch favourite characters
    useEffect(() => {        
        // Check if user and user ID are available. isDataFetched prevents constant GET requests 
        if (user && user._id && !isDataFetched) {
            // Fetch user's data including favourite characters/anime when component mounts
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/users/${user._id}`, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
                        }
                    })

                    // Extract user data from the response
                    const userData = response.data.user

                    // Update the user state with the fetched user data
                    setUser(userData)
                    // Check if the user data includes favourite characters
                    if (userData.characters) { 
                        setFavouriteCharacters(userData.characters) // If favourite characters exist, update the local state with them
                    }
                    // Check if the user data includes favourite anime
                    if (userData.animes) { 
                        setFavouriteAnime(userData.animes) // If favourite anime exist, update the local state with them
                    }
                    setIsDataFetched(true)
                } catch (error) {
                    console.error('Error fetching user data:', error)
                }
            }
            fetchData()
        }
    }, [user, setUser, isDataFetched])
    // }, [])

    // Function to handle adding a favourite anime
    const handleAddFavouriteAnime = async (event) => {
        event.preventDefault()
        const anime = event.target.elements.animes.value

        // Check if the number of favourite anime is less than 5
        if (favouriteAnime.length < 5) {
            // Update local state with the new anime
            const updatedAnimes = [...favouriteAnime, anime]
            try {
                // Update the backend with the complete list of animes
                await updateUserFavouriteAnimes(updatedAnimes)
                // Update the local state with the new complete list of animes
                setFavouriteAnime(updatedAnimes)
            } catch (error) {
                console.error('Error updating favourite animes:', error)
            }
        } else {
            // Show max limit message if the limit is reached
            setShowAnimeMaxLimitMessage(true)
        }

        event.target.reset()
    }

    // Function to update user's favourite animes on the backend
    const updateUserFavouriteAnimes = async (animes) => {
        const accessToken = sessionStorage.getItem('accessToken')
    
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_API_URL}/users/${user._id}/animes`,
                { animes }, // Send updated favourite animes to the backend
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
    
            if (response && response.data && response.data.user) {
                setUser(response.data.user)
            } else {
                // console.error('Error updating favourite animes: Response or response data is undefined')
            }
        } catch (error) {
            console.error('Error updating favourite animes:', error)
            throw new Error(error.response ? error.response.data.message : 'Unknown error occurred')
        }
    }

    // Function to handle adding a favourite character
    const handleAddFavouriteCharacter = async (event) => {
        event.preventDefault()
        const character = event.target.elements.character.value

        // Check if the number of favourite characters is less than 5
        if (favouriteCharacters.length < 5) {
            // Update local state with the new character
            const updatedCharacters = [...favouriteCharacters, character]
            try {
                // Update the backend with the complete list of characters
                await updateUserFavouriteCharacters(updatedCharacters)
                // Update the local state with the new complete list of characters
                setFavouriteCharacters(updatedCharacters)
            } catch (error) {
                console.error('Error updating favourite characters:', error)
            }
        } else {
            // Show max limit message if the limit is reached
            setShowCharacterMaxLimitMessage(true)
        }

        event.target.reset()
    }
    
    // Function to update user's favourite characters on the backend
    const updateUserFavouriteCharacters = async (characters) => {
        const accessToken = sessionStorage.getItem('accessToken')
    
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_API_URL}/users/${user._id}/characters`,
                { characters }, // Send updated favourite characters to the backend
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
    
            if (response && response.data && response.data.user) {
                setUser(response.data.user)
            } else {
                // console.error('Error updating favourite characters: Response or response data is undefined')
            }
        } catch (error) {
            console.error('Error updating favourite characters:', error)
            throw new Error(error.response ? error.response.data.message : 'Unknown error occurred')
        }
    }
    
    // Function to handle removing a favourite anime
    const handleRemoveFavoriteAnime = async (index) => {
        const updatedAnimes = [...favouriteAnime]
        updatedAnimes.splice(index, 1)
        try {
            // Update the backend with the updated list of animes
            await updateUserFavouriteAnimes(updatedAnimes)
            // Update the local state with the updated list of animes
            setFavouriteAnime(updatedAnimes)
            // Hide max limit message if it was shown
            setShowAnimeMaxLimitMessage(false)            
        } catch (error) {
            console.error('Error removing favourite anime:', error)
        }
    }

    // Function to handle removing a favourite character
    const handleRemoveFavoriteCharacter = async (index) => {
        const updatedCharacters = [...favouriteCharacters]
        updatedCharacters.splice(index, 1)
        try {
            // Update the backend with the updated list of characters
            await updateUserFavouriteCharacters(updatedCharacters)
            // Update the local state with the updated list of characters
            setFavouriteCharacters(updatedCharacters)
            // Hide max limit message if it was shown
            setShowCharacterMaxLimitMessage(false)
        } catch (error) {
            console.error('Error removing favourite character:', error)
        }
    }

    const getUpComingEvents = async (eventList) => {
        const events = []
        if (eventList && typeof eventList[Symbol.iterator] === 'function') {
            for (let eventItem of eventList) {
                const eventFetched = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/events/${eventItem}`)
                events.push(eventFetched.data)
            }
        }
        console.log('Events:', events)
        setUpComingEvents(events.map(event => (
            <div key={event._id}>
                <h3>{event.title}</h3>
                {/* Render other event details */}
            </div>
        )))
    }

    return (
        <>
            {!user ? (
                <div>
                    <h2>You are not signed in!</h2>
                </div>
            ):(
                <div className="container mx-auto py-6">
                    <div className="grid grid-cols-10 gap-6">
                        
                        {/* Display the username if user data is available */}
                        {user && (
                            <div className="col-span-10 text-center">
                                <h1 className="text-2xl font-bold mb-4 animate-in fade-in duration-500">Welcome, {user.username}!</h1>
                            </div>
                        )}
        
                        {/* Profile Picture Box */}
                        <div className="bg-indigo-100 rounded-lg overflow-hidden col-span-2 animate-in slide-in-from-left fade-in duration-1s">
                            <form onSubmit={handleProfilePictureChange}>
                            <div className="p-6">
                                <h2 className="text-lg font-semibold mb-4">Profile Picture</h2>
                                <div className="flex items-center justify-center bg-gray-200 h-[200px] w-[200px]">
                                    {/* If profile picture is not null, show the profile picture */}
                                    {profilePicture ? (
                                        // Need to figure out how this links with the AWS image host
                                        <img src={profilePicture} alt="Profile Picture" className="h-full object-cover" />
                                        // If null, show 'no profile picture'
                                    ) : (
                                        <img src={defaultProfilePicture} alt="Profile Picture" className="h-full object-cover" />
                                    )}
                                </div>
                                <input type="file" accept="image/*" name='image' className="mt-4" />
                            </div>
                            <div className='flex justify-center p-2'>
                                <button type='submit' className='bg-indigo-400 hover:bg-indigo-300 text-white font-semibold py-2 px-4 rounded'>Save</button>
                            </div>
                            </form>
                        </div>
        
                        {/* My Upcoming Events Box */}
                        <div className="bg-indigo-900 rounded-lg overflow-hidden col-span-8 animate-in slide-in-from-right fade-in duration-1s">
                            <div className="p-6">
                                <h2 className="text-lg text-white font-semibold mb-4">My Upcoming Events</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {upComingEvents}
                                </div>
                            </div>
                        </div>
        
                        {/* My Favourite Anime Box */}
                        <div className="bg-indigo-900 rounded-lg overflow-hidden col-span-4 animate-in slide-in-from-left fade-in duration-1s">
                            <div className="p-6">
                                <h2 className="text-lg text-white font-semibold mb-4">Top 5 Anime</h2>
                                <form className='flex' onSubmit={handleAddFavouriteAnime}>
                                    <input type="text" name="animes" placeholder="Enter favourite anime" className="w-full border rounded py-2 px-3 mr-2" />
                                    <button type="submit" className="bg-indigo-400 hover:bg-indigo-300 text-white font-semibold py-2 px-4 rounded">
                                        Add
                                    </button>
                                </form>
                                {/* Render max limit message if reached */}
                                {showAnimeMaxLimitMessage && <p className="text-red-300 text-sm mt-2">You can only set 5 favourite anime. Remove an entry and try again.</p>}                                
                                <ul className="mt-4">
                                {favouriteAnime.map((anime, index) => (
                                    <div key={index} className="flex items-center text-white">
                                        <li>{anime}</li>
                                        <button onClick={() => handleRemoveFavoriteAnime(index)} className="ml-2 w-4 h-4 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600">
                                            <span className="text-xs font-bold">-</span>
                                        </button>
                                    </div>
                                ))}
                                </ul>
                            </div>
                        </div>
        
                        {/* My Favourite Characters Box */}
                        <div className="bg-indigo-900 rounded-lg overflow-hidden col-span-6 animate-in slide-in-from-right fade-in duration-1s">
                            <div className="p-6">
                                <h2 className="text-lg text-white font-semibold mb-4">Top 5 Favourite Characters</h2>
                                <form className='flex' onSubmit={handleAddFavouriteCharacter}>
                                    <input type="text" name="character" placeholder="Enter favourite character" className="w-full border rounded py-2 px-3 mr-2" />
                                    <button type="submit" className="bg-indigo-400 hover:bg-indigo-300 text-white font-semibold py-1 px-4 rounded">
                                        Add
                                    </button>
                                </form>
                                {/* Render max limit message if reached */}
                                {showCharacterMaxLimitMessage && <p className="text-red-300 text-sm mt-2">You can only set 5 favourite characters. Remove an entry and try again.</p>}                    
                                <ul className="mt-4">
                                {favouriteCharacters.map((character, index) => (
                                    <div key={index} className="flex items-center text-white">
                                        <li>{character}</li>
                                        <button onClick={() => handleRemoveFavoriteCharacter(index)} className="ml-2 w-4 h-4 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600">
                                            <span className="text-xs font-bold">-</span>
                                        </button>
                                    </div>
                                ))}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserProfilePage
