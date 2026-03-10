import {
	GitPullRequestIcon,
	TrafficConeIcon,
	WandSparklesIcon,
} from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export async function RoadmapSection({
	className,
	...props
}: React.ComponentProps<"section">) {
	return (
		<section className={cn("py-32", className)} {...props}>
			<div className="mx-auto mb-20 w-full max-w-6xl gap-8 px-8">
				<div>
					<h2 className="font-serif text-4xl dark:text-stone-50">
						Build in progress
					</h2>
					<div className="mt-4 max-w-xl text-sm text-stone-600 leading-7 dark:text-stone-400">
						<p>
							Synk is in active development. We're building toward our first beta and
							will share it as soon as it's ready.
						</p>
						<p>
							Follow us on{" "}
							<Link
								className="text-lime-500 hover:text-lime-600"
								href={"https://x.com/usesynk"}
							>
								X
							</Link>{" "}
							for updates, or check out our{" "}
							<Link
								className="text-lime-500 hover:text-lime-600"
								href={siteConfig.projectRepo.url}
							>
								GitHub
							</Link>{" "}
							to contribute and stay in the loop.
						</p>
					</div>
				</div>
			</div>
			<div className="mt-4 border-stone-200 border-t border-dashed dark:border-stone-700">
				<div className="mx-auto w-full max-w-6xl gap-8 px-8">
					<div className="grid gap-20 md:grid-cols-3 md:gap-8">
						<div>
							<div className="relative w-fit -translate-y-1/2 rounded-md bg-linear-to-b from-background to-lime-50 p-2 shadow-lime-500/10 shadow-sm ring-1 ring-lime-700/20 dark:to-lime-950 dark:ring-lime-300/20">
								<TrafficConeIcon className="size-4 text-lime-600 dark:text-lime-400" />
								<div className="-translate-1/2 absolute top-0.5 right-0.5 size-2 translate-x-1/2 rounded-full bg-lime-500">
									<div className="size-full animate-ping rounded-full bg-lime-500" />
								</div>
							</div>
							<p className="mt-1.5 font-medium text-sm text-stone-800 dark:text-stone-100">
								Pre-beta
							</p>
							<p className="mt-1 text-stone-500 text-xs dark:text-stone-400">
								Development of core features and infrastructure.
							</p>
						</div>
						<div>
							<div className="w-fit -translate-y-1/2 rounded-md bg-linear-to-b from-background to-stone-50 p-2 shadow-sm ring-1 ring-stone-700/10 dark:from-stone-800 dark:to-stone-900 dark:ring-stone-50/20">
								<WandSparklesIcon className="size-4 text-stone-700 dark:text-stone-400" />
							</div>
							<p className="mt-1.5 font-medium text-sm text-stone-800 dark:text-stone-100">
								Beta
							</p>
							<p className="mt-1 text-stone-500 text-xs dark:text-stone-400">
								Public release of the first beta version.
							</p>
						</div>
						<div>
							<div className="w-fit -translate-y-1/2 rounded-md bg-linear-to-b from-background to-stone-50 p-2 shadow-sm ring-1 ring-stone-700/10 dark:from-stone-800 dark:to-stone-900 dark:ring-stone-50/20">
								<GitPullRequestIcon className="size-4 text-stone-700 dark:text-stone-400" />
							</div>
							<p className="mt-1.5 font-medium text-sm text-stone-800 dark:text-stone-100">
								Open-source
							</p>
							<p className="mt-1 text-stone-500 text-xs dark:text-stone-400">
								Open-source release of the tool.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
