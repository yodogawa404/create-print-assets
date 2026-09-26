# AGENTS.md — @yodogawa404/create-print-assets（scaffold CLI）

`@yodogawa404/print-assets` のプロジェクト雛形を生成する公開 OSS CLI。

## 役割

- `templates/` を対象ディレクトリへコピーし、`{{name}}` を置換、`_gitignore` を
  `.gitignore` に rename するだけ。
- **framework コードは node_modules に残す（DRY）**。生成先へはコピーしない。

## コマンド

```bash
# 動作確認（引数で直接指定）
node src/index.js <dir> <name>
```

`npm create @yodogawa404/print-assets` は `npm exec @yodogawa404/create-print-assets` として
npm が解決する（`create-<initializer>` 規約）。**単一パッケージへの結合はしない**
（`npm create @yodogawa404/print-assets` が `@yodogawa404/create-print-assets` を探すため、
1 パッケージ化するとショートハンドが壊れる）。

## ディレクトリ構成

```
src/index.js                   # CLI（コピー + name 置換 + _gitignore rename + 次の手順表示）
templates/                      # 生成されるプロジェクト雛形
  package.json                 # {{name}} 置換
  index.html                   # {{name}} 置換
  README.md                    # {{name}} 置換（Playwright 初回 install 手順を明記）
  vite.config.ts / tsconfig.json
  src/pages/SamplePage/        # main.tsx + sample.css.ts
  src/styles/theme.css.ts / global.css.ts / sprinkles.css.ts
```

## 重要：設計・規約

- `npm create` のショートハンドを使えるよう、**パッケージ名は `create-` プレフィックスを維持**。
  `@yodogawa404/create`（別 PJ）とは別名で衝突しない。
- 生成する `package.json` には `playwright` を devDependency に含め、
  README に `npm run setup`（`playwright install chromium`）の手順を書くこと。
- 空でない既存ディレクトリへの上書きを避ける（`index.html` / `package.json` / `src` の衝突チェック）。

## 公開

- `npm pack` で `src/` と `templates/` が配布されることを確認する。
- ライセンスは MIT。
