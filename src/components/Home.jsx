import UpcomingAnimeContainer from "./UpcomingAnimeContainer"
import UpcomingEventsContainer from "./events/UpcomingEventsContainer"
import PollContainer from "./PollContainer"

export default function Home({ events }) {
    return (
        <div className='flex flex-wrap'>
            <UpcomingEventsContainer events={events} />
            <UpcomingAnimeContainer events={events} />
            <PollContainer />
        </div>
    )
}
