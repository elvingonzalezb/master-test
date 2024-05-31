import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { ROUTE_INFORMATION, ROUTE_REPOSITORY, ROUTE_LOGIN } from '@/constants/route';
import { LOGO_MASTER } from '@/constants/resource';
import { REPOSITORY, INFORMATION, NAME_APP, LOGOUT } from '@/constants/components';

const HeaderPage = () => {
    const logout = useAuthStore(state => state.logout);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isAuthenticated = true; // Aquí deberías obtener el estado de autenticación del usuario

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="mr-4 hidden md:flex">
                    <span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8">
                        <img className="aspect-square h-full w-full" alt="master" src={LOGO_MASTER}></img>
                    </span> 
                    <a className="ml-6 mr-6 flex items-center space-x-2" href="/">                        
                        <span className="hidden font-bold sm:inline-block">{NAME_APP}</span>
                    </a>
                    <nav className="flex items-center gap-4 text-sm lg:gap-6">
                        {isAuthenticated ? (
                            <>
                                <Link className="transition-colors hover:text-foreground/80 text-foreground" to={ROUTE_REPOSITORY}>{REPOSITORY}</Link>
                                <Link className="transition-colors hover:text-foreground/80 text-foreground" to={ROUTE_INFORMATION}>{INFORMATION}</Link>
                                <button
                                    className="transition-colors hover:text-foreground/80 text-foreground"
                                    onClick={() => {logout(); navigate(ROUTE_LOGIN);}}>{LOGOUT}</button>
                            </>
                        ) : (
                            <>                               
                                <div className="transition-colors hover:text-foreground/80 text-foreground"></div>
                            </>
                        )}
                    </nav>
                </div>
                <div className="md:hidden">
                    <button className="text-foreground" onClick={handleMenuToggle}>{isMenuOpen ? 'Close Menu' : 'Open Menu'}</button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="p-6 md:hidden">
                    <nav>
                        <ul>
                            <li><Link to={ROUTE_REPOSITORY}>{REPOSITORY}</Link></li>
                            <li><Link to={ROUTE_INFORMATION}>{INFORMATION}</Link></li>
                            <li><button onClick={() => {logout(); navigate(ROUTE_LOGIN);}}>{LOGOUT}</button></li>
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    )
}

export default HeaderPage;
