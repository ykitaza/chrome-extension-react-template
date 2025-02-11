import { useState, useEffect, useRef } from 'react';
import { BaseProps, BlinkAnimationProps } from '../types/common';
import { BaseZundamon } from './BaseZundamon';

interface BlinkingZundamonProps extends BaseProps, BlinkAnimationProps {
    frames?: number;
}

const BlinkingZundamon = ({
    src,
    size,
    scale = 1,
    frames = 2,
    interval = { min: 1000, max: 4000 },
    duration = 150
}: BlinkingZundamonProps) => {
    const [currentFrame, setCurrentFrame] = useState(0);
    const blinkTimeoutRef = useRef<number | null>(null);

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

    return (
        <BaseZundamon
            src={src}
            size={size}
            scale={scale}
            frames={frames}
            currentFrame={currentFrame}
        />
    );
};

export default BlinkingZundamon; 