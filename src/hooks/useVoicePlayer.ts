import { useEffect, useRef } from 'react';
import { VoiceProps } from '../types/common';
import { getAudioSource } from '../utils/sprite';

export const useVoicePlayer = (voice?: VoiceProps) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (voice?.src) {
            const audioSource = getAudioSource(voice.src);
            if (!audioSource) return;

            // 既存の音声を停止
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeEventListener('ended', audioRef.current.onended!);
            }

            const audio = new Audio(audioSource);
            const handleEnded = () => voice.onEnd?.();
            audio.addEventListener('ended', handleEnded);
            audioRef.current = audio;

            // 音声の再生
            if (voice.autoPlay) {
                const playAudio = async () => {
                    try {
                        await audio.play();
                    } catch (error) {
                        console.log("音声の再生に失敗しました:", error);
                        // 再生に失敗した場合は終了イベントを発火
                        handleEnded();
                    }
                };
                playAudio();
            }

            return () => {
                audio.removeEventListener('ended', handleEnded);
                audio.pause();
                audioRef.current = null;
            };
        } else {
            // voice が undefined の場合は既存の音声を停止
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeEventListener('ended', audioRef.current.onended!);
                audioRef.current = null;
            }
        }
    }, [voice]);

    return audioRef;
}; 