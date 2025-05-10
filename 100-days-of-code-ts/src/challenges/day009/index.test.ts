import { describe, it, expect } from 'vitest';
import { Validator, SchemaBuilder, NestedSchemaBuilder, ValidationRules } from './index';

describe('バリデーションライブラリ', () => {
    describe('基本的なバリデーション', () => {
        it('単純なスキーマに対して有効なデータを検証できる', () => {
            const validator = new Validator({
                name: { type: 'string', required: true },
                age: { type: 'number' }
            });

            const result = validator.validate({
                name: 'John Doe',
                age: 30
            });

            expect(result.valid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('必須フィールドがない場合エラーを返す', () => {
            const validator = new Validator({
                name: { type: 'string', required: true },
                age: { type: 'number' }
            });

            const result = validator.validate({
                age: 30
            });

            expect(result.valid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].path).toBe('name');
            expect(result.errors[0].message).toContain('required');
        });

        it('型が一致しない場合エラーを返す', () => {
            const validator = new Validator({
                name: { type: 'string' },
                age: { type: 'number' }
            });

            const result = validator.validate({
                name: 'John Doe',
                age: '30' // 文字列なので型エラー
            });

            expect(result.valid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].path).toBe('age');
            expect(result.errors[0].message).toContain('type');
        });
    });

    describe('カスタムバリデーション', () => {
        it('カスタム検証ルールに従ってデータを検証できる', () => {
            const validator = new Validator({
                email: {
                    type: 'string',
                    required: true,
                    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
                    errorMessage: 'Invalid email format'
                }
            });

            const invalidResult = validator.validate({
                email: 'invalid-email'
            });

            expect(invalidResult.valid).toBe(false);
            expect(invalidResult.errors[0].message).toBe('Invalid email format');

            const validResult = validator.validate({
                email: 'test@example.com'
            });

            expect(validResult.valid).toBe(true);
        });

        it('複数のフィールドに複数のエラーがある場合、すべてのエラーを返す', () => {
            const validator = new Validator({
                username: {
                    type: 'string',
                    required: true,
                    validate: (value) => value.length >= 3,
                    errorMessage: 'Username must be at least 3 characters'
                },
                password: {
                    type: 'string',
                    required: true,
                    validate: (value) => value.length >= 8,
                    errorMessage: 'Password must be at least 8 characters'
                }
            });

            const result = validator.validate({
                username: 'ab',
                password: '1234'
            });

            expect(result.valid).toBe(false);
            expect(result.errors).toHaveLength(2);
        });
    });

    describe('SchemaBuilder', () => {
        it('SchemaBuilderでスキーマを構築できる', () => {
            const schema = new SchemaBuilder()
                .string('name', { required: true })
                .number('age', { required: true, validate: (age) => age >= 0 })
                .boolean('active')
                .build();

            expect(schema.name.type).toBe('string');
            expect(schema.name.required).toBe(true);
            expect(schema.age.type).toBe('number');
            expect(typeof schema.age.validate).toBe('function');
            expect(schema.active.type).toBe('boolean');
            expect(schema.active.required).toBeUndefined();
        });

        it('SchemaBuilderでバリデーターを直接作成できる', () => {
            const validator = new SchemaBuilder()
                .string('name', { required: true })
                .number('age', {
                    required: true,
                    validate: (age) => age >= 18,
                    errorMessage: 'Age must be 18 or older'
                })
                .createValidator();

            const result = validator.validate({
                name: 'John',
                age: 16
            });

            expect(result.valid).toBe(false);
            expect(result.errors[0].message).toBe('Age must be 18 or older');
        });
    });

    describe('複合バリデーション', () => {
        it('配列型を正しく検証できる', () => {
            const validator = new SchemaBuilder()
                .array('tags', {
                    validate: (tags) => tags.length > 0 && tags.every(tag => typeof tag === 'string')
                })
                .createValidator();

            expect(validator.validate({ tags: ['typescript', 'javascript'] }).valid).toBe(true);
            expect(validator.validate({ tags: [] }).valid).toBe(false);
            expect(validator.validate({ tags: [1, 2, 3] }).valid).toBe(false);
        });

        it('オブジェクト型を正しく検証できる', () => {
            const validator = new SchemaBuilder()
                .object('address', {
                    required: true
                })
                .createValidator();

            expect(validator.validate({ address: { city: 'Tokyo', country: 'Japan' } }).valid).toBe(true);
            expect(validator.validate({ address: null }).valid).toBe(false);
            expect(validator.validate({ address: 'Tokyo, Japan' }).valid).toBe(false);
        });
    });

    describe('ネストしたオブジェクトのバリデーション', () => {
        it('ネストしたオブジェクトを検証できる', () => {
            const validator = new SchemaBuilder()
                .string('name', { required: true })
                .object('address', {
                    required: true,
                    schema: {
                        street: { type: 'string', required: true },
                        city: { type: 'string', required: true },
                        zipCode: { type: 'string', required: true }
                    }
                })
                .createValidator();

            const validResult = validator.validate({
                name: 'John Doe',
                address: {
                    street: '123 Main St',
                    city: 'New York',
                    zipCode: '10001'
                }
            });

            expect(validResult.valid).toBe(true);

            const invalidResult = validator.validate({
                name: 'John Doe',
                address: {
                    street: '123 Main St',
                    // cityが欠けている
                    zipCode: '10001'
                }
            });

            expect(invalidResult.valid).toBe(false);
            expect(invalidResult.errors[0].path).toBe('address.city');
            expect(invalidResult.errors[0].message).toContain('required');
        });

        it('NestedSchemaBuilderを使ってネストしたスキーマを構築できる', () => {
            const validator = new SchemaBuilder()
                .string('name', { required: true })
                .object('address', {
                    required: true,
                    ...NestedSchemaBuilder.object(builder =>
                        builder
                            .string('street', { required: true })
                            .string('city', { required: true })
                            .string('zipCode', { required: true })
                    )
                })
                .createValidator();

            const result = validator.validate({
                name: 'John Doe',
                address: {
                    street: '123 Main St',
                    city: 'New York',
                    // zipCodeが欠けている
                }
            });

            expect(result.valid).toBe(false);
            expect(result.errors[0].path).toBe('address.zipCode');
        });

        it('配列内のオブジェクトを検証できる', () => {
            const validator = new SchemaBuilder()
                .string('name', { required: true })
                .array('contacts', {
                    required: true,
                    ...NestedSchemaBuilder.arrayOf(builder =>
                        builder
                            .string('type', { required: true })
                            .string('value', { required: true })
                    )
                })
                .createValidator();

            const result = validator.validate({
                name: 'John Doe',
                contacts: [
                    { type: 'email', value: 'john@example.com' },
                    { type: 'phone', value: '123-456-7890' },
                    { type: 'social', /* valueが欠けている */ }
                ]
            });

            expect(result.valid).toBe(false);
            expect(result.errors[0].path).toBe('contacts[2].value');
            expect(result.errors[0].message).toContain('required');
        });
    });

    describe('ValidationRules', () => {
        it('メールアドレスの検証ルールを使用できる', () => {
            const validator = new SchemaBuilder()
                .string('email', {
                    required: true,
                    validations: [ValidationRules.email()]
                })
                .createValidator();

            expect(validator.validate({ email: 'test@example.com' }).valid).toBe(true);
            expect(validator.validate({ email: 'invalid-email' }).valid).toBe(false);
        });

        it('文字列の長さの検証ルールを使用できる', () => {
            const validator = new SchemaBuilder()
                .string('username', {
                    required: true,
                    validations: [
                        ValidationRules.minLength(3, 'Username must be at least 3 characters'),
                        ValidationRules.maxLength(20, 'Username cannot exceed 20 characters')
                    ]
                })
                .createValidator();

            expect(validator.validate({ username: 'johndoe' }).valid).toBe(true);
            expect(validator.validate({ username: 'a' }).valid).toBe(false);
            expect(validator.validate({ username: 'a'.repeat(25) }).valid).toBe(false);
        });

        it('数値の範囲の検証ルールを使用できる', () => {
            const validator = new SchemaBuilder()
                .number('age', {
                    required: true,
                    validations: [ValidationRules.range(18, 65, 'Age must be between 18 and 65')]
                })
                .createValidator();

            expect(validator.validate({ age: 30 }).valid).toBe(true);
            expect(validator.validate({ age: 15 }).valid).toBe(false);
            expect(validator.validate({ age: 70 }).valid).toBe(false);
        });

        it('複数のバリデーションルールを組み合わせることができる', () => {
            const validator = new SchemaBuilder()
                .string('password', {
                    required: true,
                    validations: [
                        ValidationRules.minLength(8, 'Password must be at least 8 characters'),
                        ValidationRules.pattern(/[A-Z]/, 'Password must contain at least one uppercase letter'),
                        ValidationRules.pattern(/[0-9]/, 'Password must contain at least one number')
                    ]
                })
                .createValidator();

            expect(validator.validate({ password: 'Password123' }).valid).toBe(true);
            expect(validator.validate({ password: 'password' }).valid).toBe(false); // 大文字がない
            expect(validator.validate({ password: 'Password' }).valid).toBe(false); // 数字がない
            expect(validator.validate({ password: 'Pw1' }).valid).toBe(false); // 短すぎる
        });

        it('列挙型の検証ルールを使用できる', () => {
            const validator = new SchemaBuilder()
                .string('role', {
                    required: true,
                    validations: [ValidationRules.enum(['admin', 'user', 'guest'], 'Invalid role')]
                })
                .createValidator();

            expect(validator.validate({ role: 'admin' }).valid).toBe(true);
            expect(validator.validate({ role: 'superuser' }).valid).toBe(false);
        });

        it('配列の長さの検証ルールを使用できる', () => {
            const validator = new SchemaBuilder()
                .array('interests', {
                    required: true,
                    validations: [ValidationRules.arrayLength(1, 5, 'You must select between 1 and 5 interests')]
                })
                .createValidator();

            expect(validator.validate({ interests: ['coding'] }).valid).toBe(true);
            expect(validator.validate({ interests: [] }).valid).toBe(false);
            expect(validator.validate({ interests: ['a', 'b', 'c', 'd', 'e', 'f'] }).valid).toBe(false);
        });
    });

    describe('実用的な例', () => {
        it('ユーザー登録フォームのバリデーション', () => {
            const userValidator = new SchemaBuilder()
                .string('username', {
                    required: true,
                    validations: [
                        ValidationRules.minLength(3),
                        ValidationRules.maxLength(20)
                    ]
                })
                .string('email', {
                    required: true,
                    validations: [ValidationRules.email()]
                })
                .string('password', {
                    required: true,
                    validations: [
                        ValidationRules.minLength(8),
                        ValidationRules.pattern(/[A-Z]/, 'Password must contain at least one uppercase letter'),
                        ValidationRules.pattern(/[0-9]/, 'Password must contain at least one number')
                    ]
                })
                .number('age', {
                    required: true,
                    validations: [ValidationRules.range(18, 120)]
                })
                .object('address', {
                    required: true,
                    ...NestedSchemaBuilder.object(builder =>
                        builder
                            .string('street', { required: true })
                            .string('city', { required: true })
                            .string('zipCode', {
                                required: true,
                                validations: [ValidationRules.pattern(/^\d{5}$/, 'Zip code must be 5 digits')]
                            })
                            .string('country', { required: true })
                    )
                })
                .array('interests', {
                    validations: [ValidationRules.arrayLength(1, 5)]
                })
                .createValidator();

            const validUser = {
                username: 'johndoe',
                email: 'john@example.com',
                password: 'Password123',
                age: 30,
                address: {
                    street: '123 Main St',
                    city: 'New York',
                    zipCode: '10001',
                    country: 'USA'
                },
                interests: ['coding', 'reading']
            };

            const invalidUser = {
                username: 'j', // 短すぎる
                email: 'invalid-email', // 無効なメール
                password: 'password', // 大文字と数字がない
                age: 15, // 18未満
                address: {
                    street: '123 Main St',
                    city: 'New York',
                    zipCode: 'ABC', // 5桁の数字ではない
                    country: 'USA'
                },
                interests: ['coding', 'reading', 'sports', 'music', 'movies', 'traveling'] // 5つ以上
            };

            const validResult = userValidator.validate(validUser);
            expect(validResult.valid).toBe(true);

            const invalidResult = userValidator.validate(invalidUser);
            expect(invalidResult.valid).toBe(false);
            expect(invalidResult.errors.length).toBeGreaterThan(0);
        });
    });
});