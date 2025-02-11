export interface SpriteSize {
    width: number;
    height: number;
}

export interface BaseProps {
    src: string;
    size: SpriteSize;
    scale?: number;
}

export interface AnimationProps {
    frames?: number;
    fps?: number;
    isPlaying?: boolean;
}

export interface BlinkAnimationProps {
    interval?: {
        min: number;
        max: number;
    };
    duration?: number;
}

export type AudioFileType = string | {
    wav?: string;
    mp3?: string;
    ogg?: string;
};

export interface VoiceProps {
    src: AudioFileType;
    autoPlay?: boolean;
    onEnd?: () => void;
}

export interface DialogProps {
    text: string;
    speed?: number;
    style?: React.CSSProperties;
    onComplete?: () => void;
}

export interface IdlePattern {
    src: string;
    size: SpriteSize;
    scale: number;
    frames: number;
}

export interface ActionPattern {
    src: string;
    size: SpriteSize;
    scale: number;
    frames: number;
    fps: number;
    voice: string;
    dialog: DialogProps;
}

export interface SpriteConfig {
    idle: {
        [key: string]: IdlePattern;
    };
    action: {
        [key: string]: ActionPattern;
    };
} 