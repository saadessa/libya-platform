import type { Metadata } from "next";
import { PlatformContentCard } from "@/components/platform/content-card";
import { Breadcrumbs } from "@/components/article/breadcrumbs";
import { SearchFilters } from "@/components/search-filters";
import { SearchForm } from "@/components/search-form";
import { getAllPosts } from "@/lib/content";
import { getSearchFacets, searchPosts } from "@/lib/search";
import { defaultMetadata } from "@/lib/seo";

export const metadata: Metadata = defaultMetadata({
  title: "البحث",
  description: "ابحث وفلتر محتوى منصة ليبيا حسب الوظائف والجامعات والخدمات الإلكترونية والشركات والشروحات.",
  alternates: { canonical: "/search" }
});

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; type?: string; category?: string }>;
}) {
  const params = await searchParams;
  const query = (params.q || "").trim();
  const type = params.type || "all";
  const category = params.category || "all";
  const posts = getAllPosts();
  const facets = getSearchFacets(posts);
  const results = searchPosts(posts, { query, type, category }).slice(0, 60);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "البحث", href: "/search" }]} />
      <h1 className="font-display text-4xl font-semibold">البحث في منصة ليبيا</h1>
      <p className="mt-3 max-w-2xl text-muted dark:text-slate-300">
        ابحث عن وظيفة، جامعة، خدمة حكومية أو مصرفية، شركة، أو شرح عملي، ثم صفّ النتائج حسب نوع المحتوى أو التصنيف.
      </p>
      <div className="mt-8">
        <SearchForm defaultValue={query} />
        <SearchFilters q={query} type={type} category={category} typeFacets={facets.types} categoryFacets={facets.categories} />
      </div>
      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-sm text-muted dark:text-slate-300">
          {results.length} نتيجة مطابقة
        </p>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map((post, index) => (
          <PlatformContentCard key={post.slug} post={post} priority={index === 0} />
        ))}
      </div>
      {!results.length ? (
        <p className="mt-8 rounded-lg border border-line p-6 text-muted dark:border-slate-800">
          لا توجد نتائج مطابقة. جرّب إزالة الفلاتر أو استخدام كلمات مثل: جامعة، حجز، وظيفة، مصرف.
        </p>
      ) : null}
    </section>
  );
}
