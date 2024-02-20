import React from 'react'
import { Link } from 'react-router-dom' 

export default function Navbar() {
  return (
    <>
    {/* Change className="p-4" to increase padding */}
        <header className="p-4 flex items-center justify-between">
            {/* Adding placeholder logo from Heroicons.com */}
            <a href="" className="flex items-center gap-1"> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 fill-yellow-500">
                    <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
                </svg>
                {/* Adding placeholder app name */}
                <span className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-400 to-pink-300 inline-block text-transparent bg-clip-text">AnimeScreen</span>
            </a>
            {/* Login / Sign up buttons */}
            <div className="flex space-x-4 items-center">
                <Link to="/login" className="text-black text-sm">Login</Link>
                <Link to="/signup" className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm">Sign up</Link>
            </div>
      </header>
      {/* Navigation bar */}
      <nav className="bg-gray-50 dark:bg-gray-800">
          <div className="px-5 py-3">
              <div className="flex items-center">
                  <ul className="flex flex-row font-medium mt-0 space-x-8 text-sm">
                      <li>
                          {/* aria-current="page" is for screen readers to comprehend the current page as the Home page */}
                          <a href="#" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</a>
                      </li>
                      <li>
                            <Link to="/events" >
                                <p className="text-gray-900 dark:text-white hover:underline">Events</p>
                            </Link>
                          {/* <a href="#" className="text-gray-900 dark:text-white hover:underline">Events</a> */}
                      </li>
                      <li>
                          <a href="#" className="text-gray-900 dark:text-white hover:underline">About</a>
                      </li>
                      <li>
                          <a href="#" className="text-gray-900 dark:text-white hover:underline">Contact Us</a>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
  </>
  )
}