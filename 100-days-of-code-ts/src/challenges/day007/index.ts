/**
 * シンプルなイベントエミッター
 * 
 * このモジュールは型安全なイベントの登録、発火、解除の機能を提供します。
 * - イベント登録/解除
 * - 一度だけ実行するイベント
 * - 非同期イベント対応
 */

// イベントリスナーの型定義
type EventListener<T> = (data: T) => void | Promise<void>;

// イベントエミッターのインターフェース
export interface EventEmitter {
    /**
     * イベントリスナーを登録します
     * @param eventName イベント名
     * @param listener リスナー関数
     */
    on<T>(eventName: string, listener: EventListener<T>): void;

    /**
     * 一度だけ実行されるイベントリスナーを登録します
     * @param eventName イベント名
     * @param listener リスナー関数
     */
    once<T>(eventName: string, listener: EventListener<T>): void;

    /**
     * イベントリスナーを解除します
     * @param eventName イベント名
     * @param listener 解除するリスナー関数（省略時は該当イベントの全てのリスナーを解除）
     */
    off<T>(eventName: string, listener?: EventListener<T>): void;

    /**
     * イベントを発火します
     * @param eventName イベント名
     * @param data イベントデータ
     * @returns 発火したリスナーの実行結果Promise
     */
    emit<T>(eventName: string, data: T): Promise<void>;

    /**
     * 登録されているすべてのイベントリスナーを解除します
     */
    removeAllListeners(): void;

    /**
     * 指定されたイベントのリスナー数を取得します
     * @param eventName イベント名
     */
    listenerCount(eventName: string): number;
}

// リスナー情報を格納する型
interface ListenerInfo<T> {
    listener: EventListener<T>;
    once: boolean;
}

// EventEmitterの実装
export class SimpleEventEmitter implements EventEmitter {
    private events: Map<string, ListenerInfo<any>[]> = new Map();

    on<T>(eventName: string, listener: EventListener<T>): void {
        this.addListener(eventName, listener, false);
    }

    once<T>(eventName: string, listener: EventListener<T>): void {
        this.addListener(eventName, listener, true);
    }

    off<T>(eventName: string, listener?: EventListener<T>): void {
        if (!this.events.has(eventName)) return;

        const listeners = this.events.get(eventName)!;

        if (!listener) {
            // リスナーが指定されていない場合は、該当イベントの全リスナーを削除
            this.events.delete(eventName);
            return;
        }

        // 指定されたリスナーのみを削除
        const filteredListeners = listeners.filter(info => info.listener !== listener);

        if (filteredListeners.length === 0) {
            this.events.delete(eventName);
        } else {
            this.events.set(eventName, filteredListeners);
        }
    }

    async emit<T>(eventName: string, data: T): Promise<void> {
        if (!this.events.has(eventName)) return;

        const listeners = this.events.get(eventName)!;
        const onceListeners: ListenerInfo<T>[] = [];

        // 全リスナーの実行結果を格納する配列
        const promises: Promise<void>[] = [];

        // 各リスナーを実行し、一度だけのリスナーを記録
        for (const listenerInfo of listeners) {
            const result = listenerInfo.listener(data);

            // Promise結果を配列に追加
            if (result instanceof Promise) {
                promises.push(result);
            }

            // onceリスナーを記録
            if (listenerInfo.once) {
                onceListeners.push(listenerInfo);
            }
        }

        // 全てのPromiseが解決するのを待つ
        await Promise.all(promises);

        // onceリスナーを削除
        if (onceListeners.length > 0) {
            const remainingListeners = listeners.filter(
                info => !onceListeners.includes(info)
            );

            if (remainingListeners.length === 0) {
                this.events.delete(eventName);
            } else {
                this.events.set(eventName, remainingListeners);
            }
        }
    }

    removeAllListeners(): void {
        this.events.clear();
    }

    listenerCount(eventName: string): number {
        return this.events.has(eventName) ? this.events.get(eventName)!.length : 0;
    }

    private addListener<T>(eventName: string, listener: EventListener<T>, once: boolean): void {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }

        const listeners = this.events.get(eventName)!;
        listeners.push({ listener, once });
    }
}

// デフォルトのEventEmitterインスタンスをエクスポート
export default new SimpleEventEmitter();