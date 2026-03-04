import type { Metadata } from "next";

import { getBaseUrl } from "@/lib/config";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description:
		"Privacy Policy for Synk — Learn how we collect, use, and protect your personal data when you join our waitlist.",
	openGraph: {
		title: "Privacy Policy | Synk",
		description:
			"Privacy Policy for Synk — Learn how we collect, use, and protect your personal data when you join our waitlist.",
		url: "/legal/privacy",
	},
	twitter: {
		title: "Privacy Policy | Synk",
		description:
			"Privacy Policy for Synk — Learn how we collect, use, and protect your personal data when you join our waitlist.",
	},
	alternates: {
		canonical: `${getBaseUrl()}/legal/privacy`,
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function PrivacyLayout({
	children,
}: { children: React.ReactNode }) {
	return children;
}
