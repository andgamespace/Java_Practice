// src/api/axiosConfig.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // adjust if needed
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;