import React, { useEffect, useState } from 'react'

export default function UserList({ users }) {

	async function addOrganiser(event){

		await fetch(`http://localhost:4000/users/toggle/${event.target.value}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				isOrganiser: true
			})
		})
		.then(response => response.json())
		.then(data => console.log(data))
	}

	async function removeOrganiser(event){

		await fetch(`http://localhost:4000/users/toggle/${event.target.value}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				isOrganiser: false
			})
		})
		.then(response => response.json())
		.then(data => console.log(data))
	}

	return (
		<>
			<ul>
			{users.map((user, index) => (
				<li key={index} className="px-4 py-2 odd:bg-gray-200">
				<div className="flex justify-between">
				<p>{user.username}</p>
				<p>{user._id}</p>
				<button className="bg-green-600 py-1 px-2 rounded-md text-white" value={ user._id } onClick={ addOrganiser }>+ Organiser</button>
				</div>
				<div className="flex justify-between py-1">
				<p> Organiser: {user.isOrganiser.toString()}</p>
				<button className="bg-red-600 py-1 px-2 rounded-md text-white" value={ user._id } onClick={ removeOrganiser }>- Organiser</button>
				</div>
				<p> Admin: {user.isAdmin.toString()}</p>

				</li>
			))}
			</ul>
		</>
	)
	}
