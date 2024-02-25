import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"
import Navbar from "./components/navigation/Navbar.jsx"
import EventInfo from "./components/events/EventInfo.jsx"
import EventsLandingContainer from "./components/events/EventsLandingContainer.jsx"
import UserListContainer from "./components/users/UserListContainer.jsx"
import CreateEvent from "./components/events/CreateEvent.jsx"
import SignUp from "./components/auth/SignUp.jsx"
import Login from "./components/auth/Login.jsx"
import PollContainer from "./components/PollContainer.jsx"
import Unauthorised from "./components/auth/Unauthorised.jsx"
import Home from "./components/Home.jsx"
import ProfileDropdown from "./components/navigation/ProfileDropdown.jsx"
import { useEffect, useState } from "react"

function App() {
    // Variable / states for isLoggedIn and username
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState("")

    console.log("Username value in app.jsx:", username)

    // Check login status on component mount
    useEffect(() => {
        const accessToken = sessionStorage.getItem("accessToken")
        setIsLoggedIn(!!accessToken) // if accessToken is present, set to true
    }, [])

    // Defining handleLogout function
    const handleLogout = () => {
        // Remove tokens from session storage
        sessionStorage.removeItem("accessToken")
        sessionStorage.removeItem("refreshToken")
        setIsLoggedIn(false)
    }

    // Event state
    const [events, setEvents] = useState([])
    // Categories state
    const [categories, setCategories] = useState([])

    async function getEvents() {
        let response = await fetch("http://localhost:4000/events/all")
        response = await response.json()
        // setEvents(response)
        const currentEvents = response.filter(event => new Date(event.date) - new Date > 0)
        const sortedCurrentEvents = currentEvents.sort((a, b) => new Date(a.date) - new Date(b.date))
        setEvents(sortedCurrentEvents)
    }

    async function getCategories() {
        let response = await fetch("http://localhost:4000/categories")
        response = await response.json()
        setCategories(response)
    }

    // Load events from database to Events state
    useEffect(() => {
        getEvents()
        getCategories()
    }, [])

    // Higher order component for single event info
    function EventInfoWrapper({ events }) {
        const { id } = useParams()
        return <EventInfo events={events} id={id} />
    }

    return (
        <>
            <BrowserRouter>
                {/* Navbar tracks logged in status through a prop */}
                <ProfileDropdown isLoggedIn={isLoggedIn} handleLogout={handleLogout} username={username} />
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home events={events} />} />
                    <Route path='/events' element={<EventsLandingContainer events={events} categories={ categories } getEvents={ getEvents }/>} />
                    <Route path='/users' element={<UserListContainer />} />
                    <Route path='/events/:id' element={<EventInfoWrapper events={events} />} />
                    <Route path='events/new' element={<CreateEvent getEvents={getEvents} categories={ categories }/>} />
                    <Route path='/signup' element={<SignUp setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
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
