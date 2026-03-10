"use client";

import { CONSENT_KEY } from "@/components/analytics-consent";

export function ResetPrivacySettings() {
	return (
		<button
			className="text-stone-500 text-xs underline underline-offset-2 transition-colors hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200"
			onClick={() => {
				window.localStorage.removeItem(CONSENT_KEY);
				window.location.reload();
			}}
			type="button"
		>
			Reset privacy settings
		</button>
	);
}
