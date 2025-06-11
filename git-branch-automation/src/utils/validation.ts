// This file contains validation functions for input data, including date format validation.

/**
 * Validates if a string represents a three-digit day number.
 * @param dayString - The day string to validate.
 * @returns True if the string is a valid three-digit number.
 */
export function validateDay(dayString: string): boolean {
    const regex = /^\d{3}$/; // Regex to match a three-digit number
    if (!regex.test(dayString)) {
        return false;
    }

    const day = parseInt(dayString, 10);
    return day >= 1 && day <= 999;
}

/**
 * Validates if a branch name follows the feature/dayXXX pattern.
 * @param branchName - The branch name to validate.
 * @returns True if the branch name is valid.
 */
export function isValidFeatureBranchName(branchName: string): boolean {
    const regex = /^feature\/day\d{3}$/; // Regex to match feature branches with three-digit numbers
    return regex.test(branchName);
}

/**
 * Converts a day string to a number and validates it.
 * @param dayString - The day string to convert.
 * @returns The day as a number or throws an error if invalid.
 */
export function parseDayInput(dayString: string): number {
    if (!validateDay(dayString)) {
        throw new Error('Day must be a three-digit number (001-999)');
    }
    return parseInt(dayString, 10);
}