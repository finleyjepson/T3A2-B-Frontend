import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import EventInfo from './components/EventInfo.jsx'
import { useEffect, useState } from 'react'

function App() {

    // Event state
    let [events, setEvents] = useState([])

    // Load events from database to Events state
    useEffect(() => {
        fetch("http://localhost:4000/events")
        .then(response => response.json())
        .then(data => setEvents(data))
    }, [])

    return (
        <>
            <Navbar />
            <BrowserRouter>
                <Routes>
                    <Route path='/' />
                    <Route path='/events' element={<EventInfo events={events} />} />
                </Routes>
            </BrowserRouter>
        </>
    )
    }

export default App