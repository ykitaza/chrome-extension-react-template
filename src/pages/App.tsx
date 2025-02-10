import { useState, useCallback, useEffect, useRef } from 'react'
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
    frames: 2,  // フレーム数
    fps: 220  // 会話時は固定FPS
  }
};

function App() {
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const blinkTimeoutRef = useRef<number | null>(null);

  // 瞬きの制御
  useEffect(() => {
    const startBlinking = () => {
      // 目を閉じる
      setCurrentFrame(1);

      // 0.15秒後に目を開く
      setTimeout(() => {
        setCurrentFrame(0);

        // 次の瞬きまでの時間をランダムに設定
        const nextBlinkDelay = 1000 + Math.random() * 3000;
        blinkTimeoutRef.current = window.setTimeout(startBlinking, nextBlinkDelay);
      }, 150);
    };

    if (!isVoicePlaying) {
      // 最初の瞬きまでの時間をランダムに設定（1-3秒）
      const initialDelay = 1000 + Math.random() * 2000;
      blinkTimeoutRef.current = window.setTimeout(startBlinking, initialDelay);
    }

    return () => {
      if (blinkTimeoutRef.current !== null) {
        clearTimeout(blinkTimeoutRef.current);
        setCurrentFrame(0);  // 目を開いた状態に戻す
      }
    };
  }, [isVoicePlaying]);

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
          isPlaying={true}  // 常にアニメーションを有効にし、currentFrameで制御
          currentFrame={!isVoicePlaying ? currentFrame : undefined}  // アイドル時のみ手動でフレーム制御
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
