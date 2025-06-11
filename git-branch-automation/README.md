# Git Branch Automation

このプロジェクトは、100 Days of Code チャレンジ用の Git ブランチ作成とコミット作業を自動化する TypeScript ツールです。

## 機能

- 🌿 master ブランチから新しい feature ブランチの作成
- 📥 最新の変更を自動で pull
- 📝 フォーマットされたコミットメッセージでの自動コミット
- 🚀 origin への自動プッシュ
- ✅ 三桁の日付形式でのブランチ管理

## プロジェクト構造

- **src/index.ts**: アプリケーションのエントリーポイント
- **src/commands/git.ts**: Git 操作を実行する関数群
- **src/utils/validation.ts**: 入力値のバリデーション関数
- **src/types/index.ts**: 型定義

## クイックスタート

```bash
# 1. セットアップ（初回のみ）
./scripts/setup.sh

# 2. シェルを再起動するか、エイリアスを読み込み
source ~/.zshrc

# 3. 新しいDayのブランチを作成
day-start 042

# 4. 作業完了後にコミット&プッシュ
day-commit 042 commit
```

## インストール

1. リポジトリをクローン:

   ```bash
   git clone https://github.com/HasutoSasaki/git-branch-automation.git
   cd git-branch-automation
   ```

2. 依存関係をインストール:
   ```bash
   npm install
   ```

## 使用方法

### TypeScript 版（推奨）

```bash
# 新しいfeatureブランチを作成
npm run start 042

# 作業完了後のコミット＆プッシュ
npm run start 042 commit
```

### シェルスクリプト版

```bash
# 新しいfeatureブランチを作成
./scripts/day-branch.sh 042

# 作業完了後のコミット＆プッシュ
./scripts/day-branch.sh 042 commit
```

### エイリアス使用（setup.sh 実行後）

```bash
# 新しいfeatureブランチを作成
day-start 042
# または
day-branch 042

# 作業完了後のコミット＆プッシュ
day-commit 042 commit
# または
day-branch 042 commit
```

## ワークフロー例

## ワークフロー例

```bash
# 1. Day 042の作業開始
day-start 042
# ↓ 実行される処理:
# git checkout master
# git pull origin master
# git checkout -b feature/day042

# 2. コードを書く、ログを更新
# (あなたの作業時間)

# 3. 作業完了、コミット&プッシュ
day-commit 042 commit
# ↓ 実行される処理:
# git commit -m "docs: Add Day 042 work log"
# git push origin -u feature/day042
```

## 便利な機能

- ✅ **自動バリデーション**: 三桁数字以外は受け付けません
- ✅ **フォーマット統一**: 常に`feature/dayXXX`形式
- ✅ **エラーハンドリング**: 適切なエラーメッセージを表示
- ✅ **複数の実行方法**: TypeScript 版、シェルスクリプト版、エイリアス
- ✅ **テスト付き**: 重要な機能にはユニットテスト

## トラブルシューティング

### よくある問題

1. **「day-start コマンドが見つからない」**

   ```bash
   source ~/.zshrc
   # または新しいターミナルを開く
   ```

2. **「npm: command not found」**

   ```bash
   # Node.jsをインストールしてください
   brew install node
   ```

3. **「Permission denied」**
   ```bash
   chmod +x ./scripts/*.sh
   ```

## 開発

```bash
# TypeScriptをビルド
npm run build

# 開発モードで実行
npm run dev 042
```

4. Run the application:
   ```
   npm start -- <date>
   ```
   Replace `<date>` with the desired date in a three-digit format (e.g., 001 for the first day).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
