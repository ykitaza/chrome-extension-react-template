import './Credits.css';

export const Credits = () => {
    return (
        <div className="credits">
            <h2>クレジット</h2>
            <div className="credits-content">
                <p>VOICEVOX：<a href="https://voicevox.hiroshiba.jp/" target="_blank" rel="noopener noreferrer">VOICEVOX</a>（開発：廣芝和之）</p>
                <p>キャラクター：ずんだもん（ＳＳＳ合同会社）</p>
                <p>音声合成：<a href="https://voicevox.su-shiki.com/su-shikiapis/" target="_blank" rel="noopener noreferrer">VOICEVOX Web API</a></p>
                <p>立ち絵：<a href="https://x.com/sakamoto_ahr" target="_blank" rel="noopener noreferrer">坂本アヒル</a> 様</p>
            </div>
        </div>
    );
}; 