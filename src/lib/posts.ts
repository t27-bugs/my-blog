import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const postsDirectory = path.join(process.cwd(), "src", "content", "posts");

export type PostMeta = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
  slug: string;
};

export type Post = PostMeta & {
  contentHtml: string;
};

type FrontMatter = {
  title: string;
  date: string;
  description: string;
  tags: string[];
};

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
}

function getSlug(fileName: string) {
  return fileName
    .replace(/\.mdx?$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getPostFileNames() {
  return fs.readdirSync(postsDirectory).filter((fileName) => /\.mdx?$/.test(fileName));
}

function getFileNameBySlug(slug: string) {
  return getPostFileNames().find((fileName) => getSlug(fileName) === slug);
}

function parsePost(fileName: string): PostMeta & { content: string } {
  const slug = getSlug(fileName);
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontMatter = data as FrontMatter;

  return {
    slug,
    title: frontMatter.title,
    date: frontMatter.date,
    description: frontMatter.description,
    tags: frontMatter.tags,
    readingTime: getReadingTime(content),
    content
  };
}

export function getAllPosts(): PostMeta[] {
  return getPostFileNames()
    .map(parsePost)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ content, ...meta }) => meta);
}

export function getAllTags() {
  return Array.from(new Set(getAllPosts().flatMap((post) => post.tags))).sort();
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fileName = getFileNameBySlug(slug);

  if (!fileName) {
    throw new Error(`Post not found: ${slug}`);
  }

  const post = parsePost(fileName);
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: "github-light",
      keepBackground: false
    })
    .use(rehypeStringify)
    .process(post.content);

  return {
    ...post,
    contentHtml: processedContent.toString()
  };
}
