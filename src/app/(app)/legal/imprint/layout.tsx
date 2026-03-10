import type { Metadata } from "next";

import { getBaseUrl } from "@/lib/config";

export const metadata: Metadata = {
	title: "Imprint",
	description: "Legal notice and provider information for Synk.",
	openGraph: {
		title: "Imprint | Synk",
		description: "Legal notice and provider information for Synk.",
		url: "/legal/imprint",
	},
	twitter: {
		title: "Imprint | Synk",
		description: "Legal notice and provider information for Synk.",
	},
	alternates: {
		canonical: `${getBaseUrl()}/legal/imprint`,
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function ImprintLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
