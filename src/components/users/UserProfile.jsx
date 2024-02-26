import React, { useEffect, useState } from 'react'
import axios from 'axios' // Used for making HTTP requests

const UserProfilePage = () => {
    const [user, setUser] = useState(null) // State for user data
    const [userId, setUserId] = useState(null) // State for userId
    const [profilePicture, setProfilePicture] = useState(null) // State for profile picture
    const [favoriteAnime, setFavoriteAnime] = useState([]) // State for favorite anime list
    const [favoriteCharacters, setFavoriteCharacters] = useState([]) // State for favorite characters list

    useEffect(() => {
        // Retrieve userId from sessionStorage when the component mounts
        const storedUser = JSON.parse(sessionStorage.getItem('user'))
        const storedAccessToken = sessionStorage.getItem('accessToken')
        console.log('Stored user:', storedUser)
        console.log('Stored accessToken:', storedAccessToken)
        if (storedUser) {
            setUserId(storedUser._id)
        }
        console.log('Stored user ID:', storedUser._id)
    }, [])
    
    useEffect(() => {
        // Call fetchUserData only if userId is set
        if (userId) {
            fetchUserData(userId)
        }
    }, [userId])

    // Function to fetch user data from the backend
    const fetchUserData = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:4000/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`, // Assuming token is stored in sessionStorage
                },
            })
            console.log('User Data:', response.data)
            setUser(response.data.user)
            // setFavoriteAnime(response.data.user.animes)
            // setFavoriteCharacters(response.data.user.characters)
        } catch (error) {
            console.error('Error fetching user data:', error)
        }
    }

    // Function to handle profile picture change
    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0] // Index 0 for first file selected
        setProfilePicture(file)
    }

    // Function to handle adding a favorite anime
    const handleAddFavoriteAnime = (event) => {
        event.preventDefault()
        const anime = event.target.elements.anime.value
        setFavoriteAnime(prevState => [...prevState, anime])
        event.target.reset()
    }

    // Function to handle adding a favorite character
    const handleAddFavoriteCharacter = (event) => {
        event.preventDefault()
        const character = event.target.elements.character.value
        setFavoriteCharacters(prevState => [...prevState, character])
        event.target.reset()
    };

    return (
        <div className="container mx-auto py-6">
            <div className="grid grid-cols-10 gap-6">
                
                {/* Display the username if user data is available */}
                {user && (
                    <div className="col-span-10 text-center">
                        <h1 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h1>
                    </div>
                )}

                {/* Profile Picture Box */}
                <div className="bg-indigo-100 rounded-lg overflow-hidden col-span-2">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Profile Picture</h2>
                        <div className="flex items-center justify-center bg-gray-200 h-40">
                            {/* If profile picture is not null, show the profile picture */}
                            {profilePicture ? (
                                // Need to figure out how this links with the AWS image host
                                <img src={URL.createObjectURL(profilePicture)} alt="Profile Picture" className="h-full object-cover" />
                                // If null, show 'no profile picture'
                            ) : (
                                <span>No profile picture</span>
                            )}
                        </div>
                        <input type="file" accept="image/*" onChange={handleProfilePictureChange} className="mt-4" />
                    </div>
                </div>

                {/* My Upcoming Events Box */}
                <div className="bg-indigo-900 rounded-lg overflow-hidden col-span-8">
                    <div className="p-6">
                        <h2 className="text-lg text-white font-semibold mb-4">My Upcoming Events</h2>
                        <p className="text-white/50">List your upcoming events here...</p>
                    </div>
                </div>

                {/* My Favourite Anime Box */}
                <div className="bg-indigo-900 rounded-lg overflow-hidden col-span-4">
                    <div className="p-6">
                        <h2 className="text-lg text-white font-semibold mb-4">My Favourite Anime</h2>
                        <form onSubmit={handleAddFavoriteAnime}>
                            <input type="text" name="anime" placeholder="Enter favourite anime" className="w-full border rounded py-2 px-3 mb-2" />
                            <button type="submit" className="bg-indigo-400 hover:bg-indigo-300 text-white font-semibold py-2 px-4 rounded">
                                Add
                            </button>
                        </form>
                        <ul className="mt-4">
                            {favoriteAnime.map((anime, index) => (
                                <li key={index}>{anime}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* My Favourite Characters Box */}
                <div className="bg-indigo-900 rounded-lg overflow-hidden col-span-6">
                    <div className="p-6">
                        <h2 className="text-lg text-white font-semibold mb-4">My Favourite Characters</h2>
                        <form onSubmit={handleAddFavoriteCharacter}>
                            <input type="text" name="character" placeholder="Enter favourite character" className="w-full border rounded py-2 px-3 mb-2" />
                            <button type="submit" className="bg-indigo-400 hover:bg-indigo-300 text-white font-semibold py-2 px-4 rounded">
                                Add
                            </button>
                        </form>
                        <ul className="mt-4">
                            {favoriteCharacters.map((character, index) => (
                                <li key={index}>{character}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfilePage;
