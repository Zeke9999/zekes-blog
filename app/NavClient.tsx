'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const links = [
  { href: '/', label: '首页' },
  { href: '/#posts', label: '文章' },
  { href: '/tags', label: '标签' },
  { href: '/about', label: '关于' },
];

export default function NavClient() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-5 text-sm">
      {links.map(({ href, label }) => {
        const isActive =
          href === '/'
            ? pathname === '/'
            : href === '/#posts'
              ? pathname.startsWith('/posts')
              : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={`transition-colors ${
              isActive
                ? 'text-white font-medium'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
