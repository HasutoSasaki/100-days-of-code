/**
 * Day 9: バリデーションライブラリ
 * 
 * 型安全なスキーマベースのバリデーションライブラリの実装
 */

type FieldType = 'string' | 'number' | 'boolean' | 'array' | 'object' | string;

// バリデーション結果の型定義
export type ValidationResult = {
    valid: boolean;
    errors: ValidationError[];
};

// バリデーションエラーの型定義
export type ValidationError = {
    path: string;
    message: string;
};

// スキーマのフィールド型定義
export type SchemaField<T> = {
    type: FieldType;
    required?: boolean;
    validate?: (value: T) => boolean;
    errorMessage?: string;
    schema?: Schema; // ネストしたスキーマのサポート
    validations?: Array<{
        validate: (value: T) => boolean;
        errorMessage?: string;
    }>;
};

// スキーマの型定義
export type Schema = {
    [key: string]: SchemaField<any>;
};

/**
 * バリデーションライブラリのメインクラス
 */
export class Validator {
    private schema: Schema;

    /**
     * バリデーターを初期化
     * @param schema バリデーションスキーマ
     */
    constructor(schema: Schema) {
        this.schema = schema;
    }

    /**
     * オブジェクトをバリデート
     * @param data 検証対象のオブジェクト
     * @returns バリデーション結果
     */
    validate(data: Record<string, any>): ValidationResult {
        const errors: ValidationError[] = [];
        this.validateObject(data, this.schema, '', errors);

        return {
            valid: errors.length === 0,
            errors,
        };
    }

    /**
     * オブジェクトをバリデート（再帰的に呼び出される内部メソッド）
     * @param data 検証対象のオブジェクト
     * @param schema 検証に使用するスキーマ
     * @param parentPath 親要素のパス（ネストしたオブジェクト用）
     * @param errors エラーを格納する配列
     */
    private validateObject(
        data: Record<string, any>,
        schema: Schema,
        parentPath: string,
        errors: ValidationError[]
    ): void {
        // スキーマの各フィールドに対してバリデーションを実行
        for (const [key, field] of Object.entries(schema)) {
            const value = data[key];
            const path = parentPath ? `${parentPath}.${key}` : key;

            // 必須フィールドのチェック
            if (field.required && (value === undefined || value === null)) {
                errors.push({
                    path,
                    message: field.errorMessage || `${path} is required`,
                });
                continue;
            }

            // 値が存在する場合のみ型とカスタムバリデーションをチェック
            if (value !== undefined && value !== null) {
                // 型チェック
                if (!this.checkType(value, field.type)) {
                    errors.push({
                        path,
                        message: field.errorMessage || `${path} must be of type ${field.type}`,
                    });
                    continue;
                }

                // カスタムバリデーションの実行
                if (field.validate && !field.validate(value)) {
                    errors.push({
                        path,
                        message: field.errorMessage || `${path} failed validation`,
                    });
                }

                // 複数のバリデーションルールを実行
                if (field.validations && field.validations.length > 0) {
                    for (const validation of field.validations) {
                        if (!validation.validate(value)) {
                            errors.push({
                                path,
                                message: validation.errorMessage || `${path} failed validation`,
                            });
                        }
                    }
                }

                // ネストしたオブジェクトのバリデーション
                if (field.type === 'object' && field.schema && typeof value === 'object') {
                    this.validateObject(value, field.schema, path, errors);
                }

                // 配列内のオブジェクトのバリデーション
                if (field.type === 'array' && field.schema && Array.isArray(value)) {
                    const schema = field.schema;
                    value.forEach((item, index) => {
                        if (typeof item === 'object' && item !== null) {
                            this.validateObject(item, schema, `${path}[${index}]`, errors);
                        }
                    });
                }
            }
        }
    }

    /**
     * 値の型をチェック
     * @param value チェック対象の値
     * @param type 期待される型
     * @returns 型が一致するか
     */
    private checkType(value: any, type: string): boolean {
        switch (type) {
            case 'string':
                return typeof value === 'string';
            case 'number':
                return typeof value === 'number' && !isNaN(value);
            case 'boolean':
                return typeof value === 'boolean';
            case 'array':
                return Array.isArray(value);
            case 'object':
                return typeof value === 'object' && value !== null && !Array.isArray(value);
            default:
                return true; // カスタム型は常に true を返す
        }
    }

    /**
     * スキーマを取得
     * @returns バリデーションスキーマ
     */
    getSchema(): Schema {
        return this.schema;
    }
}

/**
 * スキーマビルダークラス
 * バリデーションスキーマを構築するためのヘルパークラス
 */
export class SchemaBuilder {
    private schema: Schema = {};
    private RESERVED_PROPS = ['type', 'required', 'validate', 'errorMessage', 'schema', 'validations'];


    private addField<T>(name: string, type: FieldType, options: Partial<SchemaField<T>> = {}): SchemaBuilder {
        const validations = options.validations || [];

        Object.keys(options).forEach(key => {
            if (!this.RESERVED_PROPS.includes(key)) {
                const rule = options[key as keyof typeof options];
                if (rule && typeof rule === 'object' && 'validate' in rule) {
                    validations.push(rule as any);
                    delete options[key as keyof typeof options];
                }
            }
        });

        this.schema[name] = {
            type,
            ...options,
            validations
        };
        return this;
    }

    /**
     * 文字列フィールドを追加
     * @param name フィールド名
     * @param options オプション
     */
    string(name: string, options: Partial<SchemaField<string>> = {}): SchemaBuilder {
        return this.addField<string>(name, 'string', options);
    }

    /**
     * 数値フィールドを追加
     * @param name フィールド名
     * @param options オプション
     */
    number(name: string, options: Partial<SchemaField<number>> = {}): SchemaBuilder {
        return this.addField<number>(name, 'number', options);
    }

    /**
     * 真偽値フィールドを追加
     * @param name フィールド名
     * @param options オプション
     */
    boolean(name: string, options: Partial<SchemaField<boolean>> = {}): SchemaBuilder {
        return this.addField<boolean>(name, 'boolean', options);
    }

    /**
     * 配列フィールドを追加
     * @param name フィールド名
     * @param options オプション
     */
    array(name: string, options: Partial<SchemaField<any[]>> = {}): SchemaBuilder {
        return this.addField<any[]>(name, 'array', options);
    }

    /**
     * オブジェクトフィールドを追加
     * @param name フィールド名
     * @param options オプション
     */
    object(name: string, options: Partial<SchemaField<Record<string, any>>> = {}): SchemaBuilder {
        return this.addField<Record<string, any>>(name, 'object', options);
    }

    /**
     * カスタムフィールドを追加
     * @param name フィールド名
     * @param options オプション
     */
    custom<T>(name: string, options: SchemaField<T>): SchemaBuilder {
        return this.addField<T>(name, options.type as FieldType, options);
    }

    /**
     * スキーマを構築
     * @returns 構築されたスキーマ
     */
    build(): Schema {
        return this.schema;
    }

    /**
     * バリデーターインスタンスを作成
     * @returns 構築されたバリデーター
     */
    createValidator(): Validator {
        return new Validator(this.schema);
    }
}

/**
 * ネストしたオブジェクトのスキーマを構築するためのユーティリティ
 */
export class NestedSchemaBuilder {
    /**
     * ネストしたオブジェクトスキーマを作成
     * @param builder スキーマビルダー関数
     * @returns ネストしたスキーマ
     */
    static object(builder: (schema: SchemaBuilder) => SchemaBuilder): { type: 'object', schema: Schema } {
        const schemaBuilder = new SchemaBuilder();
        builder(schemaBuilder);
        return {
            type: 'object',
            schema: schemaBuilder.build()
        };
    }

    /**
     * 配列アイテムのオブジェクトスキーマを作成
     * @param builder スキーマビルダー関数
     * @returns 配列アイテムのスキーマ
     */
    static arrayOf(builder: (schema: SchemaBuilder) => SchemaBuilder): { type: 'array', schema: Schema } {
        const schemaBuilder = new SchemaBuilder();
        builder(schemaBuilder);
        return {
            type: 'array',
            schema: schemaBuilder.build()
        };
    }
}

/**
 * よく使われるバリデーションルールを集めたユーティリティ
 */
export const ValidationRules = {
    /**
     * 最小文字数のバリデーション
     * @param min 最小文字数
     * @param errorMessage カスタムエラーメッセージ
     */
    minLength: (min: number, errorMessage?: string) => ({
        validate: (value: string) => value.length >= min,
        errorMessage: errorMessage || `Value must be at least ${min} characters long`
    }),

    /**
     * 最大文字数のバリデーション
     * @param max 最大文字数
     * @param errorMessage カスタムエラーメッセージ
     */
    maxLength: (max: number, errorMessage?: string) => ({
        validate: (value: string) => value.length <= max,
        errorMessage: errorMessage || `Value must be at most ${max} characters long`
    }),

    /**
     * メールアドレスのバリデーション
     * @param errorMessage カスタムエラーメッセージ
     */
    email: (errorMessage?: string) => ({
        validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        errorMessage: errorMessage || 'Invalid email format'
    }),

    /**
     * 数値の範囲バリデーション
     * @param min 最小値
     * @param max 最大値
     * @param errorMessage カスタムエラーメッセージ
     */
    range: (min: number, max: number, errorMessage?: string) => ({
        validate: (value: number) => value >= min && value <= max,
        errorMessage: errorMessage || `Value must be between ${min} and ${max}`
    }),

    /**
     * URLのバリデーション
     * @param errorMessage カスタムエラーメッセージ
     */
    url: (errorMessage?: string) => ({
        validate: (value: string) => {
            try {
                new URL(value);
                return true;
            } catch {
                return false;
            }
        },
        errorMessage: errorMessage || 'Invalid URL format'
    }),

    /**
     * パターンマッチのバリデーション
     * @param pattern 正規表現パターン
     * @param errorMessage カスタムエラーメッセージ
     */
    pattern: (pattern: RegExp, errorMessage?: string) => ({
        validate: (value: string) => pattern.test(value),
        errorMessage: errorMessage || 'Value does not match the required pattern'
    }),

    /**
     * 列挙型のバリデーション
     * @param allowedValues 許可される値の配列
     * @param errorMessage カスタムエラーメッセージ
     */
    enum: <T>(allowedValues: T[], errorMessage?: string) => ({
        validate: (value: T) => allowedValues.includes(value),
        errorMessage: errorMessage || `Value must be one of: ${allowedValues.join(', ')}`
    }),

    /**
     * 配列の要素数バリデーション
     * @param min 最小要素数
     * @param max 最大要素数
     * @param errorMessage カスタムエラーメッセージ
     */
    arrayLength: (min: number, max?: number, errorMessage?: string) => ({
        validate: (value: any[]) =>
            value.length >= min && (max === undefined || value.length <= max),
        errorMessage: errorMessage ||
            (max !== undefined
                ? `Array must contain between ${min} and ${max} items`
                : `Array must contain at least ${min} items`)
    })
};