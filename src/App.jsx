import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import EventInfo from './components/EventInfo.jsx'
import EventLanding from './components/EventLanding.jsx'
import { useEffect, useState } from 'react'

function App() {

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
        console.log(id)
        console.log(events)
        return <EventInfo events={ events } id={ id }/>
    }

    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' />
                    <Route path='/events' element={<EventLanding events={ events } />} />
                    <Route path='/events/:id' element={<EventInfoWrapper events={ events }/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
    }

export default App