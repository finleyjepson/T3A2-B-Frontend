import axios from 'axios'
import { isTokenExpired } from '../components/auth/refreshToken'
const baseURL = import.meta.env.VITE_BACKEND_API_URL
let accessToken = sessionStorage.getItem("accessToken") || null

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
})

axiosInstance.interceptors.request.use(async req => {
    if (!accessToken) {
        accessToken = sessionStorage.getItem("accessToken")
        req.headers.Authorization = `Bearer ${accessToken}`
    }

    const tokenExpiry = await isTokenExpired(accessToken)

    if (!tokenExpiry) {
        return req
    }
    const response = await axios.post(`${baseURL}/auth/token`, {
        refreshToken: sessionStorage.getItem("refreshToken")
    })
    sessionStorage.setItem("accessToken", response.data.accessToken)

    return req
})

export default axiosInstance