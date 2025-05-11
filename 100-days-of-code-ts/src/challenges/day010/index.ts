/**
 * Day 10: キャッシュシステム - part 1
 * 
 * - LRU（Least Recently Used）キャッシュの実装
 * - TTL（Time To Live）付きキャッシュの実装
 */

/**
 * LRUキャッシュの実装
 * 最も長い間使用されていないアイテムを削除するキャッシュ戦略
 */
export class LRUCache<K, V> {
    private cache: Map<K, V>;
    private readonly capacity: number;

    /**
     * @param capacity キャッシュの最大容量
     */
    constructor(capacity: number) {
        if (capacity <= 0) {
            throw new Error('キャッシュ容量は1以上である必要があります');
        }
        this.capacity = capacity;
        this.cache = new Map<K, V>();
    }

    /**
     * キャッシュからキーに対応する値を取得
     * 存在しない場合はundefinedを返す
     * 
     * @param key キャッシュのキー
     * @returns 値またはundefined
     */
    get(key: K): V | undefined {
        if (!this.cache.has(key)) {
            return undefined;
        }

        // 使用されたアイテムは最新として扱うためにMapから一度削除して再挿入
        const value = this.cache.get(key)!;
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    /**
     * キャッシュにアイテムを設定
     * 
     * @param key キャッシュのキー
     * @param value 保存する値
     */
    set(key: K, value: V): void {
        // キーが既に存在する場合は削除して更新順を最新にする
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        // 容量を超える場合は、最も古いアイテム（Mapの先頭）を削除
        else if (this.cache.size >= this.capacity) {
            const oldestKey = this.cache.keys().next().value;
            if (oldestKey !== undefined) {
                this.cache.delete(oldestKey);
            }
        }

        // 新しいアイテムを末尾（最新）に追加
        this.cache.set(key, value);
    }

    delete(key: K): boolean {
        return this.cache.delete(key);
    }

    get size(): number {
        return this.cache.size;
    }

    clear(): void {
        this.cache.clear();
    }

    has(key: K): boolean {
        return this.cache.has(key);
    }

    keys(): IterableIterator<K> {
        return this.cache.keys();
    }

    values(): IterableIterator<V> {
        return this.cache.values();
    }
}

/**
 * TTL（Time To Live）付きキャッシュエントリ
 */
interface TTLCacheEntry<V> {
    value: V;
    expiry: number; // エントリーの有効期限（タイムスタンプ）
}

/**
 * TTL（有効期限）付きキャッシュの実装
 */
export class TTLCache<K, V> {
    private cache: Map<K, TTLCacheEntry<V>>;
    private readonly defaultTTL: number;

    /**
     * @param defaultTTL デフォルトの有効期限（ミリ秒）
     */
    constructor(defaultTTL: number = 60000) { // デフォルト: 1分
        if (defaultTTL <= 0) {
            throw new Error('TTLは0より大きい値である必要があります');
        }
        this.defaultTTL = defaultTTL;
        this.cache = new Map<K, TTLCacheEntry<V>>();
    }

    /**
     * 現在時刻を取得
     * テストの容易さのためにメソッド化
     */
    protected getCurrentTime(): number {
        return Date.now();
    }

    /**
     * キャッシュからキーに対応する値を取得
     * 有効期限切れの場合はundefinedを返し、エントリを削除
     * 
     * @param key キャッシュのキー
     * @returns 値またはundefined
     */
    get(key: K): V | undefined {
        const entry = this.cache.get(key);

        if (!entry) {
            return undefined;
        }

        const now = this.getCurrentTime();

        // 有効期限切れのエントリは削除して`undefined`を返す
        if (now > entry.expiry) {
            this.cache.delete(key);
            return undefined;
        }

        return entry.value;
    }

    /**
     * キャッシュにアイテムを設定
     * 
     * @param key キャッシュのキー
     * @param value 保存する値
     * @param ttl 有効期限（ミリ秒）、指定しない場合はデフォルト値を使用
     */
    set(key: K, value: V, ttl?: number): void {
        const expiryDuration = ttl ?? this.defaultTTL;
        const expiry = this.getCurrentTime() + expiryDuration;

        this.cache.set(key, { value, expiry });
    }

    /**
     * 有効期限切れのエントリをすべて削除
     */
    cleanup(): void {
        const now = this.getCurrentTime();

        for (const [key, entry] of this.cache.entries()) {
            if (now > entry.expiry) {
                this.cache.delete(key);
            }
        }
    }

    delete(key: K): boolean {
        return this.cache.delete(key);
    }

    get size(): number {
        return this.cache.size;
    }

    /**
     * 有効なエントリ数を取得（期限切れのエントリは含まない）
     */
    get validSize(): number {
        const now = this.getCurrentTime();
        let count = 0;

        for (const entry of this.cache.values()) {
            if (now <= entry.expiry) {
                count++;
            }
        }

        return count;
    }

    clear(): void {
        this.cache.clear();
    }

    /**
     * キーの有効期限を延長
     * 
     * @param key 延長するキー
     * @param ttl 延長する時間（ミリ秒）、指定しない場合はデフォルト値を使用
     * @returns 延長が成功したかどうか
     */
    extend(key: K, ttl?: number): boolean {
        const entry = this.cache.get(key);

        if (!entry) {
            return false;
        }

        const now = this.getCurrentTime();

        // 既に期限切れの場合は延長しない
        if (now > entry.expiry) {
            this.cache.delete(key);
            return false;
        }

        const expiryDuration = ttl ?? this.defaultTTL;
        entry.expiry = now + expiryDuration;

        return true;
    }

    has(key: K): boolean {
        const entry = this.cache.get(key);
        if (!entry) return false;

        const now = this.getCurrentTime();
        if (now > entry.expiry) {
            this.cache.delete(key);
            return false;
        }

        return true;
    }
}
