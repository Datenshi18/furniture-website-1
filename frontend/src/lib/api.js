import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000',
});

api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem('auth');
    const auth = raw ? JSON.parse(raw) : null;
    if (auth?.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
  } catch {}
  return config;
});

export default api;





