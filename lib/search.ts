import type { ContentType, Post } from "@/types/content";
import { categories } from "@/lib/site";

export const contentTypeLabels: Record<ContentType | "all", string> = {
  all: "الكل",
  article: "أدلة وشروحات",
  job: "وظائف",
  university: "جامعات",
  service: "خدمات إلكترونية",
  company: "شركات"
};

export const searchableTypes: (ContentType | "all")[] = ["all", "job", "university", "service", "company", "article"];

export function searchPosts(
  posts: Post[],
  filters: { query?: string; type?: string; category?: string }
) {
  const query = (filters.query || "").trim().toLowerCase();
  const type = filters.type || "all";
  const category = filters.category || "all";

  return posts.filter((post) => {
    const matchesType = type === "all" || post.contentType === type;
    const matchesCategory = category === "all" || post.category === category;
    const haystack = [
      post.title,
      post.description,
      post.category,
      post.contentType,
      post.author,
      post.job?.employer,
      post.job?.city,
      post.university?.universityName,
      post.service?.serviceName,
      post.company?.companyName,
      ...post.tags
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const matchesQuery = !query || haystack.includes(query);

    return matchesType && matchesCategory && matchesQuery;
  });
}

export function getSearchFacets(posts: Post[]) {
  return {
    types: searchableTypes.map((type) => ({
      type,
      label: contentTypeLabels[type],
      count: type === "all" ? posts.length : posts.filter((post) => post.contentType === type).length
    })),
    categories: [
      { slug: "all", name: "كل التصنيفات", count: posts.length },
      ...categories.map((category) => ({
        slug: category.slug,
        name: category.name,
        count: posts.filter((post) => post.category === category.slug).length
      }))
    ]
  };
}
