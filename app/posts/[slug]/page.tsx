import { getPostData, getAllPostSlugs } from '../../../lib/posts';
import Link from 'next/link';

export const dynamic = "force-static";

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export default async function Post({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);

  return (
    <article className="mx-auto max-w-none">
      <div className="mb-10 border-b border-gray-200 pb-8">
        <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium text-sm no-underline mb-8 inline-flex items-center transition-colors">
          ← 返回首页
        </Link>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">{postData.title}</h1>
        <div className="flex flex-wrap items-center gap-4">
          <time className="text-gray-500 font-medium">{postData.date}</time>
          {postData.category && (
             <span className="text-sm text-blue-600 font-bold px-3 py-1 bg-blue-50 border border-blue-100 rounded-full shadow-sm">{postData.category}</span>
          )}
        </div>
      </div>
      <div 
        className="prose prose-lg prose-blue max-w-none prose-h2:mt-10 prose-h2:mb-4 prose-h2:font-bold prose-h3:mt-8 prose-h3:font-semibold prose-a:text-blue-600 prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }} 
      />
    </article>
  );
}