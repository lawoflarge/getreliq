import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "https://getreliq.com";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...CATEGORIES.map((cat) => ({
      url: `${base}/category/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
