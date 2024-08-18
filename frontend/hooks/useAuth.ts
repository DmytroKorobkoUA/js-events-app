import { useEffect, useState } from 'react';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            setIsAuthenticated(!!token);
        }
    }, []);

    return isAuthenticated;
};
