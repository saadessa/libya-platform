import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import type { ContentType } from "@/types/content";
import { contentTypeLabels } from "@/lib/search";
import { cn } from "@/lib/utils";

type TypeFacet = {
  type: ContentType | "all";
  label: string;
  count: number;
};

type CategoryFacet = {
  slug: string;
  name: string;
  count: number;
};

function hrefFor(params: { q?: string; type?: string; category?: string }) {
  const searchParams = new URLSearchParams();
  if (params.q) searchParams.set("q", params.q);
  if (params.type && params.type !== "all") searchParams.set("type", params.type);
  if (params.category && params.category !== "all") searchParams.set("category", params.category);
  const qs = searchParams.toString();
  return qs ? `/search?${qs}` : "/search";
}

export function SearchFilters({
  q,
  type,
  category,
  typeFacets,
  categoryFacets
}: {
  q?: string;
  type: string;
  category: string;
  typeFacets: TypeFacet[];
  categoryFacets: CategoryFacet[];
}) {
  return (
    <section className="mt-6 rounded-lg border border-line bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <SlidersHorizontal className="h-4 w-4 text-brand" />
        تصفية النتائج
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {typeFacets.map((facet) => (
          <Link
            key={facet.type}
            href={hrefFor({ q, type: facet.type, category })}
            className={cn(
              "inline-flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-xs font-semibold transition hover:border-brand dark:border-slate-800 dark:bg-slate-900",
              type === facet.type ? "border-brand text-brand" : "text-muted dark:text-slate-300"
            )}
          >
            {contentTypeLabels[facet.type]}
            <span className="text-[11px] text-muted">{facet.count}</span>
          </Link>
        ))}
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {categoryFacets.map((facet) => (
          <Link
            key={facet.slug}
            href={hrefFor({ q, type, category: facet.slug })}
            className={cn(
              "shrink-0 rounded-md border border-line bg-white px-3 py-2 text-xs font-medium transition hover:border-brand dark:border-slate-800 dark:bg-slate-900",
              category === facet.slug ? "border-brand text-brand" : "text-muted dark:text-slate-300"
            )}
          >
            {facet.name} ({facet.count})
          </Link>
        ))}
      </div>
    </section>
  );
}
