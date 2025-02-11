import { useState, useEffect } from 'react';
import { getVoicevoxApiKey, setVoicevoxApiKey } from '../utils/voicevox';
import './ApiKeyInput.css'; // 既存のスタイルを再利用

interface VoicevoxKeyInputProps {
    onApiKeySet: () => void;
}

export const VoicevoxKeyInput = ({ onApiKeySet }: VoicevoxKeyInputProps) => {
    const [apiKey, setApiKeyState] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const savedKey = getVoicevoxApiKey();
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
            setVoicevoxApiKey(apiKey.trim());
            setError('');
            onApiKeySet();
        } catch (error) {
            setError('APIキーの保存に失敗しました');
        }
    };

    return (
        <div className="api-key-input">
            <h2>VOICEVOX APIキーの設定</h2>
            <p>音声機能を使用するにはVOICEVOX APIキーが必要です。</p>
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
                    APIキーは<a href="https://voicevox.su-shiki.com/su-shikiapis/" target="_blank" rel="noopener noreferrer">
                        VOICEVOX API
                    </a>から取得できます。
                </p>
            </div>
        </div>
    );
}; 