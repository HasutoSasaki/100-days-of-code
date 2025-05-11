import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { FileStorage, MemoryStorage, SimpleCache, TTLCache } from './index';
import * as fs from 'fs';
import * as path from 'path';
import { tmpdir } from 'os';

describe('ストレージ実装のテスト', () => {
    describe('MemoryStorage', () => {
        it('データの保存と読み込みができる', async () => {
            const storage = new MemoryStorage<{ test: string }>();
            const data = { test: 'value' };

            await storage.save(data);
            const loaded = await storage.load();

            expect(loaded).toEqual(data);
        });

        it('clearでデータが消去される', async () => {
            const storage = new MemoryStorage<{ test: string }>();
            await storage.save({ test: 'value' });

            await storage.clear();
            const loaded = await storage.load();

            expect(loaded).toBeNull();
        });
    });

    describe('FileStorage', () => {
        const testDir = path.join(tmpdir(), 'test-cache-' + Date.now());
        const testFile = path.join(testDir, 'test.json');

        afterEach(async () => {
            try {
                await fs.promises.rm(testDir, { recursive: true, force: true });
            } catch (err) {
                // ディレクトリが存在しない場合は無視
            }
        });

        it('データの保存と読み込みができる', async () => {
            const storage = new FileStorage<{ test: string }>(testFile);
            const data = { test: 'value' };

            await storage.save(data);
            const loaded = await storage.load();

            expect(loaded).toEqual(data);
        });

        it('ファイルが存在しない場合はnullが返される', async () => {
            const nonExistentFile = path.join(testDir, 'non-existent.json');
            const storage = new FileStorage<{ test: string }>(nonExistentFile);

            const loaded = await storage.load();

            expect(loaded).toBeNull();
        });

        it('clearでファイルが削除される', async () => {
            const storage = new FileStorage<{ test: string }>(testFile);
            await storage.save({ test: 'value' });

            await storage.clear();
            const loaded = await storage.load();

            expect(loaded).toBeNull();
        });
    });
});

describe('SimpleCache', () => {
    let storage: MemoryStorage<Record<string, number>>;
    let cache: SimpleCache<string, number>;

    beforeEach(() => {
        storage = new MemoryStorage<Record<string, number>>();
        cache = new SimpleCache<string, number>(storage);
    });

    it('基本的なキャッシュ操作', () => {
        cache.set('a', 1);
        cache.set('b', 2);

        expect(cache.get('a')).toBe(1);
        expect(cache.get('b')).toBe(2);
        expect(cache.size).toBe(2);
    });

    it('キーの存在チェック', () => {
        cache.set('a', 1);

        expect(cache.has('a')).toBe(true);
        expect(cache.has('b')).toBe(false);
    });

    it('キーの削除', () => {
        cache.set('a', 1);
        cache.set('b', 2);

        const result = cache.delete('a');

        expect(result).toBe(true);
        expect(cache.get('a')).toBeUndefined();
        expect(cache.size).toBe(1);
    });

    it('キャッシュのクリア', () => {
        cache.set('a', 1);
        cache.set('b', 2);

        cache.clear();

        expect(cache.size).toBe(0);
        expect(cache.get('a')).toBeUndefined();
        expect(cache.get('b')).toBeUndefined();
    });

    it('ストレージへの保存と読み込み', async () => {
        cache.set('a', 1);
        cache.set('b', 2);

        await cache.save();

        const newCache = new SimpleCache<string, number>(storage);
        const loaded = await newCache.load();

        expect(loaded).toBe(true);
        expect(newCache.get('a')).toBe(1);
        expect(newCache.get('b')).toBe(2);
    });
});

describe('TTLCache', () => {
    let storage: MemoryStorage<Record<string, any>>;
    let cache: TTLCache<string, number>;
    const defaultTTL = 100; // 100ミリ秒

    beforeEach(() => {
        storage = new MemoryStorage();
        cache = new TTLCache<string, number>(defaultTTL, storage);
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('有効期限内のアイテムにアクセスできる', () => {
        cache.set('a', 1);

        expect(cache.get('a')).toBe(1);
    });

    it('有効期限切れのアイテムは取得できない', () => {
        cache.set('a', 1);

        vi.advanceTimersByTime(defaultTTL + 1);

        expect(cache.get('a')).toBeUndefined();
    });

    it('異なるTTLを設定できる', () => {
        cache.set('a', 1, 50);
        cache.set('b', 2, 200);

        vi.advanceTimersByTime(100);

        expect(cache.get('a')).toBeUndefined();
        expect(cache.get('b')).toBe(2);
    });

    it('キーの有効期限を延長できる', () => {
        cache.set('a', 1);

        vi.advanceTimersByTime(50);
        const extended = cache.extend('a', 100);

        expect(extended).toBe(true);
        vi.advanceTimersByTime(80);
        expect(cache.get('a')).toBe(1);
    });

    it('cleanup()で期限切れのアイテムが削除される', () => {
        cache.set('a', 1, 50);
        cache.set('b', 2, 200);

        vi.advanceTimersByTime(100);
        cache.cleanup();

        expect(cache.has('a')).toBe(false);
        expect(cache.has('b')).toBe(true);
    });

    it('ストレージへの保存と読み込み', async () => {
        cache.set('a', 1);

        await cache.save();

        const newCache = new TTLCache<string, number>(defaultTTL, storage);
        const loaded = await newCache.load();

        expect(loaded).toBe(true);
        expect(newCache.get('a')).toBe(1);
    });
});