import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'

export default function UserList({ users, getUsers }) {
 
    const navigate = useNavigate()

    // Toggle organiser (+Organiser or -Organiser)
    async function toggleOrganiser(userId, isOrganiser) {
        try {
            // User token handling
            const accessToken = sessionStorage.getItem("accessToken") // Retrieve the session's access token
            if (!accessToken) {
                throw new Error("Access token not found. Please login.")
            }
            await axiosInstance.put(`/users/toggle/${userId}`, {
                isOrganiser: isOrganiser
            })
            .then((response) => response.data)
            .then(() => getUsers())
            // Catch response:
        } catch (error) {
            console.error("Problem updating user", error.message)
        }
    }

    // Delete user function
    async function deleteUser(userId) {
        try {
            // User token handling
            const accessToken = sessionStorage.getItem("accessToken") // Retrieve the session's access token
            if (!accessToken) {
                throw new Error("Access token not found. Please login.")
            }
            await axiosInstance.delete(`/users/${userId}`)
            
            navigate('/users')
            getUsers()
            // Catch response:
        } catch (error) {
            console.error("Problem deleting user", error.message)
        }
    }

    return (
        <>
            {/* List of users */}
            <ul>
                {users.map((user, index) => (
                    <li key={index} className='px-4 py-2 odd:bg-gray-200 flex flex-row justify-between'>
                        <div className='flex flex-col'>
                            <p>ObjectId: {user._id}</p>
                            <p>Username: {user.username}</p>
                            <p> Organiser: {user.isOrganiser.toString()}</p>
                            <p> Admin: {user.isAdmin.toString()}</p>
                        </div>
                        <div className='order-last inline-flex justify-items-end'>
                            <button className='bg-red-600 hover:bg-red-500 mb-2 py-1 px-2 rounded-md text-white h-8 mx-2' onClick={() => deleteUser(user._id)}>
                                - Delete
                            </button>
                            {/* Ternary operator for whether user is organiser vs not. Only show one button, not both. */}
                            {user.isOrganiser ? (
                                // <button className="bg-green-600 py-1 px-2 rounded-md text-white" value={ user._id } onClick={ addOrganiser }>+ Organiser</button>

                                // If the user is NOT an organiser...
                                <div className="">
                                <button className='bg-red-600 py-1 hover:bg-red-500 px-2 rounded-md text-white h-8' onClick={() => toggleOrganiser(user._id, false)}>
                                    - Organiser
                                </button>

                                </div>
                            ) : (
                                // If the user IS an organiser...
                                <button className='bg-green-600 hover:bg-green-500 py-1 px-2 rounded-md text-white h-8' onClick={() => toggleOrganiser(user._id, true)}>
                                    + Organiser
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}
