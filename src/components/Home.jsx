import UpcomingAnimeContainer from "./UpcomingAnimeContainer"
import UpcomingEventsContainer from "./events/UpcomingEventsContainer"
import PollContainer from "./PollContainer"
import Calendar from "./Calendar"
import Map from "./Maps"

export default function Home({ events, user, isLoggedIn }) {
    return (
        <div className='flex flex-wrap justify-center'>
            <div>
                <Calendar events={ events } />
                <UpcomingEventsContainer events={events} user={user} isLoggedIn={isLoggedIn} />
            </div>
            <div>
            <UpcomingAnimeContainer events={events} />
            <PollContainer />
            </div>
        </div>
    )
}
