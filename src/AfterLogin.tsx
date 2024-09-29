import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberSearch from './MemberSearch';
import AddMember from './AddMember';

const AfterLogin: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedName = localStorage.getItem('userName');

        if (token) {
            setName(storedName || '');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        navigate('/login');
    };

    return (
        <div className="container mt-4">
            <button className="btn btn-danger" onClick={handleLogout}>
                Logout
            </button>
            <MemberSearch />
            <AddMember />
        </div>
    );
};

export default AfterLogin;
