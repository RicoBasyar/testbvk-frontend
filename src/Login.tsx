import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/testBVK/user/login', {
                email,
                password,
            });
            const { token } = response.data;
            if (token) {
                localStorage.setItem('token', token);
                console.log(token);
                navigate('/after-login');
            } else {
                setMessage('Login failed. No token received.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage('Login failed. Please check your credentials.');
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            {message && <p className="text-danger mt-2">{message}</p>}

            <div className="d-flex justify-content-between mt-3">
                <button onClick={handleGoogleLogin} className="btn btn-secondary">Login with Google</button>
                <button onClick={() => navigate('/register')} className="btn btn-link">Registration</button>
            </div>
        </div>
    );
};

export default Login;
