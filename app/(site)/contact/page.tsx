import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { defaultMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = defaultMetadata({
  title: "اتصل بنا",
  description: "تواصل مع منصة ليبيا لإضافة وظيفة، جامعة، خدمة إلكترونية، شركة، أو تصحيح بيانات منشورة.",
  alternates: { canonical: "/contact" }
});

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-brand">اتصل بنا</p>
      <h1 className="mt-3 font-display text-4xl font-semibold">إضافة أو تحديث بيانات</h1>
      <p className="mt-5 text-lg leading-9 text-muted dark:text-slate-300">
        راسلنا لإضافة إعلان وظيفة، تحديث رابط منظومة، إضافة شركة، أو تصحيح بيانات جامعة أو خدمة منشورة.
      </p>
      <a href={`mailto:${siteConfig.email}`} className="mt-8 inline-flex items-center gap-3 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand dark:bg-white dark:text-ink">
        <Mail className="h-4 w-4" />
        {siteConfig.email}
      </a>
    </section>
  );
}
