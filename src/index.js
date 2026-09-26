#!/usr/bin/env node

import { cp, mkdir, readFile, writeFile, readdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';

const SELF = dirname(fileURLToPath(import.meta.url));
const TEMPLATES = resolve(SELF, '../templates');
const TTY = Boolean(process.stdout.isTTY);

async function replaceInFile(file, map) {
  let content = await readFile(file, 'utf8');
  for (const [k, v] of Object.entries(map)) {
    content = content.split(`{{${k}}}`).join(v);
  }
  await writeFile(file, content, 'utf8');
}

async function main() {
  let target = process.argv[2] ?? '';
  let name = process.argv[3] ?? '';

  if (TTY) {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    try {
      if (!target)
        target =
          (
            await rl.question('プロジェクトを置くディレクトリ名 [.]: ')
          ).trim() || '.';
      if (!name)
        name =
          (await rl.question('package.json の name: ')).trim() ||
          'print-assets-app';
    } finally {
      rl.close();
    }
  }
  if (!name) name = 'print-assets-app';

  const dest = resolve(process.cwd(), target);

  // Avoid overwriting an existing project.
  const existing = await readdir(dest).catch(() => []);
  const guarded = ['index.html', 'package.json', 'vite.config.ts', 'src'];
  const clash = guarded.filter((g) => existing.includes(g));
  if (clash.length > 0) {
    throw new Error(
      `対象ディレクトリに既にファイルが存在します: ${clash.join(', ')}`,
    );
  }

  await mkdir(dest, { recursive: true });
  // Dotfiles (.gitignore / .prettierrc) are packed as-is thanks to
  // templates/.npmignore's `!.gitignore` negation at pack time.
  // node_modules / dist / out are present in the scaffold repo (for the
  // template's own `npm run format`) but must not leak into generated projects.
  const SKIP = ['node_modules', 'dist', 'out', '.npmignore'];
  await cp(TEMPLATES, dest, {
    recursive: true,
    filter: (src) => !SKIP.includes(src.split('/').pop()),
  });

  for (const f of ['package.json', 'index.html', 'README.md']) {
    await replaceInFile(join(dest, f), { name });
  }

  console.log('created:', target);
  console.log(`
次に:
  cd ${target}
  npm install
  npm run setup   # 初回のみ: Playwright の chromium をインストール
  npm run dev     # プレビュー（src/pages/ を編集）
  npm run build   # 本番ビルド + print CSS から PDF / PNG を dist/ へ出力
`);
}

main().catch((err) => {
  console.error(`[create-print-assets] ${err.message}`);
  process.exit(1);
});
