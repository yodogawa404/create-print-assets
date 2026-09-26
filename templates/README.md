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
    sample.css.ts   # 同梱の vanilla-extract スタイル
```

- フォルダ名がそのまま URL（file-based routing）になり、並び順はフォルダ名のユニコード順です。
- キャンバスルートの `data-format` は**必須**（`a4` か `square`。欠落・不正はビルド時にエラー）。
  正方形（2048×2048 px）で出す場合は `pageSquare` + `data-format="square"` を使います。
- `main.tsx` の雛形:

```tsx
import { page } from '@yodogawa404/print-assets/page';
import * as s from './sample.css.ts';

export default function SamplePage() {
  return (
    <div className={page} data-canvas="page" data-format="a4">
      <div className={s.canvas}>…</div>
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

## スタイル（vanilla-extract / sprinkles）

型安全な atomic CSS ユーティリティとして `@vanilla-extract/sprinkles` が使えます。
`src/styles/sprinkles.css.ts` が `theme.css.ts` のトークン（`vars.colors` / `space` /
`fontSize` / `fontFamily`）に結びついた `sprinkles` を export しています。

```ts
// src/pages/Flyer/box.css.ts
import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../styles/sprinkles.css.ts';

export const box = style([
  sprinkles({
    display: 'flex',
    justifyContent: 'space-between',
    paddingY: 4,
    gap: 3,
    color: 'brand',
    // レスポンシブ（プレビュー時。print 出力には影響しません）:
    flexDirection: { base: 'column', md: 'row' },
  }),
  {
    // ユーティリティに収まらない記述は style に直接書く
    ':hover': { opacity: 0.8 },
  },
]);
```

- 利用可能なプロパティは `sprinkles.css.ts` の `properties`（display / flex /
  padding / margin / gap / color / background / fontSize 等）を参照してください。
- `padding` / `paddingX` / `paddingY` / `margin` などのショートハンドもあります。
- `space` はテーマの数値キー（`1` = `4px`, `4` = `16px`, `12` = `48px`）です。
- mm 指定が必要なプリント専用のサイズ（`18mm` の padding 等）は `style({...})` に直接書いてください。

## ブランドトークン

ブランド色などのトークンは `src/styles/theme.css.ts` に集約してください（生成先プロジェクト側の所有物）。
エンジン自体はブランドを持ちません。
