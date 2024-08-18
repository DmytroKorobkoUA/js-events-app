import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
    const isAuthenticated = useAuth();

    return (
        <nav style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
            <ul style={{listStyleType: 'none', margin: 0, padding: 0, display: 'flex', gap: '1rem'}}>
                <li>
                    <Link href="/">Home</Link>
                </li>
                {isAuthenticated ? (
                    <>
                        <li>
                            <Link href="/events">Events</Link>
                        </li>
                        <li>
                            <Link href="/logout">Logout</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href="/login">Login</Link>
                        </li>
                        <li>
                            <Link href="/register">Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
