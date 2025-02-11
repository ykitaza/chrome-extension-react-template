import { useState, useCallback } from 'react'
import ActionZundamon from '../components/ActionZundamon'
import IdleZundamon from '../components/IdleZundamon'
import { ControlPanel } from '../components/ControlPanel'
import { ChatPage } from './ChatPage'
import { Layout } from '../components/Layout'
import { spriteConfig, defaultBlinkConfig } from '../config/sprites'
import './App.css'

function App() {
  // State
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [currentIdlePattern, setCurrentIdlePattern] = useState<string>('default');
  const [currentActionPattern, setCurrentActionPattern] = useState<string>('talk');
  const [isChatMode, setIsChatMode] = useState(false);

  // Current patterns
  const currentIdle = spriteConfig.idle[currentIdlePattern];
  const currentAction = spriteConfig.action[currentActionPattern];

  // Handlers
  const handleVoiceEnd = useCallback(() => {
    console.log("アクション終了");
    setIsVoicePlaying(false);
    setShowDialog(false);
  }, []);

  const handleActionStart = useCallback(() => {
    console.log("アクション開始");
    setIsVoicePlaying(true);
    setShowDialog(true);
  }, []);

  const handleChatModeToggle = useCallback(() => {
    setIsChatMode(prev => !prev);
    // チャットモード切り替え時に実行中のアクションをリセット
    setIsVoicePlaying(false);
    setShowDialog(false);
  }, []);

  // チャットモードの場合は会話ページを表示
  if (isChatMode) {
    return <ChatPage onBackToNormal={handleChatModeToggle} />;
  }

  // Render
  return (
    <Layout onChatModeToggle={handleChatModeToggle} isChatMode={isChatMode}>
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
      <ControlPanel
        isVoicePlaying={isVoicePlaying}
        showDialog={showDialog}
        currentIdlePattern={currentIdlePattern}
        currentActionPattern={currentActionPattern}
        onIdlePatternChange={setCurrentIdlePattern}
        onActionPatternChange={setCurrentActionPattern}
        onActionStart={handleActionStart}
      />
      <div className="credits">
        <p>VOICEVOX：ずんだもん</p>
        <p>立ち絵：<a href="https://x.com/sakamoto_ahr" target="_blank" rel="noopener noreferrer">坂本アヒル</a> 様</p>
      </div>
    </Layout>
  )
}

export default App
