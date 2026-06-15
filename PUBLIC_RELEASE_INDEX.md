# Enterprise UX Portfolio Demo 公开发布索引

这份文档记录个人网站首页改版 demo 的独立发布链路。该项目按“B 方案”处理：保留旧首页和旧项目不改动，只新增独立 demo 项目和独立公网子路径。

## 当前入口

| 入口 | 说明 |
|---|---|
| `https://chohn.top/enterprise-ux-demo/` | Enterprise UX Portfolio Demo |
| `https://chohn.top/` | 旧个人网站首页，保持不覆盖 |

## 发布链路

```text
用户浏览器
  -> https://chohn.top/enterprise-ux-demo/
  -> 【国内】/【跳板机】VPS Nginx（123.57.95.123）
  -> /www/wwwroot/personal-ai-portfolio/enterprise-ux-demo/
```

## 关键路径

| 用途 | 路径 |
|---|---|
| 本地源码 | `01Codex/projects/enterprise-ux-portfolio-demo` |
| 构建产物 | `01Codex/projects/enterprise-ux-portfolio-demo/out/` |
| VPS 静态目录 | `/www/wwwroot/personal-ai-portfolio/enterprise-ux-demo/` |
| Nginx 配置 Git 镜像 | `04Shared/infra/nginx/personal-site-static.conf` |
| Nginx VPS live | `/www/server/panel/vhost/nginx/snippets/personal-site-static.conf` |
| ECS SSH 密钥包装 | `/Users/chohn/.codex/bin/with-ecs-key` |

## 构建配置

`next.config.ts`：

- `output: "export"`
- `basePath: "/enterprise-ux-demo"`
- `images.unoptimized: true`

## 标准发布流程

```bash
cd /Users/chohn/AIGC/01Codex/projects/enterprise-ux-portfolio-demo
npm run build

/Users/chohn/.codex/bin/with-ecs-key sh -lc \
  'ssh -i "$ECS_KEY_FILE" root@123.57.95.123 "install -d -m 755 /www/wwwroot/personal-ai-portfolio/enterprise-ux-demo"'

/Users/chohn/.codex/bin/with-ecs-key sh -lc \
  'rsync -az --delete -e "ssh -i \"$ECS_KEY_FILE\"" \
  /Users/chohn/AIGC/01Codex/projects/enterprise-ux-portfolio-demo/out/ \
  root@123.57.95.123:/www/wwwroot/personal-ai-portfolio/enterprise-ux-demo/'
```

Nginx 新增 location 后同步：

```bash
bash /Users/chohn/AIGC/04Shared/infra/nginx/sync_nginx_to_vps.sh personal-site-static.conf
```

## 发布后验证

```bash
curl -sS -o /dev/null -w "%{http_code}\n" https://chohn.top/enterprise-ux-demo/
curl -sS https://chohn.top/enterprise-ux-demo/ | rg 'ToB ENTERPRISE|Chohn / Enterprise UX|SELECTED WORKS'
curl -sS -o /dev/null -w "%{http_code}\n" https://chohn.top/
```

根路径 `https://chohn.top/` 仍应返回旧首页。

## 回滚

静态资源回滚：

```bash
rm -rf /www/wwwroot/personal-ai-portfolio/enterprise-ux-demo
```

Nginx 回滚：

1. 移除 `04Shared/infra/nginx/personal-site-static.conf` 中 `/enterprise-ux-demo` 两个 location。
2. 重新同步并 reload：

```bash
bash /Users/chohn/AIGC/04Shared/infra/nginx/sync_nginx_to_vps.sh personal-site-static.conf
```

如需恢复到脚本自动备份版本，可使用 `/root/codex-backups/personal-site-static.conf.bak-<timestamp>`。
