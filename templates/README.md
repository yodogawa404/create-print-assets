# {{name}}

プリント素材（ポスター・フライヤー・請求書等）を生成するプロジェクトです。
`@yodogawa404/print-assets` エンジン（Vite プラグイン）を使い、固定 A4 キャンバスを
`src/pages/` に宣言的に組み、print CSS から PDF / PNG（Retina 2x）を書き出します。

## セットアップ（初回のみ）

```bash
npm install
npm run setup   # Playwright バンドルの chromium をインストール（PDF/PNG 出力に必要）
```

システム Chrome は使いません。エンジンは Playwright が持つ chromium を一時プロファイルで
起動するため、常用 Chrome / 実プロファイルには一切触れません。

## ページの追加

`src/pages/` にフォルダを作り、その直下に `main.tsx`（default export でコンポーネント）を置きます。

```
src/pages/
  SamplePage/
    main.tsx        # default export。data-canvas="page" + page クラスを付ける
                    # スタイルは Tailwind のユーティリティクラスで直接書く
```

- フォルダ名がそのまま URL（file-based routing）になり、並び順はフォルダ名のユニコード順です。
- キャンバスルートの `data-format` は**必須**（`a4` か `square`。欠落・不正はビルド時にエラー）。
  正方形（2048×2048 px）で出す場合は `pageSquare` + `data-format="square"` を使います。
- `main.tsx` の雛形:

```tsx
import { page } from '@yodogawa404/print-assets/page';

export default function SamplePage() {
  return (
    <div className={page} data-canvas="page" data-format="a4">
      <div className="flex flex-col bg-paper p-[18mm]">…</div>
    </div>
  );
}
```

## コマンド

```bash
npm run dev      # プレビュー（src/pages/ を編集）
npm run build    # 本番ビルド + print CSS から PDF / PNG を dist/ へ出力
npm run preview  # dist のプレビュー
npx tsc --noEmit # 型チェック
```

`npm run build` はビルド完了後にエンジンの export が動き、`dist/` に
`<slug>.pdf` と `<slug>@2x.png`（Retina 2x）を出力し、HTML を削除します。

## スタイル（Tailwind CSS）

Tailwind CSS v4（`@tailwindcss/vite` プラグイン）でスタイルします。`.css.ts` は不要で、
`main.tsx` にユーティリティクラスを直接書きます。

```tsx
<div className="flex items-center justify-between gap-4 bg-paper p-[18mm] text-ink">
  …
</div>
```

- プリント用の mm サイズは任意値クラスで指定します（`p-[18mm]`, `text-[5.5mm]`,
  `mt-[20mm]`, `max-w-[140mm]`, `leading-[1.7]` など）。
- ブランドトークン（色 / フォント）は `src/styles/global.css` の `@theme` に集約します。
  定義した `--color-*` はそのままユーティリティになります:

```css
/* src/styles/global.css */
@import 'tailwindcss';

@theme {
  --font-sans: 'Inter', 'LINE Seed JP', 'Noto Sans JP', sans-serif;
  --color-ink: #1a1a1a;
  --color-paper: #ffffff;
  --color-brand: #2563eb;
}
```

  `--color-ink` → `text-ink` / `bg-ink` / `border-ink`、`--font-sans` → `font-sans` 等。
- ユーティリティに収まらない専用スタイルは `global.css` に素の CSS として書くか、
  インライン `style` を使ってください。

## フォント

以下のフォントパッケージ（すべて OFL-1.1）を依存関係に含めています。`src/styles/global.css` の
`@import` で用途別の `@font-face` CSS を読み込んでいます。

```css
/* src/styles/global.css */
@import 'tailwindcss';
@import '@yodogawa404/font-inter/alphabets.css';
@import '@yodogawa404/line-seed-jp/hiragana.css';
@import '@yodogawa404/line-seed-jp/katakana.css';
@import '@yodogawa404/noto-sans-jp/index.css';
```

| パッケージ | font-family | weights | 役割 |
| --- | --- | --- | --- |
| `@yodogawa404/font-inter` | `Inter` | 400 / 700 | 英数字・記号 |
| `@yodogawa404/line-seed-jp` | `LINE Seed JP` | 400 / 700 | ひらがな / カタカナ |
| `@yodogawa404/noto-sans-jp` | `Noto Sans JP` | 400 / 700 | 漢字ほか |

- フォントスタックは `global.css` の `--font-sans`（`Inter` → `LINE Seed JP` → `Noto Sans JP`）。
  unicode-range で文字種ごとにフォントが切り替わるので、必要なファイルだけ読み込まれます。
- **palt（プロポーショナル字形）と kern（カーニング）は `global.css` の `:root` で
  デフォルト有効**です（`font-feature-settings: 'palt'` / `font-kerning: normal`）。
  無効化したい場合のみ `global.css` を編集してください。

## ブランドトークン

ブランド色などのトークンは `src/styles/global.css` の `@theme` に集約してください（生成先プロジェクト側の所有物）。
エンジン自体はブランドを持ちません。
