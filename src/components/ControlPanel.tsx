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
}

export const ControlPanel = ({
    isVoicePlaying,
    showDialog,
    currentIdlePattern,
    currentActionPattern,
    onIdlePatternChange,
    onActionPatternChange,
    onActionStart
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
        <button
            onClick={onActionStart}
            disabled={isVoicePlaying || showDialog}
        >
            アクション開始
        </button>
    </div>
); 