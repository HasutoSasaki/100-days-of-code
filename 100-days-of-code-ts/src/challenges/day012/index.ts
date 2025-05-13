/**
 * Day 12: キャッシュシステム - part 3
 * 
 * キャッシュのパフォーマンス測定
 */

import { SimpleCache, TTLCache } from '../day011';
import { LRUCache } from '../day010';

/**
 * パフォーマンス測定結果の型定義
 */
export interface PerformanceResult {
    operation: string;
    totalTime: number;
    averageTime: number;
    operationsPerSecond: number;
    iterations: number;
}

/**
 * キャッシュのパフォーマンス測定用クラス
 */
export class CachePerformanceTester {
    /**
     * 指定された操作のパフォーマンスを測定する
     * 
     * @param operation 測定する操作の名前
     * @param fn 測定する関数
     * @param iterations 繰り返し回数
     * @returns パフォーマンス測定結果
     */
    static measureOperation(
        operation: string,
        fn: () => void,
        iterations: number = 10000
    ): PerformanceResult {
        const start = performance.now();

        for (let i = 0; i < iterations; i++) {
            fn();
        }

        const end = performance.now();
        const totalTime = end - start;
        const averageTime = totalTime / iterations;
        const operationsPerSecond = Math.floor(iterations / (totalTime / 1000));

        return {
            operation,
            totalTime,
            averageTime,
            operationsPerSecond,
            iterations
        };
    }

    /**
     * シンプルなキャッシュのパフォーマンスを測定する
     * 
     * @param cache 測定するキャッシュインスタンス
     * @param dataSize 測定に使用するデータサイズ
     * @param iterations 各操作の繰り返し回数
     * @returns パフォーマンス測定結果の配列
     */
    static measureSimpleCache<K extends string | number, V>(
        cache: SimpleCache<K, V> | TTLCache<K, V>,
        dataSize: number = 1000,
        iterations: number = 10000
    ): PerformanceResult[] {
        const results: PerformanceResult[] = [];
        const testKeys = Array.from({ length: dataSize }, (_, i) => `key${i}` as K);
        const testValues = Array.from({ length: dataSize }, (_, i) => `value${i}` as unknown as V);

        // set操作の測定
        results.push(
            this.measureOperation(
                'set',
                () => {
                    const randomIndex = Math.floor(Math.random() * dataSize);
                    cache.set(testKeys[randomIndex], testValues[randomIndex]);
                },
                iterations
            )
        );

        // キャッシュにデータをロード
        for (let i = 0; i < dataSize; i++) {
            cache.set(testKeys[i], testValues[i]);
        }

        // get操作の測定（キャッシュヒット）
        results.push(
            this.measureOperation(
                'get (hit)',
                () => {
                    const randomIndex = Math.floor(Math.random() * dataSize);
                    cache.get(testKeys[randomIndex]);
                },
                iterations
            )
        );

        // get操作の測定（キャッシュミス）
        results.push(
            this.measureOperation(
                'get (miss)',
                () => {
                    cache.get(`nonexistent${Math.random()}` as K);
                },
                iterations
            )
        );

        // delete操作の測定
        // 注: このテストでは、削除後に再度追加する必要があります
        const deleteAndRestoreKeys: K[] = [];
        results.push(
            this.measureOperation(
                'delete',
                () => {
                    const randomIndex = Math.floor(Math.random() * dataSize);
                    const key = testKeys[randomIndex];
                    if (cache.has(key)) {
                        cache.delete(key);
                        deleteAndRestoreKeys.push(key);
                    }
                },
                Math.min(iterations, dataSize) // データサイズより多く削除できないため
            )
        );

        // 削除したキーを復元
        for (const key of deleteAndRestoreKeys) {
            const index = testKeys.indexOf(key);
            if (index !== -1) {
                cache.set(key, testValues[index]);
            }
        }

        return results;
    }

    /**
     * LRUキャッシュのパフォーマンスを測定する
     * 
     * @param cache 測定するLRUキャッシュインスタンス
     * @param dataSize 測定に使用するデータサイズ
     * @param iterations 各操作の繰り返し回数
     * @returns パフォーマンス測定結果の配列
     */
    static measureLRUCache<K, V>(
        cache: LRUCache<K, V>,
        dataSize: number = 1000,
        iterations: number = 10000
    ): PerformanceResult[] {
        const results: PerformanceResult[] = [];
        const testKeys = Array.from({ length: dataSize }, (_, i) => `key${i}` as unknown as K);
        const testValues = Array.from({ length: dataSize }, (_, i) => `value${i}` as unknown as V);

        // set操作の測定
        results.push(
            this.measureOperation(
                'set',
                () => {
                    const randomIndex = Math.floor(Math.random() * dataSize);
                    cache.set(testKeys[randomIndex], testValues[randomIndex]);
                },
                iterations
            )
        );

        // キャッシュにデータをロード（容量制限があるため一部だけ）
        const cacheCapacity = Math.min(dataSize, cache.size !== undefined ? cache.size : dataSize / 2);
        for (let i = 0; i < cacheCapacity; i++) {
            cache.set(testKeys[i], testValues[i]);
        }

        // get操作の測定（キャッシュヒット）
        results.push(
            this.measureOperation(
                'get (hit)',
                () => {
                    const randomIndex = Math.floor(Math.random() * cacheCapacity);
                    cache.get(testKeys[randomIndex]);
                },
                iterations
            )
        );

        // get操作の測定（キャッシュミス）
        results.push(
            this.measureOperation(
                'get (miss)',
                () => {
                    cache.get(`nonexistent${Math.random()}` as unknown as K);
                },
                iterations
            )
        );

        // eviction (追い出し) パフォーマンスの測定
        // キャパシティを超えるセットオペレーションを実行
        results.push(
            this.measureOperation(
                'eviction',
                () => {
                    const newKey = `newKey${Math.random()}` as unknown as K;
                    const newValue = `newValue${Math.random()}` as unknown as V;
                    cache.set(newKey, newValue);
                },
                iterations
            )
        );

        return results;
    }

    /**
     * TTLキャッシュのパフォーマンスを測定する
     * 
     * @param cache 測定するTTLキャッシュインスタンス
     * @param dataSize 測定に使用するデータサイズ
     * @param iterations 各操作の繰り返し回数
     * @returns パフォーマンス測定結果の配列
     */
    static measureTTLCache<K extends string | number, V>(
        cache: TTLCache<K, V>,
        dataSize: number = 1000,
        iterations: number = 10000
    ): PerformanceResult[] {
        // SimpleCache の測定を基本に実装
        const results = this.measureSimpleCache(cache, dataSize, iterations);

        // 有効期限の延長操作を測定
        const testKeys = Array.from({ length: dataSize }, (_, i) => `key${i}` as K);

        results.push(
            this.measureOperation(
                'extend',
                () => {
                    const randomIndex = Math.floor(Math.random() * dataSize);
                    cache.extend(testKeys[randomIndex]);
                },
                iterations
            )
        );

        // クリーンアップ操作を測定
        results.push(
            this.measureOperation(
                'cleanup',
                () => {
                    cache.cleanup();
                },
                100 // クリーンアップはコストが高いので少ない回数で測定
            )
        );

        return results;
    }

    /**
     * 複数のキャッシュ実装を比較する
     * 
     * @param caches 比較するキャッシュの名前と測定結果のマップ
     * @param operation 比較する操作名
     * @returns 比較結果の文字列
     */
    static compareResults(
        caches: Record<string, PerformanceResult[]>,
        operation: string
    ): string {
        let resultText = `${operation} 操作の比較:\n`;

        const operationResults: Record<string, PerformanceResult> = {};

        for (const [cacheName, results] of Object.entries(caches)) {
            const opResult = results.find(r => r.operation === operation);
            if (opResult) {
                operationResults[cacheName] = opResult;
            }
        }

        // パフォーマンス順（オペレーション/秒の降順）にソート
        const sortedResults = Object.entries(operationResults).sort(
            (a, b) => b[1].operationsPerSecond - a[1].operationsPerSecond
        );

        for (const [cacheName, result] of sortedResults) {
            const opsPerSec = result.operationsPerSecond.toLocaleString();
            const avgTime = result.averageTime.toFixed(6);

            resultText += `${cacheName}: ${opsPerSec} ops/sec (平均 ${avgTime} ms)\n`;
        }

        return resultText;
    }

    /**
     * パフォーマンス測定結果をテーブル形式で出力する
     * 
     * @param results パフォーマンス測定結果の配列
     * @returns テーブル形式の文字列
     */
    static formatResults(results: PerformanceResult[]): string {
        let output = "操作\t\t| 合計時間 (ms)\t| 平均時間 (ms)\t| 操作/秒\t| 繰り返し回数\n";
        output += "----------------+---------------+---------------+---------------+----------------\n";

        for (const result of results) {
            output += `${result.operation.padEnd(16, ' ')}| `;
            output += `${result.totalTime.toFixed(2).padEnd(15, ' ')}| `;
            output += `${result.averageTime.toFixed(6).padEnd(15, ' ')}| `;
            output += `${result.operationsPerSecond.toLocaleString().padEnd(15, ' ')}| `;
            output += `${result.iterations.toLocaleString()}\n`;
        }

        return output;
    }
}

/**
 * キャッシュパフォーマンスのベンチマーク実行関数
 * 簡単に異なるキャッシュ実装のパフォーマンスを比較できる
 */
export function runCacheBenchmark(
    dataSize: number = 10000,
    iterations: number = 100000
): void {
    console.log(`キャッシュパフォーマンス測定 (データサイズ: ${dataSize}, 繰り返し: ${iterations})\n`);

    // SimpleCache のパフォーマンス測定
    const simpleCache = new SimpleCache<string, string>();
    const simpleCacheResults = CachePerformanceTester.measureSimpleCache(
        simpleCache,
        dataSize,
        iterations
    );
    console.log("SimpleCache のパフォーマンス:");
    console.log(CachePerformanceTester.formatResults(simpleCacheResults));

    // LRUCache のパフォーマンス測定
    const lruCache = new LRUCache<string, string>(Math.floor(dataSize / 2)); // 半分のサイズに設定
    const lruCacheResults = CachePerformanceTester.measureLRUCache(
        lruCache,
        dataSize,
        iterations
    );
    console.log("LRUCache のパフォーマンス:");
    console.log(CachePerformanceTester.formatResults(lruCacheResults));

    // TTLCache のパフォーマンス測定
    const ttlCache = new TTLCache<string, string>(60000); // 1分の TTL
    const ttlCacheResults = CachePerformanceTester.measureTTLCache(
        ttlCache,
        dataSize,
        iterations
    );
    console.log("TTLCache のパフォーマンス:");
    console.log(CachePerformanceTester.formatResults(ttlCacheResults));

    // 各操作のキャッシュ間比較
    console.log("\n各キャッシュ実装の比較:");
    const allResults = {
        'SimpleCache': simpleCacheResults,
        'LRUCache': lruCacheResults,
        'TTLCache': ttlCacheResults
    };

    console.log(CachePerformanceTester.compareResults(allResults, 'set'));
    console.log(CachePerformanceTester.compareResults(allResults, 'get (hit)'));
    console.log(CachePerformanceTester.compareResults(allResults, 'get (miss)'));
}