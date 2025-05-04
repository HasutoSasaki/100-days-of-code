/**
 * 配列操作ユーティリティ関数
 */

/**
 * 配列を指定したサイズのチャンク（小さな配列）に分割します
 * @param array 分割する配列
 * @param size チャンクのサイズ
 * @returns チャンクの配列
 * @example
 * chunk([1, 2, 3, 4, 5], 2) => [[1, 2], [3, 4], [5]]
 */
export function chunk<T>(array: T[], size: number): T[][] {
    if (size <= 0) throw new Error('チャンクサイズは1以上である必要があります');

    const result: T[][] = [];

    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }

    return result;
}

/**
 * 多次元配列を一次元配列に平坦化します
 * @param array 平坦化する配列
 * @param depth 平坦化する深さ（デフォルトは1）
 * @returns 平坦化された配列
 * @example
 * flatten([1, [2, [3, 4]]]) => [1, 2, [3, 4]]
 * flatten([1, [2, [3, 4]]], 2) => [1, 2, 3, 4]
 */
export function flatten<T>(array: any[], depth: number = 1): T[] {
    if (array.length === 0) return [];
    if (depth <= 0) return array as T[];

    const result: T[] = [];

    for (const item of array) {
        if (Array.isArray(item)) {
            result.push(...flatten<T>(item, depth - 1));
        } else {
            result.push(item);
        }
    }
    return result;
}

/**
 * 配列から重複した要素を削除します
 * @param array 重複を削除する配列
 * @returns 重複のない配列
 * @example
 * unique([1, 2, 2, 3, 4, 4, 5]) => [1, 2, 3, 4, 5]
 */
export function unique<T>(array: T[]): T[] {
    return [...new Set(array)];
}

/**
 * 配列の要素をキー関数に基づいてグループ化します
 * @param array グループ化する配列
 * @param keyFn 各要素からグループキーを取得する関数
 * @returns グループ化されたオブジェクト
 * @example
 * groupBy([1, 2, 3, 4, 5], (n) => n % 2 === 0 ? 'even' : 'odd')
 * => { odd: [1, 3, 5], even: [2, 4] }
 */
export function groupBy<T, K extends string | number | symbol>(
    array: T[],
    keyFn: (item: T) => K
): Record<K, T[]> {
    return array.reduce((result, item) => {
        const key = keyFn(item);

        if (!result[key]) result[key] = [];
        result[key].push(item);

        return result;
    }, {} as Record<K, T[]>);
}