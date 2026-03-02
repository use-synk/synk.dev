export function getBaseUrl() {
	if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;

	return "http://localhost:3000";
}

export const siteConfig = {
	projectRepo: {
		url: "https://github.com/use-synk/synk",
	},
	routes: {
		home: "/",
		about: "/about",
		termsOfService: "/legal/tos",
		privacyPolicy: "/legal/privacy",
	},
} as const;
