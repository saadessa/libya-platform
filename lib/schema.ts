import type { Post } from "@/types/content";
import { absoluteUrl, siteConfig } from "@/lib/site";

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "ar-LY",
    potentialAction: {
      "@type": "SearchAction",
      target: siteConfig.url + "/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/icon.svg"),
    sameAs: Object.values(siteConfig.social),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "editorial",
      email: siteConfig.email,
      areaServed: "LY",
      availableLanguage: ["Arabic"]
    }
  };
}

export function articleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": post.contentType === "article" ? "Article" : "NewsArticle",
    headline: post.title,
    description: post.description,
    image: [absoluteUrl(post.image)],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: absoluteUrl("/posts/" + post.slug),
    isAccessibleForFree: true,
    inLanguage: "ar-LY",
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") }
    }
  };
}

export function contentSchema(post: Post) {
  if (post.contentType === "job") {
    return {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: post.title,
      description: post.description,
      datePosted: post.publishedAt,
      validThrough: post.job?.deadline,
      hiringOrganization: {
        "@type": "Organization",
        name: post.job?.employer || post.title
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: post.job?.city || "ليبيا",
          addressCountry: "LY"
        }
      },
      baseSalary: post.job?.salary
    };
  }

  if (post.contentType === "university") {
    return {
      "@context": "https://schema.org",
      "@type": "CollegeOrUniversity",
      name: post.university?.universityName || post.title,
      description: post.description,
      url: absoluteUrl("/posts/" + post.slug),
      address: { "@type": "PostalAddress", addressCountry: "LY" }
    };
  }

  if (post.contentType === "service") {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      name: post.service?.serviceName || post.title,
      description: post.description,
      areaServed: { "@type": "Country", name: "Libya" },
      provider: { "@type": "Organization", name: siteConfig.name },
      url: post.service?.officialUrl || absoluteUrl("/posts/" + post.slug)
    };
  }

  if (post.contentType === "company") {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: post.company?.companyName || post.title,
      description: post.description,
      url: absoluteUrl("/posts/" + post.slug),
      address: { "@type": "PostalAddress", addressLocality: post.company?.location || "ليبيا", addressCountry: "LY" }
    };
  }

  return articleSchema(post);
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url)
    }))
  };
}

export function faqSchema(faqs: Post["faqs"]) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer }
    }))
  };
}
