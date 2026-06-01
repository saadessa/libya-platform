import { cn } from "@/lib/utils";

type AdSlotProps = {
  label?: string;
  className?: string;
  sticky?: boolean;
};

export function AdSlot({ label = "Advertisement", className, sticky = false }: AdSlotProps) {
  return (
    <aside
      className={cn(
        "flex min-h-[250px] w-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400",
        sticky && "lg:sticky lg:top-24",
        className
      )}
      aria-label={label}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
    >
      {label}
    </aside>
  );
}
