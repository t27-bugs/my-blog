import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group border-b border-black/10 py-7">
      <div className="flex h-full flex-col">
        <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
          <time dateTime={post.date}>
            {new Intl.DateTimeFormat("en", {
              month: "short",
              day: "numeric",
              year: "numeric"
            }).format(new Date(post.date))}
          </time>
          <span className="text-line" aria-hidden="true">/</span>
          <span>{post.readingTime}</span>
        </div>
        <h2 className="text-2xl font-semibold leading-tight text-text">
          <Link href={`/blog/${post.slug}`} className="transition group-hover:text-black">
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 leading-7 text-muted">{post.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-muted transition hover:border-black/25 hover:text-text"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
