import { useState, useEffect, useRef } from 'react';

type AudioFileType = string | {
    wav?: string;
    mp3?: string;
    ogg?: string;
};

interface ZundamonProps {
    src: string;
    size: {
        width: number;
        height: number;
    };
    scale?: number;
    frames: number;
    fps?: number;
    isPlaying?: boolean;
    voice?: {
        src: AudioFileType;
        autoPlay?: boolean;
        onEnd?: () => void;
    };
    dialog?: {
        text: string;
        speed?: number;
        style?: React.CSSProperties;
        onComplete?: () => void;
    };
}

const Zundamon = ({
    src,
    size,
    scale = 1,
    frames,
    fps = 12,
    isPlaying = true,
    voice,
    dialog
}: ZundamonProps) => {
    const [frame, setFrame] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const animationRef = useRef<number>();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const textTimeoutRef = useRef<number | null>(null);

    const scaledWidth = size.width * scale;
    const scaledHeight = size.height * scale;

    // 音声ソースの取得
    const getAudioSource = (src: AudioFileType): string => {
        if (typeof src === 'string') return src;
        return src.wav || src.mp3 || src.ogg || '';
    };

    // アニメーションの制御
    useEffect(() => {
        // 画像の存在確認
        const img = new Image();
        img.onload = () => setImageError(false);
        img.onerror = () => setImageError(true);
        img.src = src;

        if (!isPlaying) {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            return;
        }

        let lastTime = 0;
        const interval = 1000 / fps;

        const animate = (currentTime: number) => {
            if (currentTime - lastTime >= interval) {
                setFrame(prev => (prev + 1) % frames);
                lastTime = currentTime;
            }
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [frames, fps, isPlaying, src]);

    // 音声の制御
    useEffect(() => {
        if (voice?.src) {
            const audioSource = getAudioSource(voice.src);
            if (!audioSource) return;

            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeEventListener('ended', audioRef.current.onended!);
            }

            const audio = new Audio(audioSource);
            const handleEnded = () => voice.onEnd?.();
            audio.addEventListener('ended', handleEnded);
            audioRef.current = audio;

            if (voice.autoPlay) {
                audio.play().catch(error => {
                    console.log("音声の自動再生に失敗しました:", error);
                });
            }

            return () => {
                audio.removeEventListener('ended', handleEnded);
                audio.pause();
            };
        }
    }, [voice]);

    // テキストアニメーション
    useEffect(() => {
        if (dialog?.text) {
            let currentIndex = 0;
            const speed = dialog.speed || 50;
            setDisplayText('');

            const animateText = () => {
                if (currentIndex < dialog.text.length) {
                    setDisplayText(dialog.text.slice(0, currentIndex + 1));
                    currentIndex++;
                    textTimeoutRef.current = window.setTimeout(animateText, speed);
                } else {
                    dialog.onComplete?.();
                }
            };

            animateText();

            return () => {
                if (textTimeoutRef.current !== null) {
                    window.clearTimeout(textTimeoutRef.current);
                }
                setDisplayText('');
            };
        }
    }, [dialog]);

    if (imageError) {
        return (
            <div style={{
                width: scaledWidth,
                height: scaledHeight,
                border: '1px dashed #ff0000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: `${12 * scale}px`,
                color: '#ff0000',
            }}>
                画像が見つかりません
            </div>
        );
    }

    return (
        <div style={{ position: 'relative' }}>
            <div style={{
                width: scaledWidth,
                height: scaledHeight,
                backgroundImage: `url(${src})`,
                backgroundPosition: `-${frame * scaledWidth}px 0`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: `${scaledWidth * frames}px ${scaledHeight}px`,
                cursor: voice?.src ? 'pointer' : 'default',
            }} />
            {dialog && (
                <div style={{
                    position: 'absolute',
                    top: '-100px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'white',
                    padding: '20px 30px',
                    borderRadius: '25px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                    maxWidth: '400px',
                    minWidth: '300px',
                    minHeight: '60px',
                    textAlign: 'center',
                    fontSize: `${100 * scale}px`,
                    fontWeight: 600,
                    color: '#000',
                    zIndex: 100,
                    ...dialog.style,
                }}>
                    <span style={{
                        display: 'block',
                        minHeight: '1.2em',
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-wrap',
                        lineHeight: 1.4,
                        userSelect: 'none',
                        padding: '5px 0',
                    }}>
                        {displayText}
                    </span>
                    <div style={{
                        position: 'absolute',
                        bottom: '-15px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '15px solid transparent',
                        borderRight: '15px solid transparent',
                        borderTop: '15px solid white',
                        filter: 'drop-shadow(0 4px 2px rgba(0,0,0,0.1))',
                        zIndex: 99,
                    }} />
                </div>
            )}
        </div>
    );
};

export default Zundamon; 