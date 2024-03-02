async function isTokenExpired(token) {
    try {
        const response = await fetch(import.meta.env.VITE_BACKEND_API_URL + "/auth/decode", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return false
        } else if (response.status === 201) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

export { isTokenExpired }