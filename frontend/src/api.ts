import axios, { type InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1/', // Your backend base URL
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api;

// In your components:
// import api from './api';
// const res = await api.get('/users');




