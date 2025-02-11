import { VoiceProps, DialogProps, AnimationProps, BaseProps } from '../types/common';
import { useFrameAnimation } from '../hooks/useFrameAnimation';
import { useVoicePlayer } from '../hooks/useVoicePlayer';
import { Zundamon } from './Zundamon';
import { Dialog } from './Dialog';

interface ActionZundamonProps extends BaseProps, AnimationProps {
    voice?: VoiceProps;
    dialog?: DialogProps;
}

const ActionZundamon = ({
    src,
    size,
    scale = 1,
    frames = 1,
    fps = 12,
    isPlaying = true,
    voice,
    dialog
}: ActionZundamonProps) => {
    const frame = useFrameAnimation({ frames, fps, isPlaying });
    useVoicePlayer(voice);

    return (
        <div style={{ position: 'relative' }}>
            <Zundamon
                src={src}
                size={size}
                scale={scale}
                frames={frames}
                currentFrame={frame}
            />
            {dialog && <Dialog {...dialog} scale={scale} />}
        </div>
    );
};

export default ActionZundamon; 