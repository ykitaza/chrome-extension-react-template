import { useState, useCallback } from 'react'
import ActionZundamon from '../components/ActionZundamon'
import IdleZundamon from '../components/IdleZundamon'
import { spriteConfig, defaultBlinkConfig } from '../config/sprites'
import './App.css'

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
          <ActionZundamon
            src={spriteConfig.action.src}
            size={spriteConfig.action.size}
            scale={spriteConfig.action.scale}
            frames={spriteConfig.action.frames}
            fps={spriteConfig.action.fps}
            isPlaying={true}
            voice={{
              src: spriteConfig.action.voice,
              autoPlay: true,
              onEnd: handleVoiceEnd
            }}
            dialog={showDialog ? spriteConfig.action.dialog : undefined}
          />
        ) : (
          <IdleZundamon
            src={spriteConfig.idle.src}
            size={spriteConfig.idle.size}
            scale={spriteConfig.idle.scale}
            frames={spriteConfig.idle.frames}
            interval={defaultBlinkConfig.interval}
            duration={defaultBlinkConfig.duration}
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
