import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    createStore,
    createAsyncAction,
    createApiAction,
    Action,
    Reducer,
    ThunkAction
} from './index';

// テスト用のステート型
interface AppState {
    counter: number;
    loading: boolean;
    data: string | null;
    error: string | null;
}

// テスト用のアクション型
type AppAction =
    | { type: 'INCREMENT' }
    | { type: 'DECREMENT' }
    | { type: 'SET_COUNTER'; payload: number }
    | { type: 'FETCH_REQUEST' }
    | { type: 'FETCH_SUCCESS'; payload: string }
    | { type: 'FETCH_FAILURE'; payload: string };

// テスト用のリデューサー
const reducer: Reducer<AppState, AppAction> = (state, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, counter: state.counter + 1 };
        case 'DECREMENT':
            return { ...state, counter: state.counter - 1 };
        case 'SET_COUNTER':
            return { ...state, counter: action.payload };
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, data: action.payload };
        case 'FETCH_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

describe('非同期アクションをサポートするステート管理ライブラリ', () => {
    // ストアの初期設定
    let store = createStore<AppState, AppAction>(reducer, {
        counter: 0,
        loading: false,
        data: null,
        error: null
    });

    beforeEach(() => {
        // テスト前に毎回ストアを初期化
        store = createStore<AppState, AppAction>(reducer, {
            counter: 0,
            loading: false,
            data: null,
            error: null
        });
    });

    it('通常のアクションは従来通り処理される', () => {
        store.dispatch({ type: 'INCREMENT' });
        expect(store.getState().counter).toBe(1);

        store.dispatch({ type: 'DECREMENT' });
        expect(store.getState().counter).toBe(0);
    });

    it('非同期アクションを処理できる', async () => {
        // 非同期アクションの定義
        const delayedIncrement: ThunkAction<AppState, AppAction> = (dispatch) => {
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    dispatch({ type: 'INCREMENT' });
                    resolve();
                }, 10);
            });
        };

        // 非同期アクションをディスパッチ
        await store.dispatch(delayedIncrement);
        expect(store.getState().counter).toBe(1);
    });

    it('現在のステートに基づいて非同期アクションを処理できる', async () => {
        const incrementIfEven: ThunkAction<AppState, AppAction> = (dispatch, getState) => {
            const { counter } = getState();
            if (counter % 2 === 0) {
                dispatch({ type: 'INCREMENT' });
            }
            return Promise.resolve();
        };

        await store.dispatch(incrementIfEven);
        expect(store.getState().counter).toBe(1);

        await store.dispatch(incrementIfEven);
        expect(store.getState().counter).toBe(1); // 奇数なので増加しない
    });

    it('createAsyncActionヘルパーを使用できる', async () => {
        const fetchDataAsync = createAsyncAction<AppState, AppAction>(async (dispatch) => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                // APIリクエストをシミュレート
                const data = await Promise.resolve('テストデータ');
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                dispatch({
                    type: 'FETCH_FAILURE',
                    payload: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });

        await store.dispatch(fetchDataAsync);
        const state = store.getState();
        expect(state.loading).toBe(false);
        expect(state.data).toBe('テストデータ');
        expect(state.error).toBeNull();
    });

    it('createApiActionヘルパーを使用できる', async () => {
        // 成功するAPIコール
        const successApiCall = vi.fn().mockResolvedValue('APIデータ');
        const fetchData = createApiAction<AppState, AppAction, string>(
            {
                request: 'FETCH_REQUEST',
                success: 'FETCH_SUCCESS',
                failure: 'FETCH_FAILURE'
            },
            successApiCall
        );

        await store.dispatch(fetchData);
        expect(successApiCall).toHaveBeenCalledTimes(1);
        expect(store.getState().data).toBe('APIデータ');
        expect(store.getState().loading).toBe(false);
        expect(store.getState().error).toBeNull();
    });

    it('createApiActionで失敗を処理できる', async () => {
        // 失敗するAPIコール
        const errorMessage = 'API呼び出しに失敗しました';
        const failureApiCall = vi.fn().mockRejectedValue(new Error(errorMessage));
        const fetchData = createApiAction<AppState, AppAction, string>(
            {
                request: 'FETCH_REQUEST',
                success: 'FETCH_SUCCESS',
                failure: 'FETCH_FAILURE'
            },
            failureApiCall
        );

        try {
            await store.dispatch(fetchData);
        } catch (error) {
            // エラーは再スローされるので、ここで捕捉する
        }

        expect(failureApiCall).toHaveBeenCalledTimes(1);
        expect(store.getState().data).toBeNull();
        expect(store.getState().loading).toBe(false);
        expect(store.getState().error).toBe(errorMessage);
    });

    it('非同期アクションとセレクターを組み合わせて使用できる', async () => {
        // counterの値を監視するセレクター
        const counterSelector = (state: AppState) => state.counter;
        const counterSelection = store.select(counterSelector);

        let counterValue = -1;
        counterSelection.subscribe(value => {
            counterValue = value;
        });

        // 初期値が取得できる
        expect(counterSelection.get()).toBe(0);

        // 非同期アクションをディスパッチ
        const delayedSetCounter: ThunkAction<AppState, AppAction> = (dispatch) => {
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    dispatch({ type: 'SET_COUNTER', payload: 42 });
                    resolve();
                }, 10);
            });
        };

        await store.dispatch(delayedSetCounter);

        // セレクターの値が更新される
        expect(counterSelection.get()).toBe(42);
        expect(counterValue).toBe(42);
    });
});