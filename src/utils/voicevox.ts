// ローカルストレージのキー
const API_KEY_STORAGE_KEY = 'voicevox_api_key';

// デフォルトのAPIキー
const DEFAULT_API_KEY = 'J40995411028387';

// APIキーの取得と設定
export function getVoicevoxApiKey(): string {
    const savedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    return savedKey || DEFAULT_API_KEY;
}

export function setVoicevoxApiKey(apiKey: string): void {
    localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
}

// APIキーをリセット（デフォルトに戻す）
export function resetVoicevoxApiKey(): void {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
}

// 音声合成APIのベースURL
const BASE_URL = 'https://deprecatedapis.tts.quest/v2/voicevox';

interface VoicevoxOptions {
    speaker?: number;
    pitch?: number;
    intonationScale?: number;
    speed?: number;
}

export async function generateVoice(text: string, options: VoicevoxOptions = {}): Promise<string> {
    const apiKey = getVoicevoxApiKey();
    if (!apiKey) {
        throw new Error('VOICEVOXのAPIキーが設定されていません');
    }

    const params = new URLSearchParams({
        key: apiKey,
        text,
        speaker: (options.speaker ?? 3).toString(), // ずんだもん（あまあま）
        pitch: (options.pitch ?? 0).toString(),
        intonationScale: (options.intonationScale ?? 1.2).toString(), // イントネーションを少し強く
        speed: (options.speed ?? 1.4).toString(), // スピードを1.4倍に
    });

    try {
        const response = await fetch(`${BASE_URL}/audio/?${params.toString()}`);

        if (!response.ok) {
            const text = await response.text();
            if (text === 'invalidApiKey') {
                throw new Error('無効なAPIキーです');
            } else if (text === 'notEnoughPoints') {
                throw new Error('APIポイントが不足しています');
            } else {
                throw new Error('音声の生成に失敗しました');
            }
        }

        const audioUrl = URL.createObjectURL(await response.blob());
        return audioUrl;
    } catch (error) {
        console.error('VOICEVOX APIエラー:', error);
        throw error;
    }
} 