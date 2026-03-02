export function getBaseUrl() {
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
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
