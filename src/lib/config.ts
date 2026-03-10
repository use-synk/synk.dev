export function getBaseUrl() {
	if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;

	return "http://localhost:3000";
}

export const siteMetadata = {
	name: "Synk",
	title: "Synk — AI-Native Documentation That Stays in Sync",
	description:
		"Synk is an open-source tool that uses AI to generate documentation from your codebase and keep it updated automatically. Self-host for free, or use our hosted version.",
	shortDescription:
		"Docs that write themselves—and stay in sync with your code.",
	keywords: [
		"documentation",
		"AI documentation",
		"open-source",
		"code documentation",
		"developer tools",
		"self-hosted",
	],
	authors: [{ name: "Synk", url: "https://use-synk.com" }],
	creator: "Synk",
	openGraph: {
		type: "website",
		locale: "en_US",
	},
	twitter: {
		card: "summary_large_image",
	},
} as const;

export const siteConfig = {
	projectRepo: {
		url: "https://github.com/use-synk/synk",
	},
	routes: {
		home: "/",
		about: "/about",
		termsOfService: "/legal/tos",
		privacyPolicy: "/legal/privacy",
		imprint: "/legal/imprint",
		unsubscribe: "/unsubscribe",
		waitlistConfirm: "/waitlist/confirm",
	},
} as const;
