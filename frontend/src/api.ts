import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1/', // Your backend base URL
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
});

export default api;

// In your components:
// import api from './api';
// const res = await api.get('/users');
