import { useState, useEffect, useRef } from 'react';

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
}

const Zundamon = ({
    src,
    size,
    scale = 1,
    frames,
    fps = 12,
    isPlaying = true
}: ZundamonProps) => {
    const [frame, setFrame] = useState(0);
    const [imageError, setImageError] = useState(false);
    const animationRef = useRef<number>();

    const scaledWidth = size.width * scale;
    const scaledHeight = size.height * scale;

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
            }}
        />
    );
};

export default Zundamon; 