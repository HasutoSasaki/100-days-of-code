import { describe, it, expect, vi, beforeEach } from 'vitest';
import { promiseAll, promiseRace, withTimeout, retry, PromiseQueue } from './index';

describe('Day 5: 非同期処理ユーティリティ', () => {
    describe('promiseAll', () => {
        it('空の配列の場合は空の配列を返す', async () => {
            const emptyArray = [];

            const result = await promiseAll(emptyArray);

            expect(result).toEqual([]);
        });

        it('すべてのプロミスが解決された場合、結果の配列を返す', async () => {
            const promises = [
                Promise.resolve(1),
                Promise.resolve(2),
                Promise.resolve(3)
            ];

            const result = await promiseAll(promises);

            expect(result).toEqual([1, 2, 3]);
        });

        it('順序が保持される', async () => {
            const p1 = new Promise(resolve => setTimeout(() => resolve('last'), 30));
            const p2 = new Promise(resolve => setTimeout(() => resolve('middle'), 20));
            const p3 = new Promise(resolve => setTimeout(() => resolve('first'), 10));
            const promises = [p1, p2, p3];

            const result = await promiseAll(promises);

            expect(result).toEqual(['last', 'middle', 'first']);
        });

        it('いずれかのプロミスが拒否された場合、最初のエラーで拒否される', async () => {
            const promises = [
                Promise.resolve(1),
                Promise.reject(new Error('テストエラー')),
                Promise.resolve(3)
            ];

            const result = promiseAll(promises);

            await expect(result).rejects.toThrow('テストエラー');
        });
    });

    describe('promiseRace', () => {
        it('空の配列の場合は永遠に解決されない', async () => {
            const emptyArray = [];

            const result = promiseRace(emptyArray);

            await expect(result).rejects.toThrow('空の配列が渡されました');
        });

        it('最初に解決されたプロミスの結果を返す', async () => {
            const p1 = new Promise(resolve => setTimeout(() => resolve('slow'), 30));
            const p2 = new Promise(resolve => setTimeout(() => resolve('fast'), 10));
            const promises = [p1, p2];

            const result = await promiseRace(promises);

            expect(result).toBe('fast');
        });

        it('最初に拒否されたプロミスのエラーで拒否される', async () => {
            const p1 = new Promise(resolve => setTimeout(() => resolve('slow'), 30));
            const p2 = new Promise((_, reject) => setTimeout(() => reject(new Error('エラー')), 10));
            const promises = [p1, p2];

            const result = promiseRace(promises);

            await expect(result).rejects.toThrow('エラー');
        });
    });

    describe('withTimeout', () => {
        it('プロミスが時間内に解決された場合、その結果を返す', async () => {
            const promise = Promise.resolve('成功');

            const result = await withTimeout(promise, 100);

            expect(result).toBe('成功');
        });

        it('プロミスが時間内に解決されない場合、タイムアウトエラーを投げる', async () => {
            const slowPromise = new Promise(resolve => setTimeout(() => resolve('遅い'), 100));

            const result = withTimeout(slowPromise, 50);

            await expect(result).rejects.toThrow('操作がタイムアウトしました');
        });
    });

    describe('retry', () => {
        it('初回で成功した場合、結果を返す', async () => {
            const fn = vi.fn().mockResolvedValue('成功');

            const result = await retry(fn);

            expect(result).toBe('成功');
            expect(fn).toHaveBeenCalledTimes(1);
        });

        it('失敗後にリトライして成功した場合、結果を返す', async () => {
            const fn = vi.fn()
                .mockRejectedValueOnce(new Error('一時的なエラー'))
                .mockResolvedValue('2回目で成功');

            const result = await retry(fn);

            expect(result).toBe('2回目で成功');
            expect(fn).toHaveBeenCalledTimes(2);
        });

        it('最大リトライ回数に達した場合、エラーで拒否される', async () => {
            const error = new Error('永続的なエラー');
            const fn = vi.fn().mockRejectedValue(error);

            const result = retry(fn, { maxRetries: 4 });

            await expect(result).rejects.toThrow('永続的なエラー');
            expect(fn).toHaveBeenCalledTimes(5); // 初回 + 3回のリトライ
        });

        it('リトライコールバックが呼び出される', async () => {
            const onRetry = vi.fn();
            const fn = vi.fn()
                .mockRejectedValueOnce(new Error('エラー1'))
                .mockRejectedValueOnce(new Error('エラー2'))
                .mockResolvedValue('成功');

            await retry(fn, { onRetry });

            expect(onRetry).toHaveBeenCalledTimes(2);
            expect(onRetry).toHaveBeenNthCalledWith(1, expect.any(Error), 1);
            expect(onRetry).toHaveBeenNthCalledWith(2, expect.any(Error), 2);
        });
    });

    describe('PromiseQueue', () => {
        it('並列数が1未満の場合はエラーを投げる', () => {
            expect(() => new PromiseQueue(0)).toThrow();
            expect(() => new PromiseQueue(-1)).toThrow();
        });

        it('同時実行数が制限される', async () => {
            const queue = new PromiseQueue(2);
            const executionOrder: number[] = [];

            const createTask = (id: number, delay: number) => () => {
                executionOrder.push(id);
                return new Promise<number>(resolve =>
                    setTimeout(() => {
                        resolve(id);
                    }, delay)
                );
            };

            // 4つのタスクを追加 (同時実行上限は2)
            const task1 = queue.add(createTask(1, 50));
            const task2 = queue.add(createTask(2, 50));
            const task3 = queue.add(createTask(3, 10));
            const task4 = queue.add(createTask(4, 10));

            // 最初の2つのタスクだけが即時実行されるはず
            expect(queue.active).toBe(2);
            expect(queue.size).toBe(2);

            // すべてのタスクが完了するのを待つ
            await Promise.all([task1, task2, task3, task4]);

            // タスク1と2が最初に実行され、その後タスク3と4が実行される
            expect(executionOrder).toEqual([1, 2, 3, 4]);
            expect(queue.active).toBe(0);
            expect(queue.size).toBe(0);
        });

        it('タスクがエラーを投げても他のタスクは実行される', async () => {
            const queue = new PromiseQueue(1);
            const successTask = vi.fn().mockResolvedValue('成功');
            const errorTask = vi.fn().mockRejectedValue(new Error('タスクエラー'));

            const task1 = queue.add(errorTask).catch(() => 'エラーをキャッチ');
            await task1;

            const task2 = queue.add(successTask);
            await task2;

            expect(errorTask).toHaveBeenCalledTimes(1);
            expect(successTask).toHaveBeenCalledTimes(1);
        });

        it('clear()でキューがクリアされる', async () => {
            const queue = new PromiseQueue(1);
            const task = vi.fn().mockResolvedValue('結果');

            // 時間のかかるタスクを1つ追加
            const slowRunningTask = queue.add(() => new Promise(resolve => setTimeout(() => resolve('実行中'), 50)));

            // 待機中のタスクを追加
            queue.add(task);
            queue.add(task);

            expect(queue.size).toBe(2);

            // キューをクリア
            queue.clear();

            expect(queue.size).toBe(0);

            // 実行中のタスクは完了する
            await slowRunningTask;

            // クリアされたタスクは実行されない
            expect(task).not.toHaveBeenCalled();
        });
    });
});