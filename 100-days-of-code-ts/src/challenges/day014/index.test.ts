import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Action, createStore, combineReducers } from './index';

// カウンターのアクション型定義
interface CounterAction extends Action<'INCREMENT' | 'DECREMENT' | 'SET'> {
    payload?: number;
}

// ユーザー関連のアクション型定義
interface UserAction extends Action<'SET_NAME' | 'CLEAR_USER'> {
    payload?: string;
}

// ステートの型定義
interface CounterState {
    count: number;
}

interface UserState {
    name: string;
}

interface AppState {
    counter: CounterState;
    user: UserState;
}

// アクション作成関数
const incrementAction = (): CounterAction => ({ type: 'INCREMENT' });
const decrementAction = (): CounterAction => ({ type: 'DECREMENT' });
const setCountAction = (count: number): CounterAction => ({ type: 'SET', payload: count });
const setNameAction = (name: string): UserAction => ({ type: 'SET_NAME', payload: name });
const clearUserAction = (): UserAction => ({ type: 'CLEAR_USER' });

describe('ステート管理ライブラリ - アクション/リデューサーパターン', () => {
    describe('単一のリデューサーを使ったストア', () => {
        const counterReducer = (state: CounterState = { count: 0 }, action: CounterAction): CounterState => {
            switch (action.type) {
                case 'INCREMENT':
                    return { count: state.count + 1 };
                case 'DECREMENT':
                    return { count: state.count - 1 };
                case 'SET':
                    return { count: action.payload ?? 0 };
                default:
                    return state;
            }
        };

        let store: ReturnType<typeof createStore<CounterState, CounterAction>>;

        beforeEach(() => {
            store = createStore<CounterState, CounterAction>(counterReducer, { count: 0 });
        });

        it('初期ステートが正しく設定されること', () => {
            expect(store.getState()).toEqual({ count: 0 });
        });

        it('ディスパッチでステートが更新されること', () => {
            store.dispatch(incrementAction());
            expect(store.getState()).toEqual({ count: 1 });

            store.dispatch(incrementAction());
            expect(store.getState()).toEqual({ count: 2 });

            store.dispatch(decrementAction());
            expect(store.getState()).toEqual({ count: 1 });

            store.dispatch(setCountAction(10));
            expect(store.getState()).toEqual({ count: 10 });
        });

        it('サブスクライブでステート変更を検知できること', () => {
            const listener = vi.fn();
            const unsubscribe = store.subscribe(listener);

            expect(listener).toHaveBeenCalledTimes(0);

            store.dispatch(incrementAction());
            expect(listener).toHaveBeenCalledTimes(1);

            store.dispatch(decrementAction());
            expect(listener).toHaveBeenCalledTimes(2);

            // 登録解除
            unsubscribe();
            store.dispatch(incrementAction());
            expect(listener).toHaveBeenCalledTimes(2); // 変化なし
        });

        it('getStateはイミュータブルなステートのコピーを返すこと', () => {
            const state1 = store.getState();
            state1.count = 100; // 直接変更しても実際のステートは変わらない

            const state2 = store.getState();
            expect(state2.count).toEqual(0); // 元のステートは変更されていない
        });
    });

    describe('複合リデューサーを使ったストア', () => {
        // カウンターのリデューサー
        const counterReducer = (state: CounterState = { count: 0 }, action: CounterAction | UserAction): CounterState => {
            switch (action.type) {
                case 'INCREMENT':
                    return { count: state.count + 1 };
                case 'DECREMENT':
                    return { count: state.count - 1 };
                case 'SET':
                    return { count: action.payload ?? 0 };
                default:
                    return state;
            }
        };

        // ユーザーのリデューサー
        const userReducer = (state: UserState = { name: '' }, action: CounterAction | UserAction): UserState => {
            switch (action.type) {
                case 'SET_NAME':
                    return { name: action.payload ?? '' };
                case 'CLEAR_USER':
                    return { name: '' };
                default:
                    return state;
            }
        };

        let store: ReturnType<typeof createStore<AppState, CounterAction | UserAction>>;

        beforeEach(() => {
            const rootReducer = combineReducers<AppState, CounterAction | UserAction>({
                counter: counterReducer,
                user: userReducer
            });

            store = createStore<AppState, CounterAction | UserAction>(rootReducer, {
                counter: { count: 0 },
                user: { name: '' }
            });
        });

        it('複合ステートが正しく初期化されること', () => {
            expect(store.getState()).toEqual({
                counter: { count: 0 },
                user: { name: '' }
            });
        });

        it('各ドメインのステートが独立して更新されること', () => {
            store.dispatch(incrementAction());
            expect(store.getState()).toEqual({
                counter: { count: 1 },
                user: { name: '' }
            });

            store.dispatch(setNameAction('テストユーザー'));
            expect(store.getState()).toEqual({
                counter: { count: 1 },
                user: { name: 'テストユーザー' }
            });

            store.dispatch(decrementAction());
            expect(store.getState()).toEqual({
                counter: { count: 0 },
                user: { name: 'テストユーザー' }
            });

            store.dispatch(clearUserAction());
            expect(store.getState()).toEqual({
                counter: { count: 0 },
                user: { name: '' }
            });
        });
    });
});