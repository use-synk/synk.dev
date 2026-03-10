import Link from "next/link";
import { ResetPrivacySettings } from "@/components/reset-privacy-settings";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Footer({
	className,
	...props
}: React.ComponentProps<"footer">) {
	return (
		<footer
			className={cn(
				"border-stone-200 border-t border-dashed px-8 py-12 dark:border-stone-700",
				className,
			)}
			{...props}
		>
			<div className="mx-auto w-full max-w-6xl px-8">
				<div className="flex flex-wrap items-center justify-center gap-6 font-medium text-sm text-stone-700 dark:text-stone-300">
					<Link href={siteConfig.routes.home}>Home</Link>
					<Link href={siteConfig.routes.about}>About</Link>
					<Link href={siteConfig.routes.termsOfService}>Terms of Service</Link>
					<Link href={siteConfig.routes.privacyPolicy}>Privacy Policy</Link>
					<Link href={siteConfig.routes.imprint}>Imprint</Link>
					<Link href={siteConfig.projectRepo.url} target="_blank">
						GitHub
					</Link>
				</div>
				<p className="mt-6 w-full text-center text-stone-500 text-xs dark:text-stone-400">
					&copy; {new Date().getFullYear()} Synk. All rights reserved.
				</p>
				<div className="mt-3 flex justify-center">
					<ResetPrivacySettings />
				</div>
			</div>
		</footer>
	);
}
