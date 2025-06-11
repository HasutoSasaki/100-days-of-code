#!/bin/bash

# 100 Days of Code Git Branch Automation - Quick Setup
# このスクリプトは自動化ツールを簡単にセットアップします

AUTOMATION_DIR="/Users/sasakihasuto/Documents/100-days-of-code/git-branch-automation"
ZSHRC_FILE="$HOME/.zshrc"

echo "🚀 100 Days of Code Git Branch Automation セットアップ"
echo "=================================================="

# エイリアスをzshrcに追加する関数
add_to_zshrc() {
    local alias_content="
# 100 Days of Code Git Branch Automation
alias day-start='cd $AUTOMATION_DIR && npm run start'
alias day-commit='cd $AUTOMATION_DIR && npm run start'
alias day-branch='$AUTOMATION_DIR/scripts/day-branch.sh'
"
    
    if ! grep -q "100 Days of Code Git Branch Automation" "$ZSHRC_FILE"; then
        echo "$alias_content" >> "$ZSHRC_FILE"
        echo "✅ エイリアスを ~/.zshrc に追加しました"
    else
        echo "ℹ️ エイリアスは既に設定済みです"
    fi
}

# 使用方法を表示
show_usage() {
    echo ""
    echo "📖 使用方法:"
    echo "============="
    echo ""
    echo "1. 新しいDay用のブランチを作成:"
    echo "   day-start 042"
    echo "   または"
    echo "   day-branch 042"
    echo ""
    echo "2. 作業完了後にコミット&プッシュ:"
    echo "   day-commit 042 commit"
    echo "   または"
    echo "   day-branch 042 commit"
    echo ""
    echo "3. TypeScript版を直接使用:"
    echo "   cd $AUTOMATION_DIR"
    echo "   npm run start 042"
    echo "   npm run start 042 commit"
    echo ""
    echo "💡 Tips:"
    echo "- 日付は必ず3桁で入力してください (例: 001, 042, 100)"
    echo "- シェルを再起動するか 'source ~/.zshrc' を実行してエイリアスを有効化"
}

# メイン処理
main() {
    # 依存関係の確認
    if [ ! -d "$AUTOMATION_DIR/node_modules" ]; then
        echo "📦 依存関係をインストール中..."
        cd "$AUTOMATION_DIR" && npm install
    fi
    
    # エイリアスの設定
    echo "⚙️ エイリアスを設定中..."
    add_to_zshrc
    
    # 使用方法を表示
    show_usage
    
    echo ""
    echo "✅ セットアップ完了! 🎉"
    echo "新しいターミナルを開くか、'source ~/.zshrc' を実行してください"
}

main "$@"
