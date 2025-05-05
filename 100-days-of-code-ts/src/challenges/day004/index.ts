/**
 * Day 4: オブジェクト操作とディープクローン
 */

import { isPrimitive, isObject } from './helper';

/**
 * オブジェクトの浅いコピー（シャローコピー）を作成する関数
 * @param obj コピー元のオブジェクト
 * @returns コピーされたオブジェクト
 */
export function shallowCopy<T>(obj: T): T {
    if (isPrimitive(obj)) return obj;

    // 配列の場合はスライスを使ってコピー
    if (Array.isArray(obj)) {
        return obj.slice() as unknown as T;
    }

    return { ...obj };
}

/**
 * オブジェクトの深いコピー（ディープコピー）を作成する関数
 * @param obj コピー元のオブジェクト
 * @returns 深くコピーされたオブジェクト
 */
export function deepCopy<T>(obj: T): T {
    if (isPrimitive(obj)) return obj;

    if (Array.isArray(obj))
        return obj.map(item => deepCopy(item)) as unknown as T;

    //objectの場合
    const copy = {} as T;
    for (const key in obj) {
        if (Object.hasOwn(obj as object, key)) {
            copy[key as keyof T] = deepCopy(obj[key as keyof T]);
        }
    }
    return copy;
}

/**
 * 2つのオブジェクトをマージする関数
 * @param target マージ先のオブジェクト
 * @param source マージ元のオブジェクト
 * @returns マージされたオブジェクト
 */
export function deepMerge<T extends Record<string, any>, U extends Record<string, any>>(target: T, source: U): T & U {
    const result = { ...target } as Record<string, any>;

    for (const key of Object.keys(source)) {
        const srcVal = source[key];
        const tgtVal = result[key];

        if (isObject(srcVal) && isObject(tgtVal)) {
            result[key] = deepMerge(tgtVal, srcVal);
        } else {
            result[key] = srcVal;
        }
    }
    return result as T & U;
}

/**
 * オブジェクトから指定したキーを除外した新しいオブジェクトを作成する関数
 * @param obj 元のオブジェクト
 * @param keys 除外するキーの配列
 * @returns 指定したキーが除外された新しいオブジェクト
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const result = { ...obj };

    keys.forEach(key => {
        delete result[key];
    });

    return result as Omit<T, K>;
}

/**
 * オブジェクトから指定したキーだけを含む新しいオブジェクトを作成する関数
 * @param obj 元のオブジェクト
 * @param keys 含めるキーの配列
 * @returns 指定したキーだけを含む新しいオブジェクト
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const result = {} as Pick<T, K>;

    keys.forEach(key => {
        if (key in obj) {
            result[key] = obj[key];
        }
    });

    return result;
}