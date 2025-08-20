import React from 'react';
import styles from './Dashboard.module.css';

interface ActivityListProps {
    activities: string[];
}

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => (
    <div className={styles.recentActivity}>
        <h3 className={styles.recentActivityTitle}>Atividades Recentes</h3>
        <ul className={styles.recentActivityList}>
            {activities.length === 0 ? (
                <li>Nenhuma atividade registrada.</li>
            ) : (
                activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                ))
            )}
        </ul>
    </div>
);

export default ActivityList;
