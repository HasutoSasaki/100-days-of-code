#!/bin/bash

# 100 Days of Code用のGitブランチ自動化スクリプト
# 使用方法: ./scripts/day-branch.sh 042 [commit]

set -e  # エラーが発生したら終了

# 引数チェック
if [ $# -eq 0 ] || [ $# -gt 2 ]; then
    echo "使用方法:"
    echo "  ./scripts/day-branch.sh <day>          - featureブランチを作成"
    echo "  ./scripts/day-branch.sh <day> commit   - 作業をコミット&プッシュ"
    echo ""
    echo "例:"
    echo "  ./scripts/day-branch.sh 042"
    echo "  ./scripts/day-branch.sh 042 commit"
    exit 1
fi

DAY=$1
COMMIT_MODE=$2

# 日付の形式チェック (3桁の数字)
if ! [[ "$DAY" =~ ^[0-9]{3}$ ]]; then
    echo "❌ エラー: 日付は3桁の数字で入力してください (例: 042)"
    exit 1
fi

# 日付の範囲チェック (数値として比較)
DAY_NUM=$((10#$DAY))  # 先頭の0を除いて数値に変換
if [ "$DAY_NUM" -lt 1 ] || [ "$DAY_NUM" -gt 999 ]; then
    echo "❌ エラー: 日付は001-999の範囲で入力してください"
    exit 1
fi

BRANCH_NAME="feature/day${DAY}"

if [ "$COMMIT_MODE" = "commit" ]; then
    # コミット＆プッシュモード
    echo "📝 Day ${DAY}の作業をコミット中..."
    git commit -m "docs: Add Day ${DAY} work log"
    
    echo "🚀 リモートにプッシュ中..."
    git push origin -u "${BRANCH_NAME}"
    
    echo "✅ Day ${DAY}の作業がコミット＆プッシュされました! 🎉"
else
    # ブランチ作成モード
    echo "🚀 Day ${DAY}のブランチ作成を開始..."
    
    echo "📥 masterブランチに切り替え中..."
    git checkout master
    
    echo "⬇️ 最新の変更をpull中..."
    git pull origin master
    
    echo "🌿 feature/day${DAY}ブランチを作成中..."
    
    # ブランチが既に存在するかチェック
    if git show-ref --verify --quiet refs/heads/"${BRANCH_NAME}"; then
        echo "⚠️ ブランチ ${BRANCH_NAME} は既に存在します。切り替え中..."
        git checkout "${BRANCH_NAME}"
    else
        git checkout -b "${BRANCH_NAME}"
    fi
    
    echo "✅ Day ${DAY}の準備完了! 🎉"
    echo "💡 作業完了後は以下を実行:"
    echo "   ./scripts/day-branch.sh ${DAY} commit"
fi
