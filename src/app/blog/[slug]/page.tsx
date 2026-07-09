import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getAllPosts().find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Post not found"
    };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const postExists = getAllPosts().some((post) => post.slug === slug);

  if (!postExists) {
    notFound();
  }

  const post = await getPostBySlug(slug);

  return (
    <article className="py-12 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Link href="/blog" className="text-sm font-semibold text-muted transition hover:text-accent">
          Back to blog
        </Link>
        <header className="mt-8">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm font-medium text-muted">
            <time dateTime={post.date}>
              {new Intl.DateTimeFormat("en", {
                month: "long",
                day: "numeric",
                year: "numeric"
              }).format(new Date(post.date))}
            </time>
            <span className="text-line" aria-hidden="true">/</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="text-4xl font-semibold leading-tight text-text sm:text-6xl">{post.title}</h1>
          <p className="mt-7 text-xl leading-9 text-muted">{post.description}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-muted transition hover:border-black/25 hover:text-text"
              >
                {tag}
              </Link>
            ))}
          </div>
        </header>
        <div
          className="prose prose-slate mt-12 max-w-none border-t border-black/10 pt-10 prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:text-text prose-p:leading-8 prose-a:font-medium prose-a:text-black prose-code:rounded-md prose-code:bg-white prose-code:px-1.5 prose-code:py-0.5 prose-code:text-ink prose-pre:border prose-pre:border-line prose-pre:bg-white prose-blockquote:border-l-black prose-blockquote:text-muted"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
        </div>
    </article>
  );
}
