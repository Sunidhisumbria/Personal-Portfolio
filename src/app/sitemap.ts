import type { MetadataRoute } from "next";
import { profile, site } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      // Image sitemap entry: helps the profile photo show up in Google Images for the name.
      images: [`${site.url}${profile.photo}`],
    },
  ];
}
