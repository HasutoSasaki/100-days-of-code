export type GitCommandArgs = {
    branchName: string;
    day: number; // Day value as a three-digit number
};

export type CreateFeatureBranchOptions = {
    baseBranch: string;
    featureName: string;
    day: number; // Day value as a three-digit number
};

export type ValidationResult = {
    isValid: boolean;
    message: string;
};