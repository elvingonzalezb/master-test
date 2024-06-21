import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
    token: string | null;
    repository: any;
    isAuth: boolean;
}

type AuthActions = {
    setToken: (token: string) => void;
    setDataRepository: (repository: any) => void;
    logout: () => void;
}

export const useAuthStore = create(persist<AuthState & AuthActions>(
    (set) => ({
        token: '',
        isAuth: false,
        repository: null,
        setToken: (token: string) => set(() => ({
            token,
            isAuth: true
        })),
        setDataRepository: (repository: any) => set(() => ({
            repository
        })),
        logout: () => set(() => ({
            token: '',
            isAuth: false,
            repository: null
        }))
    }), {       
        name: 'auth'
    }
));
