#!/bin/bash

# 100 Days of Code用のエイリアス設定スクリプト
# 使用方法: source ./scripts/setup-aliases.sh

# Git Branch Automationのパス
AUTOMATION_PATH="/Users/sasakihasuto/Documents/100-days-of-code/git-branch-automation"

# エイリアスを設定
alias day-start='cd '"$AUTOMATION_PATH"' && npm run start'
alias day-commit='cd '"$AUTOMATION_PATH"' && npm run start'
alias day-branch=''"$AUTOMATION_PATH"'/scripts/day-branch.sh'

echo "✅ エイリアスが設定されました!"
echo ""
echo "使用可能なコマンド:"
echo "  day-start 042        - Day 042のブランチを作成"
echo "  day-commit 042 commit - Day 042の作業をコミット&プッシュ"
echo "  day-branch 042       - シェルスクリプト版でブランチ作成"
echo "  day-branch 042 commit - シェルスクリプト版でコミット&プッシュ"
echo ""
echo "💡 永続的にエイリアスを設定するには、以下を~/.zshrcに追加してください:"
echo "source $AUTOMATION_PATH/scripts/setup-aliases.sh"
