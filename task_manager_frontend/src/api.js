import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:8000',
    baseURL: 'https://fastapi-react-auth-task-manager.onrender.com', 
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && token !== "undefined" && token !== "null") {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authApi = {
    register: (data) => api.post('/user/register', data),
    login: (data) => api.post('/user/login', data),
    getProfile: () => api.get('/user/is_auth'),
};

export const taskApi = {
    getAll: () => api.get('/tasks/all_tasks'),
    create: (data) => api.post('/tasks/create', data),
    update: (id, data) => api.put(`/tasks/update_task/${id}`, data),
    delete: (id) => api.delete(`/tasks/delete_task/${id}`),
};