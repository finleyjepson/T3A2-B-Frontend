import React from 'react'

export default function EventInfo({ events, id } ) {
	return (
	<>
		<button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 m-4 border-b-4 border-green-700 hover:border-green-500 rounded">Interested</button>
		<button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 m-4 border-b-4 border-red-700 hover:border-red-500 rounded">Not for me</button>
		<ul>
			<li>
				<div className="p-4">
					<h1 className="text-xl">{events[id].title}</h1>
					<p>{events[id].date}</p>
					<p>{events[id].description}</p>
				</div>
			</li>
		</ul>
	</>
	)
}
