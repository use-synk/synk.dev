"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";

export const CONSENT_KEY = "synk_analytics_consent";

type ConsentState = "accepted" | "declined" | "unknown";

export function AnalyticsConsent() {
	const [consent, setConsent] = useState<ConsentState>("unknown");

	useEffect(() => {
		const stored = window.localStorage.getItem(CONSENT_KEY);
		if (stored === "accepted" || stored === "declined") {
			setConsent(stored);
			return;
		}
		setConsent("unknown");
	}, []);

	function handleConsent(nextConsent: Exclude<ConsentState, "unknown">) {
		window.localStorage.setItem(CONSENT_KEY, nextConsent);
		setConsent(nextConsent);
	}

	return (
		<>
			{consent === "accepted" ? (
				<>
					<Analytics />
					<SpeedInsights />
				</>
			) : null}
			{consent === "unknown" ? (
				<div className="fixed right-4 bottom-4 z-50 w-full max-w-[calc(100%-2rem)] rounded-xl border border-stone-200 bg-white p-4 shadow-lg sm:max-w-sm dark:border-stone-700 dark:bg-stone-900">
					<p className="text-sm text-stone-700 dark:text-stone-200">
						We use privacy-friendly analytics and performance telemetry to improve the
						website. You can accept or decline optional analytics.
					</p>
					<p className="mt-2 text-stone-500 text-xs dark:text-stone-400">
						See our <Link href={siteConfig.routes.privacyPolicy}>Privacy Policy</Link>
						.
					</p>
					<div className="mt-3 flex gap-2">
						<button
							className="rounded-md bg-lime-500 px-3 py-1.5 font-medium text-lime-950 text-sm"
							onClick={() => handleConsent("accepted")}
							type="button"
						>
							Accept
						</button>
						<button
							className="rounded-md border border-stone-300 px-3 py-1.5 font-medium text-sm text-stone-700 dark:border-stone-600 dark:text-stone-200"
							onClick={() => handleConsent("declined")}
							type="button"
						>
							Decline
						</button>
					</div>
				</div>
			) : null}
		</>
	);
}
