import { useEffect, useRef } from 'react';
import { VoiceProps } from '../types/common';
import { getAudioSource } from '../utils/sprite';

export const useVoicePlayer = (voice?: VoiceProps) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (voice?.src) {
            const audioSource = getAudioSource(voice.src);
            if (!audioSource) return;

            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeEventListener('ended', audioRef.current.onended!);
            }

            const audio = new Audio(audioSource);
            const handleEnded = () => voice.onEnd?.();
            audio.addEventListener('ended', handleEnded);
            audioRef.current = audio;

            if (voice.autoPlay) {
                audio.play().catch(error => {
                    console.log("音声の自動再生に失敗しました:", error);
                });
            }

            return () => {
                audio.removeEventListener('ended', handleEnded);
                audio.pause();
            };
        }
    }, [voice]);

    return audioRef;
}; 