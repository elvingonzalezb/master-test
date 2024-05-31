import axios from 'axios';

export const getPopularRepositories = async (req, res) => {
    try { 
        const { user = 'google', sort = 'stars', order = 'desc', per_page = 10 } = req.query;

        const apiUrl = `https://api.github.com/search/repositories?q=user:${user}&sort=${sort}&order=${order}&per_page=${per_page}`;

        // Realizar la solicitud a la API de GitHub
        const response = await axios.get(apiUrl);

        // Obtener solo valores necesarios
        const repositories = response.data.items.map(repo => ({
            id: repo?.id,
            name: repo?.name,
            full_name: repo?.full_name ?? '',
            description: repo?.description,
            url: repo?.html_url,
            stars: repo?.stargazers_count,
            avatar: repo?.owner?.avatar_url
        }));
        
        res.json(repositories);
    } catch (error) {
        // Manejar errores en caso de que ocurran
        console.log(error);
        res.status(error.response.status || 500).json({ message: error.message });
    }
};
