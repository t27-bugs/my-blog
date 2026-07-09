import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "t27 - Bug Bounty Learning Blog",
    template: "%s | t27"
  },
  description:
    "A personal learning blog about bug bounty hunting, web security, and improving English writing through clear explanations.",
  openGraph: {
    title: "t27 - Bug Bounty Learning Blog",
    description:
      "Notes and explanations about web security, bug bounty methodology, and learning in public.",
    type: "website",
    images: ["/security-notes-hero.png"]
  }
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <div className="page-shell mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 sm:px-6">
          <header className="sticky top-0 z-20 -mx-5 border-b border-black/10 bg-white/90 px-5 py-4 backdrop-blur sm:-mx-6 sm:px-6">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
              <Link href="/" className="group flex items-center gap-3">
                <span className="font-mono text-lg font-semibold text-ink">
                  t27
                </span>
                <span className="hidden border-l border-black/15 pl-3 text-sm font-medium text-muted sm:block">
                  Security Notes
                </span>
              </Link>
              <nav aria-label="Main navigation" className="flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-3 py-1.5 text-xs font-medium text-muted transition hover:text-text sm:px-4 sm:text-sm"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main className="relative z-10 flex-1">{children}</main>
          <footer className="border-t border-black/10 py-8 text-sm text-muted">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p>Writing to learn web security clearly.</p>
              <p className="font-mono">t27</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
