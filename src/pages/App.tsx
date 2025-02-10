import { useState } from 'react'
import Zundamon from '../components/Zundamon'
import idleSprite from '../assets/sprite/idle.png'
import './App.css'

function App() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="app-container">
      <h1>ずんだもんアニメーション</h1>
      <div className="animation-container">
        <Zundamon
          src={idleSprite}
          size={{ width: 1082, height: 1650 }}
          frames={10}
          fps={1}
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
