import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { setAuthToken } from '../services/api';

const GoogleCallback: React.FC = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const userData = params.get('user');
        console.log('Token:', token);
        console.log('UserData:', userData);
        
        if (token && userData) {
            const user = JSON.parse(decodeURIComponent(userData));

            localStorage.setItem('token', token);
            setAuthToken(token);
            setUser(user); // Agora setamos todos os campos: id, name, email, role
            navigate('/dashboard');
        }
    }, []);

    return <div>Autenticando com Google...</div>;
};

export default GoogleCallback;
