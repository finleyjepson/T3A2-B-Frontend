import React from 'react'
import UpcomingAnimeContainer from './UpcomingAnimeContainer'
import UpcomingEventsContainer from './UpcomingEventsContainer'
import PollContainer from './PollContainer'

export default function Home({ events }) {
  return (
    <div className="flex">
      <UpcomingEventsContainer events={ events }/>
      <UpcomingAnimeContainer events={ events }/>
      <PollContainer />
    </div>
  )
}