import { useState, useRef, useEffect } from 'react';
import ActionZundamon from '../components/ActionZundamon';
import { spriteConfig } from '../config/sprites';
import { generateResponse, getApiKey } from '../utils/gemini';
import { generateVoice, getVoicevoxApiKey } from '../utils/voicevox';
import { ApiKeyInput } from '../components/ApiKeyInput';
import { VoicevoxKeyInput } from '../components/VoicevoxKeyInput';
import { SettingsDialog } from '../components/SettingsDialog';
import './ChatPage.css';

interface ChatPageProps {
    onBackToNormal: () => void;
}

export const ChatPage = ({ onBackToNormal }: ChatPageProps) => {
    const [message, setMessage] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [response, setResponse] = useState('');
    const [dialogSpeed, setDialogSpeed] = useState(50);
    const [hasGeminiKey, setHasGeminiKey] = useState(() => !!getApiKey());
    const [hasVoicevoxKey, setHasVoicevoxKey] = useState(() => !!getVoicevoxApiKey());
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    // 会話用のアクションパターン
    const chatAction = spriteConfig.action.talk;

    // 吹き出しの表示速度を計算（音声の長さに合わせる）
    const calculateDialogSpeed = (text: string, duration: number) => {
        // 空白と記号を除いた文字数
        const cleanText = text.replace(/[\s\.,。、！？!?]/g, '').length;
        // 1文字あたりの表示時間（ミリ秒）を計算
        return Math.floor(duration / cleanText);
    };

    // 音声のイベントリスナーをクリーンアップ
    const cleanupAudioListeners = () => {
        if (audioRef.current) {
            audioRef.current.onplay = null;
            audioRef.current.onended = null;
            audioRef.current.onerror = null;
            audioRef.current.src = '';
        }
    };

    // コンポーネントのアンマウント時にクリーンアップ
    useEffect(() => {
        return () => {
            cleanupAudioListeners();
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || isGenerating) return;

        // 前回の音声のクリーンアップ
        cleanupAudioListeners();

        console.log("応答生成開始");
        setIsGenerating(true);
        setShowDialog(true);
        setResponse('ちょっと待つのだ...'); // 待機中メッセージ

        try {
            const aiResponse = await generateResponse(message);

            if (hasVoicevoxKey) {
                try {
                    const audioUrl = await generateVoice(aiResponse);
                    const speed = calculateDialogSpeed(aiResponse, 5000);
                    setDialogSpeed(speed);

                    if (audioRef.current) {
                        try {
                            // イベントリスナーの設定
                            audioRef.current.onplay = () => {
                                console.log("音声再生開始");
                                setResponse(aiResponse);
                                setIsAnimating(true);
                                setIsGenerating(false);
                            };

                            audioRef.current.onended = () => {
                                console.log("音声再生終了");
                                handleAnimationEnd();
                                cleanupAudioListeners();
                            };

                            audioRef.current.onerror = () => {
                                console.error('音声の読み込みに失敗しました');
                                setResponse(aiResponse);
                                setDialogSpeed(50);
                                setIsAnimating(true);
                                setIsGenerating(false);
                                setTimeout(() => {
                                    handleAnimationEnd();
                                    cleanupAudioListeners();
                                }, 5000);
                            };

                            // srcの設定は最後に行う
                            audioRef.current.src = audioUrl;
                            await audioRef.current.play();
                        } catch (playError) {
                            console.error('音声の再生に失敗しました:', playError);
                            cleanupAudioListeners();
                            setResponse(aiResponse);
                            setDialogSpeed(50);
                            setIsAnimating(true);
                            setIsGenerating(false);
                            setTimeout(() => {
                                handleAnimationEnd();
                            }, 5000);
                        }
                    }
                } catch (error) {
                    console.error('音声生成エラー:', error);
                    if (error instanceof Error && error.message === 'VOICEVOXのAPIキーが設定されていません') {
                        setHasVoicevoxKey(false);
                    }
                    handleError();
                }
            } else {
                setResponse(aiResponse);
                setDialogSpeed(50);
                setIsAnimating(true);
                setIsGenerating(false);
                setTimeout(handleAnimationEnd, 5000);
            }
        } catch (error) {
            console.error('応答生成エラー:', error);
            if (error instanceof Error && error.message === 'APIキーが設定されていません') {
                setHasGeminiKey(false);
            }
            handleError();
        }
    };

    const handleError = () => {
        cleanupAudioListeners();
        setResponse('すみませんなのだ...うまく応答できなかったのだ...');
        setIsAnimating(true);
        setIsGenerating(false);
        setTimeout(handleAnimationEnd, 3000);
    };

    const handleAnimationEnd = () => {
        setIsAnimating(false);
        setShowDialog(false);
        setMessage('');
        setResponse('');
        setDialogSpeed(50);
        setIsGenerating(false);
        cleanupAudioListeners();
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
                <button onClick={() => setShowSettings(true)} className="settings-button">
                    設定
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
                        text: response,
                        speed: dialogSpeed
                    } : undefined}
                />
            </div>

            <form onSubmit={handleSubmit} className="chat-input-form">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="ずんだもんに話しかける..."
                    disabled={isGenerating}
                />
                <button type="submit" disabled={isGenerating || !message.trim()}>
                    送信
                </button>
            </form>

            <div className="chat-footer">
                <button onClick={onBackToNormal} className="back-button">
                    通常モードに戻る
                </button>
            </div>

            <audio
                ref={audioRef}
                style={{ display: 'none' }}
            />

            <SettingsDialog
                isOpen={showSettings}
                onClose={() => setShowSettings(false)}
            />
        </div>
    );
}; 