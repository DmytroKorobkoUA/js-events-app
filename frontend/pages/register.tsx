import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                email,
                password,
                name
            });
            alert('Registration successful! You can now log in with your email and password.');
            router.push('/login');
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;
