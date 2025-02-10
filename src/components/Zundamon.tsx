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
    fps?: number | (() => number);
    isPlaying?: boolean;
    voice?: {
        src: AudioFileType;
        autoPlay?: boolean;
        onEnd?: () => void;
    };
}

const Zundamon = ({
    src,
    size,
    scale = 1,
    frames,
    fps = 12,
    isPlaying = true,
    voice
}: ZundamonProps) => {
    const [frame, setFrame] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [currentFps, setCurrentFps] = useState(typeof fps === 'function' ? fps() : fps);
    const animationRef = useRef<number>();
    const lastFpsUpdateRef = useRef<number>(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const scaledWidth = size.width * scale;
    const scaledHeight = size.height * scale;

    // 音声ソースの取得
    const getAudioSource = (src: AudioFileType): string => {
        if (typeof src === 'string') return src;
        return src.wav || src.mp3 || src.ogg || '';
    };

    // 音声の初期化と管理
    useEffect(() => {
        if (voice?.src) {
            const audioSource = getAudioSource(voice.src);
            if (!audioSource) return;

            // 既存のオーディオを停止・クリーンアップ
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeEventListener('ended', audioRef.current.onended!);
            }

            // 新しいオーディオの設定
            const audio = new Audio(audioSource);
            audio.onended = () => {
                voice.onEnd?.();
            };

            audioRef.current = audio;

            // 自動再生が有効な場合
            if (voice.autoPlay) {
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch((error) => {
                        console.log("音声の自動再生に失敗しました:", error);
                    });
                }
            }
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [voice]);

    const playVoice = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.log("音声の再生に失敗しました:", error);
                });
            }
        }
    };

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
        const interval = 1000 / currentFps;

        const animate = (currentTime: number) => {
            // fpsが関数の場合、一定間隔でfpsを更新
            if (typeof fps === 'function' && currentTime - lastFpsUpdateRef.current > 1000) {
                setCurrentFps(fps());
                lastFpsUpdateRef.current = currentTime;
            }

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
    }, [frames, fps, currentFps, isPlaying, src]);

    if (imageError) {
        return (
            <div
                style={{
                    width: scaledWidth,
                    height: scaledHeight,
                    border: '1px dashed #ff0000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: `${12 * scale}px`,
                    color: '#ff0000',
                }}
            >
                画像が見つかりません
            </div>
        );
    }

    return (
        <div
            style={{
                width: scaledWidth,
                height: scaledHeight,
                backgroundImage: `url(${src})`,
                backgroundPosition: `-${frame * scaledWidth}px 0`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: `${scaledWidth * frames}px ${scaledHeight}px`,
                cursor: voice?.src ? 'pointer' : 'default',
            }}
            onClick={playVoice}
        />
    );
};

export default Zundamon; 