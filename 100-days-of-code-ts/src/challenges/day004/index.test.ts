import { describe, it, expect } from 'vitest';
import { shallowCopy, deepCopy, deepMerge, omit, pick } from './index';

describe('オブジェクト操作関数', () => {
    describe('shallowCopy', () => {
        it('オブジェクトの浅いコピーを作成できること', () => {
            const original = { a: 1, b: { c: 2 } };

            const copied = shallowCopy(original);

            expect(copied).toEqual(original);
            expect(copied).not.toBe(original);
            expect(copied.b).toBe(original.b);
        });

        it('配列の浅いコピーを作成できること', () => {
            const original = [1, 2, { a: 3 }];

            const copied = shallowCopy(original);

            expect(copied).toEqual(original);
            expect(copied).not.toBe(original);
            expect(copied[2]).toBe(original[2]);
        });

        it('多層ネストされたオブジェクトの参照が同一であること', () => {
            const deepObj = { x: 10, y: { z: 20 } };
            const original = {
                a: 1,
                b: { c: 2 },
                d: {
                    e: { f: 3 },
                    g: deepObj
                }
            };

            const copied = shallowCopy(original);

            expect(copied.d).toBe(original.d);
            expect(copied.d.e).toBe(original.d.e);
            expect(copied.d.g).toBe(original.d.g);
            expect(copied.d.g.y).toBe(original.d.g.y);
        });

        it('プリミティブ値をそのまま返すこと', () => {
            const num = 42;
            const str = 'hello';
            const bool = true;

            expect(shallowCopy(num)).toBe(num);
            expect(shallowCopy(str)).toBe(str);
            expect(shallowCopy(bool)).toBe(bool);
        });
    });

    describe('deepCopy', () => {
        it('オブジェクトの深いコピーを作成できること', () => {
            const original = {
                a: 1,
                b: { c: 2, d: [1, 2, { e: 3 }] },
                f: null,
                g: undefined
            };

            const copied = deepCopy(original);

            expect(copied).toEqual(original);
            expect(copied).not.toBe(original);
            expect(copied.b).not.toBe(original.b);
            expect(copied.b.d).not.toBe(original.b.d);
            expect(copied.b.d[2]).not.toBe(original.b.d[2]);
            expect(copied.f).toBe(null);
            expect(copied.g).toBe(undefined);
        });

        it('プリミティブ値をそのまま返すこと', () => {
            expect(deepCopy(42)).toBe(42);
            expect(deepCopy('string')).toBe('string');
            expect(deepCopy(null)).toBe(null);
            expect(deepCopy(undefined)).toBe(undefined);
            expect(deepCopy(true)).toBe(true);
        });

        it('配列の深いコピーを作成できること', () => {
            const original = [1, [2, 3], { a: 4 }];

            const copied = deepCopy(original);

            expect(copied).toEqual(original);
            expect(copied).not.toBe(original);
            expect(copied[1]).not.toBe(original[1]);
            expect(copied[2]).not.toBe(original[2]);
        });

        it('関数（クロージャ）を含むオブジェクトをコピーできること', () => {
            const add = (x: number) => (y: number) => x + y;
            const addFive = add(5);

            const original = {
                name: 'calculator',
                operations: {
                    add: add,
                    addFive: addFive,
                    calculate: function (a: number, b: number) { return a * b; }
                },
                values: [1, 2, 3]
            };

            const copied = deepCopy(original);

            // オブジェクト自体は異なるインスタンスであることを確認
            expect(copied).toEqual(original);
            expect(copied).not.toBe(original);
            expect(copied.operations).not.toBe(original.operations);

            // 関数の参照は同じままであることを確認（関数はコピーされない）
            expect(copied.operations.add).toBe(original.operations.add);
            expect(copied.operations.addFive).toBe(original.operations.addFive);
            expect(copied.operations.calculate).toBe(original.operations.calculate);

            // 関数の動作が同じであることを確認
            expect(copied.operations.add(3)(4)).toBe(7);
            expect(copied.operations.addFive(10)).toBe(15);
            expect(copied.operations.calculate(6, 7)).toBe(42);
        });
    });

    describe('deepMerge', () => {
        it('2つの単純なオブジェクトをマージできること', () => {
            const target = { a: 1, b: 2 };
            const source = { b: 3, c: 4 };

            const result = deepMerge(target, source);

            expect(result).toEqual({ a: 1, b: 3, c: 4 });
        });

        it('ネストされたオブジェクトを再帰的にマージできること', () => {
            const target = {
                a: 1,
                b: {
                    c: 2,
                    d: 3
                }
            };
            const source = {
                b: {
                    d: 4,
                    e: 5
                },
                f: 6
            };

            const result = deepMerge(target, source);

            expect(result).toEqual({
                a: 1,
                b: {
                    c: 2,
                    d: 4,
                    e: 5
                },
                f: 6
            });
        });

        it('配列は上書きすること', () => {
            const target = { a: [1, 2, 3] };
            const source = { a: [4, 5] };

            const result = deepMerge(target, source);

            expect(result).toEqual({ a: [4, 5] });
        });
    });

    describe('omit', () => {
        it('指定したキーを除外したオブジェクトを返すこと', () => {
            const obj = { a: 1, b: 2, c: 3, d: 4 };

            const result = omit(obj, ['a', 'c']);

            expect(result).toEqual({ b: 2, d: 4 });
        });

        it('存在しないキーを指定しても無視すること', () => {
            const obj = { a: 1, b: 2 };

            const result = omit(obj, ['a', 'c' as keyof typeof obj]);

            expect(result).toEqual({ b: 2 });
        });
    });

    describe('pick', () => {
        it('指定したキーだけを含むオブジェクトを返すこと', () => {
            const obj = { a: 1, b: 2, c: 3, d: 4 };

            const result = pick(obj, ['a', 'c']);

            expect(result).toEqual({ a: 1, c: 3 });
        });

        it('存在しないキーを指定すると空のプロパティにならないこと', () => {
            const obj = { a: 1, b: 2 };

            const result = pick(obj, ['a', 'c' as keyof typeof obj]);

            expect(result).toEqual({ a: 1 });
            expect(Object.keys(result)).toEqual(['a']);
        });
    });
});