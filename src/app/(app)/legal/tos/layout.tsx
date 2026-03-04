import type { Metadata } from "next";

import { getBaseUrl } from "@/lib/config";

export const metadata: Metadata = {
	title: "Terms of Service",
	description:
		"Terms of Service for Synk — The terms governing your use of our waitlist service.",
	openGraph: {
		title: "Terms of Service | Synk",
		description:
			"Terms of Service for Synk — The terms governing your use of our waitlist service.",
		url: "/legal/tos",
	},
	twitter: {
		title: "Terms of Service | Synk",
		description:
			"Terms of Service for Synk — The terms governing your use of our waitlist service.",
	},
	alternates: {
		canonical: `${getBaseUrl()}/legal/tos`,
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
	return children;
}
