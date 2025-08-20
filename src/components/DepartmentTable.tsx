import React, { useEffect, useState } from 'react';
import styles from './EmployeeTable.module.css'
import type { Department } from '../types';
import { Link } from 'react-router';
import api from '../services/api';
import LoadingScreen from './LoadingScreen';

const DepartmentTable: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('http://localhost:8000/api/departments')
      .then(response => {
        setDepartments(response.data.data);
      })
      .catch(error => {
        console.error('Error loading departments:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingScreen component='Departments' />;

  return (
    <div className={styles.container}>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map(dep => (
              <tr key={dep.id}>
                <td data-label="ID:">{dep.id}</td>
                <td data-label="Name:">{dep.department}</td>
                <td data-label="Description:">{dep.description}</td>
                <td data-label="Actions">
                  <Link to={`/departments/${dep.id}`} className={styles.viewButton}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentTable;