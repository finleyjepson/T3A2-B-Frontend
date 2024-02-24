import React, { useState, useEffect } from 'react'
import UserList from './UserList'
import { useNavigate } from 'react-router-dom'

export default function UserListContainer() {

	const navigate = useNavigate()

	// State for users, search term and filtered list of users
	const [users, setUsers] = useState([])
	const [search, setSearch] = useState("")
	const [filteredUsers, setFilteredUsers] = useState(users)

	// Use effect to fetch user list on mount
	useEffect(() => {
	async function getUsers() {
		try {
			let response = await fetch("http://localhost:4000/users/all"
			// Uncomment the below line once bearer token is available from session storage. Token goes into '{token}'
			// , {headers: {Authorization: 'Bearer {token}'}}
			)

			// Check response status, if 401 (unauthorised) redirect user to unauthorised page
			if (response.status === 401) {
				navigate("/unauth")
			}

			let data = await response.json()
			setUsers(data.user)
		} catch (err) {
			console.log("Failed to fetch list")
		}

	}
	getUsers()
	}, [filteredUsers])
	
	// onChange handler function listening to input box
	function changeHandler(event) {
		event.persist()
		setSearch(event.target.value)
	}

	// Filter users function
	function filterList(users) {
		// Filter and return user.usernames that include the 'search' term state
		const filtered = users.filter(user => {
			return `${user.username.toLowerCase()}`.includes(search.toLowerCase())
		})
		// Set filteredUsers to filtered users; which will now be passed to the UserList component to render
		setFilteredUsers(filtered)
		}

	// Use effect to re-filter users
	useEffect(() => {
		// Run filterList function when 'search' or 'users' state is updated
		filterList(users)
	},[search, users])

	return (
	<>
	<input type="text" placeholder="🔎 Search Users" onChange={changeHandler} value={search} className="w-72 px-4 py-2 mt-4 mx-4 bg-gray-200 rounded-lg"></input>
	<div className="py-4">
		<div className="py-2 mx-4 rounded-t-lg bg-black px-4 text-xl max-w-[500px] text-white ">Users</div>
		<div className=" mx-4 rounded-b-lg bg-slate-100 max-w-[500px] border-2 border-x-gray-300 border-b-gray-300">
			<UserList users={ filteredUsers } setFilteredUsers={ setFilteredUsers }/>
		</div>
	</div>
	</>
	)
	}
