import { useTheme } from '../hooks/useTheme';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="テーマ切り替え"
        >
            <span>
                {theme === 'light' ? '🌙' : '☀️'}
            </span>
        </button>
    );
}; 