import { useState } from 'react';
import ActionZundamon from '../components/ActionZundamon';
import { spriteConfig } from '../config/sprites';
import { generateResponse } from '../utils/gemini';
import './ChatPage.css';

interface ChatPageProps {
    onBackToNormal: () => void;
}

export const ChatPage = ({ onBackToNormal }: ChatPageProps) => {
    const [message, setMessage] = useState('');
    const [isVoicePlaying, setIsVoicePlaying] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [response, setResponse] = useState('');

    // 会話用のアクションパターン
    const chatAction = spriteConfig.action.talk;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || isVoicePlaying) return;

        console.log("会話開始");
        setIsVoicePlaying(true);
        setShowDialog(true);

        try {
            const aiResponse = await generateResponse(message);
            setResponse(aiResponse);
        } catch (error) {
            console.error('応答生成エラー:', error);
            setResponse('すみませんなのだ...うまく応答できなかったのだ...');
        }
    };

    const handleVoiceEnd = () => {
        console.log("会話終了");
        setIsVoicePlaying(false);
        setShowDialog(false);
        setMessage('');
        setResponse('');
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
                    disabled={isVoicePlaying}
                />
                <button type="submit" disabled={isVoicePlaying || !message.trim()}>
                    送信
                </button>
            </form>
        </div>
    );
}; 