import React from 'react';
import EmployeeTable from './EmployeeTable';
import styles from './Employees.module.css';

interface EmployeesProps {
  onAdd: () => void;
}

const Employees: React.FC<EmployeesProps> = ({ onAdd }) => (
  <section id="funcionarios" className={styles.tabContent}>
    <div className={styles.sectionHeader}>
      <h2>Employees</h2>
      <button className={styles.btnPrimary} onClick={onAdd}>
        <i className="fas fa-plus"></i> Add Employee
      </button>
    </div>
    <EmployeeTable />
  </section>
);

export default Employees;