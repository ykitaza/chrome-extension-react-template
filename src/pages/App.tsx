import { useState, useCallback } from 'react'
import Zundamon from '../components/Zundamon'
import idleSprite from '../assets/sprite/idle.png'
import helloWav from '../assets/voices/hello.wav'
import './App.css'


function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);

  // ランダムなfpsを生成する関数
  const getRandomFps = () => {
    // 90%の確率で通常のfps（1）
    // 10%の確率で瞬きアニメーション（12fps）
    return Math.random() < 0.1 ? 12 : 1;
  };

  const handleVoiceEnd = useCallback(() => {
    console.log("音声再生完了");
    setIsVoicePlaying(false);
  }, []);

  const handleVoicePlay = useCallback(() => {
    console.log("音声再生開始");
    setIsVoicePlaying(true);
  }, []);

  return (
    <div className="app-container">
      <h1>ずんだもんアニメーション</h1>
      <div className="animation-container">
        <Zundamon
          src={idleSprite}
          size={{ width: 1082, height: 1650 }}
          scale={0.2}
          frames={10}
          fps={getRandomFps}
          isPlaying={isVoicePlaying}
          voice={isVoicePlaying ? {
            src: helloWav,
            autoPlay: true,
            onEnd: handleVoiceEnd
          } : undefined}
        />
      </div>
      <div className="controls">
        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? "停止" : "再生"}
        </button>
        <button
          onClick={handleVoicePlay}
          disabled={isVoicePlaying}
        >
          音声再生
        </button>
      </div>
    </div>
  )
}

export default App
