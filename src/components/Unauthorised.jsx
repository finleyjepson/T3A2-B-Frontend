import React from 'react'
import { Link } from 'react-router-dom'

export default function Unauthorised() {
  return (
    <div className="p-4">
      <h1>Oops, looks like you made a wrong turn!</h1>
      <button className="text-white py-2 px-4 my-2 rounded-full transition ease-in-out delay-100 bg-blue-500 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-400 duration-200">
        <Link to="/">
        Take me home
        </Link>
      </button>
    </div>
  )
}
