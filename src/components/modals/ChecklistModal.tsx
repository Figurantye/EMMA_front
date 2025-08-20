import React from 'react';
import styles from './Modal.module.css';
import type { DetailedEmployeeChecklist } from '../../types';

interface Props {
  checklist: DetailedEmployeeChecklist | null;
  onClose: () => void;
  onToggleItem: (itemId: number) => void;
}

const ChecklistModal: React.FC<Props> = ({ checklist, onClose, onToggleItem }) => {
  if (!checklist) return <div>Loading...</div>;

  const completedCount = checklist.items.filter((item) => item.completed).length;
  const totalCount = checklist.items.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{checklist.template.name}</h2>
          <button onClick={onClose} className={styles.closeButton}>&times;</button>
        </div>

        <div className={styles.progressContainer}>
          <div className={styles.progressBarBackground}>
            <div className={styles.progressBarFill} style={{ width: `${progressPercent}%` }} />
          </div>
          <span className={styles.progressText}>{progressPercent}% concluído</span>
        </div>

        <ul className={styles.itemList}>
          {checklist.items.map((item) => (
            <li key={item.id} className={`${styles.item} ${item.completed ? styles.completed : ''}`}>
              <label htmlFor={`check-${item.id}`} className={styles.itemLabel}>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => onToggleItem(item.id)}
                  id={`check-${item.id}`}
                  className={styles.checkbox}
                />
                <div>
                  <strong>{item.template_item?.name || item.title}</strong>
                  {item.template_item?.description && (
                    <p className={styles.itemDescription}>{item.template_item.description}</p>
                  )}
                </div>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChecklistModal;
