// This file is the entry point of the application. It processes command line arguments and invokes the appropriate functionality.

import { createDayBranch, commitAndPushDayWork } from './commands/git';
import { parseDayInput } from './utils/validation';

function showUsage(): void {
    console.log('Usage:');
    console.log('  npm run start <day>           - Create feature branch for day');
    console.log('  npm run start <day> commit    - Commit and push day work');
    console.log('');
    console.log('Example:');
    console.log('  npm run start 042             - Create feature/day042 branch');
    console.log('  npm run start 042 commit      - Commit and push Day 042 work');
}

function main(): void {
    const args = process.argv.slice(2);

    if (args.length === 0 || args.length > 2) {
        showUsage();
        process.exit(1);
    }

    try {
        const day = parseDayInput(args[0]);
        const isCommitMode = args[1] === 'commit';

        if (isCommitMode) {
            commitAndPushDayWork(day);
        } else {
            createDayBranch(day);
        }
    } catch (error) {
        console.error(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        process.exit(1);
    }
}

main();