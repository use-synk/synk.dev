import type { MetadataRoute } from "next";

import { getBaseUrl } from "@/lib/config";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = getBaseUrl();

	const routes = [
		siteConfig.routes.home,
		siteConfig.routes.termsOfService,
		siteConfig.routes.privacyPolicy,
	];

	return routes.map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date(),
		changeFrequency: route === "/" ? "weekly" : ("monthly" as const),
		priority: route === "/" ? 1 : 0.5,
	}));
}
