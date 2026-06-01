import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, BriefcaseBusiness, Building2, GraduationCap, Landmark, Search } from "lucide-react";
import { PlatformContentCard } from "@/components/platform/content-card";
import { CategoryCard } from "@/components/article/category-card";
import { SearchForm } from "@/components/search-form";
import { categories, platformSections } from "@/lib/site";
import { getAllPosts, getFeaturedPosts, getPostsBySection, getTrendingPosts } from "@/lib/content";
import { defaultMetadata } from "@/lib/seo";

export const revalidate = 3600;
export const metadata: Metadata = defaultMetadata({ alternates: { canonical: "/" } });

const sectionIcons = [BriefcaseBusiness, GraduationCap, Landmark, Building2, Search];

export default function HomePage() {
  const posts = getAllPosts();
  const featured = getFeaturedPosts(3);
  const trending = getTrendingPosts(5);
  const jobs = getPostsBySection("jobs").slice(0, 3);
  const services = getPostsBySection("e-services").slice(0, 3);

  return (
    <div>
      <section className="border-b border-line bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold text-brand">وظائف • تعليم • خدمات إلكترونية • شركات</p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-tight tracking-normal sm:text-6xl">
              منصة ليبيا للوظائف والتعليم والخدمات الإلكترونية
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted dark:text-slate-300">
              دليل عملي منظم يساعد المستخدم الليبي على الوصول إلى فرص العمل، منظومات الجامعات، الخدمات الرسمية، الشركات، والشروحات الموثوقة بسرعة ووضوح.
            </p>
            <div className="mt-8 max-w-2xl">
              <SearchForm />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/jobs" className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand dark:bg-white dark:text-ink">
                تصفح الوظائف
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link href="/e-services" className="inline-flex items-center rounded-md border border-line px-5 py-3 text-sm font-semibold transition hover:border-brand dark:border-slate-700">
                الخدمات الإلكترونية
              </Link>
            </div>
          </div>
          <div className="grid content-start gap-4">
            {platformSections.map((section, index) => {
              const Icon = sectionIcons[index];
              const count = getPostsBySection(section.slug).length;
              return (
                <Link key={section.slug} href={section.href} className="rounded-lg border border-line bg-slate-50 p-5 transition hover:border-brand dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-xl font-semibold">{section.name}</h2>
                      <p className="mt-2 text-sm leading-6 text-muted dark:text-slate-300">{section.description}</p>
                    </div>
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-brand dark:bg-slate-800">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <p className="mt-4 text-xs font-semibold text-brand">{count} عنصر</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-brand">مختارات المنصة</p>
            <h2 className="mt-2 font-display text-3xl font-semibold">أهم الأدلة والخدمات الآن</h2>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-brand">عرض الكل</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((post, index) => <PlatformContentCard key={post.slug} post={post} priority={index === 0} />)}
        </div>
      </section>

      <section className="border-y border-line bg-slate-50 py-12 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-3xl font-semibold">أحدث الوظائف</h2>
              <Link href="/jobs" className="text-sm font-semibold text-brand">المزيد</Link>
            </div>
            <div className="grid gap-4">{jobs.map((post) => <PlatformContentCard key={post.slug} post={post} />)}</div>
          </div>
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-3xl font-semibold">خدمات ومنظومات</h2>
              <Link href="/e-services" className="text-sm font-semibold text-brand">المزيد</Link>
            </div>
            <div className="grid gap-4">{services.map((post) => <PlatformContentCard key={post.slug} post={post} />)}</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold text-brand">الأكثر زيارة</p>
          <h2 className="mt-2 font-display text-3xl font-semibold">روابط داخلية سريعة</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-5">
          {trending.map((post, index) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="rounded-lg border border-line bg-white p-4 transition hover:border-brand dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs font-semibold text-brand">0{index + 1}</span>
              <h3 className="mt-2 text-sm font-medium leading-7">{post.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-slate-50 py-12 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-sm font-semibold text-brand">تصنيفات المنصة</p>
            <h2 className="mt-2 font-display text-3xl font-semibold">هيكل محتوى واضح وقابل للنمو</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => <CategoryCard key={category.slug} {...category} count={posts.filter((post) => post.category === category.slug).length} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
