# AGENTS.md — @yodogawa404/create-print-assets（scaffold CLI）

`@yodogawa404/print-assets` のプロジェクト雛形を生成する公開 OSS CLI。

## 役割

- `templates/` を対象ディレクトリへコピーし、`{{name}}` を置換するだけ
  （`_gitignore` rename は不要。dotfile は `.npmignore` の negation で pack 時に再包含）。
- **framework コードは node_modules に残す（DRY）**。生成先へはコピーしない。

## コマンド

```bash
# 動作確認（引数で直接指定）
node src/index.js <dir> <name>

# 整形（Prettier）
npm run format          # preformat(install) → root 整形 → postformat(--prefix で templates 整形)
npm run format:check    # 整形チェック（CI 用。preformat:check で templates も install）
# templates 側のみ回したい場合
cd templates && npm run format  # Tailwind クラスを自動ソート
```

`npm create @yodogawa404/print-assets` は `npm exec @yodogawa404/create-print-assets` として
npm が解決する（`create-<initializer>` 規約）。**単一パッケージへの結合はしない**
（`npm create @yodogawa404/print-assets` が `@yodogawa404/create-print-assets` を探すため、
1 パッケージ化するとショートハンドが壊れる）。

## ディレクトリ構成

```
src/index.js                   # CLI（コピー + name 置換 + 次の手順表示）
templates/                      # 生成されるプロジェクト雛形
  .gitignore                   # 生成先へそのまま配布（node_modules / dist / out）
  .prettierrc                  # prettier-plugin-tailwindcss + tailwindStylesheet
  .npmignore                   # pack 時のみ（!.gitignore で dotfile 再包含。配布・生成先には不達）
  package.json                 # {{name}} 置換（prettier / prettier-plugin-tailwindcss も devDep に）
  index.html                   # {{name}} 置換
  README.md                    # {{name}} 置換（Playwright 初回 install 手順を明記）
  vite.config.ts / tsconfig.json
  src/pages/SamplePage/        # main.tsx（Tailwind ユーティリティを直接記述）
  src/styles/global.css        # @import "tailwindcss" + @theme（ブランドトークン）
.prettierrc / .prettierignore / .gitignore   # scaffold 自身の整形設定
```

## 重要：設計・規約

- `npm create` のショートハンドを使えるよう、**パッケージ名は `create-` プレフィックスを維持**。
  `@yodogawa404/create`（別 PJ）とは別名で衝突しない。
- 生成する `package.json` には `playwright` を devDependency に含め、
  README に `npm run setup`（`playwright install chromium`）の手順を書くこと。
- 空でない既存ディレクトリへの上書きを避ける（`index.html` / `package.json` / `src` の衝突チェック）。
- **Prettier は root と templates/ で分離**。`npm run format` が両方を直列実行する。
  - root: `templates/` を `.prettierignore` で除外し、scaffold 自身だけ整形。
  - templates/: `tailwindStylesheet: ./src/styles/global.css` で Tailwind クラスをソート。
    フォント / tailwindcss の解決に install が要る。`preformat` で `npm --prefix templates install --no-package-lock` を自動実行する（既に入っていれば `up to date` で速い）。
  - prettier-plugin-tailwindcss は cwd 基準で stylesheet を解決するため、単一プロセスでは root から
    templates をソートできない。`postformat` フックで `npm --prefix templates run format`
    を別 cwd 実行して連鎖する（`&&` / `cd` は Windows の shell 差異で危険なため使わない。
    npm 組み込みの `pre`/`post` フックはシェル非依存で可搬性が高い）。
  - `--no-package-lock` により templates/package-lock.json を生成しない（tarball に漏れない）。
- **dotfile の npm pack 挙動**: npm-packlist は `.gitignore`/`.npmignore` をハードコードで除外する。
  root の `.npmignore` の `!` では復活できない（子 walker が basename で再除外するため）。
  `.gitignore` と**同階層**の `.npmignore` に `!.gitignore` を置くのが唯一の pack 時再包含方法。
  `.prettierrc` 等の任意 dotfile は default で pack される（negation 不要）。
- **templates/ は scaffold リポジトリ内に node_modules を持ちうる**（整形用 install のため）。
  `src/index.js` の `cp` は filter で `node_modules` / `dist` / `out` / `.npmignore` を除外し、
  生成先へ漏らさない。

## 公開

- `npm pack` で `src/` と `templates/` が配布されることを確認する。
  - `.gitignore` / `.prettierrc` が tarball に入ること、`.npmignore` / `node_modules` が入らないことを確認。
- ライセンスは MIT。
