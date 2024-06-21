import axios from 'axios';
import { RAMSELVIN_BASE_URL_ADMIN } from '@/constants/url';
import { RepositoryParams } from '@/interfaces/general'

export const repositoriesRequest = async (params: RepositoryParams) => {
    try {    
        const response = await axios.get(`${RAMSELVIN_BASE_URL_ADMIN}repositories`, { params });
    
        return response;
    } catch (error) {       
        console.error("Error fetching repositories:", error);
        throw error;
    }
};
