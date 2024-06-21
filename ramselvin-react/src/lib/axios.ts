import axios from 'axios';
import { AxiosHeaders } from 'axios';
import { RAMSELVIN_BASE_URL_AUTH } from '@/constants/url';
import { useAuthStore } from '../store/auth';

const authApi = axios.create({
    baseURL: RAMSELVIN_BASE_URL_AUTH,
    withCredentials: true
});

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
