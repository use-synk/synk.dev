import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { getBaseUrl, siteMetadata } from "@/lib/config";

export const metadata: Metadata = {
	metadataBase: new URL(getBaseUrl()),
	title: {
		default: siteMetadata.title,
		template: `%s | ${siteMetadata.name}`,
	},
	description: siteMetadata.description,
	keywords: [...siteMetadata.keywords],
	authors: [...siteMetadata.authors],
	creator: siteMetadata.creator,
	openGraph: {
		type: siteMetadata.openGraph.type,
		locale: siteMetadata.openGraph.locale,
		url: "/",
		siteName: siteMetadata.name,
		title: siteMetadata.title,
		description: siteMetadata.description,
		images: [
			{
				url: "/screenshot1.png",
				width: 1200,
				height: 630,
				alt: siteMetadata.shortDescription,
			},
		],
	},
	twitter: {
		card: siteMetadata.twitter.card,
		title: siteMetadata.title,
		description: siteMetadata.description,
		images: ["/screenshot1.png"],
	},
	icons: {
		icon: [
			{
				rel: "icon",
				url: "/icon-light.svg",
				media: "(prefers-color-scheme: dark)",
			},
			{
				rel: "icon",
				url: "/icon-dark.svg",
				media: "(prefers-color-scheme: light)",
			},
		],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
	manifest: "/manifest.webmanifest",
	alternates: {
		canonical: "/",
	},
};

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const instrument = Instrument_Serif({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-instrument-serif",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			className={`${inter.variable} ${instrument.variable}`}
			lang="en"
			suppressHydrationWarning
		>
			<body>
				<Providers>
					{children}
					<Toaster className="dark" richColors />
				</Providers>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
