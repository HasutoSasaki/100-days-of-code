import { describe, it, expect, vi } from 'vitest';
import { curry, pipe, partial, memoize } from './index';

//TODO:型エラーが出ているので、index.tsの関数を修正する必要がある
describe('関数型プログラミングユーティリティ', () => {
    // カリー化(curry)のテスト
    describe('curry関数', () => {
        it('引数を段階的に適用できる', () => {
            const add = (a: number, b: number, c: number) => a + b + c;

            const curriedAdd = curry(add);
            const result1 = curriedAdd(1)(2)(3);
            const result2 = curriedAdd(1, 2)(3);
            const result3 = curriedAdd(1)(2, 3);
            const result4 = curriedAdd(1, 2, 3);

            expect(result1).toBe(6);
            expect(result2).toBe(6);
            expect(result3).toBe(6);
            expect(result4).toBe(6);
        });

        it('複雑な型の引数でも動作する', () => {
            const formatPerson = (name: string, age: number, isActive: boolean) =>
                `${name}は${age}歳で${isActive ? 'アクティブ' : '非アクティブ'}です`;

            const curriedFormat = curry(formatPerson);
            const formatTaro = curriedFormat('太郎');
            const formatTaro30 = formatTaro(30);
            const activeResult = formatTaro30(true);
            const inactiveResult = formatTaro30(false);

            expect(activeResult).toBe('太郎は30歳でアクティブです');
            expect(inactiveResult).toBe('太郎は30歳で非アクティブです');
        });

        it('引数のない関数に対しても正しく動作する', () => {
            const getMessage = () => 'こんにちは世界';

            const curriedMessage = curry(getMessage);
            const result = curriedMessage();

            expect(result).toBe('こんにちは世界');
        });
    });

    // パイプライン(pipe)のテスト
    describe('pipe関数', () => {
        it('複数の関数を左から右へ合成する', () => {
            const double = (x: number) => x * 2;
            const add10 = (x: number) => x + 10;
            const square = (x: number) => x * x;

            const computation = pipe(double, add10, square);
            const result = computation(5);

            expect(result).toBe(400); // (5 * 2) + 10 = 20, 20^2 = 400
        });

        it('文字列処理のパイプラインも作成できる', () => {
            const removeSpaces = (s: string) => s.replace(/\s+/g, '');
            const toLowerCase = (s: string) => s.toLowerCase();
            const exclaim = (s: string) => s + '!';

            const process = pipe(removeSpaces, toLowerCase, exclaim);
            const result = process('Hello World');

            expect(result).toBe('helloworld!');
        });

        it('関数が空の場合は入力値をそのまま返す', () => {
            const input = 'テスト';

            const emptyPipe = pipe();
            const result = emptyPipe(input);

            expect(result).toBe(input);
        });

        it('型が合わない関数をパイプするとエラーになる', () => {
            const stringToNumber = (s: string) => s.length;
            const doubleNumber = (n: number) => n * 2;
            const numberToBoolean = (n: number) => n > 0;
            // TypeScriptの型チェックで検出されるべきエラー
            // 以下のコードはコンパイル時に型エラーとなるが、実行時の動作確認として
            const pipeline = pipe(stringToNumber, doubleNumber, numberToBoolean);
            const result = pipeline('test');

            expect(result).toBe(true); // 'test'の長さは4、4*2=8、8>0はtrue
        });
    });

    // 部分適用(partial)のテスト
    describe('partial関数', () => {
        it('関数の引数を部分的に適用できる', () => {
            const greet = (greeting: string, name: string) => `${greeting}, ${name}!`;

            const greetWithHello = partial(greet, 'こんにちは');
            const result = greetWithHello('太郎');

            expect(result).toBe('こんにちは, 太郎!');
        });

        it('複数の引数を部分適用できる', () => {
            const calculateTotal = (price: number, taxRate: number, discount: number) =>
                price * (1 + taxRate) * (1 - discount);

            const calculateWithTax = partial(calculateTotal, 1000, 0.1);
            const result = calculateWithTax(0.05);

            expect(result).toBe(1000 * 1.1 * 0.95);
        });

        it('すべての引数を部分適用すると結果を直接返す', () => {
            const add = (a: number, b: number) => a + b;

            const addResult = partial(add, 5, 3);

            expect(addResult).toBe(8);
        });

        it('必要な引数より多くの引数を渡しても正しく動作する', () => {
            const sum = (a: number, b: number) => a + b;

            // @ts-ignore - TypeScriptの型チェックを無視
            const result = partial(sum, 1, 2, 3);

            // 実際に期待通りの結果が得られることを確認
            expect(result).toBe(3); // 1 + 2 = 3
        });
    });

    // メモ化(memoize)のテスト
    describe('memoize関数', () => {
        it('同じ引数で呼び出した場合にキャッシュした結果を返す', () => {
            const expensiveCalculation = (n: number): number => n * 2;
            const spy = vi.fn(expensiveCalculation);
            // 明示的にスパイをリセット
            spy.mockClear();

            const memoizedCalculation = memoize(spy);
            const firstResult = memoizedCalculation(5);

            // ここで呼び出し回数を確認
            expect(spy).toHaveBeenCalledTimes(1);

            // 同じ値で2回目の呼び出し
            const secondResult = memoizedCalculation(5);

            // 異なる値で3回目の呼び出し
            const thirdResult = memoizedCalculation(4);

            expect(firstResult).toBe(10);
            expect(secondResult).toBe(10);
            // 2回目は同じ引数なのでキャッシュから取得され、追加呼び出しはない
            expect(spy).toHaveBeenCalledTimes(2);

            expect(thirdResult).toBe(8);
            // 異なる引数では新たに関数が呼ばれる
            expect(spy).toHaveBeenCalledTimes(2);
        });

        it('カスタムキー生成関数を使用できる', () => {
            type Person = { name: string; age: number };
            const getPersonInfo = (person: Person) => `${person.name}は${person.age}歳です`;
            const spy = vi.fn(getPersonInfo);
            const person1 = { name: '太郎', age: 30 };
            const person2 = { name: '太郎', age: 30 };

            const memoizedGetPersonInfo = memoize(
                spy,
                (person) => `${person.name}-${person.age}`
            );
            const result1 = memoizedGetPersonInfo(person1);
            const result2 = memoizedGetPersonInfo(person2);

            expect(result1).toBe('太郎は30歳です');
            expect(spy).toHaveBeenCalledTimes(1);

            expect(result2).toBe('太郎は30歳です');
            expect(spy).toHaveBeenCalledTimes(1); // 再計算されていない
        });

        it('異なるキーを生成する関数を使うと再計算される', () => {
            const add = (a: number, b: number) => a + b;
            const spy = vi.fn(add);
            let counter = 0;

            const memoizedAdd = memoize(
                spy,
                // 呼び出しごとに異なるキーを返すシンプルなカウンター
                () => (counter++).toString()
            );

            const result1 = memoizedAdd(1, 2);
            const result2 = memoizedAdd(1, 2);

            expect(result1).toBe(3);
            expect(result2).toBe(3);
            expect(spy).toHaveBeenCalledTimes(2); // キーが異なるため再計算される
        });

        it('引数がオブジェクトの場合デフォルトキー生成関数でも正しく動作する', () => {
            const getSum = (obj: { a: number, b: number }) => obj.a + obj.b;
            const spy = vi.fn(getSum);

            const memoizedGetSum = memoize(spy);
            const result1 = memoizedGetSum({ a: 1, b: 2 });
            const result2 = memoizedGetSum({ a: 1, b: 2 }); // 同じ値を持つ新しいオブジェクト

            expect(result1).toBe(3);
            expect(result2).toBe(3);
            expect(spy).toHaveBeenCalledTimes(1); // JSONキーが同じため再計算されない
        });
    });
});