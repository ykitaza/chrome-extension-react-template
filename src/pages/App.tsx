import { useState, useCallback } from 'react'
import ActionZundamon from '../components/ActionZundamon'
import IdleZundamon from '../components/IdleZundamon'
import { spriteConfig, defaultBlinkConfig } from '../config/sprites'
import './App.css'

function App() {
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [currentIdlePattern, setCurrentIdlePattern] = useState<string>('default');
  const [currentActionPattern, setCurrentActionPattern] = useState<string>('talk');

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

  const currentIdle = spriteConfig.idle[currentIdlePattern];
  const currentAction = spriteConfig.action[currentActionPattern];

  return (
    <div className="app-container">
      <div className="animation-container">
        {isVoicePlaying ? (
          <ActionZundamon
            src={currentAction.src}
            size={currentAction.size}
            scale={currentAction.scale}
            frames={currentAction.frames}
            fps={currentAction.fps}
            isPlaying={true}
            voice={{
              src: currentAction.voice,
              autoPlay: true,
              onEnd: handleVoiceEnd
            }}
            dialog={showDialog ? currentAction.dialog : undefined}
          />
        ) : (
          <IdleZundamon
            src={currentIdle.src}
            size={currentIdle.size}
            scale={currentIdle.scale}
            frames={currentIdle.frames}
            interval={defaultBlinkConfig.interval}
            duration={defaultBlinkConfig.duration}
          />
        )}
      </div>
      <div className="controls">
        <div className="pattern-controls">
          <div className="select-group">
            <label htmlFor="idle-pattern">待機モーション</label>
            <select
              id="idle-pattern"
              value={currentIdlePattern}
              onChange={(e) => setCurrentIdlePattern(e.target.value)}
              disabled={isVoicePlaying}
            >
              {Object.keys(spriteConfig.idle).map(pattern => (
                <option key={pattern} value={pattern}>
                  {pattern}
                </option>
              ))}
            </select>
          </div>
          <div className="select-group">
            <label htmlFor="action-pattern">アクション</label>
            <select
              id="action-pattern"
              value={currentActionPattern}
              onChange={(e) => setCurrentActionPattern(e.target.value)}
              disabled={isVoicePlaying}
            >
              {Object.keys(spriteConfig.action).map(pattern => (
                <option key={pattern} value={pattern}>
                  {pattern}
                </option>
              ))}
            </select>
          </div>
        </div>
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
