# create-print-assets

プリント素材（ポスター・フライヤー・請求書・名刺など）を生成するプロジェクトを、1 コマンドでひな形ごと生成するスキャフォールド CLI です。

生成されるプロジェクトは Vite + React + Tailwind CSS で構成され、`@yodogawa404/print-assets` エンジン（Vite プラグイン）を組み込み済みです。`src/pages/` にページを宣言的に組み、print CSS から固定サイズの PDF / PNG（Retina 2x）を書き出します。

```bash
npm create @yodogawa404/print-assets@latest
```

## 特徴

- **1 コマンドで即スタート** — 依存関係・設定・サンプルページまで揃ったテンプレートを展開。`npm install` してすぐに作り始められます。
- **ファイルベースのルーティング** — `src/pages/` のフォルダ名がそのまま URL になり、並び順はフォルダ名のユニコード順です。
- **固定 A4 / 正方形キャンバス** — キャンバスルートの `data-canvas` と `data-format` を付けるだけで、A4 や正方形（2048×2048 px）に描画します。
- **print CSS から PDF / PNG を出力** — `npm run build` で本番ビルド後、各ページを `<slug>.pdf` と `<slug>@2x.png` として `dist/` に書き出します。
- **Tailwind CSS v4 でスタイル** — mm 単位の任意値クラス（`p-[18mm]` など）と `@theme` に集約したブランドトークンで、宣言的にレイアウトできます。
- **日本語フォント同梱** — Inter / LINE Seed JP / Noto Sans JP（すべて OFL-1.1）を unicode-range で用途別に読み込み、palt とカーニングをデフォルト有効化。
- **常用 Chrome に触れない** — PDF / PNG 出力は Playwright バンドルの chromium を一時プロファイルで起動します。

## 使い方

```bash
npm create @yodogawa404/print-assets@latest
cd <プロジェクト名>
npm install
npm run setup   # 初回のみ: Playwright の chromium をインストール
npm run dev     # プレビュー（src/pages/ を編集）
npm run build   # 本番ビルド + print CSS から PDF / PNG を dist/ へ出力
```

ページの追加方法やスタイル・フォントのカスタマイズ方法は、生成されたプロジェクトの `README.md` に詳しく記載されています。

## コマンド（リポジトリ本体）

```bash
npm run format        # Prettier で整形（テンプレート側も含む）
npm run format:check  # 整形されていないファイルがないかチェック
```

- `templates/` 配下はスキャフォールドされるプロジェクトそのものです。
- `templates/package.json` はプレースホルダ `{{name}}` を含み、CLI が生成時にプロジェクト名へ置き換えます。
- `templates/.npmignore` の `!.gitignore` / `!.prettierrc` 指定により、ドットファイル（`.gitignore` / `.prettierrc`）がパック時に残ります。`.npmignore` 自体、`node_modules` / `dist` は生成先にはコピーされません。

## リポジトリ構成

```
src/index.js            # スキャフォールド CLI 本体
templates/              # 生成先プロジェクトのテンプレート
  src/pages/            #   ページ（ファイルベースのルーティング）
  src/styles/global.css #   ブランドトークン / フォント
  vite.config.ts        #   print-assets プラグイン設定
  package.json          #   {{name}} を含む依存定義
.github/workflows/      # npm への自動公開（v* タグ）
```

## 関連パッケージ

- [@yodogawa404/print-assets](https://www.npmjs.com/package/@yodogawa404/print-assets) — Vite プラグイン本体（PDF / PNG エクスポート）
- `@yodogawa404/font-inter` / `@yodogawa404/line-seed-jp` / `@yodogawa404/noto-sans-jp` — 同梱フォント

## ライセンス

MIT

## 開発について

- 本パッケージは、LLM（opencode）を使用して開発されています。
- **Prettier は root と templates/ で設定が分離**していますが、`npm run format` 1 つで両方整形します。
  - `preformat` フックが `npm --prefix templates install --no-package-lock` で templates のdevDependencies を自動 install（既に入っていれば `up to date` で速い）。
  - `format` が root の `prettier --write .`（`.prettierignore` で `templates/` を除外）を実行し、`postformat` フックで `npm --prefix templates run format` を続けて実行します。
    `&&` / `cd` を使わず npm 組み込みの `pre`/`post` フックで連鎖するため **Windows でも動きます**。
  - templates/ 側は `templates/.prettierrc` が `prettier-plugin-tailwindcss` + `tailwindStylesheet`を読み、Tailwind クラスを自動ソートします。
- `templates/.gitignore` はそのまま `.gitignore` として配布されます。npm pack が dotfile を落とすため、`templates/.npmignore` の `!.gitignore` で pack 時に再包含しています（`.npmignore` 自体は tarball にも生成先にも届きません）。
