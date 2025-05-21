# 100 Days Of Code - TypeScript study log

### Day 1: May 2, Friday

**Today's Progress**: 文字列操作のアルゴリズムを実装し、単体テストを作成しました。

**Thoughts**:

- AAA パターンでテストコードを書く方法に慣れていきたい。
- 実際のユースケースを想定しずらかったため、もっと普段使いするような機能を作っていきたい。

**Link(s) to work**:

- [Day 1 challenge](/src/challenges/day001)
- [chibivue の学習(reactive)](https://github.com/HasutoSasaki/chibivue-fork/commit/762e96ce788fc8c0d90188d43e5ae8d8608df2d1)

---

### Day 2: May 3, Saturday

**Today's Progress**: 回文チェッカーを実装し、単体テストを作成しました。

**Thoughts**:

- 普段の実装で使うことはないが、新しいアルゴリズムを学べてよかった。

**Link(s) to work**:

- [Day 2 challenge](/src/challenges/day002)

**other**:

- node.js event loop の理解
  macrotask の前に、maicrotask が実行されることを理解した。
  [参考記事](http://builder.io/blog/visual-guide-to-nodejs-event-loop)

---

### Day 3: May 4, Sunday

**Today's Progress**: 配列操作のユーティリティ関数を実装し、単体テストを作成しました。

**Thoughts**:

- 配列操作苦手だけど、必要性を感じた
- new Set() を使うことで、重複を排除できることを学んだ
- これからは、より効率的なデータ処理を目指していきたい

**Link(s) to work**:

- [Day 3 challenge](/src/challenges/day003)
- [chibivue 仮想 DOM 実装](https://github.com/HasutoSasaki/chibivue-fork/commit/86ae25498a38bc1e5ae7689a8986430324222eea)

### Day 4: May 5, Monday

**Today's Progress**: Object 操作とディープクローンのユーティリティ関数を実装

**Thoughts**:

- Object の操作も苦手なのだが勉強になった。
- Object の型指定にいつも苦戦するので、少しずつ慣れていきたい。
- ディープクローンの実装は、難しかったが、大まか理解できた。
  → ただ、prototype 汚染については、まだ理解できていないので、調べてみる。
- これからは、より効率的なデータ処理を目指していきたい

**Link(s) to work**:

- [Day 4 challenge](/src/challenges/day004)

**other**:

- モバイルアプリ開発を進めた。
  成果：ピンチイン、ピンチアウトの実装
  ※private repository のため、リンクはなし

### Day 5: May 6, Tuesday

**Today's Progress**: 非同期処理のユーティリティ関数を実装

**Thoughts**:

- promise への苦手意識が少し和らいだ。
- 非同期処理のテストコードを書くのに慣れられた。
- 再帰処理を書くことが多いので、実務でも活用できそう。
- 早期リターンについて、or 演算子の際は分けて書いたほうが見やすいなと感じた。
  ※何でもかんでも早期リターンにするのは、あまり良くないので、使い分けが大事。

**Link(s) to work**:

- [Day 5 challenge](/src/challenges/day005)
  理解も含めて、普通に１時間以上かかった

### Day 6: May 7, Wednesday

**Today's Progress**: 関数型プログラミングのユーティリティ関数を実装
**Thoughts**:

- 普段使う機会がないので、全て難しく感じた。
- 処理の内容は大まか理解できた。しかし、型エラーを回避できていないので、きちんと理解できていない。
- memorize や pipe は実務で使う機会があるかもしれないと感じた（見る機会があるかも。
- 全て初見だったので、このようなものがあるということを知れたのは良かった。

**Link(s) to work**:

- [Day 6 challenge](/src/challenges/day006)

**todo**:

- test で型エラーが出ているので、index.ts の型を修正する

### Day 7: May 8, Thursday

**Today's Progress**: シンプルなイベントエミッターを実装
**Thoughts**:

- 普段使う機会がないので、新鮮だった。
- イベントエミッターの実装は、考え方や概念は簡単なため、早めに理解できた。
- コードを理解する際に、上からではなく見出し（型定義）など上のレイヤーから、観察することで、理解が早まることを実感した。

**Link(s) to work**:

- [Day 7 challenge](/src/challenges/day007)

**other**:
java の学習のため、環境構築（vscode + java）

### Day 8: May 9, Friday

**Today's Progress**: ファイル操作のユーティリティ関数を実装
**Thoughts**:

- ファイル操作は、普段使うとしてもシンプルなものだけなので、難しかった
- FileWatcher,LineReader ,createFileProcessor はまだ理解できていないので、調べてみる
- まだまだコードを読む力や Node.js の理解が足りないので、もっと学習していきたい

**Link(s) to work**:

- [Day 8 challenge](/src/challenges/day008)

### Day 9: May 10, Saturday

**Today's Progress**:

- バリデーションライブラリを実装
- github actions で Vitest を使った自動テストを実装

**Thoughts**:

- バリデーションライブラリは、普段使う機会があるので、実装できてよかった。
- 実務では、zod を使うことが多いので、zod の実装を理解するために、zod のソースコードを読もうと思った。
- バリデーションライブラリの仕組みを理解できた気がします
- github actions をもっと勉強したい

**Link(s) to work**:

- [Day 9 challenge](/src/challenges/day009)
- [github actions](.github/workflows/pr-tests.yml)

### Day 10: May 11, Sunday

**Today's Progress**: キャッシュシステムの実装
**Thoughts**:

- キャッシュシステムは、普段自前で作る機会がないので、普通に難しかった
- LRU という概念を初めて学ことができた。
- 使う場面がイメージできずにいるので、実務で使う機会のある実装をしていきたい。
- Class を使った実装は、普段あまり行わないので慣れる機会になった

**Link(s) to work**:

- [Day 10 challenge](/src/challenges/day010)
- [markdown memo app](https://github.com/HasutoSasaki/note-mark)
  - [today commits](https://github.com/HasutoSasaki/note-mark/commits/master/?since=2025-05-11&until=2025-05-11)

### Day 11: May 12, Monday

**Today's Progress**: キャッシュシステムの実装
**Thoughts**:

- キャッシュシステムは、普段自前で作る機会がないので、新鮮だった
- 実装自体はシンプルだったが、理解するのに時間がかかった
- `protected` を初めて知ることができた
  - `protected` は、継承したクラスと自分のクラスからアクセスできるが、他のクラスからはアクセスできない。

**Link(s) to work**:

- [Day 11 challenge](/src/challenges/day011)
- [markdown memo app](https://github.com/HasutoSasaki/note-mark)
  - commit までできなかったが、ファイルへの書き込みを実装途中

### Day 12: May 13, Tuesday

**Today's Progress**: キャッシュシステムのパフォーマンス測定実装

**Thoughts**:

- パフォーマンス測定を使ったことがなかったので、大きな学びだった
- 理解しきれていないので、振り返る必要があると感じた。

- **Link(s) to work**:

- [Day 12 challenge](/src/challenges/day012)
- [markdown memo app](https://github.com/HasutoSasaki/note-mark/commits/master/?since=2025-05-13&until=2025-05-13)

### Day 13: May 14, Wednesday

**Today's Progress**: シンプルなステート管理ライブラリの実装
**Thoughts**:

- ステート管理ライブラリは、普段使う機会があるので、実装できてよかった。
- ステート管理ライブラリの仕組みをなんとなく理解できた気がします

**Link(s) to work**:

- [Day 13 challenge](/src/challenges/day013)
- markdown memo app
  - エラー調査のため、commit までできなかった

### Day 14: May 15, Thursday

**Today's Progress**: アクション/リデューサーパターンの実装
**Thoughts**:

- Redux を使ったことがないので、アクション/リデューサーパターンを初めて学ぶことができた。
- アクション/リデューサーパターンの仕組みをなんとなく理解できた
- ステート管理ライブラリの仕組みをなんとなく理解できた

**Link(s) to work**:

- [Day 14 challenge](/src/challenges/day014)
- markdown memo app
  - エラー解決！preload/index.ts のビルド時に、out/preload/index.mjs になっていて、読み込めていなかった。
    electron.vite.config.ts の preload のビルド時に、cjs に変換するようにした。
  - [commit](https://github.com/HasutoSasaki/note-mark/commit/1cc644c9dd94c9dd8983ea98679a58432c980d7e)

### Day 15: May 16, Friday

**Today's Progress**: ステート変更の監視機能の実装
**Thoughts**:

- ステート変更の監視機能の仕組みをなんとなく理解できた
- コード量が多く、理解しきれていないので、振り返る必要があると感じた。

**Link(s) to work**:

- [Day 15 challenge](/src/challenges/day015)
- markdown memo app
  - [commit](https://github.com/HasutoSasaki/note-mark/commits/master/?since=2025-05-16&until=2025-05-16)

### Day 16: May 17, Saturday

**Today's Progress**: 非同期アクションのサポートの実装
**Thoughts**:

- 関連が多く難しいと感じたかが、一個ずつ見たらなんとなく理解できた。
- コード量が多く、理解しきれていないので、振り返る必要があると感じた。

**Link(s) to work**:

- [Day 16 challenge](/src/challenges/day016)
- markdown memo app
  - [commit](https://github.com/HasutoSasaki/note-mark/commits/master/?since=2025-05-17&until=2025-05-17)

### Day 17: May 18, Sunday

**Today's Progress**:

- markdown memo app の実装
- minimal Virtual DOM app の実装

**Thoughts**:

- markdown memo app の実装は build までできて、実際に動くものができたので、嬉しかった。
- minimal Virtual DOM の学習環境の構築と、step1 で少し理解を深めることができた

** Link(s) to work**:

- [markdown memo app](https://github.com/HasutoSasaki/note-mark)
  - [commit](https://github.com/HasutoSasaki/note-mark/commits/master/?since=2025-05-18&until=2025-05-18)
- [minimal Virtual DOM app](https://github.com/HasutoSasaki/mini-vnode)
  - [commit](https://github.com/HasutoSasaki/mini-vnode/commits/master/?since=2025-05-18&until=2025-05-18)

### Day 18: May 19, Monday

**Today's Progress**:

- portfolio site
  - about section の実装

**Thoughts**:

- 特に新たなことは得ることができなかった。
- ただ、ポートフォリオ実装は必要なので、進めていきたい。

**Link(s) to work**:

- [portfolio site](https://github.com/HasutoSasaki/my-portfolio)
  - [commit](https://github.com/HasutoSasaki/my-portfolio/commits/master/?since=2025-05-19&until=2025-05-19)

### Day 19: May 20, Tuesday

**Today's Progress**:

- portfolio site
  - navbar scroll 時の挙動の実装
  - service section の実装
  - 他設定まわり調整

**Thoughts**:

- 特に新たなことは得ることができなかった。
- 引き続きポートフォリを完成させたい
- tweet を自動化する ci を組みたい

**Link(s) to work**:

- [portfolio site](https://github.com/HasutoSasaki/my-portfolio)
  - [commit](https://github.com/HasutoSasaki/my-portfolio/commits/master/?since=2025-05-20&until=2025-05-20)

### Day 20: May 21, Wednesday

**Today's Progress**:

- PR 操作に応じた tweet を自動化する ci の実装
  - テスト用に PR が立ったら、ツイートが正常に送信されるか確認した。結果ツイートはできていた。けどテキストが崩れていたので修正する

**Thoughts**:

- environments に設定したシークレットキーの参照方法を学べた。ただ、environment の値が間違えているので直す必要あり。

**Link(s) to work**:

- PR 操作に応じた tweet を自動化する ci の実装
  [script](/src/.github/scripts)
  [yaml](/src/.github/workflows/pr-tweet.yml)

### Day 21: May 22, Thursday

**Today's Progress**:

- PR をマージ時に、 tweet を自動化する ci の実装
  - ツイート文が正しく出力されるように修正
- 自動テストの実行条件を修正
  - challenges ディレクトリで作業した場合のみ、テストを実行するように修正
- portfolio site
  - work section の実装

**Thoughts**:

- github actions の環境変数の参照方法や別のステップの値を参照する方法を学べた。
- これからも、github actions を使っていきたいので、もっと学習していきたい。

**Link(s) to work**:

- PR をマージ時に、 tweet を自動化する ci の実装
  [yaml](/src/.github/workflows/pr-tweet.yml)
- 自動テストの実行条件を修正
  [yaml](/src/.github/workflows/pr-tests.yml)
- portfolio site
  - [commit](https://github.com/HasutoSasaki/my-portfolio/commits/master/?since=2025-05-21&until=2025-05-21)
