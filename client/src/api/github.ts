import axios from 'axios';
import { BASE_URL_ADMIN } from '@/constants/url';
import { RepositoryParams } from '@/interfaces/general'

export const repositoriesRequest = async (params: RepositoryParams) => {
    try {
        // Realizar la solicitud a la ruta 'repositories' en el backend
        const response = await axios.get(`${BASE_URL_ADMIN}repositories`, { params });
    
        return response;
    } catch (error) {
        // Manejar errores en caso de que ocurran
        console.error("Error fetching repositories:", error);
        throw error;
    }
};
