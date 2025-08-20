import React from "react";
import SearchBar from "./SearchBar";
import DepartmentTable from "./DepartmentTable";
import styles from "./Employees.module.css";

interface DepartmentsProps {
  onAdd: () => void;
}

const Departments: React.FC<DepartmentsProps> = ({ onAdd }) => (
  <section className={styles.tabContent}>
    <div className={styles.sectionHeader}>
      <h2>Departments</h2>
      <button className={styles.btnPrimary} onClick={onAdd}>
        <i className="fas fa-plus"></i> Add Department
      </button>
    </div>
    <SearchBar />
    <DepartmentTable />
  </section>
);

export default Departments;
