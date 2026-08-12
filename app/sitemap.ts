import type { MetadataRoute } from "next";
import { getBaglamalar } from "@/firebase.config";
import { modifyString } from "@/lib/genFunc";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/baglamalar"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/hakkimizda"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/iletisim"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  try {
    const items = await getBaglamalar();
    const productRoutes: MetadataRoute.Sitemap = items.map((item) => ({
      url: absoluteUrl(`/baglamalar/${modifyString(item.title)}`),
      lastModified: item.created_at
        ? new Date(Number(item.created_at) * 1000)
        : now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
    return [...staticRoutes, ...productRoutes];
  } catch {
    return staticRoutes;
  }
}
