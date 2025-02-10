import { useState, useCallback } from 'react'
import Zundamon from '../components/Zundamon'
import BlinkingZundamon from '../components/BlinkingZundamon'
import idleSprite from '../assets/sprite/idle.png'
import talkSprite from '../assets/sprite/talk.png'  // 会話時のスプライト
import helloWav from '../assets/voices/hello.wav'
import './App.css'

// スプライトごとの設定
const spriteConfig = {
  idle: {
    size: { width: 1082, height: 1650 },
    scale: 0.2,
  },

  talk: {
    size: { width: 1082, height: 1650 },  // トーキングスプライトのサイズ
    scale: 0.2,  // スケールを調整
    frames: 2,  // フレーム数
    fps: 7  // 会話時は固定FPS
  }
};

function App() {
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleVoiceEnd = useCallback(() => {
    console.log("音声再生完了");
    setIsVoicePlaying(false);
    setShowDialog(false);
  }, []);

  const handleVoicePlay = useCallback(() => {
    console.log("音声再生開始");
    setIsVoicePlaying(true);
    setShowDialog(true);
  }, []);

  return (
    <div className="app-container">
      <div className="animation-container">
        {isVoicePlaying ? (
          // 会話時のずんだもん
          <Zundamon
            src={talkSprite}
            size={spriteConfig.talk.size}
            scale={spriteConfig.talk.scale}
            frames={spriteConfig.talk.frames}
            fps={spriteConfig.talk.fps}
            isPlaying={true}
            voice={{
              src: helloWav,
              autoPlay: true,
              onEnd: handleVoiceEnd
            }}
            dialog={showDialog ? {
              text: "やっほーなのだ！ ぼく、ずんだもんなのだ！ ずんだ餅が大好きなのだ！",
              speed: 150,
            } : undefined}
          />
        ) : (
          // 通常時の瞬きずんだもん
          <BlinkingZundamon
            src={idleSprite}
            size={spriteConfig.idle.size}
            scale={spriteConfig.idle.scale}
            blinkInterval={{ min: 1000, max: 4000 }}
            blinkDuration={150}
          />
        )}
      </div>
      <div className="controls">
        <button
          onClick={handleVoicePlay}
          disabled={isVoicePlaying || showDialog}
        >
          会話開始
        </button>
      </div>
    </div>
  )
}

export default App
