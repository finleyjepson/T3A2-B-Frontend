import React, { useEffect, useState } from 'react'

export default function UserList({ users }) {

	async function addAdmin(event){

		await fetch(`http://localhost:4000/users/${event.target.value}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				isAdmin: true
			})
		})
		.then(response => response.json())
		.then(data => console.log(data))
	}

	async function removeAdmin(event){

		await fetch(`http://localhost:4000/users/${event.target.value}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				isAdmin: false
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
				<button className="bg-green-600 py-1 px-2 rounded-md text-white" value={ user._id } onClick={ addAdmin }>+ Admin</button>
				</div>
				<div className="flex justify-between py-1">
				<p> Organiser: {user.isOrganiser.toString()}</p>
				<button className="bg-red-600 py-1 px-2 rounded-md text-white" value={ user._id } onClick={ removeAdmin }>- Admin</button>
				</div>
				<p> Admin: {user.isAdmin.toString()}</p>

				</li>
			))}
			</ul>
		</>
	)
	}
