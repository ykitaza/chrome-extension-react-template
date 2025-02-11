import { useState, useEffect } from 'react';
import { BaseProps, VoiceProps, DialogProps, AnimationProps } from '../types/common';
import { createImageErrorHandler, createErrorDisplay } from '../utils/sprite';
import { useFrameAnimation } from '../hooks/useFrameAnimation';
import { useVoicePlayer } from '../hooks/useVoicePlayer';
import { Dialog } from './Dialog';

interface ZundamonProps extends BaseProps, AnimationProps {
    voice?: VoiceProps;
    dialog?: DialogProps;
}

const Zundamon = ({
    src,
    size,
    scale = 1,
    frames = 1,
    fps = 12,
    isPlaying = true,
    voice,
    dialog
}: ZundamonProps) => {
    const [imageError, setImageError] = useState(false);
    const frame = useFrameAnimation({ frames, fps, isPlaying });
    useVoicePlayer(voice);

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
            {dialog && <Dialog {...dialog} scale={scale} />}
        </div>
    );
};

export default Zundamon; 