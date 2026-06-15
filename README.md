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

- 推送到 `main` 会自动构建，并发布到 `gh-pages` 分支
- 预期访问地址：`https://conorzhang.github.io/AI-Site/`

### 首次启用 Pages

私有仓库需要 **GitHub Pro** 才能使用 GitHub Pages（Free 账户仅支持公开仓库）。

开通后：

1. 打开仓库 **Settings → Pages**
2. **Build and deployment → Source** 选择 `Deploy from a branch`
3. **Branch** 选 `gh-pages`，目录选 `/ (root)`
4. 保存后等待 1–2 分钟生效

也可在 **Actions** 页手动触发 `Deploy GitHub Pages`。

### 本地子路径

默认 `basePath` 为 `/AI-Site`。沿用 `chohn.top` 子路径构建：

```bash
NEXT_PUBLIC_BASE_PATH=/enterprise-ux-demo NEXT_PUBLIC_SITE_URL=https://chohn.top/enterprise-ux-demo npm run build
```

## 技术栈

- Next.js（`output: "export"`）
- React + TypeScript
- Framer Motion

## 其他发布入口

`chohn.top` 子路径发布说明见 `PUBLIC_RELEASE_INDEX.md`（需单独 rsync 到 VPS）。
