// @ts-check
import { defineConfig } from 'astro/config';

// `site` と `base` は GitHub Actions（withastro/action）がデプロイ時に
// --site / --base オプションで自動設定します。
//   - 組織リポジトリ:  https://<org>.github.io/<repo名>/  → base = "/<repo名>"
//   - 独自ドメイン:    https://example.ac.jp/              → base = "/"
// ローカル開発（npm run dev）では base = "/" です。
// リンクは必ず src/lib/url.ts の withBase() を通してください。
export default defineConfig({
  trailingSlash: 'ignore',
});
