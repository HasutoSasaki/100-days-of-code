#!/bin/bash

# Check if the day argument is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <day>"
    exit 1
fi

DAY=$1

# Validate that the day is a three-digit number
if ! [[ $DAY =~ ^[0-9]{3}$ ]]; then
    echo "Error: Day must be a three-digit number."
    exit 1
fi

# Checkout to master branch
git checkout master

# Pull the latest changes from the remote master
git pull origin master

# Create a new feature branch with the specified day
BRANCH_NAME="feature/day-${DAY}"
git checkout -b "$BRANCH_NAME"

# Add a commit message
git commit --allow-empty -m "Create feature branch for day ${DAY}"

# Push the new feature branch to the remote repository
git push origin "$BRANCH_NAME"