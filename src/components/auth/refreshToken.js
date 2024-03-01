async function refreshTokenIfNeeded() {
    // Check if the access token is expired
    const accessToken = sessionStorage.getItem("accessToken")
    if (isTokenExpired(accessToken)) {
        // If the access token is expired, get the refresh token
        const refreshToken = sessionStorage.getItem("refreshToken")
        if (!refreshToken) {
            throw new Error("Refresh token not found. Please login again.")
        }

        // Send a POST request to /auth/token with the refresh token in the body
        const response = await fetch(import.meta.env.VITE_BACKEND_API_URL + "/auth/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
        });

        // If the response is not ok, throw an error
        if (!response.ok) {
            throw new Error("Failed to refresh access token.")
        }

        // If the response is ok, get the new access token from the response
        const data = await response.json()
        const newAccessToken = data.accessToken

        // Store the new access token in the session storage
        sessionStorage.setItem("accessToken", newAccessToken)
    } else {
        // If the access token is not expired, do nothing
        return
    }
}

async function isTokenExpired(token) {
    await fetch(import.meta.env.VITE_BACKEND_API_URL + "/auth/decode", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    })
    .then(response => {
        if (response.status === 200) {
            console.log("Token is not expired")
            return true
        } else {
            return false
        }
    })
}

export { refreshTokenIfNeeded }