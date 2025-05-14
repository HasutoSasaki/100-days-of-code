/**
 * シンプルなステート管理ライブラリ - part 2: アクション/リデューサーパターン
 * 
 * このモジュールでは、Redux風のアクション/リデューサーパターンを実装し、
 * ステート管理をより予測可能で型安全にします。
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
 * ストアの型定義
 */
export interface Store<S, A extends Action> {
    getState: () => S;
    dispatch: (action: A) => void;
    subscribe: (listener: () => void) => () => void;
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
    // 内部ステートを保持
    let state = initialState;
    // リスナー配列
    const listeners: Array<() => void> = [];

    /**
     * 現在のステートを取得
     */
    const getState = (): S => {
        // ステートを直接返すのではなく、コピーを返してイミュータビリティを保つ
        return JSON.parse(JSON.stringify(state));
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
        listeners.forEach(listener => listener());
    };

    /**
     * ステート変更時に実行されるリスナーを登録
     * 
     * @param listener 登録するリスナー関数
     * @returns リスナーの登録を解除する関数
     */
    const subscribe = (listener: () => void): () => void => {
        listeners.push(listener);

        // 登録解除用の関数を返す
        return () => {
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    };

    // 初期化アクションをディスパッチ
    dispatch({ type: '@@INIT' } as A);

    return {
        getState,
        dispatch,
        subscribe
    };
}

/**
 * アクション作成関数の型
 */
export type ActionCreator<A extends Action> = (...args: any[]) => A;

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