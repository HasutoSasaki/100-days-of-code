/**
 * Day 15: シンプルなステート管理ライブラリ - part 3
 * ステート変更の監視機能
 * 
 * このモジュールでは、ステート管理に変更監視機能を追加し、
 * 特定のステートパスの変更を検知できるようにします。
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
 * ストアの型定義
 */
export interface Store<S, A extends Action> {
    getState: () => S;
    dispatch: (action: A) => void;
    subscribe: (listener: StateListener<S>) => () => void;
    // 特定のステートパスを監視する新機能
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
     * 
     * @param action ディスパッチするアクション
     */
    const dispatch = (action: A): void => {
        // リデューサーを使用して新しいステートを作成
        state = reducer(state, action);

        // すべてのリスナーに通知
        listeners.forEach(listener => listener(state));

        // セレクター用のリスナーに通知
        notifySelectorListeners();
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
 * パスのセレクターを作成するヘルパー関数
 * 特定のネストされたパスを簡単に選択できる
 * 
 * @param path 選択するパス
 * @returns セレクター関数
 */
export function createSelector<S, R = any>(
    path: (string | number)[]
): Selector<S, R> {
    return (state: S): R => {
        let current: any = state;

        for (const key of path) {
            if (current === undefined || current === null) {
                return undefined as unknown as R;
            }
            current = current[key];
        }

        return current as R;
    };
}