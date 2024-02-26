import { Link } from "react-router-dom"

export default function Navbar() {
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
                                <a href='#' className='text-gray-900 dark:text-white hover:underline animate-in fade-in duration-2s'>
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <Link to='/users'>
                                    <p className='text-gray-900 dark:text-white hover:underline animate-in fade-in duration-2s'>Users</p>
                                </Link>
                            </li>
                            <li>
                                <Link to='/events/new'>
                                    <p className='text-gray-900 dark:text-white hover:underline animate-in fade-in duration-2s'>Create Event</p>
                                </Link>
                            </li>
                            <li>
                                <Link to='/profile'>
                                    <p className='text-gray-900 dark:text-white hover:underline animate-in fade-in duration-2s'>Profile</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
