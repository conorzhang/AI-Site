import type { Metadata } from "next";
import "./globals.css";

const sitePath = process.env.NEXT_PUBLIC_BASE_PATH || "/AI-Site";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://conorzhang.github.io${sitePath}`;

export const metadata: Metadata = {
  title: "Chohn / Product Designer",
  description: "面向企业解决方案的交互设计与作品展示。",
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
        {children}
      </body>
    </html>
  );
}
