# t27 Bug Bounty Learning Blog

A minimal personal blog for learning bug bounty hunting, web security, and clearer English writing. It uses Next.js, TypeScript, Tailwind CSS, Markdown posts, syntax highlighting, SEO metadata, and tag filtering.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Add a new blog post

Create a new `.md` file in:

```text
src/content/posts
```

Use a lowercase slug for the filename, for example:

```text
my-first-recon-notes.md
```

Start the file with this front matter:

```md
---
title: "My First Recon Notes"
date: "2026-07-03"
description: "A short description that appears on the blog list and in SEO metadata."
tags: ["recon", "bug-bounty", "methodology"]
---
```

Then write the post in Markdown. A useful structure is:

```md
## Short intro

## Main explanation

## Example or small case study

## Common mistakes

## What I learned

## Questions I still have
```

The site automatically calculates reading time, lists the post on the home and blog pages, creates the post page at `/blog/your-file-name`, and adds the tags to the filter system.

## Project structure

```text
src/app                 Next.js pages and layouts
src/components          Shared UI components
src/content/posts       Markdown blog posts
src/lib/posts.ts        Markdown loading, metadata, and syntax highlighting
```

## Notes

- Keep claims honest and learning-focused.
- Use code blocks with a language name for syntax highlighting, like ` ```ts ` or ` ```http `.
- Add a `What I learned` section to every post so the blog stays useful as a learning journal.
