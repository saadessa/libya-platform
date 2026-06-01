import Link from "next/link";
import { BriefcaseBusiness, Building2, CalendarDays, ExternalLink, GraduationCap, Landmark, MapPin, WalletCards } from "lucide-react";
import type { Post } from "@/types/content";
import { formatDate } from "@/lib/utils";

function InfoCard({ label, value, icon: Icon }: { label: string; value?: string; icon: typeof CalendarDays }) {
  if (!value) return null;
  return (
    <div className="rounded-lg border border-line bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-2 text-xs font-semibold text-brand">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <p className="mt-2 text-sm font-medium leading-7">{value}</p>
    </div>
  );
}

function LinkList({ title, links }: { title: string; links?: { label: string; url: string }[] }) {
  if (!links?.length) return null;
  return (
    <div className="rounded-lg border border-line bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <div className="mt-4 grid gap-3">
        {links.map((link) => (
          <a key={link.url} href={link.url} rel="noopener noreferrer" className="inline-flex items-center justify-between gap-3 rounded-md bg-slate-50 px-4 py-3 text-sm font-medium hover:text-brand dark:bg-slate-800">
            {link.label}
            <ExternalLink className="h-4 w-4" />
          </a>
        ))}
      </div>
    </div>
  );
}

function BulletPanel({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="rounded-lg border border-line bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <ul className="mt-4 grid gap-2 text-sm leading-7 text-muted dark:text-slate-300">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

export function ContentDetailTemplate({ post }: { post: Post }) {
  if (post.contentType === "job") {
    return (
      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard label="الجهة" value={post.job?.employer} icon={Building2} />
        <InfoCard label="المدينة" value={post.job?.city} icon={MapPin} />
        <InfoCard label="الراتب" value={post.job?.salary} icon={WalletCards} />
        <InfoCard label="تاريخ النشر" value={formatDate(post.publishedAt)} icon={CalendarDays} />
        <InfoCard label="الموعد النهائي" value={post.job?.deadline ? formatDate(post.job.deadline) : undefined} icon={CalendarDays} />
        <InfoCard label="طريقة التقديم" value={post.job?.applicationMethod || "راجع التفاصيل داخل الإعلان."} icon={BriefcaseBusiness} />
      </section>
    );
  }

  if (post.contentType === "university") {
    return (
      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        <InfoCard label="اسم الجامعة" value={post.university?.universityName || post.title} icon={GraduationCap} />
        <BulletPanel title="الكليات" items={post.university?.colleges} />
        <BulletPanel title="المنظومات" items={post.university?.systems} />
        <div className="lg:col-span-3">
          <LinkList title="روابط التسجيل" links={post.university?.registrationLinks} />
        </div>
      </section>
    );
  }

  if (post.contentType === "service") {
    return (
      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        <InfoCard label="اسم المنظومة" value={post.service?.serviceName || post.title} icon={Landmark} />
        {post.service?.officialUrl ? (
          <Link href={post.service.officialUrl} className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-white p-4 text-sm font-semibold hover:border-brand hover:text-brand dark:border-slate-800 dark:bg-slate-900">
            الرابط الرسمي
            <ExternalLink className="h-4 w-4" />
          </Link>
        ) : null}
        <BulletPanel title="طريقة الاستخدام" items={post.service?.usageSteps} />
        <BulletPanel title="المشاكل الشائعة" items={post.service?.commonProblems} />
      </section>
    );
  }

  if (post.contentType === "company") {
    return (
      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        <InfoCard label="اسم الشركة" value={post.company?.companyName || post.title} icon={Building2} />
        <InfoCard label="الموقع" value={post.company?.location} icon={MapPin} />
        <BulletPanel title="الوظائف المتاحة" items={post.company?.availableJobs} />
        <LinkList title="وسائل التواصل" links={post.company?.contactLinks} />
      </section>
    );
  }

  return null;
}
