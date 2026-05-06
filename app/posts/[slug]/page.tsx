import { getPostData, getAllPostSlugs } from '../../../lib/posts';
import Link from 'next/link';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export default async function Post({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);

  return (
    <article className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Link
          href="/#posts"
          className="inline-flex items-center text-xs text-zinc-600 transition-colors hover:text-zinc-400"
        >
          ← 返回文章列表
        </Link>
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-600">
          <time className="tabular-nums">{postData.date}</time>
          {postData.category && (
            <span className="text-zinc-700">
              {postData.category}
            </span>
          )}
          {postData.series && (
            <span className="text-zinc-700">
              {postData.series}
            </span>
          )}
        </div>
        <h1 className="text-2xl font-display font-bold tracking-tight text-white sm:text-3xl sm:leading-tight">
          {postData.title}
        </h1>
        {postData.tags && postData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {postData.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-zinc-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className="article-body"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }}
      />
    </article>
  );
}
