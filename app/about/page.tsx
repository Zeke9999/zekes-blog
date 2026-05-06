import Link from 'next/link';
import { getSortedPostsData } from '../../lib/posts';

export default function About() {
  const posts = getSortedPostsData();
  const postCount = posts.length;

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-2xl font-display font-bold tracking-tight text-white sm:text-3xl">
          关于
        </h1>
        <div className="space-y-4 text-sm leading-relaxed text-zinc-400">
          <p>
            我是 <strong className="text-zinc-200">Zeke</strong>，
            哈尔滨工业大学（深圳）计算机科学与技术专业学生，2027 届。
          </p>
          <p>
            这个博客记录我在 AI Agent 工程方向的实践与思考。
            聚焦 Python Agent、工具调用、RAG、评测与工程落地，
            把学习过程中的方法总结、项目拆解和问题复盘沉淀下来。
          </p>
          <p>
            目前已发布 <strong className="text-zinc-200">{postCount} 篇文章</strong>，
            持续更新中。
          </p>
        </div>
      </section>

      <div className="h-px bg-zinc-800/60" />

      <section className="space-y-4">
        <h2 className="text-sm font-medium text-white">关于这个站点</h2>
        <ul className="space-y-2 text-sm text-zinc-500">
          <li>基于 Next.js 构建，部署于 GitHub Pages</li>
          <li>所有文章以 Markdown 格式编写</li>
          <li>源码托管在 GitHub，自动构建与发布</li>
        </ul>
      </section>

      <div className="h-px bg-zinc-800/60" />

      <section className="space-y-4">
        <h2 className="text-sm font-medium text-white">联系</h2>
        <p className="text-sm text-zinc-500">
          如有问题或建议，欢迎通过 GitHub Issues 交流。
        </p>
        <Link
          href="/#posts"
          className="inline-flex items-center text-sm text-zinc-400 transition-colors hover:text-white"
        >
          ← 返回文章列表
        </Link>
      </section>
    </div>
  );
}
