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

### Day 22: May 23, Friday

**Today's Progress**:

- portfolio site
  - work section の完成
  - tailwind css の設定の修正
- open api の学習のため模写コーディング

**Thoughts**:

- tailwind css の設定の修正は、tailwind css の公式ドキュメントを参考にしたら早かった。最新のバージョンの際は公式を見るのが一番早いなと改めて感じた
- バックエンドエンジニアを目指す上で、open api の学習は必要だと感じたので、模写コーディングを行った。また実際に動いてはいないので、今後動くようにしたい

**Link(s) to work**:

- portfolio site
  - [commit](https://github.com/HasutoSasaki/my-portfolio/commits/master/?since=2025-05-23&until=2025-05-23)
- open api の模写コーディング：リポジトリなし

### Day 23: May 24, Saturday

**Today's Progress**:

- open api と typescript の学習のため sample api を作成
- aws cli の MFA 認証用の CLI を作成（リポジトリなし）

**Thoughts**:

- open api と typescript の学習のため sample api を作成した。実際に動くものを作ることで、学習効果が高まると感じた。
  - ただ、まだどこが使いどころかイメージできていないので、yaml から typescript への変換を行い、実際に動くものを作りたい。
- aws cli の MFA 認証用の CLI を作成した。aws cli を使用する際に、毎回 MFA 認証をターミナルで行うのは面倒なので、CLI を作成した。これにより、MFA 認証を簡単に行えるようになった。

**Link(s) to work**:

- open api と typescript の学習のため sample api を作成
  - [リポジトリ](https://github.com/HasutoSasaki/typescript-openapi-demo)
  - [commit](https://github.com/HasutoSasaki/typescript-openapi-demo/commits/master/?since=2025-05-24&until=2025-05-24)

### Day 24: May 25, Sunday

**Today's Progress**:

- open api と typescript の学習のため penapi-ts/openapi-typescript の openapi-fetch/example に nuxt3 demo を追加
  - nuxt3 の ssr で、openapi-fetch と openapi-typescript を使うことで、open api のエンドポイントを簡単に呼び出せるようにした。
- camera app の実装
  - zoom の計算を iphone のカメラと数値があるように、controller を作成した
  - zoom controller のリファクタリング

**Thoughts**:

- open api と typescript の学習のため penapi-ts/openapi-typescript の openapi-fetch/example に nuxt3 demo を追加した。これにより、nuxt3 で open api を簡単に呼び出せるようになった。
- まだ、PR が通っていないが初めての PR を出したので、通ることを願う。
- camera app の処理にテストを書いてないので、そろそろ書いた方がいいのかなと思った

**Link(s) to work**:

- open api と typescript の学習のため penapi-ts/openapi-typescript の openapi-fetch/example に nuxt3 demo を追加

  - [PR](https://github.com/openapi-ts/openapi-typescript/pull/2331)

- camera app の実装
  - private リポジトリのためリンクはなし

### Day 25: May 26, Monday

**Today's Progress**:

- portfolio site
  - contact section の実装
  - footer section の実装(途中)

**Thoughts**:

- contact section の実装の際に、web3forms というものを初めて知ったので、きちんと調べたい。
- 早く終わらせたい

**Link(s) to work**:

- portfolio site
  - [commit](https://github.com/HasutoSasaki/my-portfolio/commits/master/?since=2025-05-26&until=2025-05-26)

### Day 26: May 27, Tuesday

**Today's Progress**:

- github my profile README の作成
  - 自己紹介や github status を表示するための README を作成した
- instagram api demo
  - instagram api の検証環境の準備。ts を導入

**Thoughts**:

- github my profile README の作成は、初めての試みだったので、楽しかった。
  - 自己紹介や github status を表示することで、より自分をアピールできるようになった。もっと充実させられるように頑張りたい
- instagram api demo は、まだ実装ができていないので早く進めたい

**Link(s) to work**:

- github my profile README の作成
  - [README](https://github.com/HasutoSasaki/HasutoSasaki)
- instagram api demo
  - [repository](https://github.com/HasutoSasaki/instagram-api-demo)
  - [commit](https://github.com/HasutoSasaki/instagram-api-demo/commits/master/?since=2025-05-27&until=2025-05-27)

### Day 27: May 28, Wednesday

**Today's Progress**:

- instagram api demo（コード以外の設定）

  - facebook アカウント作成
  - facebook for developers アカウント作成
  - instagram api の認証待ち

- open api typescript の学習
  - yaml から型定義ファイルを生成するためのスクリプトを追加
  - yaml の配置を api ディレクトリに変更
  - api gateway に import してみた。成功

**Thoughts**:

- 早く承認されて、実装を進めたい
- open api typescript の学習は、まだ実際の使い方のイメージがついていないので、API gateway と lambda で実装することをイメージして進めてみたい

**Link(s) to work**:

- instagram api demo
  - [repository](https://github.com/HasutoSasaki/instagram-api-demo)
- open api typescript の学習
  - [repository](https://github.com/HasutoSasaki/typescript-openapi-demo)
  - [commit](https://github.com/HasutoSasaki/typescript-openapi-demo/commits/master/?since=2025-05-28&until=2025-05-28)

### Day 28: May 29, Thursday

**Today's Progress**:

- open api typescript の学習
  - lambda で実行するためのスクリプトを追加
  - lambda で使うときのディレクトリ設計

**Thoughts**:

- lambda で実行するためのスクリプトを追加し、実際に lambda で使うイメージが湧いた
- API Gateway SDK はフロントエンドで使うということが学べた
- lambda で使うときのディレクトリ設計を考えることで、実際に使うときのイメージが湧いた

**Link(s) to work**:

- open api typescript の学習
  - [repository](https://github.com/HasutoSasaki/typescript-openapi-demo)
  - [commit](https://github.com/HasutoSasaki/typescript-openapi-demo/commits/master/?since=2025-05-29&until=2025-05-29)

### Day 29: May 30, Friday

**Today's Progress**:

- portfolio site
  - dork mode の実装
- instagram api demo
  - instagram api の認証が通った

**Thoughts**:

- dork mode の実装は、初めてだったが意外と簡単に実装できた。
- instagram api の認証が通ったので、実装を進めることができるようになった。

**Link(s) to work**:

- portfolio site
  - [commit](https://github.com/HasutoSasaki/my-portfolio/commits/master/?since=2025-05-30&until=2025-05-30)

### Day 30: May 31, Saturday

**Today's Progress**:

- github tools
  - branch ルールを一括で設定するツールを作成
- camera app
  - コンポーネントのディレクトリ設計の見直し
  - ratio の設定と反映
  - 背景色の設定

**Thoughts**:

- github tools の branch ルールを一括で設定するツールは、実際に使うことができるので、便利だと感じた。
- camera app のコンポーネントのディレクトリ設計の見直しは、まだ違和感があるので、もう少し考える必要があると感じた。

**Link(s) to work**:

- github tools
  - [repository](https://github.com/HasutoSasaki/github-tools)
    - [commit](https://github.com/HasutoSasaki/github-tools/commits/master/?since=2025-05-31&until=2025-05-31)
- camera app
  - private リポジトリのためリンクはなし

### Day 31: June 1, Sunday

**Today's Progress**:

- portfolio site
  - dark mode の実装を全体に適用
  - gsap の導入,header のアニメーションの実装
- domain の取得
- s3 と cloudfront を使った静的サイトのホスティング
  - s3 のバケットの作成
  - cloudfront のディストリビューションの作成
  - s3 のバケットポリシーの設定
  - しかし、まだ公開できていない

**Thoughts**:

- portfolio site の dark mode の実装は、全体に適用できたので、満足している。
- gsap の導入は、初めてだったが、アニメーションの実装が簡単にできたので、楽しかった。もっとこだわっていきたい
- domain の取得は、初めてだったが、取得できて嬉しい！
- s3 と cloudfront を使った静的サイトのホスティングは、まだ公開できていないので、早く公開できるようにしたい。
  **Link(s) to work**:
- portfolio site
  - [commit](https://github.com/HasutoSasaki/my-portfolio/commits/master/?since=2025-06-01&until=2025-06-01)
- その他はコミットなし

### Day 32: June 2, Monday

**Today's Progress**:

- portfolio site
  - cloudfront の設定の修正
  - s3 のバケットポリシーの修正
  - s3 のバケットの静的ウェブサイトホスティングの設定
  - 無事に公開できた！
    　- header 部分の画像表示のアニメーションを修正
    　- ssg build のための細かい修正

**Thoughts**:

- cloudfront の設定の修正は、初めてだったが、設定を見直すことで解決できたので、良かった。
- ともかくなんとか自分のドメインで公開できたので、嬉しい！
- アニメーションを全体的に凝っていきたい

**Link(s) to work**:

- portfolio site
  - [commit](https://github.com/HasutoSasaki/my-portfolio/commits/master/?since=2025-06-02&until=2025-06-02)

### Day 33: June 3, Tuesday

**Today's Progress**:

- portfolio site
  - gsap の smooth scroll と scroll trigger の導入
  - icon の背景を透過して、アイコンの色を変更
  - about section の文言の修正

**Thoughts**:

- gsap の smooth scroll と scroll trigger がとても理想的な動きで感動した
- 文言が修正し切れていないので、修正したい

**Link(s) to work**:

- portfolio site
  - [commit](https://github.com/HasutoSasaki/my-portfolio/commits/master/?since=2025-06-03&until=2025-06-03)

### Day 34: June 4, Wednesday

**Today's Progress**:

- portfolio site
  - work section の記載内容の修正
  - footer の各 SNS のリンクの修正
  - 各種画像素材の修正
- Next.js の学習
  - Next の dev serve 時に、自動でブラウザを開く方法を模索

**Thoughts**:

- portfolio site の 各種内容の見直しをしたことで、公開できる状態にできた
- next の dev serve 時に、自動でブラウザを開く方法は、まだわからないので、調べてみて、ない場合は PR 出してみる？

**Link(s) to work**:

- portfolio site
  - [commit](https://github.com/HasutoSasaki/my-portfolio/commits/master/?since=2025-06-04&until=2025-06-04)

### Day 35: June 5, Thursday

**Today's Progress**:

- portfolio site
  - about section の skill 　表示の修正
  - header のタイトルにホバーじに回転するアニメーションを追加

**Thoughts**:

- about section の skill 表示のはバッジを使うことで見やすくなった
- gsap のアニメーションを増やすことでリッチにはなるが、コンポーネント内がごちゃつくので、リファクタリングとして分けたい

**Link(s) to work**:

- portfolio site
  - [commit](https://github.com/HasutoSasaki/my-portfolio/commits/master/?since=2025-06-05&until=2025-06-05)

### Day 36: June 6, Friday

**Today's Progress**:

- portfolio site
  - 各セクションにパララックス効果を追加
  - NavBar,About,Footer にアニメーションを追加
  - 各セクションのコンポーネントを分割

**Thoughts**:

- 各セクションにパララックス効果を追加することで、よりリッチな表現ができた
- 各セクションのコンポーネントを分割することで、コードが見やすくなった
- アニメーションについて理解しきれていないので、もう少し学習していきたい

**Link(s) to work**:

- portfolio site
  - [commit](https://github.com/HasutoSasaki/my-portfolio/commits/master/?since=2025-06-06&until=2025-06-06)

### Day 37: June 7, Saturday

**Today's Progress**:

- portfolio site
  - footer の logo にドラッグのアニメーションを追加。引っ張ったりできる
  - about section の画像にパーティクルアニメーションを追加。スクロールすると画像が生成される

**Thoughts**:

- footer の logo にドラッグのアニメーションを追加することで、よりインタラクティブな表現ができた
- about section の画像にパーティクルアニメーションを追加することで、よりリッチな表現ができた
- SP 版の制御ができていないのと、まだ不慣れな部分があるので、色々実装して学んでいきたい

**Link(s) to work**:

- portfolio site
  - [commit](https://github.com/HasutoSasaki/my-portfolio/commits/master/?since=2025-06-07&until=2025-06-07)

### Day 38: June 8, Sunday

**Today's Progress**:

- github mcp server の設定
  - github token の管理方法として、.zshrc に設定して、mcp server で参照できるようにした
- camera app
  - カメラ上部の control bar のアイコンとスタイル追加
- portfolio site
  - 不要なリンクとボタンの削除
  - default export から named export に変更

**Thoughts**:

- github mcp server の設定は、初めてだったが、.zshrc に設定することで、セキュアに管理できることがわかった
- github mcp server で issue を作成することで、vscode 内で開発が完結できる気がして、どんどん使っていきたいと感じた
- camera app のカメラ上部の control bar のアイコンとスタイル追加は、まだ不完全だが、少しずつ完成に近づいていると感じた
- portfolio site の不要なリンクとボタンの削除は、コードを見やすくするために必要な作業だった

**Link(s) to work**:

- github mcp server の設定(ローカルの settings.json に設定)
- camera app
  - private リポジトリのためリンクはなし
- portfolio site
  - [commit](https://github.com/HasutoSasaki/my-portfolio/commits/master/?since=2025-06-08&until=2025-06-08)

### Day 39: June 9, Monday

**Today's Progress**:

- camera app
  - top control bar を追加
  - ratio の切り替え機能追加。スタイルとアイコンの追加
  - 今後実装する、tools panel のためのコンポーネントを追加

**Thoughts**:

- top control bar を追加することで、カメラアプリの操作性が向上したと感じた
- ratio の切り替えが反応せず時間を無駄にしてしまった。原因はピンンイン、アウトのレイヤーと被っていたためだった

**Link(s) to work**:

- camera app
  - private リポジトリのためリンクはなし

### Day 40: June 10, Tuesday

**Today's Progress**:

- camera app
  - camera mode の切り替え機能用のコンポーネントを追加
  - ratio 切り替えボタンのスタイルを修正
  - ratio 適用のカメラサイズの調整（横だったので、縦に修正

**Thoughts**:

- camera mode の切り替え機能用のコンポーネントを追加したので、次は切り替えれる様にする
- ratio 切り替えボタンのスタイルを修正したので、見た目が良くなった
- 機能が増えてきて、複雑化してきたので型設計で整理したい

**Link(s) to work**:

- camera app
  - private リポジトリのためリンクはなし

### Day 41: June 11, Wednesday

**Today's Progress**:

- Tiny TCP
  - ✅ TCP ヘッダ構造の定義 - RFC 793 に基づいた TCP ヘッダ構造、制御フラグ、基本メソッドを実装
  - ✅ 基本的なソケット構造の定義 - TCP 状態管理、ソケット API（Listen, Accept, Connect, Send, Receive, Close）を実装
  - ✅ 簡単なクライアント・サーバーのプロトタイプ - 実際に動作するプロトタイプを作成、動作確認完了
  - 動作確認済み機能:
    - TCP ヘッダの作成と操作
    - ソケットの状態管理
    - 基本的なソケット操作（Listen, Connect, Send, Close）
    - クライアント・サーバー間の基本通信フロー

**Thoughts**:

- Tiny TCP の実装は、TCP の基本的な理解を深めることができた。まだ細かいことは理解できていない
- GO 言語のなんとなくの書き方を知ることができた。今後慣れていきたい

**Link(s) to work**:

- Tiny TCP
  - [repository](https://github.com/HasutoSasaki/TinyTcp)
  - [commit](https://github.com/HasutoSasaki/TinyTcp/commits/master/?since=2025-06-11&until=2025-06-11)

### Day 42: June 12, Thursday

**Today's Progress**:

- Tiny TCP
  　- TCP の 3 ウェイハンドシェイクを実装しました。
  　- クライアントとサーバー間で SYN → SYN-ACK → ACK の流れを処理する機能を作成し、TCP 接続の確立部分を完成させました。
- git-branch-automation
  - ローカルで開発時に、毎回同じコマンドを叩いていたので自動化スクリプトの実装

**Thoughts**:

- TCP ハンドシェイクの仕組み: 通信開始前の「挨拶」のようなもので、お互いの存在確認と通信準備を行う 3 段階のプロセス
- シーケンス番号: データの順序を保証するための番号システムで、ハンドシェイク時に同期を取る
- git-branch-automation のスクリプトは、毎回同じコマンドを叩く手間を省けるので、開発効率が向上しました。

**Link(s) to work**:

- Tiny TCP
  - [repository](https://github.com/HasutoSasaki/TinyTcp)
  - [commit](https://github.com/HasutoSasaki/TinyTcp/commits/master/?since=2025-06-12&until=2025-06-12)
- git-branch-automation
  - [directory](https://github.com/HasutoSasaki/100-days-of-code/git-branch-automation)

### Day 43: June 13, Friday

**Today's Progress**:

- Tiny TCP
  - `Send`/`Receive` メソッドの実装
  - TCP のデータ送受信の基本的なロジックを実装しました。
  - シーケンス番号・ACK 番号更新
- TinyZipZap
  - Run-Length Encoding (RLE)
    - RLE の基本的なアルゴリズムを実装しました。
    - 簡単な圧縮と解凍のテストを行い、動作確認済み
- gotour
  - Go 言語の基本的な文法や構文を学ぶためのチュートリアルを進めました。
  - step1 なので、基本的な文法や構文を学ぶところ

**Thoughts**:

- Tiny TCP の `Send`/`Receive` メソッドの実装は、TCP のデータ送受信の基本的な理解を深めることができた。
  - シーケンス番号・ACK 番号更新のロジックを実装することで、TCP の通信の流れを理解できた。
- TinyZipZap の RLE の実装は、圧縮アルゴリズムの基本的な理解を深めることができた。
- gotour の学習は、Go 言語の基本的な文法や構文を学ぶことができた。まだまだ学ぶことが多いので、続けていきたい。

**Link(s) to work**:

- Tiny TCP
  - [repository](https://github.com/HasutoSasaki/TinyTcp)
  - [commit](https://github.com/HasutoSasaki/TinyTcp/commits/master/?since=2025-06-13&until=2025-06-13)
- TinyZipZap
  - [repository](https://github.com/HasutoSasaki/TinyZipZap)
  - [commit](https://github.com/HasutoSasaki/TinyZipZap/commits/master/?since=2025-06-13&until=2025-06-13)
- gotour
  - [repository](https://github.com/HasutoSasaki/gotour)
  - [commit](https://github.com/HasutoSasaki/gotour/commits/master/?since=2025-06-13&until=2025-06-13)

### Day 44: June 14, Saturday

**Today's Progress**:

- Tiny TCP
  - TCP コネクション切断 (4 ウェイハンドシェイク)
    - FIN パケット処理、TCB 状態遷移
    - FIN-ACK の送信と ACK の受信処理を実装
- TinyZipZap
  - Huffman 圧縮アルゴリズムの実装
    - 簡単な圧縮と解凍のテストを行い、動作確認済み
- gotour
  - 基本的なデータ型と、if 文、for 文の使い方を学習

**Thoughts**:

- Tiny TCP の 4 ウェイハンドシェイクの実装は、TCP のコネクション切断の流れを理解するのに役立った。
- FIN パケット処理や TCB 状態遷移の実装を通じて、TCP の状態管理の重要性を学んだ。
- TinyZipZap の Huffman 圧縮アルゴリズムの概念はわかったが、具体的な部分を理解できていないので、もう少し学習が必要。
- gotour の学習は、Go 言語の基本的なデータ型や制御フローの理解を深めることができた。引き続き学習を続けたい。

**Link(s) to work**:

- Tiny TCP
  - [repository](https://github.com/HasutoSasaki/TinyTcp)
  - [commit](https://github.com/HasutoSasaki/TinyTcp/commits/master/?since=2025-06-14&until=2025-06-14)
  - TinyZipZap
  - [repository](https://github.com/HasutoSasaki/TinyZipZap)
  - [commit](https://github.com/HasutoSasaki/TinyZipZap/commits/master/?since=2025-06-14&until=2025-06-14)
- gotour
  - [repository](https://github.com/HasutoSasaki/gotour)
  - [commit](https://github.com/HasutoSasaki/gotour/commits/master/?since=2025-06-14&until=2025-06-14)

### Day 45: June 15, Sunday

**Today's Progress**:

- Tiny TCP
  - TCP の再送制御の実装
    - TCP パケット（SYN、データ、FIN）の送信時に再送キューに追加し、ACK 受信時にキューから削除する機能を追加
  - タイムアウト処理:
    - 設定可能なタイムアウト時間（デフォルト 1 秒）と最大再送回数（デフォルト 3 回）でパケットの再送を管理する仕組みを実装
- Linux 標準教科書
  - Linux の基本的なコマンドやシェルの使い方を学習
    - ファイル操作、ディレクトリ操作、パーミッション管理などの基本的な操作を学んだ
- linux の環境構築を docker で行い、docker の使い方を学習
  - Dockerfile の作成と、コンテナのビルド・実行方法を学んだ

**Thoughts**:

- Tiny TCP の再送制御の実装は、TCP の信頼性を向上させるための重要な機能であり、実際のネットワーク通信での再送制御の仕組みを理解できた。具体的には理解できていないので、もう少し学習が必要。
- 簡単な linux のコマンドやシェルの使い方を学ぶことで、Linux 環境での基本的な操作に慣れることができた。今後はもっと高度な操作やスクリプトの書き方を学んでいきたい。
- Docker の使い方を学ぶことで、コンテナ化の利点や、開発環境の構築が効率化できることを実感した。今後は、Docker Compose や Kubernetes などのより高度な機能も学んでいきたい。

**Link(s) to work**:

- Tiny TCP
  - [repository](https://github.com/HasutoSasaki/TinyTcp)
  - [commit](https://github.com/HasutoSasaki/TinyTcp/commits/master/?since=2025-06-15&until=2025-06-15)
- Linux 標準教科書
  　：ローカルのため、リポジトリなし
- linux の環境構築を docker で行い、docker の使い方を学習
  ：ローカルのため、リポジトリなし

### Day 46: June 16, Monday

**Today's Progress**:

- gotour
  - Go 言語の if 文、for 文、switch 文の使い方を学習
- typescript-typescript and openapi-fetch and nuxt3 example
  - nuxt3 での OpenAPI の使い方を学べる example を作成
  - 管理するための仕組みやドキュメント作成がまだなので、今後の課題としたい。
- **Thoughts**:

- gotour の学習は、Go 言語の基本的な制御フローの理解を深めることができた。特に、switch 文の使い方や、for 文 について学ぶことができた。
- typescript-typescript and openapi-fetch and nuxt3 example の作成は、Nuxt3 で OpenAPI を使う際の基本的な構成を理解するのに役立った。まだドキュメントや管理の仕組みが不十分なので、今後改善していきたい。

**Link(s) to work**:

- gotour

  - [repository](https://github.com/HasutoSasaki/gotour)
  - [commit](https://github.com/HasutoSasaki/gotour/commits/master/?since=2025-06-16&until=2025-06-16)

- typescript-typescript and openapi-fetch and nuxt3 example
  - [repository](https://github.com/HasutoSasaki/typescript-typescript-and-openapi-fetch-and-nuxt3-example)

### Day 47: June 17, Tuesday

**Today's Progress**:

- gotour
  - pointer, struct, array, slice の使い方を学習

**Thoughts**:

- gotour の学習は、Go 言語のポインタ、構造体、配列、スライスの使い方を理解するのに役立った。特に、ポインタの使い方や、構造体の定義と使用方法について学ぶことができた。
- JS と比較して、ポインタのメリットを感じた。データの参照が明示的なので、バグの発生を防ぎやすいと感じた。

**Link(s) to work**:

- gotour
  - [repository](https://github.com/HasutoSasaki/gotour)
  - [commit](https://github.com/HasutoSasaki/gotour/commits/master/?since=2025-06-17&until=2025-06-17)

### Day 48: June 18, Wednesday

**Today's Progress**:

- gotour
  - map, slice, range の使い方を学習

**Thoughts**:

- gotour の学習は、Go 言語のマップ、スライス、range の使い方を理解するのに役立った。単純なものなら理解できたが、処理が重なると理解が難しくなった。
- slice の追加方がまだ、いまいち掴めていない
  **Link(s) to work**:
- gotour
  - [repository](https://github.com/HasutoSasaki/gotour)
  - [commit](https://github.com/HasutoSasaki/gotour/commits/master/?since=2025-06-18&until=2025-06-18)

### Day 49: June 19, Thursday

**Today's Progress**:

- gotour
  - 関数変数に関数を代入する方法を学習
  - methods の使い方を学習
  - pointer receiver, value receiver の使い方を学習

**Thoughts**:

- gotour の学習は、Go 言語のメソッドの使い方を理解するのに役立った。特に、ポインタレシーバーと値レシーバーの使い方について学ぶことができた。まだ、レシーバについての理解が浅いので、もう少し学習が必要。

**Link(s) to work**:

- gotour
  - [repository](https://github.com/HasutoSasaki/gotour)
  - [commit](https://github.com/HasutoSasaki/gotour/commits/master/?since=2025-06-19&until=2025-06-19)

### Day 50: June 20, Friday

**Today's Progress**:

- gotour

  - receive,interface 　の使い方を学習
  - 値レシーバのメソッドは、値型とポインタ型の両方で呼び出せるが、ポインタレシーバのメソッドはポインタ型でのみ呼び出せることを学習
  - インターフェースの値は「値」と「型」のセット
  - メソッド呼び出し時は、その「型」のメソッドが実行される
    - この仕組みにより、Go では異なる型でも同じインターフェースを通じて同じ様に扱うことができる

**Thoughts**:

- gotour の学習は、Go 言語のインターフェースの使い方を理解するのに役立った。特に、インターフェースの値が「値」と「型」のセットであることや、メソッド呼び出し時にその「型」のメソッドが実行されることを学ぶことができた。
- インターフェースの仕組みを理解することで、Go 言語の型システムの柔軟性を実感した。

**Link(s) to work**:

- gotour
  - [repository](https://github.com/HasutoSasaki/gotour)
  - [commit](https://github.com/HasutoSasaki/gotour/commits/master/?since=2025-06-20&until=2025-06-20)

### Day 51: June 21, Saturday

**Today's Progress**:

- gotour
  - interface の値は「値」と「型」のセットであることを再認識
  - 空の interface の値で定義した場合は、任意な型の値を格納できることを学習
  - 型アサーションの使い方を学習
    - ok 変数を使うと、別の型でも false になるだけだが、ないと panic することを学習
- github actions 学び
  - コンテキストはシェルにハードコードせずに環境変数を通す
  - 環境変数は全てダブルクォートで囲む
- Tiny TCP
  - TCP の three-way handshake の部分を別のファイルに分割
    - 分割したことで、以前より理解しやすくなった

**Thoughts**:

- gotour の学習は、Go 言語のインターフェースの値が「値」と「型」のセットであることを再認識できた。特に、空のインターフェースの値で定義した場合は、任意な型の値を格納できることや、型アサーションの使い方について学ぶことができた。
- 型アサーションの ok 変数を使うことで、型のチェックができることを学んだ。
- Tiny TCP の three-way handshake の部分を別のファイルに分割することで、以前より理解しやすくなった。が人に説明できるレベルではないので、もう少し学習が必要。

**Link(s) to work**:

- gotour

  - [repository](https://github.com/HasutoSasaki/gotour)
  - [commit](https://github.com/HasutoSasaki/gotour/commits/master/?since=2025-06-21&until=2025-06-21)

- Tiny TCP
  - [repository](https://github.com/HasutoSasaki/tiny_tcp)
  - [commit](https://github.com/HasutoSasaki/tiny_tcp/commits/master/?since=2025-06-21&until=2025-06-21)

### Day 52: June 22, Sunday

**Today's Progress**:

- gotour
  - ROT13 のアルゴリズムを実装
    - 文字を 13 文字ずらすことで暗号化するシンプルなアルゴリズム
    - すぐに復号化できるので、セキュリティ的には弱いが、Go の文字列操作の練習に最適
  - レシーバについて再認識した
    - 値レシーバは構造体のコピーで、元の値を変更しない場合に使用
    - ポインタレシーバは構造体へのポインタで、元の値を変更する場合に使用
  - XOR 暗号化アルゴリズムを実装
    - 文字列を XOR 演算で暗号化するシンプルなアルゴリズム
    - キーを使って暗号化と復号化が可能
    - 2 回 XOR すると元の文字列に戻る性質がある
  - goroutine と channel の使い方を学習
    - goroutine は軽量なスレッドで、並行処理を実現するために使用
    - channel は goroutine 間の通信手段で、データの送受信を行う
    - 例えば、同時に複数の fetch リクエストを行い、結果をまとめる処理などに利用できる
  - select 文の使い方を学習
    - select 文は複数の channel の操作を待ち受け、最初に準備ができたものを実行する
    - goroutine と channel を組み合わせて、非同期処理や並行処理を効率的に実装できる
- openapi-typescript-and-nuxt3-example
  - nuxt3 での OpenAPI の使い方を学べる example を作成完了。typescript OpenAPI の docs に記載する準備を進める

**Thoughts**:

- gotour の学習は、Go 言語の文字列操作や暗号化アルゴリズムの実装を通じて、Go の基本的な文法や構文を復習できた。特に、レシーバの使い方や goroutine と channel の使い方について学ぶことができた。
- goroutine と channel の組み合わせは、Go 言語の並行処理の強力な機能であり、非同期処理や並行処理を効率的に実装できることを実感した。

**Link(s) to work**:

- gotour
  - [repository](https://github.com/HasutoSasaki/gotour)
  - [commit](https://github.com/HasutoSasaki/gotour/commits/master/?since=2025-06-22&until=2025-06-22)
  - openapi-typescript-and-nuxt3-example
  - [repository](https://github.com/HasutoSasaki/openapi-typescript-and-nuxt3-example)
  - [commit](https://github.com/HasutoSasaki/openapi-typescript-and-nuxt3-example/commits/master/?since=2025-06-22&until=2025-06-22)

### Day 53: June 23, Monday

**Today's Progress**:

- gotour
  - channel で並行して別の処理をする際は、lock,unlock を使う必要があることを学習
- translate-cli
  - deepl の翻訳 API を使って、コマンドラインから翻訳できるツールを作成
  - 翻訳 API のキーを環境変数から取得するようにした

**Thoughts**:

- gotour の学習は、Go 言語の channel を使った並行処理の基本的な理解を深めることができた。特に、channel で並行して別の処理をする際は、lock,unlock を使う必要があることを学ぶことができた。
- まだ、lock,unlock について処理の流れが理解できていないので、もう少し学習が必要。
- translate-cli の作成は、Go 言語での API の使い方や、環境変数の扱い方を学ぶことができた。
- 翻訳 CLI を元に、より go の理解を深めたい

**Link(s) to work**:

- gotour
  - [repository](https://github.com/HasutoSasaki/gotour)
  - [commit](https://github.com/HasutoSasaki/gotour/commits/master/?since=2025-06-23&until=2025-06-23)
- translate-cli
  - [repository](https://github.com/HasutoSasaki/translate-cli)
  - [commit](https://github.com/HasutoSasaki/translate-cli/commits/master/?since=2025-06-23&until=2025-06-23)

### Day 54: June 24, Tuesday

**Today's Progress**:

- translate-cli
  - text の指定をフラグではなく、引数で指定できるように修正
  - 不要なファイルを削除し、リファクタリングを行った
- pomodoBar
  - electron でバーにポモドーロタイマーを表示するアプリを作成中
  - バーに表示するやり方がわからない。ので、引き続き作業

**Thoughts**:

- より使いやすさを求めて、フラグが不要と感じ、削除したら、より良くなった。
- translate-cli のリファクタリングは、コードの可読性を向上させるために必要な作業だった。
- electron でのアプリ開発を copilot に頼りすぎたため、改で自分で一から作ることにした

**Link(s) to work**:

- translate-cli
  - [repository](https://github.com/HasutoSasaki/translate-cli)
  - [commit](https://github.com/HasutoSasaki/translate-cli/commits/master/?since=2025-06-24&until=2025-06-24)
- PomodoBar
  - [repository](https://github.com/HasutoSasaki/PomodoBar)
  - [commit](https://github.com/HasutoSasaki/PomodoBar/commits/master/?since=2025-06-24&until=2025-06-24)
    ※まだ、整理できていないのでコミットはありません。

### Day 55: June 25, Wednesday

**Today's Progress**:

- PomodoBar
  - electron でバーにポモドーロタイマーを表示するアプリを作成
  - window に何も必要としないので、簡素化し Tray を使って、バーにポモドーロタイマーを表示するアプリを作成
  - タイマーの開始、停止、リセットの機能を実装

**Thoughts**:

- electron と vue を入れてしまったが、バーに表示するだけなら Tray だけで十分だった。
- 今後使い勝手を見て、アップデートしていきたい

**Link(s) to work**:

- PomodoBar
  - [repository](https://github.com/HasutoSasaki/PomodoBar)
  - [commit](https://github.com/HasutoSasaki/PomodoBar/commits/master/?since=2025-06-25&until=2025-06-25)

### Day 56: June 26, Thursday

**Today's Progress**:

- Tiny TCP
  - TCP のファイルを分割して、より理解しやすくした
  - TCB（TCP Control Block）の構造体をざっくり理解した。
    - どのような状態を持つかについて学んだ
    - 次は、なぜその状態が必要なのか。という観点で見てみる
- At Coder
  - AtCoder の問題を解くための練習を開始
  - 初めての AtCoder で、問題の解き方や提出方法を学んだ

**Thoughts**:

- Tiny TCP のファイルを分割することで、コードの可読性が向上した。
- 可読性が上がったことで、一つ一つの処理や構造体について、理解を向けられるようになった
- AtCoder の問題を解くことで、プログラミングの楽しさを見出したい

**Link(s) to work**:

- Tiny TCP
  - [repository](https://github.com/HasutoSasaki/TinyTCP)
  - [commit](https://github.com/HasutoSasaki/TinyTCP/commits/master/?since=2025-06-26&until=2025-06-26)

### Day 57: June 27, Friday

**Today's Progress**:

- At Coder
  - 多重ループの問題を解いた
- Tiny RDB
  - ミニマムな RDB を作成するためのプロジェクトを開始
  - まだ、学習中になります。まずは構造について理解を進めている
- Tiny Redis Server
  - Tiny RDB の学習を進めるために、Redis の基本的な構造を理解するためのプロジェクトを開始

**Thoughts**:

- AtCoder の問題を解くことで、プログラミングの楽しさを見出したい。まだ、解けないので頑張る
- Tiny RDB と Tiny Redis Server の学習を通じて、データベースの基本的な構造や動作を理解していきたい。

**Link(s) to work**:

- At Coder
  - リポジトリなし
- Tiny RDB
  - [repository](https://github.com/HasutoSasaki/TinyRDB)
- Tiny Redis Server
  - [repository](https://github.com/HasutoSasaki/TinyRedisServer)

### Day 58: June 28, Saturday

**Today's Progress**:

- At Coder
  - ABC の A 問題を 2 問解いた
- Tiny Redis Server
  - TCP の仕組みについて新たに学んだ。
  - バイトストリームというデータの境界を区別しないバイトデータの扱いについて学んだ。
  - データのシリアル化とデシリアル化について学んだ。
  - Linux 環境構築のため、Dockerfile を作成
  - C のコンパイルを実行方法を学んだ。
- speak-hub
  - 今後学習で学んだことを勉強会で発表するため、複数のスライドを管理する場所を用意

**Thoughts**:

- AtCoder の問題を解くことで、プログラミングの楽しさを見出したい。まだ、解けないので頑張る
- Tiny Redis Server の学習を通じて、TCP の仕組みやバイトストリームの扱い、データのシリアル化とデシリアル化について理解を深めることができた。
- speak-hub のスライドについて、まだビルドを試してないので近々試してみたい。

**Link(s) to work**:

- At Coder
  - リポジトリなし
- Tiny Redis Server
  - [repository](https://github.com/HasutoSasaki/TinyRedisServer)
  - [commit](https://github.com/HasutoSasaki/TinyRedisServer/commits/master/?since=2025-06-28&until=2025-06-28)
  - speak-hub
  - [repository](https://github.com/HasutoSasaki/speak-hub)
  - [commit](https://github.com/HasutoSasaki/speak-hub/commits/master/?since=2025-06-28&until=2025-06-28)

### Day 59: June 29, Sunday

**Today's Progress**:

- At Coder
  - ABC の A 問題 2 問,B 問題を 1 問解いた
- Tiny Redis Server
  - C++ で TCP サーバーとクライアントを実装
  - socket で初期化。bind でポートを指定し、listen で接続待ち状態にする
  - accept で接続を受け入れ、send と recv でデータの送受信を行う
  - close で接続を終了する
- speak-hub
  - TCP サーバーについて学んだことをスライドにまとめた

**Thoughts**:

- AtCoder の問題を解く際に、今までランタイムエラーになっていたので、python の書き方自体を見直す必要がある。
- TCP サーバーについて学んだことをスライドにまとめたことで、理解が深まった。特に、socket の初期化や接続の受け入れ、データの送受信の流れを理解できた。

**Link(s) to work**:

- At Coder
  - リポジトリなし
- Tiny Redis Server
  - [repository](https://github.com/HasutoSasaki/TinyRedisServer)
  - [commit](https://github.com/HasutoSasaki/TinyRedisServer/commits/master/?since=2025-06-29&until=2025-06-29)
- speak-hub
  - [repository](https://github.com/HasutoSasaki/speak-hub)
  - [commit](https://github.com/HasutoSasaki/speak-hub/commits/master/?since=2025-06-29&until=2025-06-29)

### Day 60: June 30, Monday

**Today's Progress**:

- At Coder
  - A 問題 150 点配点ものを解いた
- gotour
  - web crawler の実装を学習
  - 並行処理を駆使して、複数の URL を同時にクロールする方法を学んだ

**Thoughts**:

- A 問題でも、150 点代だと少し悩むことがあるので、まだまだ精進が必要だと感じた。
- gotour の web crawler の実装を学ぶことで、Go 言語の並行処理の強力な機能を活用できることを実感した。しかし、まだ非同期処理の理解が浅いのと、chanel の使い方が不十分なので、もう少し学習が必要。

**Link(s) to work**:

- At Coder
  - リポジトリなし
- gotour
  - [repository](https://github.com/HasutoSasaki/gotour)

### Day 61: July 1, Tuesday

**Today's Progress**:

- At Coder
  - A 問題 100 点配点ものを解いた
  - B 問題 200 点配点にチャレンジしたが、まだ理解できずだった。
- openapi-typescript-and-nuxt3-example
  - openapi-typescript の PR を更新した
- Tiny Redis Server
  - リクエスト、レスポンスリクエストについてを学習
- Tiny ZipZap
  - lz77 アルゴリズムを学習

**Thoughts**:

- AtCoder の A 問題を解くことで、基本的なアルゴリズムやデータ構造の理解が深まった。しかし、B 問題はまだ難しく感じたので、もう少し練習が必要。
- openapi-typescript に PR を立てたが、不要なコミットがあるためメンテナーに確認をする必要がある。
- ワンリクエスト関数というもので、単なる read,write ではなく、all-read,all-write のような関数を実装することを
- read/write の通常の状況では、要求されたバイト数よりも少ないバイト数を返す可能性があることを学んだ
- lz77 アルゴリズムのとは、データの繰り返しを利用して圧縮する手法で、データのパターンを見つけて効率的に圧縮することができる。ことを学んだ。次はコードベースで実装し、理解を深めたい。

**Link(s) to work**:

- At Coder
  - リポジトリなし
- Tiny Redis Server
  - [repository](https://github.com/HasutoSasaki/TinyRedisServer)
  - 学習のみのため、commit なし
- Tiny ZipZap
  - [repository](https://github.com/HasutoSasaki/TinyZipZap)
- openapi-typescript
  - [PR](https://github.com/openapi-ts/openapi-typescript/pull/2331)

### Day 62: July 2, Wednesday

**Today's Progress**:

- At Coder
  - A 問題 100 点配点ものを解いた
  - B 問題 250 点配点にチャレンジしたが、まだ解けなかった。
    - やることは理解したが、コードで再現するのができなかった。
- PomodoBar
  - タイマー完了時に、sound を鳴らす設定追加
  - ボタンのテキスト更新を修正
- cameraApp
  - 状態管理のライブラリを調査

**Thoughts**:

- AtCoder の A 問題を解くことで、基本的なアルゴリズムやデータ構造の理解が深まった。しかし、B 問題はまだ難しく感じたので、もう少し練習が必要。
- PomodoBar のタイマー完了時に sound を鳴らす設定を追加したことで、より実用的なアプリになった。
- 状態管理のライブラリを調査したところ、jotai と zustand が良さそうだった。だが、改めてアプリに状態管理が必要なのか
  考える必要があると感じた。

**Link(s) to work**:

- At Coder
  - リポジトリなし
- PomodoBar
  - [repository](https://github.com/HasutoSasaki/PomodoBar)
  - [commit](https://github.com/HasutoSasaki/PomodoBar/commits/master/?since=2025-07-02&until=2025-07-02)
- cameraApp
  - [repository](https://github.com/HasutoSasaki/cameraApp)
  - 調査のみのため、commit なし

### Day 63: July 3, Thursday

**Today's Progress**:

- At Coder
  - A 問題 100 点配点ものを解いた
  - B 問題 200 点配点にチャレンジし、基本的なアルゴリズムは考えれた。が細かいところのコード再現ができなかった。
- cameraApp
  - ディレクトリ構成を見直して、components ディレクトリをリファクタリング
  - components を function に統一

**Thoughts**:

- AtCoder の A 問題はかなり慣れてきた。B 問題も少しずつ自分で理解できるようになってきた。
- cameraApp のディレクトリ構成を見直すことで、コードの可読性が向上した。特に、components ディレクトリをリファクタリングしたことで、各コンポーネントの役割が明確になった。

**Link(s) to work**:

- At Coder
  - リポジトリなし
- cameraApp
  - [repository](https://github.com/HasutoSasaki/cameraApp)
  - [commit](https://github.com/HasutoSasaki/cameraApp/commits/master/?since=2025-07-03&until=2025-07-03)

### Day 64: July 4, Friday

**Today's Progress**:

- At Coder
  - A 問題 100 点配点ものを解いた
  - B 問題 200 点配点にチャレンジしたが後少しのとこで解けなかった。
- cameraApp
  - カメラ上部の toolbar のボタンを toggle できるようにした(機能はまだ実装していない)

**Thoughts**:

- AtCoder の A 問題はかなり慣れてきた。B 問題も少しずつ自分で理解できるようになってきた。
- cameraApp のカメラ上部の toolbar のボタンを toggle できるようにしたことで、ユーザーインターフェースの操作性が向上した。

**Link(s) to work**:

- At Coder
  - リポジトリなし
- cameraApp
  - [repository](https://github.com/HasutoSasaki/cameraApp)
  - [commit](https://github.com/HasutoSasaki/cameraApp/commits/master/?since=2025-07-04&until=2025-07-04)

### Day 65: July 5, Saturday

**Today's Progress**:

- At Coder
  - A 問題 100 点配点ものを解いた
  - B 問題 200 点配点にチャレンジしたが、まだ解けなかった。が考え方は理解できた。
- aws-ass-study
  - aws ASS 試験の学習のために、terraform を使ったインフラ構築の演習を行った。
  - s3 のバケット作成を行なった。

**Thoughts**:

- AtCoder の A 問題はかなり慣れてきた。B 問題も少しずつ自分で理解できるようになってきた。
- aws-ass-study では、terraform を使ったインフラ構築の演習を通じて、AWS のリソース管理についての理解が深まった。特に、s3 のバケット作成を行なったことで、実際のインフラ構築における手順を学ぶことができた。

**Link(s) to work**:

- At Coder
  - リポジトリなし
- aws-ass-study
  - [repository](https://github.com/HasutoSasaki/aws-ass-study)
  - [commit](https://github.com/HasutoSasaki/aws-ass-study/commits/master/?since=2025-07-05&until=2025-07-05)

### Day 66: July 6, Sunday

**Today's Progress**:

- At Coder
  - A 問題 100 点配点ものを解いた
  - B 問題 250 点配点にチャレンジしたが、まだ解けなかった。考え方も難しく。回答を見ないと理解できなかった。
- aws-ass-study
  - EC2 のサンプルインスタンス作成を terraform で行った。

**Thoughts**:

- AtCoder の A 問題はかなり慣れてきた。B 問題も少しずつ自分で理解できるようになってきたが、250 点問題は少し難しい。
- EC2 のインスタンス作成を、コンソールと terraform の両方で行ったことで、インフラ構築の基礎をなんとなく学ぶことができた。

**Link(s) to work**:

- At Coder
  - リポジトリなし
- aws-ass-study
  - [repository](https://github.com/HasutoSasaki/aws-ass-study)
  - [commit](https://github.com/HasutoSasaki/aws-ass-study/commits/master/?since=2025-07-05&until=2025-07-05)

### Day 67: July 7, Monday

**Today's Progress**:

- At Coder
  - A 問題 100 点配点ものを解いた
- aws-ass-study
  - sam を使って、lambda 関数と API Gateway の設定を行った。

**Thoughts**:

- A 問題は余裕になった。
- sam を使って、lambda 関数と API Gateway の設定ができることを学んだ。手順が多かったりしてまだあまり理解できていない。
- 権限を最小限で少しづつ付けていくのが大変だった。

**Link(s) to work**:

- At Coder
  - リポジトリなし
- aws-ass-study

  - [repository](https://github.com/HasutoSasaki/aws-ass-study)
  - [commit](https://github.com/HasutoSasaki/aws-ass-study/commits/master/?since=2025-07-05&until=2025-07-05)

  ### Day 68: July 8, Tuesday

**Today's Progress**:

- At Coder
  - A 問題 100 点配点ものを解いた
  - B 問題 200 点配点を解いた。なんとなく解き方はひらめいても、python での実装が難しかった。
- cameraApp
  - 傾きセンサー機能が機能しなくなっていたため、修正した。

**Thoughts**:

- A 問題は余裕になった。B 問題は、考え方より python 自体の書き方を学ぶ方が良いかもしれない。
- cameraApp
  - expo-sensors の公式を見たらすぐわかったことだったので改めて公式に戻ることの大切さを学んだ。

**Link(s) to work**:

- At Coder
  - リポジトリなし
- cameraApp
  - [repository](https://github.com/HasutoSasaki/cameraApp)
  - [commit](https://github.com/HasutoSasaki/cameraApp/commits/master/?since=2025-07-07&until=2025-07-07)

### Day 69: July 9, Wednesday

**Today's Progress**:

- At Coder ABC395
  - A 問題 100 点配点ものを解いた
  - B 問題 200 点配点に挑戦したが、解説を見なければ解けなかった。
- cameraApp
  - 傾きセンターの ON/OFF 機能を実装した。
  - 他、関数、変数の命名を適切なものに修正した。

**Thoughts**:

- B 問題でここまでわからないのは、初めてだった。二次元配列の苦手意識がある。
- cameraApp
  - props のバケツリレーになってしまったが、store を使うか検討する必要がある。
  - 命名が無駄に長いものがいくつかあるので、気づいた時に直していきたい

**Link(s) to work**:

- At Coder
  - リポジトリなし
- cameraApp

  - [repository](https://github.com/HasutoSasaki/cameraApp)
  - [commit](https://github.com/HasutoSasaki/cameraApp/commits/master/?since=2025-07-07&until=2025-07-07)

### Day 70: July 10, Thursday

**Today's Progress**:

- At Coder ABC395
  - A 問題 100 点配点ものを解いた
  - B 問題 200 点配点に挑戦したが、sort の処理を深く考えすぎた
- cameraApp
  - カメラレンダリング component が、cameraLayout のような役割をしたいてたため、cameraLayout に集約した。
  - gridComponent を作成し、カメラのグリッド表示を実装した。

**Thoughts**:

- At Coder
  - B 問題は、sort の処理を深く考えすぎてしまった。組み込み関数を使うことを忘れていた。
  - 複数の入力を配列で受け取るときは、[input().strip() for _ in range(n)] のようにリスト内包表記を使うと良い。
- cameraApp
  - cameraLayout に集約したことで、コードの可読性が向上した。
  - gridComponent を作成し、カメラのグリッド表示を実装したことで、ユーザーインターフェースがより使いやすくなった。次回はカスタムグリッド機能ということで、自分で手書きできるようにする

**Link(s) to work**:

- At Coder
  - リポジトリなし
- cameraApp
  - [repository](https://github.com/HasutoSasaki/cameraApp)
  - [commit](https://github.com/HasutoSasaki/cameraApp/commits/master/?since=2025-07-09&until=2025-07-09)

### Day 71: July 11, Friday

**Today's Progress**:

- At Coder ABC395
  - A 問題 100 点配点ものを解いた
  - B 問題 200 点配点に挑戦したが、まだ解けなかった。
- cameraApp
  - カメラのグリッド表示の toggle 機能を実装した。
  - 撮影中に、カメラに指で線を描ける機能を追加するために、処理を書いたがエラーが出てしまい、push できなかった。

**Thoughts**:

- At Coder
  - B 問題は、まだ解けなかった。3 重ループに辿り着けずに、解けなかった。解説で理解はできた。
- cameraApp
  - カメラのグリッド表示の toggle 機能を実装したことで、ユーザーインターフェースがより使いやすくなった。
  - 撮影中にカメラに指で線を描ける機能を追加するための処理を書いたが、エラーが出てしまい、push できなかった。次回はエラーを解決して、機能を実装したい。

**Link(s) to work**:

- At Coder
  - リポジトリなし
- cameraApp
  - [repository](https://github.com/HasutoSasaki/cameraApp)
  - [commit](https://github.com/HasutoSasaki/cameraApp/commits/master/?since=2025-07-10&until=2025-07-10)

### Day 72: July 12, Saturday

**Today's Progress**:

- At Coder ABC392
  - A 問題 100 点配点ものを解いた
  - B 問題 200 点配点に挑戦したが、まだ解けなかった。
- CameraApp
  - 撮影中にカメラ画面上に、線を描ける機能を実装した。

**Thoughts**:

- At Coder
  - B 問題は、まだ解けなかった。解説を見て解けた。input()の値を正しく受け取る方法がまず理解できていないのを感じた。
- CameraApp
  - react native には、UI thread と JS thread があることを学んだ。
  - UI thread は、ユーザーインターフェースの描画やアニメーションを担当し、JS thread は JavaScript の実行を担当する。
  - PR を発行したが、まだマージされていない。copilot のレビューを受けて、`Drawing`の処理がある`RenderDrawingOverlay`のコード数が多いため次回はリファクタリングを行う。

**Link(s) to work**:

- At Coder
  - リポジトリなし
- CameraApp
  - [repository](https://github.com/HasutoSasaki/cameraApp)
  - [PR](https://github.com/HasutoSasaki/cameraApp/pull/2)
