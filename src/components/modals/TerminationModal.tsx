import React, { useState } from "react";
import styles from "./Modal.module.css";
import api from "../../services/api";
import { toast } from "react-toastify";

interface TerminationModalProps {
    isOpen: boolean;
    onClose: () => void;
    employeeId: number;
    onTerminationComplete: (updatedEmployee: any) => void;
}

const TerminationModal: React.FC<TerminationModalProps> = ({ isOpen, onClose, employeeId, onTerminationComplete }) => {
    const [terminationDate, setTerminationDate] = useState("");
    const [terminationType, setTerminationType] = useState("without_cause");
    const [terminationReason, setTerminationReason] = useState("");
    const [noticePaid, setNoticePaid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [calculation, setCalculation] = useState<any>(null);

    if (!isOpen) return null;

    const handleCalculate = async () => {
        try {
            setLoading(true);
            const { data } = await api.post(`/employees/${employeeId}/calculate`, {
                termination_date: terminationDate,
                termination_type: terminationType,
                termination_reason: terminationReason,
                notice_paid: noticePaid,
            });
            setCalculation(data.data);
            toast.success("Calculation completed successfully");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Error calculating severance");
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async () => {
        try {
            setLoading(true);
            const { data } = await api.post(`/employees/${employeeId}/calculate`, {
                termination_date: terminationDate,
                termination_type: terminationType,
                termination_reason: terminationReason,
                notice_paid: noticePaid,
            });
            setCalculation(data.data);
            onTerminationComplete(data.data.employee); // ✅ Atualiza o EmployeeDetails
            toast.success("Termination confirmed successfully");
            onClose();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Error confirming termination");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modalContent}>
                <div className={styles.header}>
                    <h2>Terminate Employee</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>

                <div className={styles.body}>
                    <label>Termination Date</label>
                    <input
                        type="date"
                        value={terminationDate}
                        onChange={(e) => setTerminationDate(e.target.value)}
                    />

                    <label>Termination Type</label>
                    <select
                        value={terminationType}
                        onChange={(e) => setTerminationType(e.target.value)}
                    >
                        <option value="without_cause">Without Cause</option>
                        <option value="resignation">Resignation</option>
                        <option value="with_cause">With Cause</option>
                    </select>

                    <label>Termination Reason</label>
                    <textarea
                        value={terminationReason}
                        onChange={(e) => setTerminationReason(e.target.value)}
                    />

                    <label className={styles.checkbox}>
                        <input
                            type="checkbox"
                            checked={noticePaid}
                            onChange={(e) => setNoticePaid(e.target.checked)}
                        />
                        Notice Paid
                    </label>

                    {calculation && (
                        <div className={styles.calculation}>
                            <p><strong>Salary Balance:</strong> R$ {calculation.salary_balance}</p>
                            <p><strong>Proportional Vacation:</strong> R$ {calculation.proportional_vacation}</p>
                            <p><strong>13th Salary:</strong> R$ {calculation.thirteenth_salary}</p>
                            <p><strong>Total:</strong> R$ {calculation.total}</p>
                        </div>
                    )}
                </div>

                <div className={styles.footer}>
                    <button onClick={handleCalculate} disabled={loading}>
                        Calculate
                    </button>
                    <button onClick={handleConfirm} disabled={loading || !calculation}>
                        Confirm Termination
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TerminationModal;
