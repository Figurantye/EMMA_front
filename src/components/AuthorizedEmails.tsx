import React, { useEffect, useState } from 'react';
import { fetchAuthorizedEmails, addAuthorizedEmail, deleteAuthorizedEmail } from '../services/authorizedEmails';
import styles from './AuthorizedEmails.module.css';

const AuthorizedEmails: React.FC = () => {
    const [emails, setEmails] = useState([]);
    const [newEmail, setNewEmail] = useState('');
    const [error, setError] = useState('');

    const loadEmails = async () => {
        try {
            const data = await fetchAuthorizedEmails();
            setEmails(data);
        } catch {
            setError('Access denied or error loading emails');
        }
    };

    useEffect(() => {
        loadEmails();
    }, []);

    const handleAdd = async () => {
        try {
            await addAuthorizedEmail(newEmail);
            setNewEmail('');
            loadEmails();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error adding email');
        }
    };

    const handleDelete = async (id: number) => {
        await deleteAuthorizedEmail(id);
        loadEmails();
    };

    return (
        <div className={styles.container}>
            <h2>Authorized Emails</h2>
            <div className={styles.inputGroup}>
                <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="newemail@gmail.com"
                />
                <button onClick={handleAdd}>Add</button>
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <ul className={styles.emailList}>
                {emails.map((e: any) => (
                    <li key={e.id}>
                        {e.email}
                        <button onClick={() => handleDelete(e.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuthorizedEmails;
