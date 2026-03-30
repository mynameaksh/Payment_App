import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

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


// import api from './api';
// const res = await api.get('/users');

// Refresh helper
const refreshAccessToken = async (): Promise<string> => {
    const response = await api.post("/user/refresh", {});
    const newAccessToken = response.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
};

// / Retry once on 401
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await refreshAccessToken();

                if (!originalRequest.headers) {
                    originalRequest.headers = {} as InternalAxiosRequestConfig["headers"];
                }

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("userId");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);





