import { isPalindrome } from './index';
import { describe, test, expect } from 'vitest';

describe('isPalindrome関数のテスト', () => {
    test('空文字列は回文と判定される', () => {
        const input = '';

        const result = isPalindrome(input);

        expect(result).toBe(true);
    });

    test('単一文字は回文と判定される', () => {
        const input = 'a';

        const result = isPalindrome(input);

        expect(result).toBe(true);
    });

    test('単純な回文を正しく判定する - 成功ケース', () => {
        const input1 = 'level';
        const input2 = 'racecar';

        const result1 = isPalindrome(input1);
        const result2 = isPalindrome(input2);

        expect(result1).toBe(true);
        expect(result2).toBe(true);
    });

    test('単純な回文を正しく判定する - 失敗ケース', () => {
        const input1 = 'hello';
        const input2 = 'world';

        const result1 = isPalindrome(input1);
        const result2 = isPalindrome(input2);

        expect(result1).toBe(false);
        expect(result2).toBe(false);
    });

    test('スペースや句読点を無視して判定する - 成功ケース', () => {
        const input1 = 'A man, a plan, a canal, Panama';
        const input2 = 'Was it a car or a cat I saw?';

        const result1 = isPalindrome(input1);
        const result2 = isPalindrome(input2);

        expect(result1).toBe(true);
        expect(result2).toBe(true);
    });

    test('スペースや句読点を無視して判定する - 失敗ケース', () => {
        const input1 = 'Hello, World!';
        const input2 = 'This is not a palindrome.';

        const result1 = isPalindrome(input1);
        const result2 = isPalindrome(input2);

        expect(result1).toBe(false);
        expect(result2).toBe(false);
    });

    test('大文字小文字を区別せずに判定する', () => {
        const input1 = 'Able was I ere I saw Elba';
        const input2 = 'Madam Im Adam';

        const result1 = isPalindrome(input1);
        const result2 = isPalindrome(input2);

        expect(result1).toBe(true);
        expect(result2).toBe(true);
    });

    test('数字を含む回文を正しく判定する - 成功ケース', () => {
        const input = '12321';

        const result = isPalindrome(input);

        expect(result).toBe(true);
    });

    test('数字を含む回文を正しく判定する - 失敗ケース', () => {
        const input = '12345';

        const result = isPalindrome(input);

        expect(result).toBe(false);
    });
});