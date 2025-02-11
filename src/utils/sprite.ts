import { AudioFileType } from '../types/common';

export const createImageErrorHandler = (
    setImageError: (error: boolean) => void,
    src: string
) => {
    const img = new Image();
    img.onload = () => setImageError(false);
    img.onerror = () => setImageError(true);
    img.src = src;
};

export const getAudioSource = (src: AudioFileType): string => {
    if (typeof src === 'string') return src;
    return src.wav || src.mp3 || src.ogg || '';
};

export const createErrorDisplay = (width: number, height: number, scale: number) => ({
    width,
    height,
    border: '1px dashed #ff0000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: `${12 * scale}px`,
    color: '#ff0000',
}); 