import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
// components
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
import UserProfilePage from "./components/users/UserProfile.jsx"
import UpdateEvent from "./components/events/UpdateEvent.jsx"

function App() {
    // Variable / states for isLoggedIn and username
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState("") // State to hold user data
    const [events, setEvents] = useState([])
    const [categories, setCategories] = useState([])

    // Check login status on component mount
    useEffect(() => {
        const accessToken = sessionStorage.getItem("accessToken")
        setIsLoggedIn(!!accessToken) // if accessToken is present, set to true
    }, [])

    useEffect(() => {
        // Retrieve userId from sessionStorage when the component mounts
        const storedUser = JSON.parse(sessionStorage.getItem('user'))
        if (storedUser) {
            // Set the user state directly
            setUser(storedUser)
        }
    }, [isLoggedIn])

    const getEvents = useCallback(async () =>{
        let response = await fetch(import.meta.env.VITE_BACKEND_API_URL+"/events/all")
        response = await response.json()
        sessionStorage.setItem('events', JSON.stringify(response))
        const currentEvents = response.filter(event => new Date(event.date) - new Date > -86400000)
        const sortedCurrentEvents = currentEvents.sort((a, b) => new Date(a.date) - new Date(b.date))
        setEvents(sortedCurrentEvents)
    }, [setEvents])

    async function getCategories() {
        let response = await fetch(import.meta.env.VITE_BACKEND_API_URL+"/categories")
        response = await response.json()
        setCategories(response)
    }
    
    // Load events from database to Events state
    useEffect(() => {
        getEvents()
        getCategories()
    }, [getEvents])

    return (
        <>
            <BrowserRouter>
                {/* Navbar tracks logged in status through a prop */}
                <ProfileDropdown isLoggedIn={isLoggedIn} user={user} setIsLoggedIn={setIsLoggedIn} />
                <Navbar user={user} isLoggedIn={isLoggedIn} />
                <Routes>
                    <Route path='/' element={<Home events={events} user={user} isLoggedIn={isLoggedIn} />} />
                    <Route path='/events' element={<EventsLandingContainer events={events} categories={ categories } getEvents={ getEvents } user={user} isLoggedIn={isLoggedIn}/>} />
                    <Route path='/users' element={<UserListContainer />} />
                    <Route path='/events/:id' element={<EventInfo events={events} getEvents={getEvents} />} />
                    <Route path='events/new' element={<CreateEvent getEvents={getEvents} categories={ categories }/>} />
                    <Route path='/signup' element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path='/poll' element={<PollContainer />} />
                    <Route path='/profile' element={<UserProfilePage user={user} setUser={setUser}/>} />
                    <Route path='/unauth' element={<Unauthorised />} />
                    <Route path='/events/edit/:id' element={<UpdateEvent categories={ categories } user={user} />} />
                    <Route path='*' element={<Unauthorised />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
