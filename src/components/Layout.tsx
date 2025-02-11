import { useState, ReactNode } from 'react';
import { MenuDialog } from './MenuDialog';
import { SettingsDialog } from './SettingsDialog';
import { CreditsDialog } from './CreditsDialog';
import './Layout.css';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showCredits, setShowCredits] = useState(false);

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
                onCreditsClick={() => setShowCredits(true)}
            />

            <SettingsDialog
                isOpen={showSettings}
                onClose={() => setShowSettings(false)}
            />

            <CreditsDialog
                isOpen={showCredits}
                onClose={() => setShowCredits(false)}
            />
        </div>
    );
}; 