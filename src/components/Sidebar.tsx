import React from 'react';
import styles from './Sidebar.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { LogOut } from 'lucide-react';
import { logoutUser } from '../services/api';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
  isAdmin?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, isMobile, isAdmin }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/employees', label: 'Employees' },
    { to: '/departments', label: 'Departments' },
    { to: '/checklist-templates', label: 'Checklists' },
  ];

  if (isAdmin) {
    links.push({ to: '/admin/emails', label: 'Access' });
  }

  return (
    <>
      {/* Backdrop para mobile */}
      {isMobile && open && (
        <div className={styles.backdrop} onClick={onClose} />
      )}

      <aside
        className={clsx(styles.sidebar, {
          [styles.open]: open,
          [styles.mobile]: isMobile,
        })}
      >
        <div className={styles.logo}>EMMA</div>

        <nav className={styles.nav}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                clsx(styles.link, isActive && styles.active)
              }
              onClick={isMobile ? onClose : undefined}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.footer}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
