# AGENTS.md

このリポジトリは `@yodogawa404/create-print-assets`（プリント素材プロジェクトを生成するスキャフォールド CLI）のソースです。AI エージェントが編集する際のガイドラインをまとめます。

## 全体像

- `src/index.js` — CLI 本体（Node ESM、`#!/usr/bin/env node`）。
- `templates/` — 生成されるプロジェクトそのもの。`cp` でそのままコピーされる。
- リポジトリ本体は `prettier` のみを devDependency に持ち、テンプレート側には Vite / React / Tailwind 等の依存がある（別の package 扱い）。

## 重要な仕組み

- **`{{name}}` プレースホルダ** — `templates/package.json`・`index.html`・`README.md` に含まれ、CLI が生成時にプロジェクト名へ置き換える。この文字列を消したり別の書き方をしたりしない。
- **ドットファイルの扱い** — `templates/.gitignore` と `.prettierrc` は、`templates/.npmignore` の `!.gitignore` 等の否定指定によって npm パック時に残る。`.npmignore` 自体、`node_modules`、`dist`、`out` は生成先へコピーしない（`src/index.js` の `SKIP` 配列）。
- **テンプレート側の自己フォーマット** — `templates/` はそれ自身で `npm run format` が動く前提（プレフィックス/ポストフィックスの `npm --prefix templates ...`）。テンプレート内に `node_modules` が存在し得る点に注意。

## 編集するときの注意

- `templates/` を編集するときは、生成後に壊れないこと（プレースホルダ置換、依存関係、`vite.config.ts` のプラグイン設定、`src/main.ts` の `init` 呼び出し）を必ず考慮する。
- ページ追加の規則（`src/pages/<Folder>/main.tsx` の default export、キャンバスルートの `data-canvas` / `data-format` 必須）を壊さない。
- フォント・トークンは `templates/src/styles/global.css` の `@theme` に集約するという流儀を守る。

## コマンド

```bash
npm run format        # Prettier 整形（テンプレート側も含む）
npm run format:check  # 整形チェック
```

- 変更後は必ず `npm run format` を実行し、整形済みの状態で完了とする。
- コミットはユーザーが明示的に依頼した場合のみ行う。

## 公開フロー（参考）

- `.github/workflows/publish.yml` が `v*` タグで npm へ自動公開する。package 名は `@yodogawa404/create-print-assets`、公開先は npm（trusted publishing、`--access public`）。
