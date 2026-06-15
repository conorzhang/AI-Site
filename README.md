# AI-Site

ToB Enterprise UX 个人作品集首页 demo（Next.js 静态站点）。

## 本地运行

```bash
npm install
npm run dev -- -p 3000
```

本地访问：

```text
http://localhost:3000/AI-Site/
```

如需沿用旧子路径调试：

```bash
NEXT_PUBLIC_BASE_PATH=/enterprise-ux-demo npm run dev -- -p 3000
```

## 构建

```bash
npm run build
```

构建产物输出到 `out/`。

## GitHub Pages 部署

仓库已配置 GitHub Actions（`.github/workflows/deploy-pages.yml`）。

- 推送到 `main` 分支会自动构建并部署
- 访问地址：`https://conorzhang.github.io/AI-Site/`

也可在 GitHub 仓库 **Actions** 页手动触发 `Deploy GitHub Pages`。

## 技术栈

- Next.js（`output: "export"`）
- React + TypeScript
- Framer Motion

## 其他发布入口

`chohn.top` 子路径发布说明见 `PUBLIC_RELEASE_INDEX.md`（需单独 rsync 到 VPS）。
