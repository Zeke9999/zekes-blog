import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Zeke 的 AI Agent 工程笔记",
  description: '聚焦 Python Agent、工具调用、RAG、评测与工程落地的个人技术博客。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-slate-100 text-slate-900 font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur">
            <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
              <Link href="/" className="group block">
                <div className="text-lg font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600 sm:text-xl">
                  Zeke&apos;s Blog
                </div>
                <div className="mt-1 hidden text-sm text-slate-500 sm:block">
                  AI Agent · Python · Engineering
                </div>
              </Link>
              <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
                <Link href="/" className="transition-colors hover:text-blue-600">
                  首页
                </Link>
                <Link href="/#posts" className="transition-colors hover:text-blue-600">
                  文章
                </Link>
              </nav>
            </div>
          </header>
          <main className="mx-auto flex w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            {children}
          </main>
          <footer className="border-t border-slate-200 bg-white/90">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-6 text-sm text-slate-500 sm:px-6 lg:px-8">
              <div>© {new Date().getFullYear()} Zeke&apos;s Blog</div>
              <div>聚焦 Python Agent、工具调用、RAG 与工程实践，部署于 GitHub Pages。</div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
