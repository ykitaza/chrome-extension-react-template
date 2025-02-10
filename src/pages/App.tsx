import { useState, useCallback } from 'react'
import Zundamon from '../components/Zundamon'
import idleSprite from '../assets/sprite/idle.png'
import talkSprite from '../assets/sprite/talk.png'  // 会話時のスプライト
import helloWav from '../assets/voices/hello.wav'
import './App.css'

// スプライトごとの設定
const spriteConfig = {
  idle: {
    size: { width: 1082, height: 1650 },
    scale: 0.2,
    frames: 2,
    fps: 1
  },

  talk: {
    size: { width: 1082, height: 1650 },  // トーキングスプライトのサイズ
    scale: 0.2,  // スケールを調整
    frames: 10,  // フレーム数
    fps: 12
  }
};


function App() {
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  // ランダムなfpsを生成する関数
  const getRandomFps = () => {
    if (isVoicePlaying) {
      // 会話中は高速アニメーション
      return 12;
    }
    // 通常時は低速でまばたき
    return Math.random() < 0.1 ? 12 : 1;
  };

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

  // 現在のスプライト設定を取得
  const currentSprite = isVoicePlaying ? 'talk' : 'idle';
  const config = spriteConfig[currentSprite];

  return (
    <div className="app-container">
      <div className="animation-container">
        <Zundamon
          src={isVoicePlaying ? talkSprite : idleSprite}
          size={config.size}
          scale={config.scale}
          frames={config.frames}
          fps={config.fps}
          isPlaying={true}
          voice={isVoicePlaying ? {
            src: helloWav,
            autoPlay: true,
            onEnd: handleVoiceEnd
          } : undefined}
          dialog={showDialog ? {
            text: "こんにちは！ずんだもんです！",
            speed: 80,
          } : undefined}
        />
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
