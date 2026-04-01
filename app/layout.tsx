import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: "Zeke's Blog",
  description: 'A minimal, fast blog deployed to GitHub Pages',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-50 text-gray-900 font-sans antialiased min-h-screen flex flex-col">
        <header className="bg-white border-b border-gray-200 py-6 shadow-sm">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold tracking-tight text-gray-900 hover:text-blue-600 transition-colors">
              🚀 Zeke's Blog
            </Link>
            <nav>
              <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">首页</Link>
            </nav>
          </div>
        </header>
        <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-200 py-8 mt-auto shadow-inner">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Zeke's Blog. Deployed on GitHub Pages.
          </div>
        </footer>
      </body>
    </html>
  );
}