// src/pages/Identificacao.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import styles from './Identification.module.css';

const Identificacao: React.FC = () => {
    const [googleUser, setGoogleUser] = useState<{ name: string; email: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/sanctum/csrf-cookie')
            .then(() => {
                api.get('/google/session')
                    .then(res => setGoogleUser(res.data))
                    .catch(() => navigate('/')); // volta para home se não houver sessão
            })
            .catch(() => navigate('/'));
    }, [navigate]);


    const handleEscolha = async (role: 'admin' | 'hr') => {
        setLoading(true);
        try {
            await api.get('/sanctum/csrf-cookie');
            await api.post('/auth/register/google', { role });
            navigate('/dashboard');
        } catch (err) {
            console.error('Erro ao registrar:', err);
            alert('Erro ao registrar. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    if (!googleUser) return <p>Carregando...</p>;

    return (
        <div className={styles.container}>
            <h1>Olá, {googleUser.name}!</h1>
            <p>Identificamos seu e-mail: <strong>{googleUser.email}</strong></p>
            <p>Como você deseja continuar no sistema?</p>

            <div className={styles.buttons}>
                <button onClick={() => handleEscolha('admin')} disabled={loading}>Sou Administrador</button>
                <button onClick={() => handleEscolha('hr')} disabled={loading}>Sou Usuário RH</button>
            </div>
        </div>
    );
};

export default Identificacao;
