addMember({
  id: "140",                             // ファイル名・_list.js と同じID
  name: "140",
  kana: "",
  color: "green",                        // green / blue / coral / yellow
  avatar: "assets/140-avatar.png",       // メンバー紹介カードの画像
  avatarAlt: "140のアバター",
  heroAvatar: "assets/140-avatar.png",   // トップの集合ビジュアル用（省略すると avatar を使う）
  heroSize: "primary",                   // normal / primary / tall / wide
  intro: "MBTIは運動家（ENFP）です。",
  details: [
    ["趣味", "映画鑑賞"],
    ["ひとこと", "よろしくお願いします！"],
  ],

  // ↓ ここから下はメンバー詳細ページ（member.html）に表示されます
  about: "",
  skills: [],
  links: {
    // github: "https://github.com/ユーザー名",
  },
  works: [],
});
