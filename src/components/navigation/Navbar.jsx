import { NavLink } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Navbar({ user, isLoggedIn }) {
    const [isLoggedInState, setIsLoggedInState] = useState()
    const [userState, setUserState] = useState({})
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setIsLoggedInState(isLoggedIn)
        setUserState(user)
    }, [isLoggedIn, user])

    const handleContactClick = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            {/* Navigation bar */}
            <nav className=''>
                <div className='px-5'>
                    <div className='flex items-center'>
                        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 w-full">
                            <ul className='flex flex-wrap -mb-px'>
                                <li className="me-2">
                                    <NavLink exact to='/' style={({ isActive }) => ({ borderColor: isActive ? '#4f46e5' : '#6b7280', color: isActive ? '#4f46e5' : '#6b7280', borderStyle: isActive ? '' : '' })} className='inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 animate-in fade-in duration-2s'>Home</NavLink>
                                </li>
                                <li className="me-2">
                                    <NavLink to='/events' className='inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 animate-in fade-in duration-2s'>Events</NavLink>
                                </li>
                                {/* <li className="me-2">
                                    <a href='#' className='inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 animate-in fade-in duration-2s'>About</a>
                                </li> */}
                                <li className="me-2">
                                    <button onClick={handleContactClick} className='inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 animate-in fade-in duration-2s'>Contact Us</button>
                                </li>

                                {(isLoggedIn && userState.isAdmin) && (
                                    <li className="me-2">
                                        <NavLink to='/users' className='inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 animate-in fade-in duration-2s'>Users</NavLink>
                                    </li>
                                )}
                                {(isLoggedIn && (userState.isAdmin || userState.isOrganiser)) && (
                                    <li className="me-2">
                                        <NavLink to='/events/new' className='inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 animate-in fade-in duration-2s'>Create Event</NavLink>
                                    </li>
                                )}
                                {isLoggedIn && (
                                    <li className="me-2">
                                        <NavLink to='/profile' className='inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 animate-in fade-in duration-2s'>Profile</NavLink>
                                    </li>
                                )}
                            </ul>
                        </div>
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
