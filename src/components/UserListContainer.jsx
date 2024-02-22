import React from 'react'
import UserList from './UserList'

export default function UserListContainer() {
	return (
	<>
	<div className="py-4">
		<div className="py-2 mx-4 rounded-t-lg bg-black px-4 text-xl max-w-[500px] text-white ">Users</div>
		<div className=" mx-4 rounded-b-lg bg-slate-100 max-w-[500px] border-2 border-x-gray-300 border-b-gray-300">
			<UserList />
		</div>
	</div>
	</>
	)
	}
