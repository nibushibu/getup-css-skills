/**
 * Stylelint の設定のひな形。
 *
 * 「詳細度を低く揃え、カスケードレイヤーと記述順で優先順を管理する」という前提は、
 * 規律で守るものだが、破られたことに気づけるよう、機械的に検査できるものはここで縛る。
 *
 * 必要なパッケージ：stylelint、stylelint-config-standard
 *
 * @type {import("stylelint").Config}
 */
export default {
  extends: ["stylelint-config-standard"],
  rules: {
    /*
     * 詳細度の上限。
     *
     * 基本は [0,1,0]（クラス 1 つ）。`:hover` や `[aria-expanded]` のような状態を
     * 重ねると [0,2,0] になるので、そこまでを許す。超えそうな場合は、詳細度を
     * 上げるのではなく、次のどれかで解決する。
     *   - 条件を `:where()` に入れる
     *   - 対象の要素にクラスを与える
     *   - 後ろのレイヤーへ移す
     */
    "selector-max-specificity": "0,2,0",

    // ID セレクタは詳細度が跳ね上がり、順序による管理が破綻するため使わない
    "selector-max-id": 0,

    // `div.c-foo` のような型修飾。詳細度を無駄に上げるうえ、要素を固定してしまう
    "selector-no-qualifying-type": true,

    // 優先順はレイヤーと記述順で決める。`!important` はその仕組みを迂回する
    "declaration-no-important": true,

    /*
     * クラス名の接頭辞をレイヤー名に対応させる規約。
     *   l- : layout
     *   c- : components
     *   u- : utilities
     * 続けて BEM 風の `__element` / `--modifier` を任意で付けられる。
     */
    "selector-class-pattern": [
      "^(l|c|u)-[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?(?:--[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$",
      {
        message: (selector) =>
          `クラス名 "${selector}" はレイヤーの接頭辞（l- / c- / u-）から始めてください`,
      },
    ],

    /*
     * カスタムプロパティ名の規約。
     *   --space, --color-foreground : トークン（tokens.css にだけ置く）
     *   --_min, --_heading-size     : その部品の中だけで使う調整用の値
     * stylelint-config-standard の既定（kebab-case）を、先頭の `_` を許す形に広げている。
     */
    "custom-property-pattern": [
      "^_?[a-z][a-z0-9]*(?:-[a-z0-9]+)*$",
      {
        message: (name) =>
          `カスタムプロパティ名 "${name}" は kebab-case（ローカルな値は先頭に _）で書いてください`,
      },
    ],

    /*
     * バンドラに解決させるため、`@import "./foo.css"` の文字列表記を使う。
     * stylelint-config-standard の既定は `url()` 表記。
     */
    "import-notation": "string",

    /*
     * トークンは種類ごとに空行で区切って読むものなので、
     * 「カスタムプロパティの間に空行を入れない」という規則は外す。
     */
    "custom-property-empty-line-before": null,

    /*
     * 「詳細度の低いセレクタを、高いセレクタより後に書いてはいけない」という規則。
     * 詳細度ではなくレイヤーと記述順で優先順を決める前提と噛み合わないため、無効にする。
     */
    "no-descending-specificity": null,
  },
};
