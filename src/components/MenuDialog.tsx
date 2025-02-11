import { useTheme } from '../hooks/useTheme';
import './MenuDialog.css';

interface MenuDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSettingsClick: () => void;
}

export const MenuDialog = ({
    isOpen,
    onClose,
    onSettingsClick
}: MenuDialogProps) => {
    const { isDark, toggleTheme } = useTheme();

    if (!isOpen) return null;

    const handleSettingsClick = () => {
        onSettingsClick();
        onClose();
    };

    return (
        <div className="menu-overlay" onClick={onClose}>
            <div className="menu-content" onClick={e => e.stopPropagation()}>
                <button className="menu-item" onClick={handleSettingsClick}>
                    <span className="menu-icon">⚙️</span>
                    API設定
                </button>
                <button className="menu-item" onClick={toggleTheme}>
                    <span className="menu-icon">{isDark ? '🌞' : '🌙'}</span>
                    {isDark ? 'ライトモード' : 'ダークモード'}に切替
                </button>
            </div>
        </div>
    );
}; 