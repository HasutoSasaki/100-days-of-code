import { describe, it, expect, vi } from 'vitest';
import { createStore, combineReducers, createSelector, Action } from './index';

describe('Day15 - ステート管理ライブラリ (ステート変更の監視機能)', () => {
    // テスト用の簡単なステート型定義
    interface AppState {
        counter: {
            value: number;
            lastUpdated: string;
        };
        todos: {
            items: Array<{ id: number; text: string; completed: boolean }>;
        };
    }

    // テスト用のアクション型定義
    type AppAction =
        | Action<'INCREMENT'>
        | Action<'DECREMENT'>
        | Action<'ADD_TODO'> & { payload: string }
        | Action<'TOGGLE_TODO'> & { payload: number };

    // サブリデューサー
    const counterReducer = (
        state = { value: 0, lastUpdated: '' },
        action: AppAction
    ) => {
        switch (action.type) {
            case 'INCREMENT':
                return {
                    ...state,
                    value: state.value + 1,
                    lastUpdated: new Date().toISOString()
                };
            case 'DECREMENT':
                return {
                    ...state,
                    value: state.value - 1,
                    lastUpdated: new Date().toISOString()
                };
            default:
                return state;
        }
    };

    const todosReducer = (
        state: { items: Array<{ id: number; text: string; completed: boolean }> } = { items: [] },
        action: AppAction
    ) => {
        switch (action.type) {
            case 'ADD_TODO':
                return {
                    ...state,
                    items: [
                        ...state.items,
                        {
                            id: state.items.length + 1,
                            text: action.payload,
                            completed: false
                        }
                    ]
                };
            case 'TOGGLE_TODO':
                return {
                    ...state,
                    items: state.items.map(todo =>
                        todo.id === action.payload
                            ? { ...todo, completed: !todo.completed }
                            : todo
                    )
                };
            default:
                return state;
        }
    };

    // ルートリデューサー
    const rootReducer = combineReducers<AppState, AppAction>({
        counter: counterReducer,
        todos: todosReducer
    });

    it('ステート全体を監視できること', () => {
        // ストア作成
        const store = createStore(rootReducer, {
            counter: { value: 0, lastUpdated: '' },
            todos: { items: [] }
        });

        // 監視用のモックリスナー
        const listener = vi.fn();
        store.subscribe(listener);

        // アクションをディスパッチ
        store.dispatch({ type: 'INCREMENT' });

        // リスナーが呼ばれたことを確認
        expect(listener).toHaveBeenCalledTimes(1);

        // ステートが更新されていることを確認
        const state = store.getState();
        expect(state.counter.value).toBe(1);
    });

    it('特定のステートパスだけを監視できること', () => {
        // ストア作成
        const store = createStore(rootReducer, {
            counter: { value: 0, lastUpdated: '' },
            todos: { items: [] }
        });

        // カウンター値だけを選択するセレクター
        const counterValueSelector = (state: AppState) => state.counter.value;

        // モック関数
        const counterListener = vi.fn();
        const todosListener = vi.fn();

        // セレクターを使って監視を設定
        store.select(counterValueSelector).subscribe(counterListener);
        store.select((state: AppState) => state.todos.items).subscribe(todosListener);

        // カウンターを更新
        store.dispatch({ type: 'INCREMENT' });

        // カウンターのリスナーだけが呼ばれることを確認
        expect(counterListener).toHaveBeenCalledTimes(1);
        expect(counterListener).toHaveBeenCalledWith(1);
        expect(todosListener).toHaveBeenCalledTimes(0);

        // TODOを追加
        store.dispatch({ type: 'ADD_TODO', payload: 'テストタスク' });

        // TODOのリスナーだけが呼ばれることを確認
        expect(counterListener).toHaveBeenCalledTimes(1); // 変わらず
        expect(todosListener).toHaveBeenCalledTimes(1);
        expect(todosListener).toHaveBeenCalledWith([
            { id: 1, text: 'テストタスク', completed: false }
        ]);
    });

    it('登録解除が正しく機能すること', () => {
        // ストア作成
        const store = createStore(rootReducer, {
            counter: { value: 0, lastUpdated: '' },
            todos: { items: [] }
        });

        // モックリスナー
        const listener = vi.fn();

        // 監視を登録して即時解除する
        const unsubscribe = store.subscribe(listener);
        unsubscribe();

        // アクションをディスパッチ
        store.dispatch({ type: 'INCREMENT' });

        // リスナーが呼ばれないことを確認
        expect(listener).not.toHaveBeenCalled();
    });

    it('パスセレクターが正しく動作すること', () => {
        // ストア作成
        const store = createStore(rootReducer, {
            counter: { value: 0, lastUpdated: '' },
            todos: { items: [] }
        });

        // パスセレクターを作成
        const counterValueSelector = createSelector<AppState, number>(['counter', 'value']);

        // モックリスナー
        const listener = vi.fn();

        // 監視を設定
        store.select(counterValueSelector).subscribe(listener);

        // get()で直接値を取得できることを検証
        expect(store.select(counterValueSelector).get()).toBe(0);

        // アクションをディスパッチ
        store.dispatch({ type: 'INCREMENT' });

        // リスナーが正しく呼ばれたことを確認
        expect(listener).toHaveBeenCalledWith(1);

        // 更新後の値を取得できることを確認
        expect(store.select(counterValueSelector).get()).toBe(1);
    });

    it('対象のステートが変更されないときはリスナーが呼ばれないこと', () => {
        // ストア作成
        const store = createStore(rootReducer, {
            counter: { value: 0, lastUpdated: '' },
            todos: { items: [] }
        });

        // モックリスナー
        const counterListener = vi.fn();

        // カウンター値の監視を設定
        store.select(state => state.counter.value).subscribe(counterListener);

        // TODOを追加（カウンター値は変わらない）
        store.dispatch({ type: 'ADD_TODO', payload: 'リスナーテスト' });

        // カウンターリスナーが呼ばれないことを確認
        expect(counterListener).not.toHaveBeenCalled();

        // カウンターを更新
        store.dispatch({ type: 'INCREMENT' });

        // 今度はリスナーが呼ばれることを確認
        expect(counterListener).toHaveBeenCalledTimes(1);
        expect(counterListener).toHaveBeenCalledWith(1);
    });
});