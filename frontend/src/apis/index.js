import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const access_token = import.meta.env.VITE_ACCESS_TOKEN;

const clientApis = axios.create({
    baseURL: apiUrl
});

// Add a request interceptor
clientApis.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)

// Add a response interceptor
clientApis.interceptors.response.use(
    response => {
        return response
    },
    function (error) {
        const originalRequest = error.config
        localStorage.removeItem(access_token)
        console.log("Original Request>>>>>>>>>>>> error", error)
        window.location = '/login'

        // if (
        //     error.response.status === 401 &&
        //     originalRequest.url === 'http://127.0.0.1:3000/v1/auth/token'
        // ) {
        //     router.push('/login')
        //     return Promise.reject(error)
        // }

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