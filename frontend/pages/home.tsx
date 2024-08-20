import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

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
        <div className="home-container">
            <Navbar />
            <h1>Welcome to the Events App</h1>
            {isAuthenticated ? (
                <div>
                    <p>You are already logged in. Feel free to explore the application.</p>
                    <p>Here you can browse and search for upcoming events in various cities.</p>
                    <p><Link href="/events">Go to Events</Link></p>
                </div>
            ) : (
                <div>
                    <p>Please log in or register to start exploring events.</p>
                    <p><Link href="/login">Login</Link></p>
                    <p><Link href="/register">Register</Link></p>
                </div>
            )}
        </div>
    );
};

export default Home;
