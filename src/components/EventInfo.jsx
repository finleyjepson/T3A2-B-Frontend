import React from 'react'

export default function EventInfo({ events, id } ) {
	return (
	<>
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
