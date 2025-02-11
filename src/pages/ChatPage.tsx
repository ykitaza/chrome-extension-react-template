import { useState, useRef } from 'react';
import ActionZundamon from '../components/ActionZundamon';
import { spriteConfig } from '../config/sprites';
import { generateResponse, getApiKey } from '../utils/gemini';
import { generateVoice, getVoicevoxApiKey } from '../utils/voicevox';
import { ApiKeyInput } from '../components/ApiKeyInput';
import { VoicevoxKeyInput } from '../components/VoicevoxKeyInput';
import './ChatPage.css';

interface ChatPageProps {
    onBackToNormal: () => void;
}

export const ChatPage = ({ onBackToNormal }: ChatPageProps) => {
    const [message, setMessage] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [response, setResponse] = useState('');
    const [hasGeminiKey, setHasGeminiKey] = useState(() => !!getApiKey());
    const [hasVoicevoxKey, setHasVoicevoxKey] = useState(() => !!getVoicevoxApiKey());
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // 会話用のアクションパターン
    const chatAction = spriteConfig.action.talk;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || isAnimating) return;

        console.log("会話開始");
        setIsAnimating(true);
        setShowDialog(true);

        try {
            // テキスト応答の生成
            const aiResponse = await generateResponse(message);
            setResponse(aiResponse);

            // 音声の生成と再生
            if (hasVoicevoxKey) {
                try {
                    const audioUrl = await generateVoice(aiResponse);
                    if (audioRef.current) {
                        audioRef.current.src = audioUrl;
                        await audioRef.current.play();
                    }
                } catch (error) {
                    console.error('音声生成エラー:', error);
                    if (error instanceof Error && error.message === 'VOICEVOXのAPIキーが設定されていません') {
                        setHasVoicevoxKey(false);
                    }
                }
            }

            // 音声がない場合は5秒後にリセット
            if (!hasVoicevoxKey) {
                setTimeout(() => {
                    handleAnimationEnd();
                }, 5000);
            }
        } catch (error) {
            console.error('応答生成エラー:', error);
            if (error instanceof Error && error.message === 'APIキーが設定されていません') {
                setHasGeminiKey(false);
            }
            setResponse('すみませんなのだ...うまく応答できなかったのだ...');
            setIsAnimating(false);
            setShowDialog(false);
        }
    };

    const handleAnimationEnd = () => {
        setIsAnimating(false);
        setShowDialog(false);
        setMessage('');
        setResponse('');
        if (audioRef.current) {
            audioRef.current.src = '';
        }
    };

    // APIキーの設定状態に応じて表示を切り替え
    if (!hasGeminiKey) {
        return <ApiKeyInput onApiKeySet={() => setHasGeminiKey(true)} />;
    }

    if (!hasVoicevoxKey) {
        return <VoicevoxKeyInput onApiKeySet={() => setHasVoicevoxKey(true)} />;
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

            <audio
                ref={audioRef}
                onEnded={handleAnimationEnd}
                style={{ display: 'none' }}
            />
        </div>
    );
}; 