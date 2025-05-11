/**
 * Day 11: キャッシュシステム
 * 
 * - シンプルなキャッシュシステム
 * - 永続化機能の追加
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * 永続化ストレージのインターフェース
 */
export interface Storage<T> {
    save(data: T): Promise<void>;
    load(): Promise<T | null>;
    clear(): Promise<void>;
}

/**
 * ファイルストレージの実装
 */
export class FileStorage<T> implements Storage<T> {
    constructor(private filePath: string) {
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }

    async save(data: T): Promise<void> {
        const jsonData = JSON.stringify(data);
        return fs.promises.writeFile(this.filePath, jsonData, 'utf8');
    }

    async load(): Promise<T | null> {
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf8');
            return JSON.parse(data) as T;
        } catch (err) {
            if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
                return null;
            }
            throw err;
        }
    }

    async clear(): Promise<void> {
        try {
            await fs.promises.unlink(this.filePath);
        } catch (err) {
            if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
                throw err;
            }
        }
    }
}

/**
 * メモリストレージの実装
 */
export class MemoryStorage<T> implements Storage<T> {
    private data: T | null = null;

    async save(data: T): Promise<void> {
        this.data = JSON.parse(JSON.stringify(data));
    }

    async load(): Promise<T | null> {
        return this.data ? JSON.parse(JSON.stringify(this.data)) : null;
    }

    async clear(): Promise<void> {
        this.data = null;
    }
}

/**
 * キャッシュの基本インターフェース
 * 型安全な継承のために導入
 */
export interface Cache<K extends string | number, V> {
    get(key: K): V | undefined;
    set(key: K, value: V, ...args: any[]): void;
    delete(key: K): boolean;
    clear(): void;
    has(key: K): boolean;
    readonly size: number;
    save(): Promise<void>;
    load(): Promise<boolean>;
}

/**
 * シンプルなキャッシュ
 */
export class SimpleCache<K extends string | number, V> implements Cache<K, V> {
    protected cache: Record<K, V> = {} as Record<K, V>;

    constructor(protected storage?: Storage<Record<K, V>>) { }

    /**
     * キーに対応する値を取得
     * @param key 取得するキー
     * @returns 対応する値、または存在しない場合はundefined
     */
    get(key: K): V | undefined {
        return this.cache[key];
    }

    /**
     * キャッシュに値を設定
     * @param key 設定するキー
     * @param value 設定する値
     */
    set(key: K, value: V): void {
        this.cache[key] = value;
        this.autoSave();
    }

    delete(key: K): boolean {
        if (key in this.cache) {
            delete this.cache[key];
            this.autoSave();
            return true;
        }
        return false;
    }

    clear(): void {
        this.cache = {} as Record<K, V>;
        this.autoSave();
    }

    has(key: K): boolean {
        return key in this.cache;
    }

    get size(): number {
        return Object.keys(this.cache).length;
    }

    async save(): Promise<void> {
        if (this.storage) {
            await this.storage.save(this.cache);
        }
    }

    async load(): Promise<boolean> {
        if (!this.storage) return false;

        try {
            const data = await this.storage.load();
            if (data) {
                this.cache = data;
                return true;
            }
            return false;
        } catch (err) {
            console.error('キャッシュの読み込みに失敗しました:', err);
            return false;
        }
    }

    protected autoSave(): void {
        if (this.storage) {
            this.save().catch(err => {
                console.error('キャッシュの保存に失敗しました:', err);
            });
        }
    }
}

/**
 * TTL付きキャッシュエントリ
 */
interface TTLEntry<V> {
    value: V;
    expiry: number;
}

/**
 * TTL付きキャッシュ
 * 型安全に実装するために SimpleCache を継承せず Cache インターフェースを実装
 */
export class TTLCache<K extends string | number, V> implements Cache<K, V> {
    protected cache: Record<K, TTLEntry<V>> = {} as Record<K, TTLEntry<V>>;

    constructor(
        private defaultTTL: number = 60000,
        protected storage?: Storage<Record<K, TTLEntry<V>>>
    ) { }

    get(key: K): V | undefined {
        const entry = this.cache[key];
        if (!entry) return undefined;

        if (Date.now() > entry.expiry) {
            this.delete(key);
            return undefined;
        }

        return entry.value;
    }

    set(key: K, value: V, ttl: number = this.defaultTTL): void {
        const expiry = Date.now() + ttl;
        this.cache[key] = { value, expiry };
        this.autoSave();
    }

    delete(key: K): boolean {
        if (key in this.cache) {
            delete this.cache[key];
            this.autoSave();
            return true;
        }
        return false;
    }

    clear(): void {
        this.cache = {} as Record<K, TTLEntry<V>>;
        this.autoSave();
    }

    has(key: K): boolean {
        const entry = this.cache[key];
        if (!entry) return false;

        if (Date.now() > entry.expiry) {
            this.delete(key);
            return false;
        }

        return true;
    }

    get size(): number {
        return Object.keys(this.cache).length;
    }

    /**
     * 有効期限切れのエントリを削除
     */
    cleanup(): void {
        const now = Date.now();
        for (const key in this.cache) {
            if (this.cache[key as K].expiry < now) {
                delete this.cache[key as K];
            }
        }
        this.autoSave();
    }

    /**
     * キーの有効期限を延長
     * @param key 延長するキー
     * @param ttl 延長する時間（ミリ秒）
     * @returns 延長に成功したかどうか
     */
    extend(key: K, ttl: number = this.defaultTTL): boolean {
        const entry = this.cache[key];
        if (!entry) return false;

        if (Date.now() > entry.expiry) {
            this.delete(key);
            return false;
        }

        entry.expiry = Date.now() + ttl;
        this.autoSave();
        return true;
    }

    async save(): Promise<void> {
        if (this.storage) {
            await this.storage.save(this.cache);
        }
    }

    async load(): Promise<boolean> {
        if (!this.storage) return false;

        try {
            const data = await this.storage.load();
            if (data) {
                this.cache = data;
                return true;
            }
            return false;
        } catch (err) {
            console.error('キャッシュの読み込みに失敗しました:', err);
            return false;
        }
    }

    protected autoSave(): void {
        if (this.storage) {
            this.save().catch(err => {
                console.error('キャッシュの保存に失敗しました:', err);
            });
        }
    }
}