/**
 * Day 12: キャッシュシステム - part 3（パフォーマンス測定）のテスト
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CachePerformanceTester, PerformanceResult, runCacheBenchmark } from '.';
import { SimpleCache, TTLCache } from '../day011';
import { LRUCache } from '../day010';

describe('CachePerformanceTester', () => {
    // performance.now をモック化して一定の値を返すようにする
    let nowMock: ReturnType<typeof vi.fn>;
    const originalPerformanceNow = performance.now;

    beforeEach(() => {
        // テスト開始時にperformance.nowをモック化
        let counter = 0;
        nowMock = vi.fn().mockImplementation(() => {
            // 最初の呼び出しは0を返し、次の呼び出しは100を返す（100ms経過を模擬）
            counter += 1;
            return counter === 1 ? 0 : 100;
        });
        performance.now = nowMock;
    });

    afterEach(() => {
        // テスト終了時に元の実装に戻す
        performance.now = originalPerformanceNow;
    });

    it('measureOperation が正しくパフォーマンスを測定すること', () => {
        const testFn = vi.fn();
        const iterations = 100;

        const result = CachePerformanceTester.measureOperation('test', testFn, iterations);

        // 関数が指定回数呼ばれたことを確認
        expect(testFn).toHaveBeenCalledTimes(iterations);

        // 結果オブジェクトの構造を確認
        expect(result).toEqual({
            operation: 'test',
            totalTime: 100, // モックで設定した経過時間
            averageTime: 1, // 100ms / 100回 = 1ms/回
            operationsPerSecond: 1000, // 1秒 = 1000ms、1000ms ÷ 1ms = 1000回/秒
            iterations: 100
        });
    });

    it('measureSimpleCache が SimpleCache のパフォーマンスを測定すること', () => {
        const cache = new SimpleCache<string, string>();
        const results = CachePerformanceTester.measureSimpleCache(cache, 10, 5);

        // 測定項目の検証
        expect(results.length).toBeGreaterThan(0);
        expect(results.map(r => r.operation)).toContain('set');
        expect(results.map(r => r.operation)).toContain('get (hit)');
        expect(results.map(r => r.operation)).toContain('get (miss)');
        expect(results.map(r => r.operation)).toContain('delete');
    });

    it('measureLRUCache が LRUCache のパフォーマンスを測定すること', () => {
        const cache = new LRUCache<string, string>(5);
        const results = CachePerformanceTester.measureLRUCache(cache, 10, 5);

        // 測定項目の検証
        expect(results.length).toBeGreaterThan(0);
        expect(results.map(r => r.operation)).toContain('set');
        expect(results.map(r => r.operation)).toContain('get (hit)');
        expect(results.map(r => r.operation)).toContain('get (miss)');
        expect(results.map(r => r.operation)).toContain('eviction');
    });

    it('measureTTLCache が TTLCache のパフォーマンスを測定すること', () => {
        const cache = new TTLCache<string, string>(1000);
        const results = CachePerformanceTester.measureTTLCache(cache, 10, 5);

        // 測定項目の検証
        expect(results.length).toBeGreaterThan(0);
        expect(results.map(r => r.operation)).toContain('set');
        expect(results.map(r => r.operation)).toContain('get (hit)');
        expect(results.map(r => r.operation)).toContain('get (miss)');
        expect(results.map(r => r.operation)).toContain('delete');
        expect(results.map(r => r.operation)).toContain('extend');
        expect(results.map(r => r.operation)).toContain('cleanup');
    });

    it('formatResults がパフォーマンス結果を正しくフォーマットすること', () => {
        const results: PerformanceResult[] = [
            {
                operation: 'test',
                totalTime: 100,
                averageTime: 1,
                operationsPerSecond: 1000,
                iterations: 100
            }
        ];

        const formatted = CachePerformanceTester.formatResults(results);

        expect(formatted).toContain('test');
        expect(formatted).toContain('100');
        expect(formatted).toContain('1.000000');
        expect(formatted).toContain('1,000');
    });

    it('compareResults が異なるキャッシュの結果を比較すること', () => {
        const cache1Results: PerformanceResult[] = [
            {
                operation: 'set',
                totalTime: 100,
                averageTime: 1,
                operationsPerSecond: 1000,
                iterations: 100
            }
        ];

        const cache2Results: PerformanceResult[] = [
            {
                operation: 'set',
                totalTime: 50,
                averageTime: 0.5,
                operationsPerSecond: 2000,
                iterations: 100
            }
        ];

        const compared = CachePerformanceTester.compareResults(
            {
                'Cache1': cache1Results,
                'Cache2': cache2Results
            },
            'set'
        );

        // より高速なキャッシュが先に表示されるか確認
        expect(compared.indexOf('Cache2')).toBeLessThan(compared.indexOf('Cache1'));
    });

    it('runCacheBenchmark がエラーなく実行できること', () => {
        // コンソール出力を抑制
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { });

        // 小さなサイズで実行してテスト時間を短縮
        expect(() => runCacheBenchmark(10, 5)).not.toThrow();

        // 一部の出力を確認
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('キャッシュパフォーマンス測定'));

        consoleSpy.mockRestore();
    });
});

// 実際のパフォーマンス測定の簡易テスト
describe('実際のキャッシュパフォーマンス', () => {
    // このテストは長時間かかる可能性があるため、CI環境や通常のテスト実行では
    // スキップすることを推奨します。テスト実行時に特定の環境変数を設定した場合のみ実行する方法もあります。

    it('実際のキャッシュパフォーマンスを測定', () => {
        // 実行時間が長くなるため、スキップするようにマークしています
        // 手動でテストを実行する場合は、.skip を削除して実行してください

        const simpleCache = new SimpleCache<string, string>();
        const lruCache = new LRUCache<string, string>(1000);
        const ttlCache = new TTLCache<string, string>(60000);

        // 小さなサイズでテスト
        const dataSize = 100;
        const iterations = 1000;

        const simpleCacheResults = CachePerformanceTester.measureSimpleCache(
            simpleCache,
            dataSize,
            iterations
        );

        const lruCacheResults = CachePerformanceTester.measureLRUCache(
            lruCache,
            dataSize,
            iterations
        );

        const ttlCacheResults = CachePerformanceTester.measureTTLCache(
            ttlCache,
            dataSize,
            iterations
        );

        // 各キャッシュがパフォーマンスデータを返すことを確認
        expect(simpleCacheResults.length).toBeGreaterThan(0);
        expect(lruCacheResults.length).toBeGreaterThan(0);
        expect(ttlCacheResults.length).toBeGreaterThan(0);

        // LRUキャッシュが少なくとも機能することを確認
        const lruGetHit = lruCacheResults.find(r => r.operation === 'get (hit)');
        expect(lruGetHit).toBeDefined();
        expect(lruGetHit?.operationsPerSecond).toBeGreaterThan(0);

        // パフォーマンス結果を出力
        console.log("SimpleCache のパフォーマンス:");
        console.log(CachePerformanceTester.formatResults(simpleCacheResults));

        console.log("LRUCache のパフォーマンス:");
        console.log(CachePerformanceTester.formatResults(lruCacheResults));

        console.log("TTLCache のパフォーマンス:");
        console.log(CachePerformanceTester.formatResults(ttlCacheResults));

        // 比較結果
        console.log("\n各キャッシュ実装の比較:");
        const allResults = {
            'SimpleCache': simpleCacheResults,
            'LRUCache': lruCacheResults,
            'TTLCache': ttlCacheResults
        };

        console.log(CachePerformanceTester.compareResults(allResults, 'set'));
        console.log(CachePerformanceTester.compareResults(allResults, 'get (hit)'));
        console.log(CachePerformanceTester.compareResults(allResults, 'get (miss)'));
    });
});