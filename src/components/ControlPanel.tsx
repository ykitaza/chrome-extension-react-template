import { PatternSelector } from './PatternSelector';
import { spriteConfig } from '../config/sprites';

interface ControlPanelProps {
    isVoicePlaying: boolean;
    showDialog: boolean;
    currentIdlePattern: string;
    currentActionPattern: string;
    onIdlePatternChange: (pattern: string) => void;
    onActionPatternChange: (pattern: string) => void;
    onActionStart: () => void;
    isChatMode: boolean;
    onChatModeToggle: () => void;
}

export const ControlPanel = ({
    isVoicePlaying,
    showDialog,
    currentIdlePattern,
    currentActionPattern,
    onIdlePatternChange,
    onActionPatternChange,
    onActionStart,
    isChatMode,
    onChatModeToggle
}: ControlPanelProps) => (
    <div className="controls">
        <div className="pattern-controls">
            <PatternSelector
                id="idle-pattern"
                label="待機モーション"
                value={currentIdlePattern}
                options={Object.keys(spriteConfig.idle)}
                onChange={onIdlePatternChange}
                disabled={isVoicePlaying}
            />
            <PatternSelector
                id="action-pattern"
                label="アクション"
                value={currentActionPattern}
                options={Object.keys(spriteConfig.action)}
                onChange={onActionPatternChange}
                disabled={isVoicePlaying}
            />
        </div>
        <div className="action-controls">
            <button
                onClick={onActionStart}
                disabled={isVoicePlaying || showDialog || isChatMode}
            >
                アクション開始
            </button>
            <button
                onClick={onChatModeToggle}
                disabled={isVoicePlaying || showDialog}
                className={isChatMode ? 'active' : ''}
            >
                {isChatMode ? '通常モードに戻る' : '会話モードへ'}
            </button>
        </div>
    </div>
); 