import { getPostData, getAllPostSlugs } from '../../../lib/posts';
import Link from 'next/link';

export const dynamic = "force-static";

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export default async function Post({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);

  return (
    <article className="mx-auto w-full max-w-4xl space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8 sm:py-10">
        <Link
          href="/#posts"
          className="inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
        >
          ← 返回文章列表
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <time className="font-medium">{postData.date}</time>
          {postData.category && (
            <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {postData.category}
            </span>
          )}
          {postData.series && (
            <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              {postData.series}
            </span>
          )}
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl sm:leading-tight">
          {postData.title}
        </h1>
        {postData.tags && postData.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {postData.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-10 sm:py-10">
        <div
          className="article-prose"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }}
        />
      </div>
    </article>
  );
}
