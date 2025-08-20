import React, { useState } from 'react';
import styles from './Modal.module.css';
import api from '../../services/api';

interface Props {
    employeeId: number;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddLeaveModal({ employeeId, onClose, onSuccess }: Props) {
    const [type, setType] = useState('');
    const [status, setStatus] = useState('pending');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = async () => {
        try {
            await api.post(`/api/employees/${employeeId}/leaves`, {
                employee_id: employeeId,
                type,
                status,
                start_date,
                end_date,
                reason,
            });
            onSuccess();
            onClose();
        } catch (err) {
            console.error('Error adding leave:', err);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modalContent}>
                <h3>Adicionar Licença</h3>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="unpaid">Unpaid</option>
                    <option value="vacation">Vacation</option>
                    <option value="medical">Medical</option>
                    <option value="other">Other</option>
                </select>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={styles.input}
                >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
                <input
                    value={start_date}
                    onChange={(e) => setStartDate(e.target.value)}
                    type="date"
                    className={styles.input}
                />
                <input
                    value={end_date}
                    onChange={(e) => setEndDate(e.target.value)}
                    type="date"
                    className={styles.input}
                />
                <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Reason"
                    className={styles.input}
                />
                <div className={styles.footer}>
                    <button onClick={handleSubmit} className={styles.buttonPrimary}>Add</button>
                    <button onClick={onClose} className={styles.buttonSecondary}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
