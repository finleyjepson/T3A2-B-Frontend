import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios' // Used for making HTTP requests
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

function App() {
    // Variable / states for isLoggedIn and username
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState("")
    const [user, setUser] = useState("") // State to hold user data
    const [userId, setUserId] = useState(null) // State for userId

    console.log("Username value in app.jsx:", username)
    console.log("Username value in app.jsx (jon):", user.username)

    // Check login status on component mount
    useEffect(() => {
        const accessToken = sessionStorage.getItem("accessToken")
        setIsLoggedIn(!!accessToken) // if accessToken is present, set to true
    }, [])

    useEffect(() => {
        // Retrieve userId from sessionStorage when the component mounts
        const storedUser = JSON.parse(sessionStorage.getItem('user'))
        const storedAccessToken = sessionStorage.getItem('accessToken')
        console.log('Stored user:', storedUser)
        console.log('Stored accessToken:', storedAccessToken)
        if (storedUser) {
            setUserId(storedUser._id)
            // Set the user state directly
            setUser(storedUser)
        }
        console.log('Stored user ID:', storedUser?._id) // Ensure storedUser is not null before accessing _id
    }, [])
    
    useEffect(() => {
        // Call fetchUserData only if userId is set
        if (userId) {
            fetchUserData(userId)
        }
    }, [userId])

    // Function to fetch user data from the backend
    const fetchUserData = async (userId) => {
        try {
            const response = await axios.get(import.meta.env.VITE_BACKEND_API_URL+`/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`, // Assuming token is stored in sessionStorage
                },
            })
            console.log('User Data:', response.data)
            setUser(response.data.user)            
        } catch (error) {
            console.error('Error fetching user data:', error)
        }
    }

    // Event state
    const [events, setEvents] = useState([])
    // Categories state
    const [categories, setCategories] = useState([])

    async function getEvents() {
        let response = await fetch(import.meta.env.VITE_BACKEND_API_URL+"/events/all")
        response = await response.json()
        // setEvents(response)
        const currentEvents = response.filter(event => new Date(event.date) - new Date > 0)
        const sortedCurrentEvents = currentEvents.sort((a, b) => new Date(a.date) - new Date(b.date))
        setEvents(sortedCurrentEvents)
    }

    async function getCategories() {
        let response = await fetch(import.meta.env.VITE_BACKEND_API_URL+"/categories")
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
                <ProfileDropdown isLoggedIn={isLoggedIn} username={username} user={user} setIsLoggedIn={setIsLoggedIn} />
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
                    <Route path='/profile' element={<UserProfilePage user={user}/>} />
                    <Route path='/unauth' element={<Unauthorised />} />
                    <Route path='*' element={<Unauthorised />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
