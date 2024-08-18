import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';

const Home = () => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    // Template of auto redirect for authenticated users
    // useEffect(() => {
    //     if (isAuthenticated) {
    //         router.push('/events');
    //     }
    // }, [isAuthenticated, router]);

    return (
        <div>
            <Navbar />
            <h1>Welcome to the Events App</h1>
            {isAuthenticated ? (
                <div>
                    <p>You're already logged in. Feel free to explore the application.</p>
                    <p>Here you can browse and search for upcoming events in various cities.</p>
                    <p><a href="/events">Go to Events</a></p>
                </div>
            ) : (
                <div>
                    <p>Please log in or register to start exploring events.</p>
                    <p><a href="/login">Login</a></p>
                    <p><a href="/register">Register</a></p>
                </div>
            )}
        </div>
    );
};

export default Home;
