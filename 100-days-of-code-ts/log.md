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
