import axios from 'axios';
import { RAMSELVIN_BASE_URL_EXTRACT } from '@/constants/url';

export const repositoryRequest = async () => {
    try {       
        const response = await axios.get(`${RAMSELVIN_BASE_URL_EXTRACT}get`);       
        return response;
    } catch (error) { 
        throw error;
    }
};
