import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import styles from './MainLayout.module.css';
import { useAuth } from '../context/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useAuth();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // Detecta se é mobile para comportamento da sidebar
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setSidebarOpen(false); // sidebar fixa em desktop
      }
    };
    handleResize(); // inicial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.layout}>
      <Sidebar
        open={sidebarOpen || !isMobile}
        onClose={closeSidebar}
        isMobile={isMobile}
        isAdmin={user?.role === 'admin'}
      />
      <div className={styles.main}>
        <Header toggleSidebar={toggleSidebar} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
