import { describe, test, expect } from 'vitest';
import { validateDay, parseDayInput, isValidFeatureBranchName } from '../src/utils/validation';
import { formatDay } from '../src/commands/git';

describe('Validation Functions', () => {
    describe('validateDay', () => {
        test('should accept valid three-digit days', () => {
            expect(validateDay('100')).toBe(true);
            expect(validateDay('042')).toBe(true);
            expect(validateDay('999')).toBe(true);
        });

        test('should reject invalid day formats', () => {
            expect(validateDay('99')).toBe(false);
            expect(validateDay('1000')).toBe(false);
            expect(validateDay('abc')).toBe(false);
            expect(validateDay('42')).toBe(false);
        });
    });

    describe('parseDayInput', () => {
        test('should parse valid day strings to numbers', () => {
            expect(parseDayInput('100')).toBe(100);
            expect(parseDayInput('042')).toBe(42);
            expect(parseDayInput('999')).toBe(999);
        });

        test('should throw error for invalid inputs', () => {
            expect(() => parseDayInput('99')).toThrow();
            expect(() => parseDayInput('abc')).toThrow();
        });
    });

    describe('isValidFeatureBranchName', () => {
        test('should validate feature branch names', () => {
            expect(isValidFeatureBranchName('feature/day042')).toBe(true);
            expect(isValidFeatureBranchName('feature/day100')).toBe(true);
            expect(isValidFeatureBranchName('feature/day999')).toBe(true);
        });

        test('should reject invalid branch names', () => {
            expect(isValidFeatureBranchName('feature/day42')).toBe(false);
            expect(isValidFeatureBranchName('feature/42')).toBe(false);
            expect(isValidFeatureBranchName('day042')).toBe(false);
        });
    });
});

describe('Git Utility Functions', () => {
    describe('formatDay', () => {
        test('should format days with leading zeros', () => {
            expect(formatDay(1)).toBe('001');
            expect(formatDay(42)).toBe('042');
            expect(formatDay(100)).toBe('100');
            expect(formatDay(999)).toBe('999');
        });
    });
});
