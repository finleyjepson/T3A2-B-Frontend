import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Navbar({ user, isLoggedin }) {
    const [isLoggedInState, setIsLoggedInState] = useState()
    const [userState, setUserState] = useState({})
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setIsLoggedInState(isLoggedin)
        setUserState(user)
    }, [isLoggedin, user])

    const handleContactClick = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            {/* Navigation bar */}
            <nav className='bg-gray-50 dark:bg-gray-800'>
                <div className='px-5 py-3'>
                    <div className='flex items-center'>
                        <ul className='flex flex-row font-medium mt-0 space-x-8 text-sm'>
                            <li>
                                {/* aria-current="page" is for screen readers to comprehend the current page as the Home page */}
                                <Link to='/'>
                                    <p className='text-gray-900 dark:text-white hover:underline animate-in fade-in duration-2s'>Home</p>
                                </Link>
                                {/* <a href="#" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</a> */}
                            </li>
                            <li>
                                <Link to='/events'>
                                    <p className='text-gray-900 dark:text-white hover:underline animate-in fade-in duration-2s'>Events</p>
                                </Link>
                            </li>
                            <li>
                                <a href='#' className='text-gray-900 dark:text-white hover:underline animate-in fade-in duration-2s'>
                                    About
                                </a>
                            </li>
                            <li>
                                <button onClick={handleContactClick} className='text-gray-900 dark:text-white hover:underline animate-in fade-in duration-2s'>
                                    Contact Us
                                </button>
                            </li>
                            {(isLoggedin && userState.isAdmin) && (
                                <li>
                                    <Link to='/users'>
                                        <p className='text-gray-900 dark:text-white hover:underline animate-in fade-in duration-2s'>Users</p>
                                    </Link>
                                </li>
                            )}
                            {(isLoggedin && (userState.isAdmin || userState.isOrganiser)) && (
                                <li>
                                    <Link to='/events/new'>
                                        <p className='text-gray-900 dark:text-white hover:underline animate-in fade-in duration-2s'>Create Event</p>
                                    </Link>
                                </li>
                            )}
                            {isLoggedin && (
                                <li>
                                    <Link to='/profile'>
                                        <p className='text-gray-900 dark:text-white hover:underline animate-in fade-in duration-2s'>Profile</p>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Contact Modal */}
                <div className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${showModal ? "" : "opacity-0 pointer-events-none"}`}>
                    <div className="absolute inset-0 bg-black opacity-75" onClick={handleCloseModal}></div>
                    <div className="relative bg-white rounded-lg p-8 mx-4 transform transition-all duration-300 opacity-100 scale-100">
                        {/* <p className="text-xs"><button className="absolute top-4 right-4 text-gray-600" onClick={handleCloseModal}>Close</button></p> */}
                        <h3 className="mb-4 text-xl font-semibold text-gray-900">We'd love to hear from you</h3>
                        <p className="mb-4 text-gray-600">Have any feedback or questions? Need help with an event?<br />Feel free to email us at:</p>
                        <p className="mb-4 text-primary-500 font-medium">email@example.com</p>
                    </div>
                </div>
        </>
    )
}
