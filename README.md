# @yodogawa404/create-print-assets

`@yodogawa404/print-assets`（プリント素材生成エンジン）を使う **プロジェクトの雛形を生成する**
scaffold CLI です。

`npm create @yodogawa404/print-assets` で呼び出せます。

## 使い方

```bash
# カレントに生成
npm create @yodogawa404/print-assets

# ディレクトリ名を指定
npm create @yodogawa404/print-assets my-app
```

対話で「プロジェクトを置くディレクトリ」と「package.json の name」を聞かれます
（引数で指定すればスキップ）。

## 生成されるもの

```
.gitignore / .prettierrc     # 生成プロジェクトにそのまま届く設定ファイル
index.html                   # @yodogawa404/print-assets/entrypoint を参照
package.json                 # vite / react 19 / playwright / tailwindcss / prettier / フォント（Inter・LINE Seed JP・Noto Sans JP）
vite.config.ts               # react + tailwindcss + printAssets プラグイン入り雛形
tsconfig.json
README.md                    # セットアップ / ページ追加手順
src/
  styles/global.css          # @import "tailwindcss" + @theme（ブランドトークン）
  pages/SamplePage/
    main.tsx                 # data-canvas="page" + page クラスの雛形（Tailwind ユーティリティ）
```

生成後:

```bash
cd my-app
npm install
npm run setup   # 初回のみ: Playwright の chromium をインストール
npm run dev     # プレビュー
npm run build   # 本番ビルド + PDF / PNG を dist/ へ出力
```

## ライセンス

MIT

## 開発について

本パッケージは、LLM（opencode）を使用して開発されています。

- **Prettier は root と templates/ で設定が分離**していますが、`npm run format` 1 つで両方整形します。
  - `preformat` フックが `npm --prefix templates install --no-package-lock` で templates の
    devDependencies を自動 install（既に入っていれば `up to date` で速い）。
  - `format` が root の `prettier --write .`（`.prettierignore` で `templates/` を除外）を実行し、
    `postformat` フックで `npm --prefix templates run format` を続けて実行します。
    `&&` / `cd` を使わず npm 組み込みの `pre`/`post` フックで連鎖するため **Windows でも動きます**。
  - templates/ 側は `templates/.prettierrc` が `prettier-plugin-tailwindcss` + `tailwindStylesheet`
    を読み、Tailwind クラスを自動ソートします。
- `templates/.gitignore` はそのまま `.gitignore` として配布されます。npm pack が dotfile を落とすため、
  `templates/.npmignore` の `!.gitignore` で pack 時に再包含しています（`.npmignore` 自体は tarball にも
  生成先にも届きません）。
