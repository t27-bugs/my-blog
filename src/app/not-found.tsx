import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20">
      <h1 className="text-3xl font-semibold text-text">Page not found</h1>
      <p className="mt-3 text-muted">This page does not exist or the post slug changed.</p>
      <Link href="/blog" className="mt-6 inline-block text-sm text-accent">
        Go back to the blog
      </Link>
    </div>
  );
}
