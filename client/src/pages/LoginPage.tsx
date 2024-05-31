import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '@/api/auth';
import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LOGO_MASTER } from '@/constants/resource';
import { ROUTE_ROOT } from '@/constants/route';

const LoginPage = () => {
    const setToken = useAuthStore(state => state.setToken);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const responseLogin = await loginRequest(username, password);
        setToken(responseLogin.data.result.access_token);
        navigate(ROUTE_ROOT);
    };
    
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <img
                            className="mx-auto h-10 w-auto"
                            src={LOGO_MASTER}
                            alt="Master Prueba Tecnica"
                        />
                        <h1 className="mt-10 text-3xl font-bold"> Iniciar Sesión</h1>
                        
                    </div>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Username</Label>
                            <Input
                                id="email"
                                name="email"
                                type="text"
                                placeholder="Email address"
                                autoComplete="email"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <div className="text-sm">
                                </div>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>
                </div>
            </div>
            <div className="hidden bg-muted lg:block h-screen"></div>
        </div>
    );
};

export default LoginPage;
