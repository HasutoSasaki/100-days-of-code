import { describe, it, expect, vi, beforeEach } from 'vitest';
import eventEmitter, { SimpleEventEmitter } from './index';

describe('SimpleEventEmitter', () => {
    let emitter: SimpleEventEmitter;

    beforeEach(() => {
        emitter = new SimpleEventEmitter();
    });

    it('イベントリスナーを登録して発火できること', async () => {
        const mockListener = vi.fn();
        const testData = { message: 'テストデータ' };

        emitter.on<typeof testData>('test', mockListener);
        await emitter.emit('test', testData);

        expect(mockListener).toHaveBeenCalledTimes(1);
        expect(mockListener).toHaveBeenCalledWith(testData);
    });

    it('複数のイベントリスナーを登録して発火できること', async () => {
        const listener1 = vi.fn();
        const listener2 = vi.fn();
        const testData = 'テストメッセージ';

        emitter.on<string>('message', listener1);
        emitter.on<string>('message', listener2);
        await emitter.emit('message', testData);

        expect(listener1).toHaveBeenCalledTimes(1);
        expect(listener1).toHaveBeenCalledWith(testData);
        expect(listener2).toHaveBeenCalledTimes(1);
        expect(listener2).toHaveBeenCalledWith(testData);
    });

    it('onceで登録したリスナーは一度だけ呼び出されること', async () => {
        const mockListener = vi.fn();

        emitter.once<number>('counter', mockListener);
        await emitter.emit('counter', 1);
        await emitter.emit('counter', 2);

        expect(mockListener).toHaveBeenCalledTimes(1);
        expect(mockListener).toHaveBeenCalledWith(1);
    });

    it('offでリスナーを削除できること', async () => {
        const mockListener = vi.fn();

        emitter.on<string>('test', mockListener);
        emitter.off('test', mockListener);
        await emitter.emit('test', 'テスト');

        expect(mockListener).not.toHaveBeenCalled();
    });

    it('イベント名を指定してoffを呼ぶと、そのイベントの全リスナーが削除されること', async () => {
        const listener1 = vi.fn();
        const listener2 = vi.fn();

        emitter.on<string>('test', listener1);
        emitter.on<string>('test', listener2);
        emitter.off('test');
        await emitter.emit('test', 'テスト');

        expect(listener1).not.toHaveBeenCalled();
        expect(listener2).not.toHaveBeenCalled();
    });

    it('removeAllListenersで全てのリスナーが削除されること', async () => {
        const listener1 = vi.fn();
        const listener2 = vi.fn();

        emitter.on<string>('event1', listener1);
        emitter.on<number>('event2', listener2);
        emitter.removeAllListeners();

        await emitter.emit('event1', 'テスト');
        await emitter.emit('event2', 123);

        expect(listener1).not.toHaveBeenCalled();
        expect(listener2).not.toHaveBeenCalled();
    });

    it('listenerCountで正しいリスナー数が取得できること', () => {
        const listener1 = vi.fn();
        const listener2 = vi.fn();

        expect(emitter.listenerCount('test')).toBe(0);

        emitter.on<string>('test', listener1);
        expect(emitter.listenerCount('test')).toBe(1);

        emitter.on<string>('test', listener2);
        expect(emitter.listenerCount('test')).toBe(2);

        emitter.off('test', listener1);
        expect(emitter.listenerCount('test')).toBe(1);

        emitter.off('test');
        expect(emitter.listenerCount('test')).toBe(0);
    });

    it('非同期リスナーを正しく処理できること', async () => {
        const result: string[] = [];

        const asyncListener1 = async (message: string): Promise<void> => {
            await new Promise(resolve => setTimeout(resolve, 50));
            result.push(`1: ${message}`);
        };

        const asyncListener2 = async (message: string): Promise<void> => {
            await new Promise(resolve => setTimeout(resolve, 10));
            result.push(`2: ${message}`);
        };

        emitter.on<string>('async', asyncListener1);
        emitter.on<string>('async', asyncListener2);

        await emitter.emit('async', 'テスト');

        expect(result).toHaveLength(2);
        expect(result).toContain('1: テスト');
        expect(result).toContain('2: テスト');
    });

    it('デフォルトエクスポートされたインスタンスが使用できること', async () => {
        const mockListener = vi.fn();

        eventEmitter.on<string>('test', mockListener);
        await eventEmitter.emit('test', 'デフォルトインスタンス');

        expect(mockListener).toHaveBeenCalledWith('デフォルトインスタンス');
    });
});