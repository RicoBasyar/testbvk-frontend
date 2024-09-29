import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleCallback: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/testBVK/user/oauth2/redirect');
                const { token } = response.data;
                console.log(token);
                if (token) {
                    localStorage.setItem('token', token);
                    console.log(token);
                    navigate('/after-login');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [navigate]);

    return <div>Loading...</div>;
};

export default GoogleCallback;
