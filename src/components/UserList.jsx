import React, { useEffect, useState } from 'react'

export default function UserList({ users }) {

	// async function addOrganiser(event){

	// 	await fetch(`http://localhost:4000/users/toggle/${event.target.value}`, {
	// 		method: 'PUT',
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify({
	// 			isOrganiser: true
	// 		})
	// 	})
	// 	.then(response => response.json())
	// 	.then(data => console.log(data))
	// }

	// async function removeOrganiser(event){

	// 	await fetch(`http://localhost:4000/users/toggle/${event.target.value}`, {
	// 		method: 'PUT',
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify({
	// 			isOrganiser: false
	// 		})
	// 	})
	// 	.then(response => response.json())
	// 	.then(data => console.log(data))
	// }

    // Consolidate into a toggle function call to directly accept userId as a param, instead of using an event handler

    async function toggleOrganiser(userId, isOrganiser) {
        await fetch(`http://localhost:4000/users/toggle/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isOrganiser: isOrganiser
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
                        
                        {/* Ternary operator for whether user is organiser vs not. Only show one button, not both. */}
                        {user.isOrganiser ? (
                            // <button className="bg-green-600 py-1 px-2 rounded-md text-white" value={ user._id } onClick={ addOrganiser }>+ Organiser</button>
                            
                            // If the user is NOT an organiser...
                            <button className="bg-red-600 py-1 px-2 rounded-md text-white" onClick={() => toggleOrganiser(user._id, false)}>- Organiser</button>
                        ) : (
                            // If the user IS an organiser...
                            <button className="bg-green-600 py-1 px-2 rounded-md text-white" onClick={() => toggleOrganiser(user._id, true)}>+ Organiser</button>
                        )}
				    </div>
                    <div className="flex justify-between py-1">
                        <p> Organiser: {user.isOrganiser.toString()}</p>
				        <p> Admin: {user.isAdmin.toString()}</p>
                    </div>
				</li>
			))}
			</ul>
		</>
	)
	}
