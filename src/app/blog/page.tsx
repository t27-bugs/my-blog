import type { Metadata } from "next";
import { Suspense } from "react";
import { PostCard } from "@/components/PostCard";
import { TagFilter } from "@/components/TagFilter";
import { getAllPosts, getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "All bug bounty learning notes by t27, with posts about web security, XSS, IDOR, CORS, APIs, and methodology."
};

type BlogPageProps = {
  searchParams?: Promise<{
    tag?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const activeTag = params?.tag;
  const posts = getAllPosts();
  const tags = getAllTags();
  const filteredPosts = activeTag ? posts.filter((post) => post.tags.includes(activeTag)) : posts;

  return (
    <div className="py-14 sm:py-20">
      <section className="max-w-3xl">
        <p className="mb-4 text-sm font-semibold text-muted">All posts</p>
        <h1 className="text-5xl font-semibold text-text sm:text-6xl">Blog</h1>
        <p className="mt-6 text-xl leading-9 text-muted">
          Notes about bug bounty concepts, web security topics, write-ups, lessons learned, and
          questions I am still working through.
        </p>
      </section>

      <section className="mt-10 border-y border-black/10 py-4">
        <Suspense fallback={<div className="text-sm text-muted">Loading filters...</div>}>
          <TagFilter tags={tags} />
        </Suspense>
      </section>

      <section className="mt-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <p className="py-8 text-muted">No posts found for this tag.</p>
        )}
      </section>
    </div>
  );
}
