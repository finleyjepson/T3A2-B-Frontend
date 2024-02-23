import { useState } from 'react'

export default function CreateEvent() {

    const [eventInfo, setEventInfo] = useState({
        title: "",
        description: "",
        date: "",
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

    async function submitEvent(event) {
        event.preventDefault()

        try {
            const response = await fetch('http://localhost:4000/events/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: eventInfo.title,
                    description: eventInfo.description,
                    category: "65d7f3396459d46c88d58b9f",
                    date: eventInfo.date,
                    anime: eventInfo.date,
                    // createdBy: 
                    organiser: eventInfo.organiser,
                    price: eventInfo.price
                }),
            });
            
            console.log(response)

        // Catch response:    
        } catch (error) {
            console.error('Problem creating event', error.message);
        }

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
