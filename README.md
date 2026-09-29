# getup-css-skills

素の CSS でサイトを組むときの、個人の設計ルールを [Agent Skills](https://agentskills.io/) の形式にまとめたもの。
AI エージェント（Zed、Claude Code など）に、プロジェクトをまたいで同じルールで CSS を書かせるために使う。

## 含まれる Skill

| Skill       | 内容                                                                                                |
| ----------- | --------------------------------------------------------------------------------------------------- |
| `getup-css` | `@layer` と記述順による優先順の管理、詳細度、クラスの命名、トークン、ローカル変数、余白などのルール |

## 構成

```
skills/
└── getup-css/
    ├── SKILL.md    ← ルールの本体（エージェントが読む）
    └── assets/     ← 新しいプロジェクトで使うひな形
        ├── stylelint.config.mjs
        ├── global.css
        ├── tokens.css
        └── layout.css
```

## インストール

使いたいプロジェクトごとに、[`skills` CLI](https://github.com/vercel-labs/skills) でインストールする。
プロジェクトのルートで実行する。

```sh
# Zed・Codex など（.agents/skills/）と Claude Code（.claude/skills/）に入れる
npx skills add nibushibu/getup-css-skills --skill getup-css -a zed -a claude-code --copy -y
```

- `--copy` を付けると、各ツールのフォルダーに実体がコピーされる。付けない場合は、`.agents/skills/` の実体へのシンボリックリンクになる。
- インストールした内容と取得元は `skills-lock.json` に記録される。これもコミットしておく。
- 更新は `npx skills update getup-css`、削除は `npx skills remove getup-css`。
- インストールしたファイルはプロジェクトにコミットする。ほかの人や別のマシンでも同じルールが効く。

全プロジェクトで使いたい場合は、`-g` を付けてユーザー単位でインストールする。

`SKILL.md` の形式に対応していないツールでは、プロジェクトの `AGENTS.md` などから `SKILL.md` を読むよう指示する。

## 使い方

- CSS に関する作業では、`SKILL.md` の `description` をもとに、エージェントが自動で読み込む。
- 確実に読ませたいときは、名前（`getup-css`）を指定して呼び出す。
- プロジェクト固有の決まりごと（トークンの値、ブレークポイントなど）は、この Skill ではなく各プロジェクトの設計書に書く。食い違う場合は、プロジェクトの記述が優先される。

## 書き換えるとき

`SKILL.md` の「好み」の節は、作者の流儀をまとめたもの。ほかの人が使う場合は、まずこの節を書き換える。
