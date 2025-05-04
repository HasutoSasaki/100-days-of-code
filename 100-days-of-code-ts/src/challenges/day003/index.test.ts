import { describe, expect, it } from 'vitest';
import { chunk, flatten, unique, groupBy } from './index';

describe('配列操作ユーティリティ', () => {
    describe('chunk', () => {
        it('配列を指定したサイズのチャンクに分割する', () => {
            const input = [1, 2, 3, 4, 5];
            const size = 2;

            const result = chunk(input, size);

            expect(result).toEqual([[1, 2], [3, 4], [5]]);
        });

        it('チャンクサイズが配列の長さより大きい場合、1つのチャンクを返す', () => {
            const input = [1, 2, 3];
            const size = 5;

            const result = chunk(input, size);

            expect(result).toEqual([[1, 2, 3]]);
        });

        it('空の配列を入力すると、空の配列を返す', () => {
            const input: number[] = [];
            const size = 2;

            const result = chunk(input, size);

            expect(result).toEqual([]);
        });

        it('チャンクサイズが0以下の場合、エラーをスローする', () => {
            const input = [1, 2, 3];
            const size = 0;

            const result = () => chunk(input, size);

            expect(result).toThrow('チャンクサイズは1以上である必要があります');
        });
    });

    describe('flatten', () => {
        it('1レベルのネストを持つ配列を平坦化する', () => {
            const input = [1, [2, 3], 4];

            const result = flatten(input);

            expect(result).toEqual([1, 2, 3, 4]);
        });

        it('指定した深さまで配列を平坦化する', () => {
            const input = [1, [2, [3, 4]], 5, [[6]]];

            const result = flatten(input, 2);

            expect(result).toEqual([1, 2, 3, 4, 5, 6]);
        });

        it('空の配列を入力すると、空の配列を返す', () => {
            const input: any[] = [];

            const result = flatten(input);

            expect(result).toEqual([]);
        });

        it('平坦化する必要がない配列では、元の配列を返す', () => {
            const input = [1, 2, 3];

            const result = flatten(input);

            expect(result).toEqual([1, 2, 3]);
        });
    });

    describe('unique', () => {
        it('重複する要素を削除する', () => {
            const input = [1, 2, 2, 3, 4, 4, 5];

            const result = unique(input);

            expect(result).toEqual([1, 2, 3, 4, 5]);
        });

        it('重複のない配列では、元の配列と同じ要素を返す', () => {
            const input = [1, 2, 3];

            const result = unique(input);

            expect(result).toEqual([1, 2, 3]);
        });

        it('空の配列を入力すると、空の配列を返す', () => {
            const input: number[] = [];

            const result = unique(input);

            expect(result).toEqual([]);
        });

        it('オブジェクトの配列でも動作する', () => {
            const obj1 = { id: 1 };
            const obj2 = { id: 2 };
            const input = [obj1, obj2, obj1];

            const result = unique(input);

            expect(result).toEqual([obj1, obj2]);
        });
    });

    describe('groupBy', () => {
        it('数値配列を奇数・偶数でグループ化する', () => {
            const input = [1, 2, 3, 4, 5];
            const keyFn = (n: number) => n % 2 === 0 ? 'even' : 'odd';

            const result = groupBy(input, keyFn);

            expect(result).toEqual({
                odd: [1, 3, 5],
                even: [2, 4]
            });
        });

        it('オブジェクト配列をプロパティでグループ化する', () => {
            const input = [
                { name: 'Alice', age: 25 },
                { name: 'Bob', age: 30 },
                { name: 'Carol', age: 25 },
                { name: 'Dave', age: 35 }
            ];
            const keyFn = (person: { age: number }) => person.age.toString();

            const result = groupBy(input, keyFn);

            expect(result).toEqual({
                '25': [{ name: 'Alice', age: 25 }, { name: 'Carol', age: 25 }],
                '30': [{ name: 'Bob', age: 30 }],
                '35': [{ name: 'Dave', age: 35 }]
            });
        });

        it('空の配列を入力すると、空のオブジェクトを返す', () => {
            const input: number[] = [];
            const keyFn = (n: number) => n.toString();

            const result = groupBy(input, keyFn);

            expect(result).toEqual({});
        });
    });
});