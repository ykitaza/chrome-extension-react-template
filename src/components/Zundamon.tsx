import { useState, useEffect, useRef } from 'react';

interface ZundamonProps {
    src: string;
    size: {
        width: number;
        height: number;
    };
    frames: number;
    fps?: number;
    isPlaying?: boolean;
}

const Zundamon = ({ src, size, frames, fps = 12, isPlaying = true }: ZundamonProps) => {
    const [frame, setFrame] = useState(0);
    const [imageError, setImageError] = useState(false);
    const animationRef = useRef<number>();

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

    if (imageError) {
        return (
            <div
                style={{
                    width: size.width,
                    height: size.height,
                    border: '1px dashed #ff0000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
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
                width: size.width,
                height: size.height,
                backgroundImage: `url(${src})`,
                backgroundPosition: `-${frame * size.width}px 0`,
                backgroundRepeat: 'no-repeat',
            }}
        />
    );
};

export default Zundamon; 