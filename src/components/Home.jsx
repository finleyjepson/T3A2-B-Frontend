import UpcomingAnimeContainer from "./UpcomingAnimeContainer"
import UpcomingEventsContainer from "./events/UpcomingEventsContainer"
import PollContainer from "./PollContainer"
import Calendar from "./Calendar"

export default function Home({ events }) {
    return (
        <div className='flex flex-wrap justify-center'>
            <div>
                <Calendar events={ events }/>
                <UpcomingEventsContainer events={events} />
            </div>
            <div>
            <UpcomingAnimeContainer events={events} />
            <PollContainer />
            </div>
        </div>
    )
}
