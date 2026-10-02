import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";
import type { ContentType, Post, TocItem } from "@/types/content";
import { authors, categories, platformSections } from "@/lib/site";
import { slugify, unique } from "@/lib/utils";

const postsDirectory = path.join(process.cwd(), "content", "posts");

const linkSchema = z.object({
  label: z.string(),
  url: z.string()
});

const faqSchema = z.object({
  question: z.string().min(4),
  answer: z.string().min(8)
});

const postSchema = z.object({
  title: z.string().min(8),
  description: z.string().min(30),
  category: z.string(),
  contentType: z.enum(["article", "job", "university", "service", "company"]).default("article"),
  tags: z.array(z.string()).min(1),
  author: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string(),
  image: z.string(),
  featured: z.boolean().default(false),
  trending: z.boolean().default(false),
  draft: z.boolean().default(false),
  faqs: z.array(faqSchema).default([]),
  job: z
    .object({
      employer: z.string().optional(),
      city: z.string().optional(),
      salary: z.string().optional(),
      deadline: z.string().optional(),
      applicationMethod: z.string().optional()
    })
    .optional(),
  university: z
    .object({
      universityName: z.string().optional(),
      colleges: z.array(z.string()).default([]),
      systems: z.array(z.string()).default([]),
      registrationLinks: z.array(linkSchema).default([])
    })
    .optional(),
  service: z
    .object({
      serviceName: z.string().optional(),
      officialUrl: z.string().optional(),
      usageSteps: z.array(z.string()).default([]),
      commonProblems: z.array(z.string()).default([])
    })
    .optional(),
  company: z
    .object({
      companyName: z.string().optional(),
      location: z.string().optional(),
      availableJobs: z.array(z.string()).default([]),
      contactLinks: z.array(linkSchema).default([])
    })
    .optional()
});

function extractToc(content: string): TocItem[] {
  const headingRegex = /^(##|###)\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].replace(/[#`*]/g, "").trim();
    toc.push({ id: slugify(text), text, depth: match[1].length });
  }

  return toc;
}

export function inferContentType(category: string): ContentType {
  if (category === "jobs") return "job";
  if (category === "universities-and-colleges") return "university";
  if (category === "companies") return "company";
  if (["education-services", "government-services", "banking-services", "digital-platforms"].includes(category)) {
    return "service";
  }
  return "article";
}

export function getAllPosts(includeDrafts = false): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const source = fs.readFileSync(path.join(postsDirectory, file), "utf8");
      const { data, content } = matter(source);
      const parsed = postSchema.parse(data);
      const slug = file.replace(/\.mdx$/, "");
      const contentType = parsed.contentType || inferContentType(parsed.category);

      return {
        slug,
        ...parsed,
        contentType,
        content,
        readingTime: readingTime(content).text,
        toc: extractToc(content)
      };
    })
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function getPostBySlug(slug: string) {
  return getAllPosts(true).find((post) => post.slug === slug && !post.draft);
}

export function getFeaturedPosts(limit = 6) {
  return getAllPosts().filter((post) => post.featured).slice(0, limit);
}

export function getTrendingPosts(limit = 6) {
  return getAllPosts().filter((post) => post.trending).slice(0, limit);
}

export function getRelatedPosts(post: Post, limit = 4) {
  return getAllPosts()
    .filter((item) => item.slug !== post.slug)
    .map((item) => ({
      post: item,
      score:
        (item.contentType === post.contentType ? 4 : 0) +
        (item.category === post.category ? 3 : 0) +
        item.tags.filter((tag) => post.tags.includes(tag)).length
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

export function getPostsByCategory(slug: string) {
  return getAllPosts().filter((post) => slugify(post.category) === slug || post.category === slug);
}

export function getPostsByContentType(type: ContentType) {
  return getAllPosts().filter((post) => post.contentType === type);
}

export function getPostsBySection(sectionSlug: string) {
  const section = platformSections.find((item) => item.slug === sectionSlug);
  if (!section) return [];
  return getAllPosts().filter((post) => (section.categories as readonly string[]).includes(post.category));
}

export function getPostsByTag(slug: string) {
  return getAllPosts().filter((post) => post.tags.some((tag) => slugify(tag) === slug));
}

export function getPostsByAuthor(slug: string) {
  return getAllPosts().filter((post) => slugify(post.author) === slug);
}

export function getAllTags() {
  return unique(getAllPosts().flatMap((post) => post.tags)).sort((a, b) => a.localeCompare(b, "ar"));
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getAuthor(slug: string) {
  return authors.find((author) => author.slug === slug) ?? authors[0];
}

export const POSTS_PER_PAGE = 9;
