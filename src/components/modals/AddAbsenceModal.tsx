import React, { useState } from 'react';
import styles from './Modal.module.css';
import api from '../../services/api';

interface Props {
    employeeId: number;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddAbsenceModal({ employeeId, onClose, onSuccess }: Props) {
    const [date, setDate] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = async () => {
        try {
            await api.post(`/api/employees/${employeeId}/absences`, {
                employee_id: employeeId,
                date,
                reason,
            });
            onSuccess();
            onClose();
        } catch (err) {
            console.error('Error adding absence:', err);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modalContent}>
                <h3>Add Absence</h3>
                <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date" 
                    className={styles.input}
                />
                <select value={reason} onChange={(e) => setReason(e.target.value)}>
                    <option value="unjustified">Unjustified</option>
                    <option value="medical">Medical</option>
                    <option value="personal">Personal</option>
                </select>
                <div className={styles.footer}>
                    <button onClick={handleSubmit} className={styles.buttonPrimary}>Add</button>
                    <button onClick={onClose} className={styles.buttonSecondary}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
