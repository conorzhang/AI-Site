import type { Metadata } from "next";
import "./globals.css";

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
const sitePath = configuredBasePath === undefined ? "/enterprise-ux-demo" : configuredBasePath;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://chohn.top${sitePath}`;

export const metadata: Metadata = {
  title: "Chohn / AI Product Manager",
  description: "面向企业级低代码、组件平台与 AI 助手的产品方案作品集。",
  metadataBase: new URL(`${siteUrl}/`)
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; if (!location.hash) window.scrollTo(0, 0);"
          }}
        />
        <script defer src="https://chohn.top/umi/script.js" data-website-id="db658282-b2f4-4908-a122-b8ae695e938d" />
        {children}
      </body>
    </html>
  );
}
