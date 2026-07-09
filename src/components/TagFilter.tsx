"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function TagFilter({ tags }: { tags: string[] }) {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");

  return (
    <div className="flex flex-wrap gap-2" aria-label="Filter posts by tag">
      <Link
        href="/blog"
        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
          !activeTag
            ? "bg-ink text-white"
            : "border border-black/10 bg-white text-muted hover:border-black/25 hover:text-text"
        }`}
      >
        all
      </Link>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/blog?tag=${encodeURIComponent(tag)}`}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            activeTag === tag
              ? "bg-ink text-white"
              : "border border-black/10 bg-white text-muted hover:border-black/25 hover:text-text"
          }`}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
