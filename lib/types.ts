export interface AffiliateProduct {
  name: string;
  url: string;
  image?: string;
  price?: string;
  platform: "coupang" | "amazon" | "other";
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  thumbnail?: string;
  published?: boolean;
  updatedDate?: string;
  readingTime?: number;
  enableAds?: boolean;
  affiliateProducts?: AffiliateProduct[];
  content: string;
}
