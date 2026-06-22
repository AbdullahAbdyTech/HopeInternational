import type { MetadataRoute } from "next";

import { pages, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${site.url}${page.path}`,
    lastModified: new Date("2026-06-22"),
    changeFrequency: page.changeFrequency,
    priority: page.priority
  }));
}
