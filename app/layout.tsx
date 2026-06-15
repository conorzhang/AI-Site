import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chohn / Product Designer",
  description: "面向企业解决方案的交互设计与作品展示。",
  metadataBase: new URL("https://chohn.top/enterprise-ux-demo/")
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
