import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL as string || 'http://localhost:8080';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type':'application/json'
    },
})

api.interceptors.request.use(cfg => {
    const token = localStorage.getItem('token');
    if (token && cfg.headers) cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
});

export default api;
