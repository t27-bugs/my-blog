import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Personal notes from t27 about learning bug bounty hunting and web security"
};

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <div className="pb-20">
      <section className="max-w-3xl py-16 sm:py-24">
        <p className="mb-5 text-sm font-semibold text-muted">Learning in public</p>
        <h1 className="text-5xl font-semibold leading-tight text-text sm:text-6xl">
          Bug bounty notes, written clearly.
        </h1>
        <p className="mt-7 text-xl leading-9 text-muted">
          A personal blog where I explain web security concepts, real lessons, and open questions.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-black"
          >
            Read posts
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-black/30"
          >
            About t27
          </Link>
        </div>
      </section>

      <section className="border-y border-black/10 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-text">Explain simply</p>
            <p className="mt-2 text-sm leading-6 text-muted">Write web security ideas in clear English.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-text">Track lessons</p>
            <p className="mt-2 text-sm leading-6 text-muted">Document mistakes, takeaways, and questions.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-text">Build in public</p>
            <p className="mt-2 text-sm leading-6 text-muted">Keep a simple portfolio of real learning.</p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-muted">Latest</p>
            <h2 className="mt-2 text-3xl font-semibold text-text">Recent posts</h2>
          </div>
          <Link
            href="/blog"
            className="rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-black/30"
          >
            View all
          </Link>
        </div>
        <div>
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
