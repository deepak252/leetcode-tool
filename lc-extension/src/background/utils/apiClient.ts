import axios, { type AxiosInstance, type AxiosResponse } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com', // change to your API
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config: any) => {
    // Example: attach token if stored
    // const token = localStorage.getItem('accessToken')
    // if (token) {
    //   config.headers = {
    //     ...config.headers,
    //     Authorization: `Bearer ${token}`,
    //   }
    // }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // handle refresh token flow
    if (error.response?.status === 401) {
      console.warn('Unauthorized, handle re-login or token refresh')
    }
    return Promise.reject(error)
  }
)

export default apiClient
