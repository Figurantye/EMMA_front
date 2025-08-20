import React, { useEffect, useMemo, useState } from 'react';
import styles from './EmployeeTable.module.css';
import type { Employee, Position, Department } from '../types';
import { Link } from 'react-router-dom';
import api from '../services/api';
import LoadingScreen from './LoadingScreen';

const EmployeeTable: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);

  const [searchName, setSearchName] = useState('');
  const [searchPosition, setSearchPosition] = useState('');
  const [searchDepartment, setSearchDepartment] = useState('');
  const [searchTag, setSearchTag] = useState('');

  useEffect(() => {
    api.get('/api/employees').then(res => setEmployees(res.data.data));
    api.get('/api/departments').then(res => setDepartments(res.data.data));
    api.get('/api/positions').then(res => setPositions(res.data.data));
  }, []);

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp =>
      `${emp.first_name} ${emp.last_name}`.toLowerCase().includes(searchName.toLowerCase()) &&
      (searchPosition === '' || emp.position?.id === parseInt(searchPosition)) &&
      (searchDepartment === '' || emp.position?.department?.id === parseInt(searchDepartment)) &&
      (searchTag === '' || emp.tags?.some(tag => tag.content.toLowerCase().includes(searchTag.toLowerCase())))
    );
  }, [employees, searchName, searchPosition, searchDepartment, searchTag]);

  if (employees.length === 0) return <LoadingScreen component='Employee Table' />;

  return (
    <div className={styles.container}>
      <fieldset className={styles.filters}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          aria-label="Search by name"
        />
        <select value={searchPosition} onChange={e => setSearchPosition(e.target.value)} aria-label="Filter by position">
          <option value="">All Positions</option>
          {positions.map(pos => (
            <option key={pos.id} value={pos.id}>{pos.title}</option>
          ))}
        </select>
        <select value={searchDepartment} onChange={e => setSearchDepartment(e.target.value)} aria-label="Filter by department">
          <option value="">All Departments</option>
          {departments.map(dep => (
            <option key={dep.id} value={dep.id}>{dep.department}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search by tag"
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
          aria-label="Search by tag"
        />
      </fieldset>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Email</th>
              <th>Hire Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(emp => (
              <tr key={emp.id}>
                <td data-label="Name:">{emp.first_name} {emp.last_name}</td>
                <td data-label="Position:">{emp.position?.title || '-'}</td>
                <td data-label="Department:">{emp.position?.department?.department || '-'}</td>
                <td data-label="Email:">{emp.email}</td>
                <td data-label="Hire Date:">
                  {emp.hire_date?.split('T')[0].split('-').reverse().join('/') || '—'}
                </td>
                <td data-label="Actions">
                  <Link to={`/employees/${emp.id}`} className={styles.viewButton}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
