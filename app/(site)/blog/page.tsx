import type { Metadata } from "next";
import { PlatformContentCard } from "@/components/platform/content-card";
import { CategoryCard } from "@/components/article/category-card";
import { getAllPosts, getPostsBySection } from "@/lib/content";
import { categories, platformSections } from "@/lib/site";
import { defaultMetadata } from "@/lib/seo";

export const revalidate = 3600;

const section = platformSections.find((item) => item.slug === "blog")!;

export const metadata: Metadata = defaultMetadata({
  title: "المدونة والأدلة",
  description: "شروحات وأدلة عملية تشرح الوظائف والتعليم والخدمات الإلكترونية وتحافظ على المحتوى التقني المفيد في قسم منظم.",
  alternates: { canonical: section.href },
  openGraph: { title: "المدونة والأدلة", description: "شروحات وأدلة عملية تشرح الوظائف والتعليم والخدمات الإلكترونية وتحافظ على المحتوى التقني المفيد في قسم منظم.", url: section.href }
});

export default function SectionPage() {
  const posts = getPostsBySection("blog");
  const allPosts = getAllPosts();
  const sectionCategories = categories.filter((category) => (section.categories as readonly string[]).includes(category.slug));

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold text-brand">منصة ليبيا</p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight">المدونة والأدلة</h1>
        <p className="mt-4 text-lg leading-8 text-muted dark:text-slate-300">شروحات وأدلة عملية تشرح الوظائف والتعليم والخدمات الإلكترونية وتحافظ على المحتوى التقني المفيد في قسم منظم.</p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sectionCategories.map((category) => (
          <CategoryCard key={category.slug} {...category} count={allPosts.filter((post) => post.category === category.slug).length} />
        ))}
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => <PlatformContentCard key={post.slug} post={post} priority={index === 0} />)}
      </div>
      {!posts.length ? <p className="mt-10 rounded-lg border border-line p-6 text-muted dark:border-slate-800">لا توجد عناصر منشورة في هذا القسم بعد.</p> : null}
    </section>
  );
}
