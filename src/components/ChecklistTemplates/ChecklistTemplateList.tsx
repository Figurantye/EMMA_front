import React, { useEffect, useState } from 'react';
import styles from './ChecklistTemplates.module.css';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import type { ChecklistTemplate } from '../../types';
import LoadingScreen from '../LoadingScreen';

const ChecklistTemplatesList: React.FC = () => {
  const [templates, setTemplates] = useState<ChecklistTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/checklist-templates')
      .then(response => setTemplates(response.data))
      .catch(error => console.error('Error fetching templates:', error))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this template?')) return;

    try {
      await api.delete(`/api/checklist-templates/${id}`);
      setTemplates(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Checklist Templates</h2>
        <Link to="/checklist-templates/new" className={styles.createButton}>
          + New Template
        </Link>
      </div>
      {loading ? (
        <LoadingScreen component='Checklist Templates'/>
      ) : (
        <ul className={styles.list}>
          {templates.map(template => (
            <li key={template.id} className={styles.item}>
              <div>
                <strong>{template.name}</strong>
                <p>{template.description}</p>
              </div>
              <div className={styles.actions}>
                <Link to={`/checklist-templates/${template.id}/edit`} className={styles.editButton}>Edit</Link>
                <button onClick={() => handleDelete(template.id)} className={styles.deleteButton}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChecklistTemplatesList;
