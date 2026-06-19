import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/data/"],
    },
    sitemap: "https://wordgrid.games/sitemap.xml",  // no trailing slash for .xml files
    host: "https://wordgrid.games",
  };
}
