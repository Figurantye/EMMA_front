import React from 'react';
import styles from './Auth.module.css';

const Login: React.FC = () => {
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8000/auth/google';
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.card}>
                <h2>Bem-vindo ao EMMA</h2>

                <div style={{ justifyItems: 'center' }}>
                    <div style={{height:30}}></div>
                    <button className={styles.googleButton} style={{ backgroundColor: 'blue', color: 'white' }} onClick={handleGoogleLogin}>
                        Entrar com Google
                    </button>
                    <p className={styles.subtitle} style={{margin: 20}}>Faça login para continuar</p>
                </div>

            </div>
        </div>
    );
};

export default Login;