import { useState, useEffect } from 'react';
import { BaseProps, AnimationProps } from '../types/common';
import { createImageErrorHandler, createErrorDisplay } from '../utils/sprite';

export interface BaseZundamonProps extends BaseProps, AnimationProps {
    currentFrame: number;
}

export const BaseZundamon = ({
    src,
    size,
    scale = 1,
    frames = 1,
    currentFrame = 0
}: BaseZundamonProps) => {
    const [imageError, setImageError] = useState(false);
    const scaledWidth = size.width * scale;
    const scaledHeight = size.height * scale;

    useEffect(() => {
        createImageErrorHandler(setImageError, src);
    }, [src]);

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