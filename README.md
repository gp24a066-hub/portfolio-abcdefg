# our.portfolio

メンバーそれぞれの個性を紹介するチームのポートフォリオサイトです。
HTML / CSS / JavaScript だけで作っているので、ビルドは不要です。`index.html` をブラウザで開けば表示できます。

## ファイル構成

```
├── index.html          トップページ（ヒーロー / 制作実績 / メンバー紹介）
├── member.html         メンバー詳細ページ（member.html?id=xxx）
├── style.css           デザイン（色は :root の変数で管理）
├── main.js             画面を組み立てる共通処理（基本的に触らない）
├── members/
│   ├── _list.js        ★ メンバーの一覧（表示する順番）
│   ├── _template.js    新メンバー用のひな形
│   ├── 140.js          ★ メンバー1人につき1ファイル
│   ├── 066.js
│   └── 152.js
└── assets/             アバター・作品の画像
```

**自分の情報を変えたいときは `members/自分のID.js` だけを編集します。**
`index.html` を直接書き換える必要はありません。トップページと詳細ページに自動で反映されます。

## 担当の目安

| やりたいこと | 編集するファイル |
|---|---|
| 自分の紹介文・趣味・スキル・作品を更新する | `members/自分のID.js`、`assets/` |
| 新しいメンバーを追加する | `members/新しいID.js` を作成し、`members/_list.js` に1行追加 |
| デザインを変える | `style.css` |
| ページの構成や仕組みを変える | `index.html`、`member.html`、`main.js`（事前にチームで相談） |

## 作業の流れ

```bash
# 1. クローン（初回だけ）
git clone https://github.com/gp24a066-hub/portfolio-abcdefg.git
cd portfolio-abcdefg

# 2. 作業を始める前に main を最新にし、ブランチを作る
git switch main
git pull
git switch -c update-自分のID

# 3. 編集して、ブラウザで index.html を開いて確認する

# 4. コミットしてプッシュ
git add .
git commit -m "〇〇のプロフィールを更新"
git push -u origin update-自分のID
```

5. GitHub で **Pull Request** を作り、誰か1人にレビューしてもらう
6. OKが出たらマージ
7. 手元に戻って `git switch main` → `git pull`

### ルール

- `main` に直接 push しない。必ず Pull Request を通す
- ブランチ名は `update-自分のID`、`add-新メンバーID`、`design-内容`、`fix-内容` など
- 他の人の `members/*.js` は、本人に断ってから編集する

## メンバー情報の書き方

`members/_template.js` に、すべての項目の説明があります。

| 項目 | 内容 |
|---|---|
| `color` | テーマカラー：`green` / `blue` / `coral` / `yellow` |
| `heroSize` | トップの集合ビジュアルでの大きさ：`normal` / `primary` / `tall` / `wide` |
| `details` | `["見出し", "内容"]` を好きなだけ並べる |
| `works` | 作品を追加すると、トップに「制作実績」セクションが自動で出る |

## コンフリクトが起きたら

`members/_list.js` は新しいメンバーが1行ずつ追加するので、同時に作業するとコンフリクトが起きることがあります。

```
<<<<<<< HEAD
  "taro",
=======
  "hanako",
>>>>>>> add-hanako
```

上のようになっていたら、両方の行を残し、`<<<<<<<` `=======` `>>>>>>>` の3行を消します。

```
  "taro",
  "hanako",
```
