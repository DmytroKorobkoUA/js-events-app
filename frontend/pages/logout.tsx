import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        const handleLogout = () => {
            localStorage.removeItem('accessToken');
            router.push('/home');
        };

        handleLogout();
    }, [router]);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
};

export default Logout;
