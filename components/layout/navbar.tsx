import Link from "next/link";
import { Search } from "lucide-react";
import { primaryNav, siteConfig } from "@/lib/site";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileMenu } from "@/components/layout/mobile-menu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={`الرئيسية - ${siteConfig.name}`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-ink font-display text-sm font-bold text-white dark:bg-white dark:text-ink">
            LY
          </span>
          <span className="font-display text-lg font-semibold tracking-normal">{siteConfig.name}</span>
        </Link>
        <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-5 lg:flex">
          {primaryNav.slice(1).map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-brand dark:text-slate-300">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/search" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" aria-label="البحث">
            <Search className="h-4 w-4" />
          </Link>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
