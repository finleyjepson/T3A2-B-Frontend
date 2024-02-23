import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import EventInfo from './components/EventInfo.jsx'
import EventList from './components/EventList.jsx'
import UpcomingEventsContainer from './components/UpcomingEventsContainer.jsx'
import EventsLandingContainer from './components/EventsLandingContainer.jsx'
import UpcomingAnimeContainer from './components/UpcomingAnimeContainer.jsx'
import UserList from './components/UserList.jsx'
import UserListContainer from './components/UserListContainer.jsx'
import CreateEvent from './components/CreateEvent.jsx'
import SignUp from './components/SignUp.jsx'
import Login from './components/Login.jsx'
import PollContainer from './components/PollContainer.jsx'
import Unauthorised from './components/Unauthorised.jsx'
import Home from './components/Home.jsx'
import { useEffect, useState } from 'react'

function App() {
    // Variable / states for isLoggedIn and username
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState('') 

    console.log('Username value in app.jsx:', username)

    // Check login status on component mount
    useEffect(() => {
        const accessToken = sessionStorage.getItem('accessToken')
        setIsLoggedIn(!!accessToken); // if accessToken is present, set to true
    }, [])

    // Defining handleLogout function
    const handleLogout = () => {
        // Remove tokens from session storage
        sessionStorage.removeItem('accessToken')
        sessionStorage.removeItem('refreshToken')
        setIsLoggedIn(false) 
    }

    // Event state
    let [events, setEvents] = useState([])

    // Load events from database to Events state
    useEffect(() => {
        async function getEvents() {
        let response = await fetch("http://localhost:4000/events/all")
        response = await response.json()
        setEvents(response)
        }
        getEvents()
    }, [])

    // Higher order component for single event info
    function EventInfoWrapper({ events }) {
        const { id } = useParams()
        return <EventInfo events={ events } id={ id }/>
    }

    return (
        <>
            <BrowserRouter>
                {/* Navbar tracks logged in status through a prop */}
                <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} username={username}/> 
                <Routes>
                    <Route path='/' element={<Home events={ events }/>}/>
                    <Route path='/events' element={<EventsLandingContainer events={ events } />} />
                    <Route path='/users' element={<UserListContainer />} />
                    <Route path='/events/:id' element={<EventInfoWrapper events={ events }/>} />
                    <Route path='events/new' element={<CreateEvent />} />
                    <Route path='/signup' element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
                    <Route path='/poll' element={<PollContainer />} />
                    <Route path='/unauth' element={<Unauthorised />} />
                    <Route path='*' element={<Unauthorised />} />
                </Routes>
            </BrowserRouter>
        </>
    )
    }

export default App