import axios from "axios";

export const axiosInstant = axios.create({

    baseURL: 'http://localhost:3000/api',
    withCredentials: true, // This is needed for cookies to be sent with requests
})
