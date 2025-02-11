// ローカルストレージのキー
const API_KEY_STORAGE_KEY = 'voicevox_api_key';

// APIキーの取得と設定
export function getVoicevoxApiKey(): string | null {
    return localStorage.getItem(API_KEY_STORAGE_KEY);
}

export function setVoicevoxApiKey(apiKey: string): void {
    localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
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
        intonationScale: (options.intonationScale ?? 1).toString(),
        speed: (options.speed ?? 1).toString(),
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