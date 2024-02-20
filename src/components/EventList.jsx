import React from 'react'
import { Link } from 'react-router-dom'

export default function EventList({ events, max }) {

	return (
	<>
		<ul>
			{events.slice(0, max).map((event, index) => (
			<li key={index}>
				<Link to={`/events/${index}`}>
					<div className="p-4">
						<h1 className="text-xl">{event.title}</h1>
						<p>{event.description}</p>
						<p>{event.date}</p>
					</div>
				</Link>
			</li>
			))}
		</ul>
	</>
  )
}