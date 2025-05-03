export function isPalindrome(str: string): boolean {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversedStr = cleanStr.split('').reverse().join('');

    return cleanStr === reversedStr;
}