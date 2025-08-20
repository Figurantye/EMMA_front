import React from 'react';
import styles from './Header.module.css';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user } = useAuth();
  
  return (
    <header className={styles.header}>
      <button
        className={styles.hamburgerButton}
        onClick={toggleSidebar}
        aria-label="Open menu"
      >
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </button>

      <h1 className={styles.headerTitle}>
        <i className="fas fa-users"></i> HR Management
      </h1>
      <div className={styles.userInfo}>
        <span>Hello, {user?.name}</span>
        <div className={styles.userAvatar}>
          <i className="fas fa-user-circle"></i>
        </div>
      </div>
    </header>
  )
}

export default Header;
