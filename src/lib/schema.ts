export type BlogListItem = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  publishedAt: string;
  readingTime: string;
};

export type BlogPost = BlogListItem & {
  content: string;
  author: string;
  updatedAt: string;
  tags: string[];
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
};

export type BlogTocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};
