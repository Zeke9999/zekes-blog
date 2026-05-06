import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';

export default function Home() {
  const posts = getSortedPostsData();
  const focusAreas = ['Python Agent', 'Tool Calling', 'RAG', 'Evaluation', 'Multi-Agent'];

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="space-y-4">
        <h1 className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl">
          Zeke 的 AI Agent 工程笔记
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-zinc-500">
          聚焦 Python Agent、工具调用、RAG、评测与工程落地，
          记录从后端开发到智能体系统实践中的方法总结、项目拆解与问题复盘。
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {focusAreas.map((area) => (
            <span
              key={area}
              className="text-xs text-zinc-600"
            >
              #{area}
            </span>
          ))}
        </div>
      </section>

      {/* Posts list */}
      <section id="posts" className="space-y-0">
        <div className="mb-6 flex items-center gap-3">
          <span className="text-xs font-medium uppercase tracking-widest text-zinc-600">
            最新文章
          </span>
          <span className="h-px flex-1 bg-zinc-800/60" />
          <span className="text-xs text-zinc-700">{posts.length} 篇</span>
        </div>

        {posts.length === 0 && (
          <p className="text-sm text-zinc-600">暂无文章。</p>
        )}

        <ul className="divide-y divide-zinc-800/40">
          {posts.map(({ slug, title, date, excerpt }) => (
            <li key={slug}>
              <Link
                href={`/posts/${slug}`}
                className="group block py-5 transition-opacity hover:opacity-80"
              >
                <div className="flex items-baseline gap-4">
                  <time className="shrink-0 text-xs tabular-nums text-zinc-600">
                    {date}
                  </time>
                  <h2 className="text-base font-medium text-white transition-colors group-hover:text-zinc-300">
                    {title}
                  </h2>
                </div>
                {excerpt && (
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 line-clamp-1">
                    {excerpt}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
