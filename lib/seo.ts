import type { Metadata } from "next";
import type { Post } from "@/types/content";
import { absoluteUrl, siteConfig } from "@/lib/site";

const platformTitle = "منصة ليبيا للوظائف والتعليم والخدمات الإلكترونية";
const platformDescription =
  "دليل ليبي منظم للوظائف، الجامعات، الخدمات الحكومية والمصرفية، المنصات الإلكترونية، الشركات، والشروحات العملية بروابط واضحة وتجربة بحث سريعة.";

export function defaultMetadata(overrides: Metadata = {}): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: platformTitle,
      template: "%s | منصة ليبيا"
    },
    description: platformDescription,
    keywords: [
      "وظائف ليبيا",
      "منصة ليبيا",
      "التعليم في ليبيا",
      "الجامعات الليبية",
      "الخدمات الإلكترونية ليبيا",
      "الخدمات الحكومية ليبيا",
      "منظومات ليبيا",
      "الشركات الليبية"
    ],
    applicationName: siteConfig.name,
    authors: [{ name: "Saad Elfallah", url: siteConfig.url }],
    creator: "Saad Elfallah",
    publisher: siteConfig.name,
    category: "دليل خدمات",
    alternates: { canonical: siteConfig.url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    },
    openGraph: {
      type: "website",
      locale: "ar_LY",
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: platformTitle,
      description: platformDescription,
      images: [{ url: absoluteUrl("/og"), width: 1200, height: 630, alt: platformTitle }]
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitter,
      creator: siteConfig.twitter,
      title: platformTitle,
      description: platformDescription,
      images: [absoluteUrl("/og")]
    },
    icons: {
      icon: "/icon.svg",
      shortcut: "/icon.svg",
      apple: "/icon.svg"
    },
    ...overrides
  };
}

export function postMetadata(post: Post): Metadata {
  const url = absoluteUrl("/posts/" + post.slug);
  const image = absoluteUrl(post.image);
  const typeLabels: Record<Post["contentType"], string> = {
    article: "دليل",
    job: "وظيفة",
    university: "جامعة",
    service: "خدمة إلكترونية",
    company: "شركة"
  };

  return {
    title: post.title + " - " + typeLabels[post.contentType],
    description: post.description,
    alternates: { canonical: url },
    keywords: [...post.tags, post.category, typeLabels[post.contentType], "ليبيا"],
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      siteName: siteConfig.name,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      section: post.category,
      tags: post.tags,
      images: [{ url: image, width: 1200, height: 630, alt: post.title }]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image]
    },
    robots: { index: true, follow: true }
  };
}
