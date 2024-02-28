import { useEffect, useState } from 'react'
import axios from 'axios'

const UserProfilePage = ({ user, setUser }) => {
    const [profilePicture, setProfilePicture] = useState(null) // State for profile picture
    const [favouriteAnime, setFavouriteAnime] = useState([]) // State for favourite anime list
    const [favouriteCharacters, setFavouriteCharacters] = useState([]) // State for favourite characters list
    const [isDataFetched, setIsDataFetched] = useState(false);

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

    // Fetch favourite characters
    useEffect(() => {
        console.log("useEffect triggered");
        console.log("User:", user);
        console.log("Session token:", sessionStorage.getItem('accessToken'));
        
        // Check if user and user ID are available. isDataFetched prevents constant GET requests 
        if (user && user._id && !isDataFetched) {
            // Fetch user's data including favourite characters when component mounts
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/users/${user._id}`, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
                        }
                    })
                    console.log("Response:", response.data);
                    // Extract user data from the response
                    const userData = response.data.user
                    console.log("User data:", userData);
                    // Update the user state with the fetched user data
                    setUser(userData)
                    // Check if the user data includes favourite characters
                    if (userData.characters) { 
                        console.log("Favourite characters:", userData.characters);
                        setFavouriteCharacters(userData.characters) // If favourite characters exist, update the local state with them
                    }
                    setIsDataFetched(true);
                } catch (error) {
                    console.error('Error fetching user data:', error)
                }
            };
            fetchData()
        }
    }, [user, setUser, isDataFetched]);
    // }, [])

    // Function to handle adding a favourite anime
    const handleAddFavouriteAnime = (event) => {
        event.preventDefault()
        const anime = event.target.elements.anime.value
        setFavouriteAnime(prevState => [...prevState, anime])
        event.target.reset()
    }

    // Function to handle adding a favourite character
    const handleAddFavouriteCharacter = async (event) => {
        event.preventDefault()
        const character = event.target.elements.character.value
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
        event.target.reset()
    }
    
    // Function to update user's favourite characters on the backend
    const updateUserFavouriteCharacters = async (characters) => {
        const accessToken = sessionStorage.getItem('accessToken');
    
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_API_URL}/users/${user._id}/characters`,
                { characters }, // Send updated favourite characters to the backend
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
    
            console.log('Update characters response:', response); // Log the response
    
            if (response && response.data && response.data.user) {
                setUser(response.data.user);
            } else {
                console.error('Error updating favourite characters: Response or response data is undefined');
            }
        } catch (error) {
            console.error('Error updating favourite characters:', error);
            throw new Error(error.response ? error.response.data.message : 'Unknown error occurred');
        }
    };
    
    
    

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
                                <div className="flex items-center justify-center bg-gray-200 h-40">
                                    {/* If profile picture is not null, show the profile picture */}
                                    {profilePicture ? (
                                        // Need to figure out how this links with the AWS image host
                                        <img src={profilePicture} alt="Profile Picture" className="h-full object-cover" />
                                        // If null, show 'no profile picture'
                                    ) : (
                                        <span>No profile picture</span>
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
                                <p className="text-white/50">List your upcoming events here...</p>
                            </div>
                        </div>
        
                        {/* My Favourite Anime Box */}
                        <div className="bg-indigo-900 rounded-lg overflow-hidden col-span-4 animate-in slide-in-from-left fade-in duration-1s">
                            <div className="p-6">
                                <h2 className="text-lg text-white font-semibold mb-4">My Favourite Anime</h2>
                                <form onSubmit={handleAddFavouriteAnime}>
                                    <input type="text" name="anime" placeholder="Enter favourite anime" className="w-full border rounded py-2 px-3 mb-2" />
                                    <button type="submit" className="bg-indigo-400 hover:bg-indigo-300 text-white font-semibold py-2 px-4 rounded">
                                        Add
                                    </button>
                                </form>
                                <ul className="mt-4">
                                    {favouriteAnime.map((animes, index) => (
                                        <li key={index}>{animes}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
        
                        {/* My Favourite Characters Box */}
                        <div className="bg-indigo-900 rounded-lg overflow-hidden col-span-6 animate-in slide-in-from-right fade-in duration-1s">
                            <div className="p-6">
                                <h2 className="text-lg text-white font-semibold mb-4">My Favourite Characters</h2>
                                <form onSubmit={handleAddFavouriteCharacter}>
                                    <input type="text" name="character" placeholder="Enter favourite character" className="w-full border rounded py-2 px-3 mb-2" />
                                    <button type="submit" className="bg-indigo-400 hover:bg-indigo-300 text-white font-semibold py-2 px-4 rounded">
                                        Add
                                    </button>
                                </form>
                                <ul className="mt-4">
                                    {favouriteCharacters.map((characters, index) => (
                                        <li key={index}>{characters}</li>
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
