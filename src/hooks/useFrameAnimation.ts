import { useState, useEffect, useRef } from 'react';

interface UseFrameAnimationProps {
    frames: number;
    fps?: number;
    isPlaying?: boolean;
}

export const useFrameAnimation = ({
    frames,
    fps = 12,
    isPlaying = true
}: UseFrameAnimationProps) => {
    const [frame, setFrame] = useState(0);
    const animationRef = useRef<number>();

    useEffect(() => {
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
    }, [frames, fps, isPlaying]);

    return frame;
}; 