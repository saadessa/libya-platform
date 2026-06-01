import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { AdSlot } from "@/components/ads/ad-slot";

export const mdxComponents: MDXComponents = {
  a: ({ href = "", children }) => {
    const isInternal = href.startsWith("/");
    return isInternal ? <Link href={href}>{children}</Link> : <a href={href} rel="noopener noreferrer">{children}</a>;
  },
  table: ({ children, ...props }) => (
    <div className="table-wrapper">
      <table {...props}>{children}</table>
    </div>
  ),
  AdSlot: () => <AdSlot className="my-10 min-h-[280px]" label="In-article advertisement" />
};
