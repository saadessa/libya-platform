export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "منصة ليبيا",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://alltechnology.org",
  description:
    "منصة ليبيا دليل عملي للوظائف والتعليم والخدمات الإلكترونية في ليبيا، يجمع فرص العمل، الجامعات، المنظومات الرسمية، الشركات، والشروحات الموثوقة في مكان واحد.",
  email: process.env.CONTACT_EMAIL || "saadhivcenter@gmail.com",
  locale: "ar_LY",
  twitter: "@googleboos",
  social: {
    x: "https://x.com/googleboos",
    linkedin: "https://www.linkedin.com/in/saad-elfallah-97bb6940/",
    github: "https://github.com/saadessa",
    youtube: "https://www.youtube.com/@saadelfallah"
  },
  defaultImage: "/og"
};

export type CategorySlug =
  | "jobs"
  | "universities-and-colleges"
  | "education-services"
  | "government-services"
  | "banking-services"
  | "digital-platforms"
  | "companies"
  | "guides-and-explanations";

export const categories = [
  {
    slug: "jobs",
    name: "وظائف",
    description: "فرص عمل وإعلانات توظيف في ليبيا مع بيانات الجهة، المدينة، الموعد النهائي، وطريقة التقديم.",
    section: "jobs"
  },
  {
    slug: "universities-and-colleges",
    name: "الجامعات والكليات",
    description: "دليل الجامعات والكليات الليبية، المنظومات، القبول، التسجيل، والخدمات الطلابية.",
    section: "education"
  },
  {
    slug: "education-services",
    name: "الخدمات التعليمية",
    description: "خدمات ومنظومات تعليمية للطلاب وأولياء الأمور، مع خطوات الاستخدام والأسئلة الشائعة.",
    section: "education"
  },
  {
    slug: "government-services",
    name: "الخدمات الحكومية",
    description: "شرح الخدمات الحكومية الإلكترونية في ليبيا وروابطها الرسمية وطريقة التعامل مع المشاكل الشائعة.",
    section: "e-services"
  },
  {
    slug: "banking-services",
    name: "الخدمات المصرفية",
    description: "منظومات المصارف والحجز والعملات والخدمات المالية الرقمية في ليبيا.",
    section: "e-services"
  },
  {
    slug: "digital-platforms",
    name: "المنصات الإلكترونية",
    description: "منصات رقمية وخدمات إلكترونية ليبية وعربية يحتاجها المستخدم يوميا.",
    section: "e-services"
  },
  {
    slug: "companies",
    name: "الشركات",
    description: "دليل الشركات الليبية، ملفات تعريفية، مواقع، تواصل، وفرص متاحة.",
    section: "companies"
  },
  {
    slug: "guides-and-explanations",
    name: "الشروحات والأدلة",
    description: "مقالات تفسيرية وأدلة عملية للمستخدم الليبي في الوظائف والتعليم والخدمات الرقمية.",
    section: "blog"
  }
] as const;

export const platformSections = [
  {
    slug: "jobs",
    href: "/jobs",
    name: "الوظائف",
    description: "فرص العمل الشاغرة وإرشادات التقديم في ليبيا.",
    categories: ["jobs"]
  },
  {
    slug: "education",
    href: "/education",
    name: "التعليم",
    description: "الجامعات والكليات والخدمات التعليمية والمنظومات الطلابية.",
    categories: ["universities-and-colleges", "education-services"]
  },
  {
    slug: "e-services",
    href: "/e-services",
    name: "الخدمات الإلكترونية",
    description: "الخدمات الحكومية والمصرفية والمنصات الرقمية بروابط رسمية وشروحات واضحة.",
    categories: ["government-services", "banking-services", "digital-platforms"]
  },
  {
    slug: "companies",
    href: "/companies",
    name: "الشركات",
    description: "ملفات الشركات وفرصها ووسائل التواصل معها.",
    categories: ["companies"]
  },
  {
    slug: "blog",
    href: "/blog",
    name: "المدونة",
    description: "أدلة وشروحات ومقالات تقنية مفيدة للمستخدم الليبي.",
    categories: ["guides-and-explanations"]
  }
] as const;

export const authors = [
  {
    slug: "saad-elfallah",
    name: "Saad Elfallah",
    role: "محرر ومؤسس المنصة",
    bio: "كاتب ومحرر تقني يهتم بتبسيط الخدمات الإلكترونية والتعليمية وفرص العمل للمستخدم الليبي.",
    avatar: "/images/authors/saad-elfallah.webp",
    sameAs: [
      "https://www.linkedin.com/in/saad-elfallah-97bb6940/",
      "https://x.com/googleboos",
      "https://github.com/saadessa",
      "https://www.youtube.com/@saadelfallah"
    ]
  }
] as const;

export const primaryNav = [
  { href: "/", label: "الرئيسية" },
  { href: "/jobs", label: "الوظائف" },
  { href: "/education", label: "التعليم" },
  { href: "/e-services", label: "الخدمات الإلكترونية" },
  { href: "/companies", label: "الشركات" },
  { href: "/blog", label: "المدونة" },
  { href: "/search", label: "البحث" }
] as const;

export function absoluteUrl(path = "") {
  return new URL(path, siteConfig.url).toString();
}
