import { useState, useEffect } from 'react'

export default function CreateEvent() {

    
    const [coords, setCoords] = useState({})

    const [eventInfo, setEventInfo] = useState({
        title: "",
        description: "",
        date: "",
        venue: "",
        anime: "",
        organiser: "",
        price: 0
    })

    function changeHandler(event) {
        const { name, value } = event.target
        setEventInfo(previousState => ({
            ...previousState,
            [name]: value
        }))
    }

      // Use effect to re-filter events
    useEffect(() => {
        // Run filterList function when 'search' state is updated
        getGeo(eventInfo.venue)
    },[eventInfo.venue])

    async function submitEvent(event) {
        event.preventDefault()

        getGeo(eventInfo.venue)
        console.log(coords)
        

        // try {
        //     const response = await fetch('http://localhost:4000/events/', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             title: eventInfo.title,
        //             description: eventInfo.description,
        //             category: "65d7f3396459d46c88d58b9f",
        //             date: eventInfo.date,
        //             venue: eventInfo.venue,
        //             coords: coords,
        //             anime: eventInfo.date,
        //             // createdBy: 
        //             organiser: eventInfo.organiser,
        //             price: eventInfo.price
        //         }),
        //     }) 
        //     console.log(response)
        // // Catch response:    
        // } catch (error) {
        //     console.error('Problem creating event', error.message);
        // }
    }

    async function getGeo(venue) {
        const api = import.meta.env.VITE_GOOGLE_API_KEY
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${venue}&key=${api}`)
        const data = await response.json()
        setCoords(data.results[0].geometry.location)
    }

    return (
        <>
            <div className="p-4">
                <div className="py-2 mx-4 rounded-t-lg bg-red-600 px-4 text-xl max-w-[500px] text-white ">Create Event</div>
                <div className="mx-4 rounded-b-lg bg-red-50 max-w-[500px] border-2 border-x-gray-300 border-b-gray-300">
                    <form onSubmit={submitEvent}>
                        <label>Title</label>
                        <input name="title" id="title" value={eventInfo.title} onChange={changeHandler}></input>
                        <label>Description</label>
                        <input name="description" id="description" value={eventInfo.description} onChange={changeHandler}></input>
                        <label>Date</label>
                        <input name="date" id="date" value={eventInfo.date} onChange={changeHandler}></input>
                        <label>Venue</label>
                        <input name="venue" id="venue" value={eventInfo.venue} onChange={changeHandler}></input>
                        <label>Anime</label>
                        <input name="anime" id="anime" value={eventInfo.anime} onChange={changeHandler}></input>
                        <label>Organiser</label>
                        <input name="organiser" id="organiser" value={eventInfo.organiser} onChange={changeHandler}></input>
                        <label>Price</label>
                        <input name="price" id="price" value={eventInfo.price} onChange={changeHandler}></input>
                        <button type="submit">Create Event!</button>
                    </form>
                </div>
            </div>
        </>
    )
}
