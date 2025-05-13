/**
 * Day 13: シンプルなステート管理ライブラリ - イミュータブルなステート更新
 * 
 * このライブラリはステート（状態）を管理するためのシンプルな実装です。
 * イミュータブル（不変）な方法でステートを更新し、型安全な操作を提供します。
 */

/**
 * ステート管理を行うStore（ストア）クラス
 * @template T ステートの型
 */
export class Store<T> {
    private state: T;
    private listeners: ((state: T) => void)[] = [];

    /**
     * ストアを初期化する
     * @param initialState 初期ステート
     */
    constructor(initialState: T) {
        this.state = initialState;
    }

    /**
     * 現在のステートを取得する
     * @returns 現在のステート
     */
    getState(): T {
        return this.state;
    }

    /**
     * ステートを更新する関数
     * @param updater 新しいステートまたはステート更新関数
     */
    setState(updater: T | ((currentState: T) => T)): void {
        // 関数が渡された場合は現在のステートを引数に実行する
        const newState = typeof updater === 'function'
            ? (updater as ((currentState: T) => T))(this.state)
            : updater;

        // イミュータブルな更新のため、前回と同じオブジェクト参照の場合は何もしない
        if (newState === this.state) {
            return;
        }

        // ステートを更新
        this.state = newState;

        // すべてのリスナーに新しいステートを通知
        this.notifyListeners();
    }

    /**
     * ステート変更時のリスナーを登録する
     * @param listener ステート変更時に呼び出されるリスナー関数
     * @returns リスナーの登録解除用関数
     */
    subscribe(listener: (state: T) => void): () => void {
        this.listeners.push(listener);

        // 登録解除用の関数を返す
        return () => {
            const index = this.listeners.indexOf(listener);
            if (index !== -1) {
                this.listeners.splice(index, 1);
            }
        };
    }

    /**
     * 全てのリスナーに通知する内部メソッド
     */
    private notifyListeners(): void {
        this.listeners.forEach(listener => listener(this.state));
    }
}

/**
 * イミュータブルなオブジェクト更新を行うヘルパー関数
 * @param obj 更新対象のオブジェクト
 * @param updates 適用する変更
 * @returns 更新された新しいオブジェクト
 */
export function updateObject<T extends object>(obj: T, updates: Partial<T>): T {
    return { ...obj, ...updates };
}

/**
 * イミュータブルな配列更新を行うヘルパー関数
 * @param array 更新対象の配列
 * @param updater 配列を変更する関数
 * @returns 更新された新しい配列
 */
export function updateArray<T>(array: T[], updater: (arr: T[]) => T[]): T[] {
    // 配列のコピーを作成して更新
    return updater([...array]);
}