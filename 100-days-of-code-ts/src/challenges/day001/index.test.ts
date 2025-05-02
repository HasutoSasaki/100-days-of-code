import { describe, it, expect } from 'vitest';
import { reverseString } from './index';

describe('Day 1: 文字列の逆転', () => {
    it('空文字列を入力した場合、空文字列を返す', () => {
        const input = ''

        const result = reverseString(input)

        expect(result).toBe('');
    });

    it('1文字の文字列を入力した場合、同じ文字列を返す', () => {
        const input = 'a'

        const result = reverseString(input)

        expect(result).toBe('a');
    });

    it('通常の文字列を入力した場合、逆順の文字列を返す', () => {
        const input1 = 'hello';
        const input2 = 'typescript'

        const result1 = reverseString(input1)
        const result2 = reverseString(input2)

        expect(result1).toBe('olleh');
        expect(result2).toBe('tpircsepyt');
    });

    it('数字を入れたらエラーを返すこと', () => {
        const input = 1234 as any

        expect(() => reverseString(input)).toThrow();
    });

    it('特殊文字を含む文字列も逆順に処理できること', () => {
        const input = 'Hello, World!'

        const result = reverseString(input)

        expect(result).toBe('!dlroW ,olleH');
    });

    it('日本語の文字列も逆順に処理できること', () => {
        const input = 'こんにちは'

        const result = reverseString(input)

        expect(result).toBe('はちにんこ');
    });

    it('空白のみの文字列も処理できること', () => {
        const input = '   '

        const result = reverseString(input)

        expect(result).toBe('   ');
    });

    it('nullまたはundefinedを入力した場合エラーを返すこと', () => {
        const input1 = null as any
        const input2 = undefined as any

        expect(() => reverseString(input1)).toThrow();
        expect(() => reverseString(input2)).toThrow();
    });
});