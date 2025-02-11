import { useState } from 'react';
import ActionZundamon from '../components/ActionZundamon';
import { spriteConfig } from '../config/sprites';
import './ChatPage.css';

interface ChatPageProps {
    onBackToNormal: () => void;
}

export const ChatPage = ({ onBackToNormal }: ChatPageProps) => {
    const [message, setMessage] = useState('');
    const [isVoicePlaying, setIsVoicePlaying] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    // 会話用のアクションパターン
    const chatAction = spriteConfig.action.talk;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || isVoicePlaying) return;

        console.log("会話開始");
        setIsVoicePlaying(true);
        setShowDialog(true);
    };

    const handleVoiceEnd = () => {
        console.log("会話終了");
        setIsVoicePlaying(false);
        setShowDialog(false);
        setMessage('');
    };

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
                    isPlaying={isVoicePlaying}
                    voice={isVoicePlaying ? {
                        src: chatAction.voice,
                        autoPlay: true,
                        onEnd: handleVoiceEnd
                    } : undefined}
                    dialog={showDialog ? {
                        text: message,
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
                    disabled={isVoicePlaying}
                />
                <button type="submit" disabled={isVoicePlaying || !message.trim()}>
                    送信
                </button>
            </form>
        </div>
    );
}; 