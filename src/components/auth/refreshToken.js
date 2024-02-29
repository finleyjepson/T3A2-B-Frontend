import * as jose from "jose"

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
    }
}

async function isTokenExpired(token) {
    const decodedToken = await jose.jwtDecrypt(token, { complete: true })
    console.log("decodedToken:", decodedToken)
    const expirationTime = decodedToken.exp * 1000
    return Date.now() >= expirationTime
}

export { refreshTokenIfNeeded }