export const spriteConfig = {
    idle: {
        src: '/src/assets/sprite/idle.png',
        size: { width: 1082, height: 1650 },
        scale: 0.2,
    },

    talk: {
        src: '/src/assets/sprite/talk.png',
        size: { width: 1082, height: 1650 },
        scale: 0.2,
        frames: 2,
        fps: 7,
        voice: '/src/assets/voices/hello.wav',
        dialog: {
            text: "やっほーなのだ！ ぼく、ずんだもんなのだ！ ずんだ餅が大好きなのだ！",
            speed: 150
        }
    }
} as const;

export const defaultBlinkConfig = {
    interval: { min: 1000, max: 4000 },
    duration: 150
} as const; 