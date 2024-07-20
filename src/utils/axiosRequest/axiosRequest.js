import axios from 'axios';

export const axiosTodo = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
});

export const axiosLogin = axios.create({
    baseURL: import.meta.env.VITE_APP_API_LOGIN,
});

axiosLogin.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
