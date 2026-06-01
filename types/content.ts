export type ContentType = "article" | "job" | "university" | "service" | "company";

export type TocItem = {
  id: string;
  text: string;
  depth: number;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type JobFields = {
  employer?: string;
  city?: string;
  salary?: string;
  deadline?: string;
  applicationMethod?: string;
};

export type UniversityFields = {
  universityName?: string;
  colleges?: string[];
  systems?: string[];
  registrationLinks?: { label: string; url: string }[];
};

export type ServiceFields = {
  serviceName?: string;
  officialUrl?: string;
  usageSteps?: string[];
  commonProblems?: string[];
};

export type CompanyFields = {
  companyName?: string;
  location?: string;
  availableJobs?: string[];
  contactLinks?: { label: string; url: string }[];
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: string;
  contentType: ContentType;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  image: string;
  featured: boolean;
  trending: boolean;
  draft: boolean;
  faqs: FAQ[];
  job?: JobFields;
  university?: UniversityFields;
  service?: ServiceFields;
  company?: CompanyFields;
  readingTime: string;
  toc: TocItem[];
  content: string;
};
