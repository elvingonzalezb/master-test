import axios from 'axios';
import { RAMSELVIN_BASE_URL_API } from '@/constants/url';

export const databaseRequest = async () => {
    try {       
        const response = await axios.get(`${RAMSELVIN_BASE_URL_API}records`);       
        return response;
    } catch (error) { 
        throw error;
    }
};
