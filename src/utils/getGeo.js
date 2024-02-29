async function getGeo(venue, setCoords) {
    const api = import.meta.env.VITE_GOOGLE_API_KEY
    const parsedVenue = venue.replace(/ /g, "%20")
    if (venue) {
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${parsedVenue}&key=${api}`)
            const data = await response.json()
            let lat = data.results[0].geometry.location.lat
            let lng = data.results[0].geometry.location.lng
            setCoords({lat: lat, lng: lng})
        } catch (error) {
            console.log("Listening for location")
            console.log("Error fetching geocode, address not valid:", error)
        }
    }
}

export default getGeo;