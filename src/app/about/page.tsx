import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About t27, a learner writing about ethical hacking, web security, and bug bounty hunting."
};

const topics = [
  "web security",
  "IDOR",
  "XSS",
  "CORS",
  "APIs",
  "authentication",
  "AI security",
  "bug bounty methodology"
];

export default function AboutPage() {
  return (
    <div className="py-14 sm:py-20">
      <section className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold text-muted">About</p>
          <h1 className="text-5xl font-semibold leading-tight text-text sm:text-6xl">
            A public learning notebook.
          </h1>
          <p className="mt-7 text-xl leading-9 text-muted">
            I&apos;m learning ethical hacking, web security, and bug bounty hunting. I write to
            understand things better.
          </p>
          <p className="mt-5 leading-8 text-muted">
            The goal is not to pretend I know everything. The goal is to keep studying, explain what
            I learn in simple English, and build a public portfolio that shows progress over time.
          </p>
        </div>
        <aside className="border-l border-black/15 pl-6">
          <p className="text-sm font-semibold text-muted">Current focus</p>
          <p className="mt-4 text-2xl font-semibold leading-tight text-text">
            Web security basics, one concept at a time.
          </p>
        </aside>
      </section>

      <section className="mt-16 border-t border-black/10 pt-8">
        <h2 className="text-3xl font-semibold text-text">Topics I am studying</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {topics.map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-muted"
            >
              {topic}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
