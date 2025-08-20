import { useState } from 'react';
import styles from './Modal.module.css';
import api from '../../services/api';

interface Props {
    employeeId: number;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddAttendanceModal({ employeeId, onClose, onSuccess }: Props) {
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('present');

    const handleSubmit = async () => {
        try {
            await api.post(`/api/employees/${employeeId}/attendances`, {
                employee_id: employeeId,
                date,
                status,
            });
            onSuccess();
            onClose();
        } catch (err) {
            console.error('Error adding attendance:', err);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modalContent}>
                <h3>Add Attendance</h3>
                <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    className={styles.input}
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={styles.input}
                >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                </select>
                <div className={styles.footer}>
                    <button onClick={handleSubmit} className={styles.buttonPrimary}>Add</button>
                    <button onClick={onClose} className={styles.buttonSecondary}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
