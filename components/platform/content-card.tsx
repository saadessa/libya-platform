import Image from "next/image";
import Link from "next/link";
import { BriefcaseBusiness, Building2, CalendarDays, GraduationCap, Landmark, MapPin } from "lucide-react";
import type { Post } from "@/types/content";
import { categories } from "@/lib/site";
import { formatDate } from "@/lib/utils";

function categoryName(slug: string) {
  return categories.find((category) => category.slug === slug)?.name ?? slug;
}

const typeIcon = {
  article: Landmark,
  job: BriefcaseBusiness,
  university: GraduationCap,
  service: Landmark,
  company: Building2
} as const;

export function PlatformContentCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  const Icon = typeIcon[post.contentType];
  const meta =
    post.contentType === "job"
      ? [post.job?.employer, post.job?.city, post.job?.deadline ? `آخر موعد: ${formatDate(post.job.deadline)}` : null]
      : post.contentType === "service"
        ? [post.service?.officialUrl ? "رابط رسمي متاح" : null, "خطوات الاستخدام والمشاكل الشائعة"]
        : post.contentType === "university"
          ? [post.university?.universityName, post.university?.colleges?.length ? `${post.university.colleges.length} كليات` : null]
          : post.contentType === "company"
            ? [post.company?.companyName, post.company?.location]
            : [formatDate(post.publishedAt), post.readingTime];

  return (
    <article className="group overflow-hidden rounded-lg border border-line bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-brand hover:shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-900">
          <Image src={post.image} alt={post.title} fill priority={priority} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <Link href={`/category/${post.category}`} className="text-xs font-semibold text-brand">
            {categoryName(post.category)}
          </Link>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-slate-100 text-ink dark:bg-slate-800 dark:text-white">
            <Icon className="h-4 w-4" />
          </span>
        </div>
        <h2 className="mt-3 line-clamp-2 font-display text-xl font-semibold leading-8">
          <Link href={`/posts/${post.slug}`} className="hover:text-brand">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted dark:text-slate-300">{post.description}</p>
        <div className="mt-5 grid gap-2 text-xs text-muted dark:text-slate-400">
          {meta.filter(Boolean).slice(0, 3).map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-brand" />
              {item}
            </span>
          ))}
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-3.5 w-3.5 text-brand" />
            نُشر {formatDate(post.publishedAt)}
          </span>
        </div>
      </div>
    </article>
  );
}
