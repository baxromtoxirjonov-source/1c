import { MetadataRoute } from "next";
import { getSystemTypes, getPlatforms } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://tizimlugat.uz";
  const [systemTypes, platforms] = await Promise.all([
    getSystemTypes(),
    getPlatforms(),
  ]);

  const staticRoutes = [
    "",
    "/tizimlar",
    "/platformalar",
    "/ozbekiston",
    "/taqqoslash",
    "/qidiruv",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const systemTypeRoutes = systemTypes.map((st) => ({
    url: `${baseUrl}/tizimlar/${st.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const platformRoutes = platforms.map((p) => ({
    url: `${baseUrl}/platformalar/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...systemTypeRoutes, ...platformRoutes];
}
