import { useTheme } from '../hooks/useTheme';
import './MenuDialog.css';

interface MenuDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSettingsClick: () => void;
    onCreditsClick: () => void;
}

export const MenuDialog = ({
    isOpen,
    onClose,
    onSettingsClick,
    onCreditsClick
}: MenuDialogProps) => {
    const { isDark, toggleTheme } = useTheme();

    if (!isOpen) return null;

    const handleSettingsClick = () => {
        onSettingsClick();
        onClose();
    };

    const handleCreditsClick = () => {
        onCreditsClick();
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
                <button className="menu-item" onClick={handleCreditsClick}>
                    <span className="menu-icon">ℹ️</span>
                    クレジット
                </button>
            </div>
        </div>
    );
}; 