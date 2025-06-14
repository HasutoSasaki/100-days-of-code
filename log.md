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
