import { useState, ReactNode } from 'react';
import { MenuDialog } from './MenuDialog';
import { SettingsDialog } from './SettingsDialog';
import './Layout.css';

interface LayoutProps {
    children: ReactNode;
    onChatModeToggle?: () => void;
    isChatMode?: boolean;
}

export const Layout = ({ children, onChatModeToggle, isChatMode }: LayoutProps) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    return (
        <div className="layout">
            <div className="layout-header">
                <button onClick={() => setShowMenu(true)} className="menu-button">
                    <span className="menu-icon">☰</span>
                </button>
            </div>

            <main className="layout-content">
                {children}
            </main>

            <MenuDialog
                isOpen={showMenu}
                onClose={() => setShowMenu(false)}
                onSettingsClick={() => setShowSettings(true)}
                onChatModeToggle={onChatModeToggle}
                isChatMode={isChatMode}
            />

            <SettingsDialog
                isOpen={showSettings}
                onClose={() => setShowSettings(false)}
            />
        </div>
    );
}; 