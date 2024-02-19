import React from 'react'

export default function EventInfo({events}) {
  return (
    <>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <p>{event.title}</p>
            <p>{event.description}</p>
            <p>{event.date}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
