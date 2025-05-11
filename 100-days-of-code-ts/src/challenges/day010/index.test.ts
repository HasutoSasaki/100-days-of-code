import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LRUCache, TTLCache } from './index';

describe('LRUCache', () => {
    let cache: LRUCache<string, number>;

    beforeEach(() => {
        // 容量3のLRUキャッシュを準備
        cache = new LRUCache<string, number>(3);
    });

    it('指定された容量で初期化できること', () => {
        expect(cache.size).toBe(0);
        expect(() => new LRUCache<string, number>(0)).toThrow();
        expect(() => new LRUCache<string, number>(-1)).toThrow();
    });

    it('キャッシュにアイテムを設定し取得できること', () => {
        cache.set('a', 1);
        cache.set('b', 2);

        expect(cache.get('a')).toBe(1);
        expect(cache.get('b')).toBe(2);
        expect(cache.get('c')).toBeUndefined();
    });

    it('容量を超えた場合に最も古いアイテムが削除されること', () => {
        cache.set('a', 1);
        cache.set('b', 2);
        cache.set('c', 3);
        cache.set('d', 4);

        // 'a'が最も古いアイテムなので削除されているはず
        expect(cache.get('a')).toBeUndefined();
        expect(cache.get('b')).toBe(2);
        expect(cache.get('c')).toBe(3);
        expect(cache.get('d')).toBe(4);
    });

    it('アクセスしたアイテムが最新として扱われること', () => {
        cache.set('a', 1);
        cache.set('b', 2);
        cache.set('c', 3);

        // 'a'にアクセスすると最新のアイテムとなる
        cache.get('a');

        // 新しいアイテムを追加すると、'b'が最も古いアイテムとなり削除される
        cache.set('d', 4);

        expect(cache.get('a')).toBe(1); // 最新なので残っている
        expect(cache.get('b')).toBeUndefined(); // 削除されている
        expect(cache.get('c')).toBe(3);
        expect(cache.get('d')).toBe(4);
    });

    it('既存のキーに対して値を更新できること', () => {
        cache.set('a', 1);
        cache.set('b', 2);
        cache.set('a', 10); // 'a'の値を更新

        expect(cache.get('a')).toBe(10);
        expect(cache.size).toBe(2);
    });

    it('キャッシュからアイテムを削除できること', () => {
        cache.set('a', 1);
        cache.set('b', 2);

        expect(cache.delete('a')).toBe(true);
        expect(cache.get('a')).toBeUndefined();
        expect(cache.size).toBe(1);

        // 存在しないキーの削除を試みる
        expect(cache.delete('x')).toBe(false);
    });

    it('キャッシュをクリアできること', () => {
        cache.set('a', 1);
        cache.set('b', 2);

        cache.clear();

        expect(cache.size).toBe(0);
        expect(cache.get('a')).toBeUndefined();
    });

    it('キャッシュにキーが存在するか確認できること', () => {
        cache.set('a', 1);

        expect(cache.has('a')).toBe(true);
        expect(cache.has('b')).toBe(false);
    });

    it('キャッシュのキーと値を取得できること', () => {
        cache.set('a', 1);
        cache.set('b', 2);

        expect(Array.from(cache.keys())).toEqual(['a', 'b']);
        expect(Array.from(cache.values())).toEqual([1, 2]);
    });
});

describe('TTLCache', () => {
    let cache: TTLCache<string, number>;
    let mockTime: number;

    beforeEach(() => {
        mockTime = 1000;
        cache = new TTLCache<string, number>(5000); // デフォルトTTL: 5000ms

        // Date.now()をモック化
        vi.spyOn(Date, 'now').mockImplementation(() => mockTime);

        // getCurrentTimeメソッドをモック化するためのサブクラス
        class TestTTLCache<K, V> extends TTLCache<K, V> {
            protected override getCurrentTime(): number {
                return mockTime;
            }
        }

        cache = new TestTTLCache<string, number>(5000);
    });

    it('指定されたデフォルトTTLで初期化できること', () => {
        expect(() => new TTLCache<string, number>(0)).toThrow();
        expect(() => new TTLCache<string, number>(-1)).toThrow();
    });

    it('キャッシュにアイテムを設定し取得できること', () => {
        cache.set('a', 1);
        cache.set('b', 2);

        expect(cache.get('a')).toBe(1);
        expect(cache.get('b')).toBe(2);
        expect(cache.get('c')).toBeUndefined();
    });

    it('有効期限切れのアイテムが自動的に削除されること', () => {
        cache.set('a', 1);
        cache.set('b', 2, 2000); // 2000ms後に期限切れ

        // 時間を3000ms進める
        mockTime += 3000;

        expect(cache.get('a')).toBe(1); // まだ有効
        expect(cache.get('b')).toBeUndefined(); // 期限切れ
        expect(cache.size).toBe(1); // 'b'は削除されたため、サイズは1
    });

    it('cleanup()が期限切れのアイテムを削除すること', () => {
        cache.set('a', 1, 1000); // 1000ms後に期限切れ
        cache.set('b', 2, 3000); // 3000ms後に期限切れ

        // 時間を2000ms進める
        mockTime += 2000;

        // この時点で'a'は期限切れ、'b'はまだ有効
        expect(cache.size).toBe(2); // クリーンアップ前はまだ2つ

        cache.cleanup();

        expect(cache.size).toBe(1); // 'a'が削除された
        expect(cache.get('a')).toBeUndefined();
        expect(cache.get('b')).toBe(2);
    });

    it('validSize()が有効なアイテム数だけを返すこと', () => {
        cache.set('a', 1, 1000); // 1000ms後に期限切れ
        cache.set('b', 2, 3000); // 3000ms後に期限切れ
        cache.set('c', 3, 6000); // 6000ms後に期限切れ

        // 時間を2000ms進める
        mockTime += 2000;

        expect(cache.size).toBe(3); // 全体のサイズは3
        expect(cache.validSize).toBe(2); // 有効なのは'b'と'c'の2つ

        // 時間をさらに2000ms進める
        mockTime += 2000;

        expect(cache.size).toBe(3); // 全体のサイズはまだ3
        expect(cache.validSize).toBe(1); // 有効なのは'c'の1つだけ
    });

    it('キーの有効期限を延長できること', () => {
        cache.set('a', 1, 2000); // 2000ms後に期限切れ

        // 時間を1000ms進める
        mockTime += 1000;

        // 有効期限を延長（デフォルトの5000ms）
        expect(cache.extend('a')).toBe(true);

        // 時間を3000ms進める（元の有効期限から2000ms経過）
        mockTime += 3000;

        // 延長したので、まだ有効なはず
        expect(cache.get('a')).toBe(1);

        // さらに時間を2000ms進める（延長した有効期限から5000ms経過）
        mockTime += 2000;

        // まだ有効期限内
        expect(cache.get('a')).toBe(1);

        // さらに1000ms進める（延長した有効期限から6000ms経過）
        mockTime += 1000;

        // 期限切れになったはず
        expect(cache.get('a')).toBeUndefined();
    });

    it('既に期限切れのキーは延長できないこと', () => {
        cache.set('a', 1, 1000); // 1000ms後に期限切れ

        // 時間を2000ms進める
        mockTime += 2000;

        // 既に期限切れなので延長できない
        expect(cache.extend('a')).toBe(false);
        expect(cache.get('a')).toBeUndefined();
    });

    it('存在しないキーは延長できないこと', () => {
        expect(cache.extend('x')).toBe(false);
    });

    it('has()メソッドが期限切れのアイテムを削除すること', () => {
        cache.set('a', 1, 1000); // 1000ms後に期限切れ

        expect(cache.has('a')).toBe(true);

        // 時間を2000ms進める
        mockTime += 2000;

        // 期限切れになったので、has()はfalseを返し、アイテムを削除する
        expect(cache.has('a')).toBe(false);
        expect(cache.size).toBe(0);
    });
});

