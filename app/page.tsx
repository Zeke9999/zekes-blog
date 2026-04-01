import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <div className="space-y-10">
      <div className="pb-8 border-b border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">架构演进与思考</h1>
        <p className="text-lg text-gray-600">记录从 Java 后端到 AI Agent 的技术实战与踩坑指南。</p>
      </div>
      <ul className="space-y-12">
        {posts.map(({ slug, title, date, category, excerpt }) => (
          <li key={slug} className="group">
            <article>
              <div className="flex items-center space-x-4 mb-2">
                <time className="text-sm text-gray-500 font-medium">{date}</time>
                {category && (
                  <span className="text-xs text-blue-600 font-bold px-2.5 py-0.5 bg-blue-50 border border-blue-100 rounded-full">{category}</span>
                )}
              </div>
              <Link href={`/posts/${slug}`} className="block mt-3">
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {title}
                </h2>
                <p className="mt-3 text-gray-600 leading-relaxed text-base">
                  {excerpt}
                </p>
              </Link>
              <div className="mt-4">
                <Link href={`/posts/${slug}`} className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors flex items-center">
                  阅读全文 <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}