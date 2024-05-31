export interface RepositoryParams {
    user: string;
    sort: string;
    order: string;
    per_page: number;
}

export interface RepositoryResponse {
    id: number;
    name: string;
    full_name: string;
    avatar: string;
    stars: number;
    url: string;
}
