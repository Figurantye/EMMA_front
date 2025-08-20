// src/services/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const setAuthToken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const fetchEmployeeDetails = async (id: number) => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
};


export async function logoutUser() {
  await api.post('/logout');
  localStorage.removeItem('token');
}

export default api;
