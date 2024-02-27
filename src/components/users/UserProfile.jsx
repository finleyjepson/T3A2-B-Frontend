import { useEffect, useState } from 'react'
import axios from 'axios'

const UserProfilePage = ({ user, setUser }) => {
    const [profilePicture, setProfilePicture] = useState(null) // State for profile picture
    const [favoriteAnime, setFavoriteAnime] = useState([]) // State for favorite anime list
    const [favoriteCharacters, setFavoriteCharacters] = useState(user.favoriteCharacters || []); // State for favorite characters list

    const uploadProfilePicture = async (event) => {
        const file = event.target.elements.image.files[0]
        const formData = new FormData()
        formData.append('image', file)

        // Send the image to the server
        try {
            const response = await axios.post('http://localhost:4000/images/pfp', formData, {
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
        const updateUser = await axios.get(`http://localhost:4000/users/${user._id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        })
        setUser(updateUser.data.user)
    }

    useEffect(() => {
        setProfilePicture(user.pictureUrl)
    }, [user])

    // Function to handle adding a favorite anime
    const handleAddFavoriteAnime = (event) => {
        event.preventDefault()
        const anime = event.target.elements.anime.value
        setFavoriteAnime(prevState => [...prevState, anime])
        event.target.reset()
    }

    // Function to handle adding a favorite character
    const handleAddFavoriteCharacter = async (event) => {
        event.preventDefault();
        const character = event.target.elements.character.value;

        try {
            const updatedUser = await updateUserFavoriteCharacters([...favoriteCharacters, character]);
            setFavoriteCharacters(updatedUser.favoriteCharacters);
        } catch (error) {
            console.error('Error updating favorite characters:', error);
        }

        event.target.reset();
    };

    // Function to update favorite characters via API
    const updateUserFavoriteCharacters = async (characters) => {
        // const response = await axios.put(import.meta.env.VITE_BACKEND_API_URL+`/users/${user._id}/characters`, { favoriteCharacters: characters });
        const response = await axios.put(`http://localhost:4000/users/${user._id}/characters`, characters);
        return response.data.user
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
                                <h1 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h1>
                            </div>
                        )}
        
                        {/* Profile Picture Box */}
                        <div className="bg-indigo-100 rounded-lg overflow-hidden col-span-2">
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
            )}
        </>
    )
}

export default UserProfilePage
