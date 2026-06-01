import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/seo";
import { platformSections } from "@/lib/site";

export const metadata: Metadata = defaultMetadata({
  title: "من نحن",
  description: "تعرف على منصة ليبيا ورسالتها في تنظيم الوصول إلى الوظائف والتعليم والخدمات الإلكترونية.",
  alternates: { canonical: "/about" }
});

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-brand">من نحن</p>
      <h1 className="mt-3 font-display text-4xl font-semibold">منصة ليبيا للوظائف والتعليم والخدمات الإلكترونية</h1>
      <p className="mt-5 text-lg leading-9 text-muted dark:text-slate-300">
        نعيد تنظيم المحتوى العملي الذي يحتاجه المستخدم الليبي: فرص العمل، الجامعات، المنظومات، الخدمات الحكومية والمصرفية، ودليل الشركات. الهدف هو تقليل البحث العشوائي وتحويل الموقع إلى مرجع واضح وحديث.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {platformSections.map((section) => (
          <div key={section.slug} className="rounded-lg border border-line p-5 dark:border-slate-800">
            <h2 className="font-display text-xl font-semibold">{section.name}</h2>
            <p className="mt-2 text-sm leading-7 text-muted dark:text-slate-300">{section.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
