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
index.html                 # @yodogawa404/print-assets/entrypoint を参照
package.json               # vite / react 19 / playwright / @yodogawa404/print-assets
vite.config.ts             # react + vanilla-extract + printAssets プラグイン入り雛形
tsconfig.json
README.md                  # セットアップ / ページ追加手順
src/
  styles/theme.css.ts      # サンプルのテーマ
  styles/global.css.ts
  styles/sprinkles.css.ts  # @vanilla-extract/sprinkles のセットアップ（テーマトークン連動）
  pages/SamplePage/
    main.tsx               # data-canvas="page" + page クラスの雛形
    sample.css.ts
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
