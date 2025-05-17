/**
 * Day 16: シンプルなステート管理ライブラリ - part 4
 * 非同期アクションのサポート
 * 
 * このモジュールでは、ステート管理ライブラリに非同期アクションのサポートを
 * 追加します。これにより、API呼び出しなどの非同期処理の結果に基づいて
 * ステートを更新できるようになります。
 */

/**
 * アクションの基本型
 */
export interface Action<T = string> {
    type: T;
    payload?: any;
}

/**
 * リデューサー関数の型定義
 */
export type Reducer<S, A extends Action> = (state: S, action: A) => S;

/**
 * ステート変更リスナーの型定義
 */
export type StateListener<S> = (state: S) => void;

/**
 * セレクター関数の型定義
 * ステートの一部を選択する関数
 */
export type Selector<S, R> = (state: S) => R;

/**
 * 非同期アクションの型定義
 * ディスパッチ関数とステート取得関数を受け取る関数
 */
export type ThunkAction<S, A extends Action> = (
    dispatch: ThunkDispatch<S, A>,
    getState: () => S
) => Promise<void> | void;

/**
 * 拡張されたディスパッチ関数の型定義
 * 通常のアクションとThunkアクションの両方をディスパッチできる
 */
export type ThunkDispatch<S, A extends Action> = ((action: A | ThunkAction<S, A>) => any);

/**
 * 拡張されたストアの型定義
 */
export interface Store<S, A extends Action> {
    getState: () => S;
    dispatch: ThunkDispatch<S, A>;
    subscribe: (listener: StateListener<S>) => () => void;
    select: <R>(selector: Selector<S, R>) => {
        subscribe: (listener: StateListener<R>) => () => void;
        get: () => R;
    };
}

/**
 * ストアを作成する関数
 * 
 * @param reducer ステートを変更するリデューサー関数
 * @param initialState 初期ステート
 * @returns ストアオブジェクト
 */
export function createStore<S, A extends Action>(
    reducer: Reducer<S, A>,
    initialState: S
): Store<S, A> {
    // 内部ステート
    let state = initialState;
    // ステート全体のリスナー
    const listeners: StateListener<S>[] = [];
    // セレクター別のリスナーを保持するMap
    const selectorListeners = new Map<
        Selector<S, any>,
        {
            listeners: StateListener<any>[];
            lastValue: any;
        }
    >();

    /**
     * 現在のステートを取得
     */
    const getState = (): S => {
        // イミュータブルにするためのディープコピー
        return JSON.parse(JSON.stringify(state));
    };

    /**
     * セレクター用のリスナーを通知する
     */
    const notifySelectorListeners = (): void => {
        selectorListeners.forEach((entry, selector) => {
            // 現在の選択値を計算
            const currentValue = selector(state);

            // 前回の値と比較（浅い比較）
            if (!shallowEqual(entry.lastValue, currentValue)) {
                // 値が変わっていれば最新値を保存し、リスナーに通知
                entry.lastValue = currentValue;
                entry.listeners.forEach(listener => listener(currentValue));
            }
        });
    };

    /**
     * アクションをディスパッチしてステートを更新
     * 通常のアクションと非同期アクション（Thunk）の両方をサポート
     * 
     * @param action ディスパッチするアクションまたはThunk関数
     * @returns アクション自体またはThunkが返す結果
     */
    const dispatch: ThunkDispatch<S, A> = (action: A | ThunkAction<S, A>) => {
        // Thunk関数の場合は実行して処理を委譲
        if (typeof action === 'function') {
            return (action as ThunkAction<S, A>)(dispatch, getState);
        }

        // 通常のアクションの場合は従来の処理
        state = reducer(state, action as A);

        // すべてのリスナーに通知
        listeners.forEach(listener => listener(state));

        // セレクター用のリスナーに通知
        notifySelectorListeners();

        return action;
    };

    /**
     * ステート変更時に実行されるリスナーを登録
     * 
     * @param listener 登録するリスナー関数
     * @returns リスナーの登録を解除する関数
     */
    const subscribe = (listener: StateListener<S>): () => void => {
        listeners.push(listener);

        // 登録解除用の関数を返す
        return () => {
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    };

    /**
     * 特定のステートパスを選択して監視する関数
     * 
     * @param selector ステートから部分的な値を選択する関数
     * @returns 選択パスのサブスクリプション操作と値取得のオブジェクト
     */
    const select = <R>(selector: Selector<S, R>) => {
        // セレクターの初期値を計算
        const initialValue = selector(state);

        // セレクターがまだ登録されていなければ初期化
        if (!selectorListeners.has(selector)) {
            selectorListeners.set(selector, {
                listeners: [],
                lastValue: initialValue
            });
        }

        /**
         * セレクターの値変更時のリスナーを登録
         */
        const subscribeSelector = (listener: StateListener<R>): () => void => {
            const entry = selectorListeners.get(selector)!;
            entry.listeners.push(listener);

            // 登録解除用の関数を返す
            return () => {
                const entry = selectorListeners.get(selector);
                if (entry) {
                    const index = entry.listeners.indexOf(listener);
                    if (index > -1) {
                        entry.listeners.splice(index, 1);
                    }

                    // リスナーがなくなったらセレクターエントリを削除
                    if (entry.listeners.length === 0) {
                        selectorListeners.delete(selector);
                    }
                }
            };
        };

        /**
         * 現在のセレクター値を取得
         */
        const get = (): R => selector(state);

        return {
            subscribe: subscribeSelector,
            get
        };
    };

    // 初期化アクションをディスパッチ
    dispatch({ type: '@@INIT' } as A);

    return {
        getState,
        dispatch,
        subscribe,
        select
    };
}

/**
 * 浅い比較を行うヘルパー関数
 * オブジェクトや配列の中身までは比較せず、参照だけを比較
 */
function shallowEqual(a: any, b: any): boolean {
    if (a === b) {
        return true;
    }

    if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
        return false;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
        return false;
    }

    for (const key of keysA) {
        if (!b.hasOwnProperty(key) || a[key] !== b[key]) {
            return false;
        }
    }

    return true;
}

/**
 * 複数のリデューサーを結合する関数
 * 
 * @param reducers 結合するリデューサーのオブジェクト
 * @returns 結合されたリデューサー
 */
export function combineReducers<S, A extends Action>(
    reducers: { [K in keyof S]: Reducer<S[K], A> }
): Reducer<S, A> {
    return (state: S = {} as S, action: A): S => {
        const nextState: Partial<S> = {};
        let hasChanged = false;

        Object.keys(reducers).forEach(key => {
            const reducer = reducers[key as keyof S];
            const previousStateForKey = state[key as keyof S];
            const nextStateForKey = reducer(previousStateForKey, action);

            nextState[key as keyof S] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        });

        return hasChanged ? nextState as S : state;
    };
}

/**
 * 非同期アクションを作成するヘルパー関数
 * 
 * @param asyncAction 非同期処理を行う関数
 * @returns Thunk関数
 */
export function createAsyncAction<S, A extends Action>(
    asyncAction: (dispatch: ThunkDispatch<S, A>, getState: () => S) => Promise<void>
): ThunkAction<S, A> {
    return asyncAction;
}

/**
 * よく使われる非同期アクションパターンのヘルパー関数
 * リクエスト開始・成功・失敗の3つのアクションを自動的にディスパッチする
 * 
 * @param types リクエスト開始・成功・失敗時にディスパッチするアクションタイプ
 * @param apiCall APIリクエストなどの非同期処理を行う関数
 * @returns Thunk関数
 */
export function createApiAction<S, A extends Action, R>(
    types: {
        request: A['type'];
        success: A['type'];
        failure: A['type'];
    },
    apiCall: () => Promise<R>
): ThunkAction<S, A> {
    return async (dispatch, getState) => {
        // リクエスト開始アクションをディスパッチ
        dispatch({ type: types.request } as A);

        try {
            // API呼び出しを実行
            const result = await apiCall();

            // 成功アクションをディスパッチ
            dispatch({
                type: types.success,
                payload: result
            } as A);

            // void型を返すように修正
            return;
        } catch (error) {
            // 失敗アクションをディスパッチ
            dispatch({
                type: types.failure,
                payload: error instanceof Error ? error.message : String(error)
            } as A);

            // エラーを再スローせず、void型を返すように修正
            return;
        }
    };
}