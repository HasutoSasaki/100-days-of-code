import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import os from 'os';
import {
    makeDir,
    removeDir,
    findFiles,
    FileWatcher,
    LineReader,
    createFileProcessor
} from './index';
import { Transform } from 'stream';

describe('ファイル操作ユーティリティ', () => {
    let testDir: string;

    // テスト用の一時ディレクトリを作成
    beforeEach(async () => {
        testDir = path.join(os.tmpdir(), `file-utils-test-${Date.now()}`);
        await fs.promises.mkdir(testDir, { recursive: true });
    });

    // テスト後に一時ディレクトリを削除
    afterEach(async () => {
        try {
            await fs.promises.rm(testDir, { recursive: true, force: true });
        } catch (error) {
            // エラーを無視
        }
    });

    describe('makeDir', () => {
        it('指定されたディレクトリを再帰的に作成する', async () => {
            const nestedDir = path.join(testDir, 'level1', 'level2', 'level3');

            await makeDir(nestedDir);

            const exists = await fs.promises.access(nestedDir)
                .then(() => true)
                .catch(() => false);

            expect(exists).toBe(true);
        });

        it('すでに存在するディレクトリの場合はエラーにならない', async () => {
            await makeDir(testDir);

            const exists = await fs.promises.access(testDir)
                .then(() => true)
                .catch(() => false);

            expect(exists).toBe(true);
        });
    });

    describe('removeDir', () => {
        it('指定されたディレクトリを再帰的に削除する', async () => {
            const nestedDir = path.join(testDir, 'remove', 'test');
            await fs.promises.mkdir(nestedDir, { recursive: true });

            await removeDir(path.join(testDir, 'remove'));

            const exists = await fs.promises.access(path.join(testDir, 'remove'))
                .then(() => true)
                .catch(() => false);

            expect(exists).toBe(false);
        });

        it('存在しないディレクトリの場合はエラーにならない', async () => {
            const nonExistingDir = path.join(testDir, 'non-existing');

            await removeDir(nonExistingDir);

            const exists = await fs.promises.access(nonExistingDir)
                .then(() => true)
                .catch(() => false);

            expect(exists).toBe(false);
        });
    });

    describe('findFiles', () => {
        beforeEach(async () => {
            // テスト用のファイル構造を作成
            await fs.promises.mkdir(path.join(testDir, 'src', 'components'), { recursive: true });
            await fs.promises.mkdir(path.join(testDir, 'node_modules'), { recursive: true });

            await fs.promises.writeFile(path.join(testDir, 'file1.txt'), 'test content');
            await fs.promises.writeFile(path.join(testDir, 'file2.js'), 'console.log("test")');
            await fs.promises.writeFile(path.join(testDir, 'src', 'index.ts'), 'export {}');
            await fs.promises.writeFile(path.join(testDir, 'src', 'components', 'Button.tsx'), 'export const Button = () => <button>Click me</button>');
            await fs.promises.writeFile(path.join(testDir, 'node_modules', 'package.json'), '{}');
        });

        it('すべてのファイルを再帰的に検索する', async () => {
            const files = await findFiles(testDir);

            expect(files.length).toBe(5);
            expect(files.some(f => f.name === 'file1.txt')).toBe(true);
            expect(files.some(f => f.name === 'Button.tsx')).toBe(true);
        });

        it('特定の拡張子のファイルのみを検索する', async () => {
            const files = await findFiles(testDir, { extensions: ['ts', 'tsx'] });

            expect(files.length).toBe(2);
            expect(files.some(f => f.name === 'index.ts')).toBe(true);
            expect(files.some(f => f.name === 'Button.tsx')).toBe(true);
            expect(files.some(f => f.name === 'file1.txt')).toBe(false);
        });

        it('特定のディレクトリを除外して検索する', async () => {
            const files = await findFiles(testDir, { excludeDirs: ['node_modules'] });

            expect(files.length).toBe(4);
            expect(files.some(f => f.path.includes('node_modules'))).toBe(false);
        });

        it('検索深度を制限する', async () => {
            const files = await findFiles(testDir, { maxDepth: 0 });

            expect(files.length).toBe(2); // ルートディレクトリのファイルのみ
            expect(files.some(f => f.name === 'file1.txt')).toBe(true);
            expect(files.some(f => f.name === 'file2.js')).toBe(true);
        });

        it('パターンマッチングでファイルをフィルタリングする', async () => {
            const files = await findFiles(testDir, {
                includePatterns: [/\.tsx?$/], // TypeScriptファイルのみ
                excludePatterns: [/Button/] // Buttonという名前を含むファイルを除外
            });

            expect(files.length).toBe(1);
            expect(files[0].name).toBe('index.ts');
        });
    });

    describe('FileWatcher', () => {
        let watcher: FileWatcher;

        beforeEach(() => {
            watcher = new FileWatcher();
        });

        afterEach(() => {
            watcher.close();
        });

        it('ファイルの変更を検知する', async () => {
            const testFile = path.join(testDir, 'watch-test.txt');
            await fs.promises.writeFile(testFile, 'initial content');

            const changePromise = new Promise<any>(resolve => {
                watcher.on('change', resolve);
            });

            watcher.watch(testDir);

            // ファイルを変更
            await fs.promises.writeFile(testFile, 'updated content');

            const changeEvent = await changePromise;
            expect(changeEvent.path).toContain('watch-test.txt');
        });
    });

    describe('LineReader', () => {
        it('指定された行数だけ読み込む', async () => {
            const testFile = path.join(testDir, 'lines.txt');
            await fs.promises.writeFile(testFile, 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5');

            const lineReader = new LineReader(3); // 3行だけ読み込む
            const lines: string[] = [];

            lineReader.on('data', (line) => {
                lines.push(line.toString());
            });

            const readStream = fs.createReadStream(testFile);
            readStream.pipe(lineReader);

            await new Promise<void>(resolve => {
                lineReader.on('end', () => {
                    resolve();
                });
            });

            expect(lines.length).toBe(3);
            expect(lines[0]).toBe('Line 1');
            expect(lines[1]).toBe('Line 2');
            expect(lines[2]).toBe('Line 3');
        });
    });

    describe('createFileProcessor', () => {
        it('ファイルを処理してオプションの出力先に書き込む', async () => {
            const inputFile = path.join(testDir, 'input.txt');
            const outputFile = path.join(testDir, 'output.txt');

            await fs.promises.writeFile(inputFile, 'hello world');

            // すべてを大文字に変換するトランスフォーム
            const upperCaseTransform = new Transform({
                transform(chunk, encoding, callback) {
                    const upperCased = chunk.toString().toUpperCase();
                    callback(null, upperCased);
                }
            });

            await createFileProcessor(inputFile, upperCaseTransform, outputFile);

            const content = await fs.promises.readFile(outputFile, 'utf-8');
            expect(content).toBe('HELLO WORLD');
        });
    });
});