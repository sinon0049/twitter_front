import axios, { AxiosError } from 'axios'
import type { AxiosRequestConfig } from 'axios'

const apiHelper = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

apiHelper.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
        const token = localStorage.getItem('token')

        if(token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`
            }
        }
        return config
    },
    (err: AxiosError): Promise<AxiosError> => Promise.reject(err)
)

export const api = apiHelper