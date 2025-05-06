/**
 * Day 5: 非同期処理ユーティリティ
 * TypeScriptでの様々な非同期処理パターンの実装
 */

/**
 * Promise.allのカスタム実装
 * 全てのPromiseが解決されるまで待ち、結果を配列として返す
 * 一つでも拒否された場合は、その時点で拒否される
 */
export function promiseAll<T>(promises: Promise<T>[]): Promise<T[]> {
    return new Promise((resolve, reject) => {
        // 空の配列の場合は空の結果を返す
        if (promises.length === 0) {
            resolve([]);
            return;
        }

        const results: T[] = new Array(promises.length);
        let resolvedCount = 0;
        let rejected = false;

        promises.forEach((promise, index) => {
            promise
                .then((result) => {
                    if (rejected) return;

                    results[index] = result;
                    resolvedCount++;

                    if (resolvedCount === promises.length) {
                        resolve(results);
                    }
                })
                .catch((error) => {
                    if (!rejected) {
                        rejected = true;
                        reject(error);
                    }
                });
        });
    });
}

/**
 * Promise.raceのカスタム実装
 * 最初に解決または拒否されたPromiseの結果を返す
 */
export function promiseRace<T>(promises: Promise<T>[]): Promise<T> {
    return new Promise((resolve, reject) => {
        if (promises.length === 0)
            return reject(new Error('空の配列が渡されました'));

        promises.forEach((promise) => {
            promise.then(resolve).catch(reject);
        });
    });
}

/**
 * タイムアウト機能付きPromise
 * 指定時間内にPromiseが解決されない場合はタイムアウトエラーを投げる
 */
export function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
    const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
            reject(new Error(`操作がタイムアウトしました (${timeoutMs}ms)`));
        }, timeoutMs);
    });

    return promiseRace([promise, timeoutPromise]);
}

/**
 * リトライ機能
 * Promiseが失敗した場合に指定回数まで再試行する
 */
export function retry<T>(
    fn: () => Promise<T>,
    options: {
        maxRetries?: number;
        delay?: number;
        onRetry?: (error: Error, retryCount: number) => void;
    } = {}
): Promise<T> {
    const { maxRetries = 3, delay = 300, onRetry } = options;
    const INITIAL_RETRY_COUNT = 0;

    return new Promise<T>((resolve, reject) => {
        const attempt = (retryCount: number): void => {
            fn()
                .then(resolve)
                .catch((error: Error) => {
                    // 最大リトライ回数に達した
                    if (retryCount >= maxRetries) return reject(error);

                    // リトライ前のコールバック
                    if (onRetry) {
                        onRetry(error, retryCount + 1);
                    }

                    // 遅延後に再試行
                    setTimeout(() => {
                        attempt(retryCount + 1);
                    }, delay);
                });
        };

        attempt(INITIAL_RETRY_COUNT);
    });
}

/**
 * 並列処理数を制限するPromiseキュー
 */
export class PromiseQueue {
    private queue: Array<() => Promise<unknown>> = [];
    private activeCount = 0;
    private readonly concurrency: number;

    /**
     * @param concurrency 同時に実行できる最大プロミス数
     */
    constructor(concurrency: number) {
        if (concurrency < 1)
            throw new Error('並列数は1以上である必要があります');

        this.concurrency = concurrency;
    }

    /**
     * キューにタスクを追加する
     */
    add<T>(fn: () => Promise<T>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            // 実行関数をラップして結果を取得
            const wrappedFn = async (): Promise<unknown> => {
                try {
                    const result = await fn();
                    resolve(result);
                    return result;
                } catch (error) {
                    reject(error);
                    throw error;
                } finally {
                    // タスク終了時に次のタスクを実行
                    this.activeCount--;
                    this.next();
                }
            };

            // キューに追加
            this.queue.push(wrappedFn);

            // 可能であれば即時実行
            this.next();
        });
    }

    /**
     * キュー内の次のタスクを実行
     */
    private next(): void {
        // キューが空またはアクティブなタスク数が制限を超えている場合は何もしない
        if (this.activeCount >= this.concurrency) return;
        if (this.queue.length === 0) return;

        const fn = this.queue.shift();
        if (!fn) return;

        this.activeCount++;
        fn().catch(() => {
            // エラーは各タスクのPromiseで処理するため、ここでは無視
        });
    }

    get size(): number {
        return this.queue.length;
    }

    get active(): number {
        return this.activeCount;
    }

    clear(): void {
        this.queue = [];
    }
}