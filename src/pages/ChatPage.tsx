import { useState } from 'react';
import ActionZundamon from '../components/ActionZundamon';
import { spriteConfig } from '../config/sprites';
import { generateResponse, getApiKey } from '../utils/gemini';
import { ApiKeyInput } from '../components/ApiKeyInput';
import './ChatPage.css';

interface ChatPageProps {
    onBackToNormal: () => void;
}

export const ChatPage = ({ onBackToNormal }: ChatPageProps) => {
    const [message, setMessage] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [response, setResponse] = useState('');
    const [hasApiKey, setHasApiKey] = useState(() => !!getApiKey());

    // 会話用のアクションパターン
    const chatAction = spriteConfig.action.talk;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || isAnimating) return;

        console.log("会話開始");
        setIsAnimating(true);
        setShowDialog(true);

        try {
            const aiResponse = await generateResponse(message);
            setResponse(aiResponse);
            // 応答表示後、一定時間後に状態をリセット
            setTimeout(() => {
                setIsAnimating(false);
                setShowDialog(false);
                setMessage('');
                setResponse('');
            }, 5000); // 5秒後にリセット
        } catch (error) {
            console.error('応答生成エラー:', error);
            if (error instanceof Error && error.message === 'APIキーが設定されていません') {
                setHasApiKey(false);
            }
            setResponse('すみませんなのだ...うまく応答できなかったのだ...');
            setIsAnimating(false);
            setShowDialog(false);
        }
    };

    const handleApiKeySet = () => {
        setHasApiKey(true);
    };

    if (!hasApiKey) {
        return <ApiKeyInput onApiKeySet={handleApiKeySet} />;
    }

    return (
        <div className="chat-page">
            <div className="chat-header">
                <button onClick={onBackToNormal} className="back-button">
                    通常モードに戻る
                </button>
            </div>

            <div className="chat-animation-container">
                <ActionZundamon
                    src={chatAction.src}
                    size={chatAction.size}
                    scale={chatAction.scale}
                    frames={chatAction.frames}
                    fps={chatAction.fps}
                    isPlaying={isAnimating}
                    dialog={showDialog ? {
                        text: response || 'ちょっと待つのだ...',
                        speed: 50
                    } : undefined}
                />
            </div>

            <form onSubmit={handleSubmit} className="chat-input-form">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="ずんだもんに話しかける..."
                    disabled={isAnimating}
                />
                <button type="submit" disabled={isAnimating || !message.trim()}>
                    送信
                </button>
            </form>
        </div>
    );
}; 