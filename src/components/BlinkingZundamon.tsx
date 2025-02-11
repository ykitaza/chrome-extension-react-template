import { useState, useEffect, useRef } from 'react';
import { BaseProps, BlinkAnimationProps } from '../types/common';
import { createImageErrorHandler, createErrorDisplay } from '../utils/sprite';

interface BlinkingZundamonProps extends BaseProps, BlinkAnimationProps {
    frames?: number;
}

const BlinkingZundamon = ({
    src,
    size,
    frames,
    scale = 1,
    interval = { min: 1000, max: 4000 },
    duration = 150
}: BlinkingZundamonProps) => {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [imageError, setImageError] = useState(false);
    const blinkTimeoutRef = useRef<number | null>(null);

    const scaledWidth = size.width * scale;
    const scaledHeight = size.height * scale;

    useEffect(() => {
        createImageErrorHandler(setImageError, src);
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
                const nextBlinkDelay = interval.min + Math.random() * (interval.max - interval.min);
                blinkTimeoutRef.current = window.setTimeout(startBlinking, nextBlinkDelay);
            }, duration);
        };

        // 最初の瞬きまでの時間をランダムに設定
        const initialDelay = interval.min / 2 + Math.random() * (interval.max - interval.min) / 2;
        blinkTimeoutRef.current = window.setTimeout(startBlinking, initialDelay);

        return () => {
            if (blinkTimeoutRef.current !== null) {
                clearTimeout(blinkTimeoutRef.current);
                setCurrentFrame(0);
            }
        };
    }, [interval, duration]);

    // 画像エラー時の表示
    if (imageError) {
        return (
            <div style={createErrorDisplay(scaledWidth, scaledHeight, scale)}>
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
            backgroundSize: `${scaledWidth * frames}px ${scaledHeight}px`,
        }} />
    );
};

export default BlinkingZundamon; 