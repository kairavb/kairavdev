import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://kairav.dev/sitemap.xml",
    host: "https://kairav.dev",
  };
}
