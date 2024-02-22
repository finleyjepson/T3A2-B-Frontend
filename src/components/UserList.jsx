import React, { useEffect, useState } from 'react'

export default function UserList({ users}) {

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
