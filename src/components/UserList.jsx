import React, { useEffect, useState } from 'react'

export default function UserList() {

	const [users, setUsers] = useState([])

	useEffect(() => {
	async function getUsers() {
		let response = await fetch("http://localhost:4000/users/all"
		// Uncomment the below line once bearer token is available from session storage. Token goes into '{token}'
		// , {headers: {Authorization: 'Bearer {token}'}}
		)
		let data = await response.json()
		setUsers(data)
	}
	getUsers()
	}, [])

	return (
		<>
			<ul>
			{users.map((user, index) => (
				<li key={index} className="px-4 py-2 odd:bg-gray-200">
				<p>{user.username}</p>
				<p> Organiser: {user.isOrganiser.toString()}</p>
				<p> Admin: {user.isAdmin.toString()}</p>
				</li>
			))}
			</ul>
		</>
	)
	}
