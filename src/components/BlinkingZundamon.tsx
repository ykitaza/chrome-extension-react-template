import { useState, useEffect, useRef } from 'react';

interface BlinkingZundamonProps {
    src: string;
    size: {
        width: number;
        height: number;
    };
    scale?: number;
    blinkInterval?: {
        min: number;  // 最小間隔（ミリ秒）
        max: number;  // 最大間隔（ミリ秒）
    };
    blinkDuration?: number;  // 瞬きの持続時間（ミリ秒）
}

const BlinkingZundamon = ({
    src,
    size,
    scale = 1,
    blinkInterval = { min: 1000, max: 4000 },
    blinkDuration = 150
}: BlinkingZundamonProps) => {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [imageError, setImageError] = useState(false);
    const blinkTimeoutRef = useRef<number | null>(null);

    const scaledWidth = size.width * scale;
    const scaledHeight = size.height * scale;

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onerror = () => setImageError(true);
    }, [src]);

    // 瞬きの制御
    useEffect(() => {
        const startBlinking = () => {
            // 目を閉じる
            setCurrentFrame(1);

            // 指定時間後に目を開く
            setTimeout(() => {
                setCurrentFrame(0);

                // 次の瞬きまでの時間をランダムに設定
                const nextBlinkDelay = blinkInterval.min + Math.random() * (blinkInterval.max - blinkInterval.min);
                blinkTimeoutRef.current = window.setTimeout(startBlinking, nextBlinkDelay);
            }, blinkDuration);
        };

        // 最初の瞬きまでの時間をランダムに設定
        const initialDelay = blinkInterval.min / 2 + Math.random() * (blinkInterval.max - blinkInterval.min) / 2;
        blinkTimeoutRef.current = window.setTimeout(startBlinking, initialDelay);

        return () => {
            if (blinkTimeoutRef.current !== null) {
                clearTimeout(blinkTimeoutRef.current);
                setCurrentFrame(0);
            }
        };
    }, [blinkInterval, blinkDuration]);

    // 画像エラー時の表示
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
        <div style={{
            width: scaledWidth,
            height: scaledHeight,
            backgroundImage: `url(${src})`,
            backgroundPosition: `-${currentFrame * scaledWidth}px 0`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${scaledWidth * 2}px ${scaledHeight}px`,
        }} />
    );
};

export default BlinkingZundamon; 