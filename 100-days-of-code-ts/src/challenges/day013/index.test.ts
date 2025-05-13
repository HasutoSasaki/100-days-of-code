import { describe, it, expect, vi } from 'vitest';
import { Store, updateObject, updateArray } from './index';

describe('Store', () => {
    it('初期ステートを正しく設定できる', () => {
        const initialState = { count: 0, name: 'test' };
        const store = new Store(initialState);

        expect(store.getState()).toEqual(initialState);
    });

    it('setState で新しいステートを設定できる', () => {
        const store = new Store({ count: 0 });

        store.setState({ count: 5 });

        expect(store.getState()).toEqual({ count: 5 });
    });

    it('setState に更新関数を渡せる', () => {
        const store = new Store({ count: 0 });

        store.setState(state => ({ count: state.count + 1 }));

        expect(store.getState()).toEqual({ count: 1 });
    });

    it('同じステートオブジェクトの場合は更新しない', () => {
        const initialState = { count: 0 };
        const store = new Store(initialState);

        // モック関数を作成して通知が行われるか確認
        const mockListener = vi.fn();
        store.subscribe(mockListener);

        // 同じオブジェクトを渡す
        store.setState(initialState);

        // リスナーが呼ばれていないことを確認
        expect(mockListener).not.toHaveBeenCalled();
    });

    it('subscribe でリスナーを登録でき、ステート変更時に通知される', () => {
        const store = new Store({ count: 0 });
        const mockListener = vi.fn();

        store.subscribe(mockListener);
        store.setState({ count: 1 });

        expect(mockListener).toHaveBeenCalledWith({ count: 1 });
    });

    it('subscribe が返す関数でリスナーの登録を解除できる', () => {
        const store = new Store({ count: 0 });
        const mockListener = vi.fn();

        const unsubscribe = store.subscribe(mockListener);

        // 一度目の更新ではリスナーが呼ばれる
        store.setState({ count: 1 });
        expect(mockListener).toHaveBeenCalledTimes(1);

        // 登録解除
        unsubscribe();

        // 二度目の更新ではリスナーが呼ばれない
        store.setState({ count: 2 });
        expect(mockListener).toHaveBeenCalledTimes(1); // 変わらず1回のまま
    });
});

describe('updateObject', () => {
    it('オブジェクトをイミュータブルに更新できる', () => {
        const original = { a: 1, b: 2, c: 3 };
        const updated = updateObject(original, { b: 20, c: 30 });

        // 新しいオブジェクトが返される
        expect(updated).not.toBe(original);

        // 値が正しく更新されている
        expect(updated).toEqual({ a: 1, b: 20, c: 30 });

        // 元のオブジェクトは変更されていない
        expect(original).toEqual({ a: 1, b: 2, c: 3 });
    });
});

describe('updateArray', () => {
    it('配列をイミュータブルに更新できる', () => {
        const original = [1, 2, 3];
        const updated = updateArray(original, arr => {
            arr.push(4);
            return arr;
        });

        // 新しい配列が返される
        expect(updated).not.toBe(original);

        // 値が正しく更新されている
        expect(updated).toEqual([1, 2, 3, 4]);

        // 元の配列は変更されていない
        expect(original).toEqual([1, 2, 3]);
    });
});