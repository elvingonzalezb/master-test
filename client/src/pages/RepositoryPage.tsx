import { useEffect, useState } from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RepositoryParams } from '@/interfaces/general';
import { repositoriesRequest } from '@/api/github';
import HeaderPage from '@/pages/HeaderPage';
import { RepositoryResponse } from '@/interfaces/general';
import StarIcon from '@/components/StarIcon';
import { useAuthStore } from '@/store/auth';

const RepositoryPage = () => {
    const repositories = useAuthStore(state => state.repository);
    const setDataRepository = useAuthStore(state => state.setDataRepository);
    const [loading, setLoading] = useState(true);

    const params: RepositoryParams = {
        user: 'google',
        sort: 'stars',
        order: 'desc',
        per_page: 10
    };

    useEffect(() => {
        const fetchRepositories = async () => {
            try {
                if (!repositories) {
                    const response = await repositoriesRequest(params);
                    setDataRepository(response.data);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching repositories:", error);
                setLoading(false);
            }
        };

        fetchRepositories();
    }, [repositories, setDataRepository]);

    return (
        <>
            <HeaderPage />
            <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        repositories?.map((repo: RepositoryResponse) => (
                            <Card key={repo?.id} x-chunk={`dashboard-${repo?.full_name}-chunk`}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {repo?.name}
                                    </CardTitle>
                                    <Avatar className="h-4 w-4 text-muted-foreground">
                                        <AvatarImage src={repo?.avatar} alt={`${repo?.name} avatar`} />
                                        <AvatarFallback>{repo?.name}</AvatarFallback>
                                    </Avatar>
                                </CardHeader>
                                <CardContent>
                                    <StarIcon />  
                                    <div className="text-2xl font-bold">{repo?.stars}</div>                                   
                                    <p className="text-xs text-muted-foreground">
                                        <a href={repo?.url} target="_blank" rel="noopener noreferrer">
                                            {repo?.full_name}
                                        </a>
                                    </p>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default RepositoryPage;
