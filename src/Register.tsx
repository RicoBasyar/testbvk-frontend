import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationForm: React.FC = () => {
    const [uname, setUname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/testBVK/user/registerUser', {
                uname,
                email,
                password,
            });
            setMessage('Registration successful! You can log in now.');
        } catch (error) {
            setMessage('Registration failed.');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label htmlFor="uname" className="form-label">Username:</label>
                    <input
                        type="text"
                        id="uname"
                        className="form-control"
                        value={uname}
                        onChange={(e) => setUname(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            {message && <p className="mt-3">{message}</p>}
            <button onClick={() => navigate('/login')} className="btn btn-link mt-2">Back to Login</button>
        </div>
    );
};

export default RegistrationForm;
