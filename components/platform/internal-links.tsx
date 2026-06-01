import Link from "next/link";
import type { Post } from "@/types/content";
import { getRelatedPosts } from "@/lib/content";

const titles: Record<Post["contentType"], string> = {
  article: "اقرأ أيضاً",
  job: "وظائف مشابهة",
  university: "جامعات مشابهة",
  service: "خدمات مرتبطة",
  company: "شركات ذات صلة"
};

export function InternalLinks({ post }: { post: Post }) {
  const related = getRelatedPosts(post, 6);
  if (!related.length) return null;

  return (
    <section className="mt-12 border-t border-line pt-8 dark:border-slate-800">
      <h2 className="font-display text-2xl font-semibold">{titles[post.contentType]}</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {related.map((item) => (
          <Link key={item.slug} href={`/posts/${item.slug}`} className="rounded-lg border border-line bg-white p-4 text-sm font-medium leading-7 transition hover:border-brand hover:text-brand dark:border-slate-800 dark:bg-slate-900">
            {item.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
