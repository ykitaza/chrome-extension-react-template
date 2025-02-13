import { useState } from 'react';
import { getApiKey, setApiKey } from '../utils/gemini';
import { getVoicevoxApiKey, setVoicevoxApiKey } from '../utils/voicevox';
import './SettingsDialog.css';

interface SettingsDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsDialog = ({ isOpen, onClose }: SettingsDialogProps) => {
    const [geminiKey, setGeminiKey] = useState(getApiKey() || '');
    const [voicevoxKey, setVoicevoxKey] = useState(getVoicevoxApiKey() || '');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            if (geminiKey.trim()) {
                setApiKey(geminiKey.trim());
            }
            if (voicevoxKey.trim()) {
                setVoicevoxApiKey(voicevoxKey.trim());
            }
            setSuccessMessage('設定を保存しました！');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            setError('設定の保存に失敗しました');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="settings-overlay">
            <div className="settings-dialog">
                <h2>API設定</h2>
                <p className="settings-description">
                    APIキーはブラウザのローカルストレージに保存されます。
                    他人と共有しているデバイスでは注意してください。
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="settings-group">
                        <label>
                            Gemini APIキー
                            <input
                                type="password"
                                value={geminiKey}
                                onChange={(e) => setGeminiKey(e.target.value)}
                                placeholder="APIキーを入力..."
                            />
                        </label>
                        <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="api-link">
                            Gemini APIキーの取得
                        </a>
                    </div>

                    <div className="settings-group">
                        <label>
                            VOICEVOX APIキー
                            <input
                                type="password"
                                value={voicevoxKey}
                                onChange={(e) => setVoicevoxKey(e.target.value)}
                                placeholder="APIキーを入力..."
                            />
                        </label>
                        <a href="https://voicevox.su-shiki.com/su-shikiapis/" target="_blank" rel="noopener noreferrer" className="api-link">
                            VOICEVOX APIキーの取得
                        </a>
                    </div>

                    {error && <p className="error">{error}</p>}
                    {successMessage && <p className="success">{successMessage}</p>}

                    <div className="settings-buttons">
                        <button type="submit">保存</button>
                        <button type="button" onClick={onClose}>閉じる</button>
                    </div>
                </form>
            </div>
        </div>
    );
}; 