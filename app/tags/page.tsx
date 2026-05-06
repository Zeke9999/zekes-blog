import { getSortedPostsData } from '../../lib/posts';
import Link from 'next/link';

export default function TagsPage() {
  const posts = getSortedPostsData();

  // Build tag → posts map
  const tagMap = new Map<string, typeof posts>();
  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        if (!tagMap.has(tag)) tagMap.set(tag, []);
        tagMap.get(tag)!.push(post);
      });
    }
  });

  // Build category → posts map
  const categoryMap = new Map<string, typeof posts>();
  posts.forEach((post) => {
    if (post.category) {
      if (!categoryMap.has(post.category)) categoryMap.set(post.category, []);
      categoryMap.get(post.category)!.push(post);
    }
  });

  const sortedTags = Array.from(tagMap.entries()).sort((a, b) => b[1].length - a[1].length);
  const sortedCategories = Array.from(categoryMap.entries()).sort((a, b) => b[1].length - a[1].length);

  return (
    <div className="space-y-16">
      {/* Categories */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium uppercase tracking-widest text-zinc-600">
            分类
          </span>
          <span className="h-px flex-1 bg-zinc-800/60" />
        </div>
        {sortedCategories.length === 0 && (
          <p className="text-sm text-zinc-600">暂无分类。</p>
        )}
        <div className="space-y-6">
          {sortedCategories.map(([category, catPosts]) => (
            <div key={category}>
              <h2 className="text-sm font-medium text-white mb-3">
                {category}
                <span className="ml-2 text-xs text-zinc-600">{catPosts.length} 篇</span>
              </h2>
              <ul className="space-y-1">
                {catPosts.map(({ slug, title, date }) => (
                  <li key={slug}>
                    <Link
                      href={`/posts/${slug}`}
                      className="group flex items-baseline gap-3 py-1.5 text-sm transition-opacity hover:opacity-80"
                    >
                      <time className="shrink-0 text-xs tabular-nums text-zinc-600 w-12">
                        {date}
                      </time>
                      <span className="text-zinc-400 group-hover:text-white transition-colors">
                        {title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Tags */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium uppercase tracking-widest text-zinc-600">
            标签
          </span>
          <span className="h-px flex-1 bg-zinc-800/60" />
        </div>
        {sortedTags.length === 0 && (
          <p className="text-sm text-zinc-600">暂无标签。</p>
        )}
        <div className="flex flex-wrap gap-2">
          {sortedTags.map(([tag, tagPosts]) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-xs text-zinc-500"
            >
              #{tag}
              <span className="text-zinc-700">{tagPosts.length}</span>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
