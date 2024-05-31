import axios from 'axios';
import { AxiosHeaders } from 'axios';
import { BASE_URL_AUTH } from '@/constants/url';
import { useAuthStore } from '../store/auth';

const authApi = axios.create({
    baseURL: BASE_URL_AUTH,
    withCredentials: true
});

// Agregar interceptor para configurar los encabezados
authApi.interceptors.request.use(config => {
    const token = useAuthStore.getState().token;
    if (token) {
        if (!config.headers) {          
            config.headers = new AxiosHeaders();
        }
        config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default authApi;
