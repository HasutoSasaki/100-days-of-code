export function isPrimitive(obj: unknown): boolean {
    return obj === null || typeof obj !== 'object';
}

export function isObject(value: unknown): value is Record<string, any> {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}