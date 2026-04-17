import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';

export default function Home() {
  const posts = getSortedPostsData();
  const focusAreas = ['Python Agent', 'Tool Calling', 'RAG', 'Evaluation', 'Multi-Agent'];

  return (
    <div className="w-full space-y-10">
      <section className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8 sm:py-10">
        <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
          Personal Tech Blog
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Zeke 的 AI Agent 工程笔记
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
          聚焦 Python Agent、工具调用、RAG、评测与工程落地，记录从后端开发到智能体系统实践中的方法总结、项目拆解与问题复盘。
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1">哈尔滨工业大学（深圳）</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">计算机科学与技术</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">2027 届</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">求职方向：Python Agent 开发</span>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {focusAreas.map((area) => (
            <span
              key={area}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-600"
            >
              {area}
            </span>
          ))}
        </div>
      </section>

      <section id="posts" className="space-y-6">
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">最新文章</h2>
            <p className="mt-1 text-sm text-slate-500">按时间倒序展示近期更新，优先沉淀 Agent 工程相关专题。</p>
          </div>
          <div className="text-sm font-medium text-slate-500">共 {posts.length} 篇</div>
        </div>

        <ul className="grid gap-6">
          {posts.map(({ slug, title, date, category, series, tags, excerpt }) => (
            <li key={slug} className="group">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <time className="font-medium">{date}</time>
                  {category && (
                    <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                      {category}
                    </span>
                  )}
                  {series && (
                    <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      {series}
                    </span>
                  )}
                </div>

                <Link href={`/posts/${slug}`} className="mt-4 block">
                  <h3 className="text-2xl font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
                    {title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{excerpt}</p>
                </Link>

                {tags && tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-5">
                  <Link
                    href={`/posts/${slug}`}
                    className="inline-flex items-center text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800"
                  >
                    阅读全文
                    <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
