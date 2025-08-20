import React from 'react';
import styles from './Auth.module.css';

const Login: React.FC = () => {
    const handleGoogleLogin = () => {
        window.location.href = 'https://emmaback-production.up.railway.app/api/auth/google';
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.card}>
                <h2>Welcome to EMMA</h2>

                <div style={{ justifyItems: 'center' }}>
                    <div style={{height:30}}></div>
                    <button className={styles.googleButton} style={{ backgroundColor: 'blue', color: 'white' }} onClick={handleGoogleLogin}>
                        Login with Google
                    </button>
                    <p className={styles.subtitle} style={{margin: 20}}>Log in to continue</p>
                </div>

            </div>
        </div>
    );
};


export default Login;
