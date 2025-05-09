/**
 * Day 8: ファイル操作ユーティリティ
 * 
 * このモジュールでは、ファイルシステム操作に関する様々なユーティリティ関数を提供します。
 * - ディレクトリの再帰的な作成・削除
 * - パターンに基づくファイル検索とフィルタリング
 * - ファイル変更の監視
 * - ストリーム処理のヘルパー
 */

import fs from 'fs';
import path from 'path';
import { EventEmitter } from 'events';
import { Writable, Transform, TransformCallback } from 'stream';

/**
 * 指定されたディレクトリを再帰的に作成します
 * 既に存在する場合は何もしません
 */
export const makeDir = async (dirPath: string): Promise<void> => {
    try {
        await fs.promises.mkdir(dirPath, { recursive: true });
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
            throw error;
        }
    }
};

/**
 * 指定されたディレクトリを再帰的に削除します
 */
export const removeDir = async (dirPath: string): Promise<void> => {
    try {
        await fs.promises.rm(dirPath, { recursive: true, force: true });
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
            throw error;
        }
    }
};

/**
 * 特定のパターンに一致するファイルを検索します
 */
export interface FileSearchOptions {
    extensions?: string[];
    excludeDirs?: string[];
    maxDepth?: number;
    includePatterns?: RegExp[];
    excludePatterns?: RegExp[];
}

export interface FileInfo {
    path: string;
    name: string;
    isDirectory: boolean;
    size: number;
    createdAt: Date;
    modifiedAt: Date;
}

/**
 * 指定されたディレクトリから条件に合うファイルを検索します
 */
export const findFiles = async (
    dirPath: string,
    options: FileSearchOptions = {}
): Promise<FileInfo[]> => {
    const {
        extensions = [],
        excludeDirs = [],
        maxDepth = Infinity,
        includePatterns = [],
        excludePatterns = []
    } = options;

    const results: FileInfo[] = [];

    const search = async (currentPath: string, currentDepth: number): Promise<void> => {
        if (currentDepth > maxDepth) return;

        const entries = await fs.promises.readdir(currentPath, { withFileTypes: true });

        for (const entry of entries) {
            const entryPath = path.join(currentPath, entry.name);

            if (entry.isDirectory()) {
                if (!excludeDirs.includes(entry.name)) {
                    await search(entryPath, currentDepth + 1);
                }
                continue;
            }

            // ファイル名の拡張子をチェック
            const ext = path.extname(entry.name).toLowerCase().slice(1);
            if (extensions.length > 0 && !extensions.includes(ext)) {
                continue;
            }

            // パターンマッチング
            if (includePatterns.length > 0 && !includePatterns.some(pattern => pattern.test(entry.name))) {
                continue;
            }

            if (excludePatterns.some(pattern => pattern.test(entry.name))) {
                continue;
            }

            const stats = await fs.promises.stat(entryPath);
            console.log(stats);
            results.push({
                path: entryPath,
                name: entry.name,
                isDirectory: false,
                size: stats.size,
                createdAt: new Date(stats.birthtime),
                modifiedAt: new Date(stats.mtime)
            });
        }
    };

    await search(dirPath, 0);
    return results;
};

/**
 * ファイル監視ユーティリティ
 */
export class FileWatcher extends EventEmitter {
    private watchers: fs.FSWatcher[] = [];

    /**
     * 指定されたファイルまたはディレクトリを監視します
     */
    watch(targetPath: string, recursive = false): void {
        try {
            const watcher = fs.watch(
                targetPath,
                { recursive },
                (eventType, filename) => {
                    if (filename) {
                        this.emit('change', {
                            path: path.join(targetPath, filename),
                            type: eventType,
                            timestamp: new Date()
                        });
                    }
                }
            );

            this.watchers.push(watcher);

            watcher.on('error', (error) => {
                this.emit('error', error);
            });
        } catch (error) {
            this.emit('error', error);
        }
    }

    /**
     * すべての監視を停止します
     */
    close(): void {
        this.watchers.forEach(watcher => watcher.close());
        this.watchers = [];
        this.removeAllListeners();
    }
}

/**
 * ストリーム処理ヘルパー
 */

/**
 * 与えられたファイルから指定された行数だけ読み込むTransformストリーム
 */
export class LineReader extends Transform {
    private buffer = '';
    private lineCount = 0;
    private readonly maxLines: number;

    constructor(maxLines: number) {
        super({ objectMode: true });
        this.maxLines = maxLines;
    }

    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        if (this.lineCount >= this.maxLines) {
            return callback();
        }

        this.buffer += chunk.toString();
        const lines = this.buffer.split('\n');

        // 最後の行は不完全かもしれないので保持
        this.buffer = lines.pop() || '';

        for (const line of lines) {
            if (this.lineCount >= this.maxLines) {
                break;
            }
            this.push(line);
            this.lineCount++;
        }

        callback();
    }

    _flush(callback: TransformCallback): void {
        if (this.buffer && this.lineCount < this.maxLines) {
            this.push(this.buffer);
        }
        callback();
    }
}

/**
 * ファイルのストリームを作成し、指定された処理を適用します
 */
export const createFileProcessor = (
    filePath: string,
    processor: Transform,
    outputPath?: string
): Promise<void> => {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(filePath);

        readStream.on('error', reject);

        let writeStream: Writable;

        if (outputPath) {
            writeStream = fs.createWriteStream(outputPath);
            writeStream.on('error', reject);
            writeStream.on('finish', resolve);
        } else {
            writeStream = process.stdout;
            writeStream.on('error', reject);
        }

        const pipeline = readStream.pipe(processor).pipe(writeStream);

        pipeline.on('error', reject);

        if (!outputPath) {
            pipeline.on('end', resolve);
        }
    });
};