import { useEffect, useState } from 'react';
import { repositoryRequest } from '@/api/repository';
import HeaderPage from '@/pages/HeaderPage';

const RepositoryPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await repositoryRequest();
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching repositories:", error);
                setLoading(false);
            }
        };

        fetchCount();
    }, []);

    return (
        <>
            <HeaderPage />
            <div className="p-4 md:p-8">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="bg-gray-100 p-4 rounded-md">
                        <h2 className="text-sm font-medium text-gray-700">Response Body</h2>
                        <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
                    </div>
                )}
            </div>
        </>
    );
};

export default RepositoryPage;
