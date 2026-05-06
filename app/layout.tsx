import './globals.css';
import Link from 'next/link';
import NavClient from './NavClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Zeke 的 AI Agent 工程笔记",
  description: '聚焦 Python Agent、工具调用、RAG、评测与工程实践的个人技术博客。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0c0c0d] text-zinc-300 antialiased">
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-20 border-b border-zinc-800/80 bg-[#0c0c0d]/85 backdrop-blur-sm">
            <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
              <Link href="/" className="group block">
                <span className="text-base font-medium tracking-tight text-white transition-colors group-hover:text-zinc-300">
                  Zeke&apos;s Blog
                </span>
              </Link>
              <NavClient />
            </div>
          </header>
          <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
            {children}
          </main>
          <footer className="border-t border-zinc-800/60">
            <div className="mx-auto w-full max-w-3xl px-4 py-6 text-xs text-zinc-600 sm:px-6">
              <div>© {new Date().getFullYear()} Zeke&apos;s Blog</div>
              <div className="mt-1">聚焦 Python Agent、工具调用、RAG 与工程实践。</div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
