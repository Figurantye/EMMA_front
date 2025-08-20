import styles from './ThemeToggle.module.css';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} className={styles.toggle}>
            {darkMode ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
        </button>
    );
};

export default ThemeToggle;
