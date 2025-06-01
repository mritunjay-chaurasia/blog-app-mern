import axios from 'axios';
import { apiUrl, access_token } from '../constant';

const clientApis = axios.create({
    baseURL: apiUrl
});

// Add a request interceptor
clientApis.interceptors.request.use(
    config => {
        const token = localStorage.getItem(access_token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor
clientApis.interceptors.response.use(
    response => {
        return response
    },
    function (error) {
        const originalRequest = error.config
        console.log("Original Request>>>>>>>>>>>> error", error)

        if (error?.response?.status === 401 && error?.response?.data?.message === 'Token expired') {
            console.warn("Token expired. Redirecting to login.");
            localStorage.removeItem(access_token);
            window.location.replace('/login');
            return Promise.reject(error);
        }

        // if (error.response.status === 401 && !originalRequest._retry) {
        //     originalRequest._retry = true
        //     const refreshToken = localStorageService.getRefreshToken()
        //     return axios
        //         .post('/auth/token', {
        //             refresh_token: refreshToken
        //         })
        //         .then(res => {
        //             if (res.status === 201) {
        //                 localStorageService.setToken(res.data)
        //                 axios.defaults.headers.common['Authorization'] =
        //                     'Bearer ' + localStorageService.getAccessToken()
        //                 return axios(originalRequest)
        //             }
        //         })
        // }

        return Promise.reject(error)
    }


)



export default clientApis;