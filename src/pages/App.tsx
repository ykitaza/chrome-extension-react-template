import { useState } from 'react'
import Zundamon from '../components/Zundamon'
import idleSprite from '../assets/sprite/idle.png'
import './App.css'

function App() {
  const [isPlaying, setIsPlaying] = useState(true);

  // ランダムなfpsを生成する関数
  const getRandomFps = () => {
    // 90%の確率で通常のfps（1）
    // 10%の確率で瞬きアニメーション（12fps）
    return Math.random() < 0.9 ? 1 : 12;
  };

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
          isPlaying={isPlaying}
        />
      </div>
      <div className="controls">
        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? "停止" : "再生"}
        </button>
      </div>
    </div>
  )
}

export default App
