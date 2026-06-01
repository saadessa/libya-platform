import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { getAllPosts } from "@/lib/content";
import { contentTypeLabels } from "@/lib/search";
import { categories, platformSections } from "@/lib/site";
import { defaultMetadata } from "@/lib/seo";

export const metadata: Metadata = defaultMetadata({
  title: "خريطة المحتوى",
  description: "لوحة تحريرية مختصرة لتوزيع محتوى منصة ليبيا حسب الأقسام والتصنيفات وأنواع الصفحات.",
  alternates: { canonical: "/content-audit" },
  robots: { index: false, follow: true }
});

export default function ContentAuditPage() {
  const posts = getAllPosts();
  const typeRows = Object.entries(contentTypeLabels)
    .filter(([type]) => type !== "all")
    .map(([type, label]) => ({
      type,
      label,
      count: posts.filter((post) => post.contentType === type).length
    }));

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
          <ClipboardList className="h-4 w-4" />
          حوكمة المحتوى
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold">خريطة المحتوى والتحرير</h1>
        <p className="mt-4 text-lg leading-8 text-muted dark:text-slate-300">
          صفحة مساعدة لصاحب الموقع لمعرفة أين يتم نشر المحتوى الحالي وما الأقسام التي تحتاج تغذية لاحقة، بدون حذف المحتوى التقني المفيد.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-5">
        {typeRows.map((row) => (
          <div key={row.type} className="rounded-lg border border-line bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-muted dark:text-slate-300">{row.label}</p>
            <p className="mt-2 font-display text-3xl font-semibold">{row.count}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-line bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-display text-2xl font-semibold">الأقسام الرئيسية</h2>
          <div className="mt-5 grid gap-3">
            {platformSections.map((section) => {
              const count = posts.filter((post) => (section.categories as readonly string[]).includes(post.category)).length;
              return (
                <Link key={section.slug} href={section.href} className="flex items-center justify-between gap-4 rounded-md bg-slate-50 px-4 py-3 text-sm hover:text-brand dark:bg-slate-800">
                  <span>{section.name}</span>
                  <span className="font-semibold">{count}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-line bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-display text-2xl font-semibold">التصنيفات الجديدة</h2>
          <div className="mt-5 grid gap-3">
            {categories.map((category) => {
              const count = posts.filter((post) => post.category === category.slug).length;
              return (
                <Link key={category.slug} href={`/category/${category.slug}`} className="flex items-center justify-between gap-4 rounded-md bg-slate-50 px-4 py-3 text-sm hover:text-brand dark:bg-slate-800">
                  <span>{category.name}</span>
                  <span className="font-semibold">{count}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-lg border border-line bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
        <h2 className="font-display text-2xl font-semibold">قواعد التحرير المقترحة</h2>
        <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted dark:text-slate-300">
          <li>• أي إعلان عمل جديد يستخدم contentType: job وتصنيف jobs مع المدينة والموعد النهائي.</li>
          <li>• أي منظومة حكومية أو مصرفية تستخدم contentType: service مع الرابط الرسمي وخطوات الاستخدام.</li>
          <li>• المحتوى التقني العام يبقى في guides-and-explanations حتى لا يختلط بالصفحات الخدمية.</li>
          <li>• قسم companies يحتاج تغذية لاحقة بملفات شركات حقيقية ووسائل تواصل موثقة.</li>
        </ul>
      </div>
    </section>
  );
}
