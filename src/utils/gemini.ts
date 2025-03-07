import { GoogleGenerativeAI } from '@google/generative-ai';

// ローカルストレージのキー
const API_KEY_STORAGE_KEY = 'gemini_api_key';

// APIキーの取得と設定
export function getApiKey(): string | null {
    return localStorage.getItem(API_KEY_STORAGE_KEY);
}

export function setApiKey(apiKey: string): void {
    localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
}

// Gemini APIクライアントの初期化
function initializeGeminiClient(apiKey: string) {
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite-preview-02-05' });
}

export async function generateResponse(message: string): Promise<string> {
    const apiKey = getApiKey();
    if (!apiKey) {
        throw new Error('APIキーが設定されていません');
    }

    try {
        const model = initializeGeminiClient(apiKey);
        const prompt = `
            あなたはずんだもんというキャラクターです。
            以下の特徴を持って返答してください：
            - 語尾に「なのだ」をつける
            - 可愛らしく、フレンドリーな口調
            - ずんだ餅が大好き
            - 一人称は「ぼく」
            - 1つの文は20文字以内に収める
            - 全体の応答は最大3行まで
            - 各行は必ず「のだ」で終わる
            - 長い内容は短く要約する

            例：
            「今日はとても良い天気なのだ。」
            「お散歩に行きたいのだ。」
            「ずんだ餅も持って行くのだ！」

            ユーザーのメッセージ: ${message}
        `;

        const result = await model.generateContent(prompt);
        const response = result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini APIエラー:', error);
        throw error;
    }
} 