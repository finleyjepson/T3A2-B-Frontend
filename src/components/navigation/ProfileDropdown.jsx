import { useState } from 'react'
import { Link } from 'react-router-dom'

function ProfileDropdown({ isLoggedIn, handleLogout, user, username }) {
    console.log("Navbar username:", user.username)
    // State to track visibility of profile dropdown menu
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // Function to toggle the profile dropdown menu
    const toggleMenu = () => {
        console.log("Toggling menu")
        console.log("isMenuOpen:", isMenuOpen)
        setIsMenuOpen(!isMenuOpen)
    }

    // Handle the logout function
    const handleSignOut = () => {
        handleLogout()
    }

    return (
        <>
           {/* Change className="p-4" to increase padding */}
           <header className='p-4 flex items-center justify-between'>
                {/* Adding placeholder logo from Heroicons.com */}
                <Link to='/' className='flex items-center gap-1'>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-10 h-10 fill-yellow-500'>
                        <path
                            fillRule='evenodd'
                            d='M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z'
                            clipRule='evenodd'
                        />
                    </svg>
                    {/* Adding placeholder app name */}
                    <span className='text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-400 to-pink-300 inline-block text-transparent bg-clip-text'>AnimeScreen</span>
                </Link>

                {/* Profile/Logout : Login/Signup, based on login state */}
                {isLoggedIn ? (
                    <div className='flex items-center space-x-3 md:space-x-0 rtl:space-x-reverse relative'>
                        {/* Profile photo button */}
                        <button
                            type='button'
                            className='flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300'
                            id='user-menu-button'
                            aria-expanded={isMenuOpen}
                            onClick={toggleMenu}
                            data-dropdown-toggle='user-dropdown'
                            data-dropdown-placement='bottom'>
                            <span className='sr-only'>Open user menu</span>
                            <img className='w-8 h-8 rounded-full' src='https://emoji.beeimg.com/🍔/apple' alt='user photo' />
                        </button>
                        {/* Dropdown menu */}
                        <div
                            className={`absolute top-full right-0 mt-2 z-50 ${isMenuOpen ? "" : "hidden"} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow`}
                            id='user-dropdown'>
                            <div className='px-4 py-3'>
                                <span className='block text-sm text-gray-500 truncate dark:text-gray-400'>{username}</span>
                            </div>
                            <ul className='py-2' aria-labelledby='user-menu-button'>
                                <li>
                                    <a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 '>
                                        Settings
                                    </a>
                                </li>
                                <li>
                                    <button type='button' onClick={handleSignOut} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                        Sign out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    // If not logged in...
                    // Login / Sign up button
                    <div className='flex space-x-4 items-center'>
                        <Link to='/login' className='text-black text-sm'>
                            Login
                        </Link>
                        <Link to='/signup' className='bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm'>
                            Sign up
                        </Link>
                    </div>
                )}
            </header>
        </>
    )
}

export default ProfileDropdown