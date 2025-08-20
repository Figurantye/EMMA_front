import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import styles from './EmployeeModal.module.css';
import type { Position, Employee } from '../../types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { X } from 'lucide-react'; // ícone moderno de fechar

interface EmployeeModalProps {
  visible: boolean;
  onClose: () => void;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({ visible, onClose }) => {
  const [employee, setEmployee] = useState<Employee>({} as Employee)
  const [positions, setPositions] = useState<Position[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (visible) setEmployee({} as Employee);
  }, [visible]);

  useEffect(() => {
    api.get('http://localhost:8000/api/positions')
      .then(response => setPositions(response.data.data))
      .catch(() => toast.error('Erro ao carregar cargos'));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSubmitError(null);
    

    try {
      console.log('funcionou: ',employee.employment_status);
      console.log('funcionou: ', employee.first_name);

      await api.post('http://localhost:8000/api/employees', employee);

      toast.success('Funcionário cadastrado com sucesso!');
      onClose();
    } catch (error: any) {
      console.log('não funcionou: ',employee.employment_status);
      console.log('não funcionou: ',employee.first_name);

      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        if (errors) {
          Object.values(errors).forEach((msg: any) => toast.error(msg as string));
        } else {
          setSubmitError("Invalid data.");
        }
      } else if (error.response?.status === 500) {
        setSubmitError('Internal server erros');
      } else {
        setSubmitError("Unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!visible) return null;

  return (
    <>
      <ToastContainer />
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h2>Novo Funcionário</h2>
            <button onClick={onClose} className={styles.closeButton} aria-label="Fechar modal">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.grid}>
              <div className={styles.formGroup}>
                <label>Nome</label>
                <input type="text" name="first_name" value={employee.first_name || ''} onChange={handleChange} required />
              </div>

              <div className={styles.formGroup}>
                <label>Sobrenome</label>
                <input type="text" name="last_name" value={employee.last_name || ''} onChange={handleChange} required />
                {errors.last_name && <div className={styles.errorMessage}>{errors.last_name}</div>}
              </div>

              <div className={styles.formGroup}>
                <label>Email</label>
                <input type="email" name="email" value={employee.email || ''} onChange={handleChange} required />
                {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
              </div>

              <div className={styles.formGroup}>
                <label>CPF</label>
                <input type="text" name="cpf" value={employee.cpf || ''} onChange={handleChange} required />
                {errors.cpf && <div className={styles.errorMessage}>{errors.cpf}</div>}
              </div>

              <div className={styles.formGroup}>
                <label>RG</label>
                <input type="text" name="rg" value={employee.rg || ''} onChange={handleChange} />
                {errors.rg && <div className={styles.errorMessage}>{errors.rg}</div>}
              </div>

              <div className={styles.formGroup}>
                <label>Telefone</label>
                <input type="text" name="phone" value={employee.phone || ''} onChange={handleChange} />
                {errors.phone && <div className={styles.errorMessage}>{errors.phone}</div>}
              </div>

              <div className={styles.formGroup}>
                <label>Data de Admissão</label>
                <input type="date" name="hire_date" value={employee.hire_date || ''} onChange={handleChange} required />
                {errors.hire_date && <div className={styles.errorMessage}>{errors.hire_date}</div>}
              </div>

              <div className={styles.formGroup}>
                <label>Data de Nascimento</label>
                <input type="date" name="date_of_birth" value={employee.date_of_birth || ''} onChange={handleChange} />
                {errors.date_of_birth && <div className={styles.errorMessage}>{errors.date_of_birth}</div>}
              </div>

              <div className={styles.formGroup}>
                <label>Cidade</label>
                <input type="text" name="city" value={employee.city || ''} onChange={handleChange} />
                {errors.city && <div className={styles.errorMessage}>{errors.city}</div>}
              </div>

              <div className={styles.formGroup}>
                <label>Cargo</label>
                <select name="position_id" value={employee.position_id || ''} onChange={handleChange} required>
                  <option value="">Selecione um cargo</option>
                  {positions.map(pos => (
                    <option key={pos.id} value={pos.id}>{pos.title}</option>
                  ))}
                </select>
                {errors.position_id && <div className={styles.errorMessage}>{errors.position_id}</div>}
              </div>

              <div className={styles.formGroup}>
                <label>Status</label>
                <select
                  name="employment_status"
                  value={employee.employment_status}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione o status</option>
                  <option value="active">Ativo</option>
                  <option value="on_leave">Licença</option>
                  <option value="terminated">Demitido</option>
                </select>
                {errors.employment_status && (
                  <div className={styles.errorMessage}>{errors.employment_status}</div>
                )}
              </div>


              <div className={styles.formGroupFull}>
                <label>Descrição</label>
                <textarea name="description" value={employee.description || ''} onChange={handleChange} rows={3} />
                {errors.description && <div className={styles.errorMessage}>{errors.description}</div>}
              </div>
            </div>

            <div className={styles.actions}>
              <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
              <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                {isSubmitting ? 'Salvando...' : 'Cadastrar'}
              </button>
            </div>
          </form>
          {submitError && <p className={styles.errorMessage}>{submitError}</p>}
        </div>
      </div>
    </>
  );
};

export default EmployeeModal;
