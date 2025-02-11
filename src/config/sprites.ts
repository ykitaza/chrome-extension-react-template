import { SpriteConfig } from '../types/common';
import idle_default from '../assets/sprite/idle_default.png';
import idle_happy from '../assets/sprite/idle_default.png';
import talk from '../assets/sprite/talk.png';
import hello from '../assets/voices/hello.wav';

export const spriteConfig: SpriteConfig = {
    idle: {
        default: {
            src: idle_default,
            size: { width: 1082, height: 1650 },
            scale: 0.2,
            frames: 2
        },
        happy: {
            src: idle_happy,
            size: { width: 1082, height: 1650 },
            scale: 0.2,
            frames: 2
        }
    },
    action: {
        talk: {
            src: talk,
            size: { width: 1082, height: 1650 },
            scale: 0.2,
            frames: 2,
            fps: 7,
            voice: hello,
            dialog: {
                text: "やっほーなのだ！ ぼく、ずんだもんなのだ！ ずんだ餅が大好きなのだ！",
                speed: 150
            }
        },
        greet: {
            src: talk,
            size: { width: 1082, height: 1650 },
            scale: 0.2,
            frames: 2,
            fps: 7,
            voice: hello,
            dialog: {
                text: "こんにちはなのだ！",
                speed: 150
            }
        }
    }
} as const;

export const defaultBlinkConfig = {
    interval: { min: 1000, max: 4000 },
    duration: 150
} as const; 