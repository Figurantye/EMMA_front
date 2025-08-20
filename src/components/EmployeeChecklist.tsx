import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import styles from './EmployeeChecklist.module.css';

interface ChecklistItem {
  id: number;
  checklist_template_item_id: number;
  completed: boolean;
  notes?: string;
  templateItem: {
    title: string;
    required: boolean;
  };
}

interface EmployeeChecklist {
  id: number;
  status: 'pending' | 'in_progress' | 'completed';
  items: ChecklistItem[];
}

const EmployeeChecklist: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [checklist, setChecklist] = useState<EmployeeChecklist | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    api.get(`/api/employee-checklists/${id}`)
      .then(res => {
        setChecklist(res.data);
      })
      .catch(() => setError('Erro ao carregar o checklist.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Carregando checklist...</p>;
  if (error) return <p>{error}</p>;
  if (!checklist) return <p>Checklist não encontrado.</p>;

  const handleItemChange = (index: number, completed: boolean) => {
    if (!checklist) return;
    const updatedItems = [...checklist.items];
    updatedItems[index] = {
      ...updatedItems[index],
      completed,
    };
    setChecklist({...checklist, items: updatedItems});
  };

  const handleNotesChange = (index: number, notes: string) => {
    if (!checklist) return;
    const updatedItems = [...checklist.items];
    updatedItems[index] = {
      ...updatedItems[index],
      notes,
    };
    setChecklist({...checklist, items: updatedItems});
  };

  const handleStatusChange = (status: EmployeeChecklist['status']) => {
    if (!checklist) return;
    setChecklist({...checklist, status});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checklist) return;

    setSaving(true);
    setError(null);

    try {
      await api.put(`/api/employee-checklists/${checklist.id}`, {
        status: checklist.status,
        items: checklist.items.map(item => ({
          id: item.id,
          completed: item.completed,
          notes: item.notes,
        })),
      });
      alert('Checklist salvo com sucesso!');
      navigate('/employee-checklists'); // ou onde desejar redirecionar
    } catch {
      setError('Erro ao salvar checklist.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Responder Checklist</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {checklist.items.map((item, idx) => (
          <div key={item.id} className={styles.taskItem}>
            <label>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={e => handleItemChange(idx, e.target.checked)}
                required={item.templateItem.required}
              />
              {item.templateItem.title} {item.templateItem.required && <span style={{color: 'red'}}>*</span>}
            </label>
            <textarea
              placeholder="Notas (opcional)"
              value={item.notes ?? ''}
              onChange={e => handleNotesChange(idx, e.target.value)}
              className={styles.textarea}
            />
          </div>
        ))}

        <label>Status:</label>
        <select
          value={checklist.status}
          onChange={e => handleStatusChange(e.target.value as EmployeeChecklist['status'])}
          className={styles.select}
        >
          <option value="pending">Pendente</option>
          <option value="in_progress">Em Progresso</option>
          <option value="completed">Concluído</option>
        </select>

        <button type="submit" disabled={saving} className={styles.submitButton}>
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default EmployeeChecklist;
