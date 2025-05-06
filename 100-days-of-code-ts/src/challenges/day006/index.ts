/**
 * Day 6: 関数型プログラミングユーティリティ
 */

/**
 * 関数をカリー化します。
 * カリー化された関数は、元の関数に必要な引数を1つずつ受け取り、
 * 全ての引数が揃うまで新しい関数を返し続けます。
 * 
 * @param fn カリー化する関数
 * @returns カリー化された関数
 */
export function curry<T extends any[], R>(
    fn: (...args: T) => R
): T extends [] ? R : <K extends any[]>(...args: K) => K['length'] extends T['length'] ? R : typeof curry<any[], R> {
    return function curried(...args: T[]) {
        if (args.length >= fn.length) {
            return fn(...args as T);
        }

        return function (...moreArgs: T[]) {
            return curried(...args, ...moreArgs);
        };
    } as any;
}

/**
 * 複数の関数を合成し、左から右へ順番に値を変換するパイプラインを作成します。
 * f(g(h(x))) のような入れ子の関数呼び出しを pipe(h, g, f)(x) と書けるようにします。
 * 
 * @param fns 合成する関数の配列
 * @returns 合成された関数
 */
export function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
    return (arg: T) => fns.reduce((result, fn) => fn(result), arg);
}

/**
 * 関数の最初のいくつかの引数を部分適用（固定）した新しい関数を返します。
 * すべての引数が提供された場合は、直接結果を返します。
 * 
 * @param fn 部分適用する元の関数
 * @param args 固定する引数
 * @returns 残りの引数を受け取る新しい関数、またはすべての引数が提供された場合は結果
 */
export function partial<T extends any[], R, K extends any[]>(
    fn: (...args: [...T, ...K]) => R,
    ...args: T
): ((...restArgs: K) => R) | R {
    // 引数の数がfnの必要とする引数の数と同じで、Kが空配列の場合は直接結果を返す
    if (fn.length <= args.length) {
        return fn(...args as any);
    }

    return function (...restArgs: K) {
        return fn(...args, ...restArgs);
    };
}

/**
 * 関数をメモ化します。同じ引数で呼び出された場合、再計算せずにキャッシュした結果を返します。
 * 
 * @param fn メモ化する関数
 * @param keyFn 引数からキャッシュのキーを生成する関数（省略時はJSON.stringifyを使用）
 * @returns メモ化された関数
 */
export function memoize<T extends any[], R>(
    fn: (...args: T) => R,
    keyFn: (...args: T) => string = (...args) => JSON.stringify(args)
): (...args: T) => R {
    const cache = new Map<string, R>();

    return function (...args: T): R {
        const key = keyFn(...args);

        if (cache.has(key)) {
            return cache.get(key)!;
        }

        // 元の関数を一度だけ呼び出して結果をキャッシュする
        const result = fn(...args);
        cache.set(key, result);

        return result;
    };
}