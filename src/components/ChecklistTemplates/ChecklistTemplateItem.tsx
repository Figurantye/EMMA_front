import React, { useEffect, useState } from 'react';
import styles from './ChecklistTemplates.module.css';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

interface ChecklistTemplateFormProps {
    templateId?: number;
}

interface Task {
    id?: number;
    title: string;
    required: boolean;
}

const ChecklistTemplateForm: React.FC<ChecklistTemplateFormProps> = ({ templateId }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [tasks, setTasks] = useState<Task[]>([{ title: '', required: false }]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (templateId) {
            api.get(`/api/checklist-templates/${templateId}`).then(response => {
                setTitle(response.data.title);
                setTasks(response.data.tasks || []);
            });
        }
    }, [templateId]);

    const handleTaskChange = (index: number, field: keyof Task, value: string | boolean) => {
        const newTasks = [...tasks];
        newTasks[index] = {
            ...newTasks[index],
            [field]: value,
        };
        setTasks(newTasks);
    };

    const addTask = () => {
        setTasks([...tasks, { title: '', required: false }]);
    };

    const removeTask = (index: number) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const payload = {
                title,
                tasks,
            };

            if (templateId) {
                await api.put(`/api/checklist-templates/${templateId}`, payload);
            } else {
                await api.post('/api/checklist-templates', payload);
            }

            navigate('/api/checklist-templates');
        } catch (error) {
            console.error('Error saving template:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2>{templateId ? 'Edit Checklist' : 'New Checklist'}</h2>

            <div className={styles.field}>
                <label>Template Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className={styles.taskList}>
                <h3>Tasks</h3>
                {tasks.map((task, index) => (
                    <div key={index} className={styles.taskItem}>
                        <input
                            type="text"
                            placeholder="Task Title"
                            value={task.title}
                            onChange={(e) => handleTaskChange(index, 'title', e.target.value)}
                            required
                        />
                        <label>
                            Required:
                            <input
                                type="checkbox"
                                checked={task.required}
                                onChange={(e) => handleTaskChange(index, 'required', e.target.checked)}
                            />
                        </label>
                        <button type="button" onClick={() => removeTask(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addTask}>+ Add Task</button>
            </div>

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : templateId ? 'Save Changes' : 'Create Template'}
            </button>
        </form>
    );
};

export default ChecklistTemplateForm;
