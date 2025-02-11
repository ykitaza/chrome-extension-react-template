import { useState, useEffect } from 'react';
import { getApiKey, setApiKey } from '../utils/gemini';
import './ApiKeyInput.css';

interface ApiKeyInputProps {
    onApiKeySet: () => void;
}

export const ApiKeyInput = ({ onApiKeySet }: ApiKeyInputProps) => {
    const [apiKey, setApiKeyState] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const savedKey = getApiKey();
        if (savedKey) {
            setApiKeyState(savedKey);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!apiKey.trim()) {
            setError('APIキーを入力してください');
            return;
        }

        try {
            setApiKey(apiKey.trim());
            setError('');
            onApiKeySet();
        } catch (error) {
            setError('APIキーの保存に失敗しました');
        }
    };

    return (
        <div className="api-key-input">
            <h2>Gemini APIキーの設定</h2>
            <p>会話機能を使用するにはGemini APIキーが必要です。</p>
            <p className="storage-notice">
                ※APIキーはブラウザのローカルストレージに保存されます。<br />
                他人と共有しているデバイスでは注意してください。
            </p>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKeyState(e.target.value)}
                    placeholder="APIキーを入力..."
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">設定</button>
            </form>
            <div className="info">
                <p>
                    APIキーは<a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer">
                        Google AI Studio
                    </a>から取得できます。
                </p>
            </div>
        </div>
    );
}; 