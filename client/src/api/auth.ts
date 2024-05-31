import { BASE_URL_AUTH } from '@/constants/url';
import authApi from '@/lib/axios';

export const loginRequest = async (username: string, password: string) => {
    return await authApi.post(`${BASE_URL_AUTH}login`, {
        username,
        password
    })
}
