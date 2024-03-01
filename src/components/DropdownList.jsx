import { useEffect } from "react"
import { refreshTokenIfNeeded } from "../auth/refreshToken.js"

export default function DropdownList({ setCategories, categories, setSearchCat }) {
    // Get list of categories
    // Convert category names into name string
    // Add to dropdown menu

    // Check if the access token is expired
    useEffect(() => {
        refreshTokenIfNeeded()
    }, [])

    useEffect(() => {
        async function getCategories() {
            let response = await fetch(import.meta.env.REACT_APP_API_URL + "/categories")
            let data = await response.json()
            setCategories(data)
        }
        getCategories()
    }, [])

    function categoryHandler(event) {
        setSearchCat(event.target.value)
    }

    return (
        <select onChange={categoryHandler}>
            <option value='' disabled selected>
                Select a category
            </option>
            {categories.map((category) => (
                <option key={category._id} value={category._id}>
                    {category.name}
                </option>
            ))}
        </select>
    )
}
