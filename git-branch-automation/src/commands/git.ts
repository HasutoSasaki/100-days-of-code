import { execSync } from 'child_process';

/**
 * Checks out the master branch.
 */
export function checkoutMaster(): void {
    execSync('git checkout master', { stdio: 'inherit' });
}

/**
 * Pulls the latest changes from the master branch.
 */
export function pullMaster(): void {
    execSync('git pull origin master', { stdio: 'inherit' });
}

/**
 * Checks if a branch exists locally.
 * @param branchName - The branch name to check.
 * @returns True if the branch exists.
 */
export function branchExists(branchName: string): boolean {
    try {
        execSync(`git show-ref --verify --quiet refs/heads/${branchName}`, { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
}

/**
 * Creates a new feature branch based on the provided day value.
 * @param day - The day value as a three-digit number.
 */
export function createFeatureBranch(day: number): void {
    if (day < 1 || day > 999) {
        throw new Error('Day value must be between 1 and 999.');
    }
    const branchName = `feature/day${String(day).padStart(3, '0')}`;

    if (branchExists(branchName)) {
        console.log(`⚠️ Branch ${branchName} already exists. Switching to it...`);
        execSync(`git checkout ${branchName}`, { stdio: 'inherit' });
    } else {
        execSync(`git checkout -b ${branchName}`, { stdio: 'inherit' });
    }
}

/**
 * Commits changes with a formatted message for the day.
 * @param day - The day value as a three-digit number.
 */
export function commitDayWork(day: number): void {
    if (day < 1 || day > 999) {
        throw new Error('Day value must be between 1 and 999.');
    }
    const dayFormatted = String(day).padStart(3, '0');
    const commitMessage = `docs: Add Day ${dayFormatted} work log`;
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
}

/**
 * Pushes the current branch to origin with upstream tracking.
 * @param day - The day value as a three-digit number.
 */
export function pushFeatureBranch(day: number): void {
    if (day < 1 || day > 999) {
        throw new Error('Day value must be between 1 and 999.');
    }
    const branchName = `feature/day${String(day).padStart(3, '0')}`;
    execSync(`git push origin -u ${branchName}`, { stdio: 'inherit' });
}

/**
 * Formats the day number to a three-digit string.
 * @param day - The day value as a number.
 * @returns The formatted three-digit string.
 */
export function formatDay(day: number): string {
    return String(day).padStart(3, '0');
}

/**
 * Executes the complete workflow: checkout master, pull, create feature branch.
 * @param day - The day value as a three-digit number.
 */
export function createDayBranch(day: number): void {
    console.log(`🚀 Starting Day ${formatDay(day)} branch creation...`);

    console.log('📥 Checking out master branch...');
    checkoutMaster();

    console.log('⬇️ Pulling latest changes...');
    pullMaster();

    console.log(`🌿 Creating feature branch for Day ${formatDay(day)}...`);
    createFeatureBranch(day);

    console.log(`✅ Ready to work on Day ${formatDay(day)}! 🎉`);
}

/**
 * Executes the complete workflow for committing and pushing day work.
 * @param day - The day value as a three-digit number.
 */
export function commitAndPushDayWork(day: number): void {
    console.log(`📝 Committing Day ${formatDay(day)} work...`);
    commitDayWork(day);

    console.log(`🚀 Pushing to origin...`);
    pushFeatureBranch(day);

    console.log(`✅ Day ${formatDay(day)} work committed and pushed! 🎉`);
}