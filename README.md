# M2D-lab ホームページ テンプレート

材料創製力学研究室（M2D-lab）ホームページコンペティション用のテンプレートリポジトリです。
静的サイトジェネレータ **Astro** を使い、GitHub Actions で GitHub Pages に自動公開します。

> **静的サイトジェネレータ（SSG）とは**: Markdown / YAML で書いたデータとデザイン用のテンプレートから、
> 公開用の HTML を自動生成するツールです。サーバーやデータベースは不要で、GitHub Pages でそのまま公開できます。
> 「メンバーを 1 人追加する」= `src/content/members.yaml` に数行書き足す、という運用になります。

## 1. 参加者の最初の手順

1. このリポジトリ右上の **Use this template → Create a new repository** を押す。
2. Owner は研究室の GitHub 組織、Repository name は `homepage_（名前）`（例: `homepage_tachikawa`）。
3. 作成したリポジトリの **Settings → Pages → Build and deployment → Source** を **GitHub Actions** にする。
4. **Actions** タブで「Deploy to GitHub Pages」が成功すると、`https://<組織名>.github.io/homepage_（名前）/` で公開される。
   初回は手動で Actions → Deploy to GitHub Pages → Run workflow を押してもよい。
5. 以降、`main` に push するたびに自動で再公開される。

公開 URL が **プレビューサイト** であり、提出物になります（レギュレーション第 4 条）。

## 2. ローカルで確認する（任意だが推奨）

Node.js 20 以上が必要です（https://nodejs.org/ の LTS 版）。

```bash
npm install
npm run dev
```

ブラウザで http://localhost:4321 を開くと、ファイルを保存するたびに自動で反映されます。
公開前の最終確認は `npm run build` でビルドが通ることを確認してください。

## 3. ディレクトリ構成

```
.
├── .github/workflows/deploy.yml   # GitHub Pages への自動デプロイ（基本的に触らない）
├── astro.config.mjs               # Astro 設定
├── public/                        # そのまま配信される静的ファイル（画像・favicon）
│   └── images/{members,research,equipment}/
├── src/
│   ├── content.config.ts          # データの型定義（項目名・必須/任意）
│   ├── content/                   # ★ コンテンツ本体（ここを編集すれば更新できる）
│   │   ├── members.yaml           #   メンバー一覧
│   │   ├── publications.yaml      #   業績リスト
│   │   ├── equipment.yaml         #   装置・設備
│   │   ├── research/*.md          #   研究テーマ（1 テーマ 1 ファイル）
│   │   └── news/*.md              #   お知らせ（1 件 1 ファイル）
│   ├── data/site.json             # 研究室名・住所・連絡先などサイト全体の設定
│   ├── layouts/Base.astro         # 全ページ共通の枠（head・ヘッダー・フッター）
│   ├── components/                # 部品（ヘッダー、フッター、業績リスト）
│   ├── pages/                     # ページ。ファイル名 = URL
│   ├── lib/url.ts                 # サイト内リンク用ヘルパー withBase()
│   └── styles/global.css          # 共通スタイル
└── docs/                          # 運用ドキュメント
```

必須コンテンツ 7 項目とページの対応:

| 必須コンテンツ | ページ |
|---|---|
| 研究室概要 | `src/pages/about.astro` |
| 研究テーマ紹介 | `src/pages/research/` + `src/content/research/` |
| メンバー一覧 | `src/pages/members.astro` + `src/content/members.yaml` |
| 業績リスト | `src/pages/publications.astro` + `src/content/publications.yaml` |
| 装置・設備紹介 | `src/pages/equipment.astro` + `src/content/equipment.yaml` |
| 進学・配属希望者向け情報 | `src/pages/join.astro` |
| アクセス・連絡先 | `src/pages/access.astro` + `src/data/site.json` |

## 4. カスタマイズの自由度

- デザイン（`global.css`、各 `.astro` ファイル）は全面的に変更して構いません。
- ページ構成の変更・追加も自由です。ただし必須コンテンツ 7 項目は残してください。
- `src/content/` のデータ形式を変える場合は `src/content.config.ts` も合わせて修正してください。
  審査項目「更新性・保守性」では、PI がデータファイルを編集するだけで更新できるかが見られます。
- **サイト内リンクは必ず `withBase('/path')` を使ってください。** 組織リポジトリの Pages は
  `https://<組織名>.github.io/<リポジトリ名>/` 配下に置かれるため、`/members` のような絶対パスは 404 になります。

## 5. 提出前チェックリスト

- [ ] Actions のデプロイが成功し、公開 URL で全ページが表示される
- [ ] スマートフォン幅（375px 程度）でも崩れない
- [ ] 必須コンテンツ 7 項目が揃っている
- [ ] 未公開データ・査読中原稿・共同研究の非公開情報を含んでいない（プレビューも全世界公開）
- [ ] 顔写真・個人情報は本人同意済みのものだけ
- [ ] 第三者の画像・フォントはライセンス上問題なく、必要な表記をした
- [ ] API キー等を直書きしていない（`.env` はコミットされない設定になっている）
- [ ] リポジトリ URL と公開 URL を提出先に投稿した

## 6. 関連ドキュメント

- [docs/branching.md](docs/branching.md) — ブランチ運用ルール（コンペ期間・本番運用）
- [docs/content-guide.md](docs/content-guide.md) — コンテンツの更新方法（PI・引き継ぎ用）
- [docs/future-cms.md](docs/future-cms.md) — 将来の GUI 編集（Git ベース CMS）導入メモ
