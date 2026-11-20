// ============================================================
//  新メンバー用のひな形
//  1. このファイルをコピーして members/<自分のID>.js という名前にする
//     （IDは半角英数字。例: taro）
//  2. 下の中身を自分の情報に書き換える
//  3. members/_list.js に自分のIDを1行追加する
//  4. 画像は assets/ に入れる（例: assets/taro-avatar.png）
//  ※ このファイル自体は _list.js に書かないので、サイトには出ません
// ============================================================
addMember({
  id: "taro",                         // ファイル名と同じID
  name: "山田太郎",
  kana: "やまだたろう",
  color: "yellow",                    // green / blue / coral / yellow
  avatar: "assets/taro-avatar.png",   // 画像がなければ "" にするとイニシャル表示
  avatarAlt: "山田太郎さんのアバター",
  heroAvatar: "",                     // トップの集合ビジュアル用。"" なら avatar と同じ
  heroSize: "normal",                 // normal / primary / tall / wide（並んだときの大きさ）
  intro: "ひとことで自己紹介。",
  details: [                          // [見出し, 内容] を好きなだけ
    ["趣味", "〇〇"],
    ["ひとこと", "よろしくお願いします！"],
  ],

  // ↓ ここから下はメンバー詳細ページ（member.html）に表示されます
  about: "もう少し長い自己紹介。\n改行もそのまま反映されます。",
  skills: ["HTML", "CSS", "Git"],
  links: {
    github: "https://github.com/ユーザー名",
    // x: "https://x.com/ユーザー名",
  },
  works: [
    // 作品ができたらここに追加 → トップの「制作実績」にも自動で出ます
    // {
    //   title: "作品名",
    //   description: "どんな作品か",
    //   category: "WEB",
    //   image: "assets/taro-work1.png",  // なければ ""
    //   url: "https://...",              // なければ ""
    //   tags: ["HTML", "CSS"],
    // },
  ],
});
