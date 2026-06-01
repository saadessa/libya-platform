import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/content";
import { categories, platformSections, siteConfig } from "@/lib/site";
import { slugify } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/jobs", "/education", "/e-services", "/companies", "/blog", "/about", "/contact", "/privacy-policy", "/terms-and-conditions", "/disclaimer", "/editorial-policy", "/cookie-policy", "/dmca-policy", "/search"];
  const posts = getAllPosts().map((post) => ({
    url: siteConfig.url + "/posts/" + post.slug,
    lastModified: post.updatedAt,
    changeFrequency: post.contentType === "job" ? "daily" as const : "weekly" as const,
    priority: post.contentType === "job" || post.contentType === "service" ? 0.9 : 0.8
  }));
  const categoryRoutes = categories.map((category) => ({
    url: siteConfig.url + "/category/" + category.slug,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8
  }));
  const sectionRoutes = platformSections.map((section) => ({
    url: siteConfig.url + section.href,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: section.slug === "blog" ? 0.7 : 0.9
  }));
  const tagRoutes = getAllTags().map((tag) => ({
    url: siteConfig.url + "/tag/" + slugify(tag),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: siteConfig.url + route,
      lastModified: new Date(),
      changeFrequency: route === "" ? "daily" as const : "weekly" as const,
      priority: route === "" ? 1 : 0.7
    })),
    ...sectionRoutes,
    ...posts,
    ...categoryRoutes,
    ...tagRoutes
  ];
}
