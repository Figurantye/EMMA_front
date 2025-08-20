import React, { useState } from 'react';
import styles from './Auth.module.css';
import { NavLink } from 'react-router-dom';

const Register: React.FC = () => {
    const [role, setRole] = useState<'user' | 'admin'>('user');

    const handleGoogleLogin = () => {
        // Armazena a role temporariamente
        localStorage.setItem('google_registration_role', role);
        window.location.href = `http://localhost:8000/auth/google/redirect?role=${role}`;
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.card}>
                <h2>Registrar no EMMA</h2>

                <label className={styles.label}>
                    Tipo de conta:
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as 'user' | 'admin')}
                        className={styles.select}
                    >
                        <option value="user">Usuário</option>
                        <option value="admin">Administrador</option>
                    </select>
                </label>

                <button className={styles.button} onClick={handleGoogleLogin}>
                    Registrar com Google
                </button>

                <div className={styles.switchLink}>
                    Já tem conta? Faça <NavLink to={'/login'}> login </NavLink> com Google.
                </div>
            </div>
        </div>
    );
};

export default Register;
