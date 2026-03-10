import { CircleDashed } from "lucide-react";
import Image from "next/image";
import AppScreenshot from "public/app-screenshot.png";
import type React from "react";
import { cn } from "@/lib/utils";
import { JoinWaitlist } from "../join-waitlist";

export async function HeroSection({
	className,
	...props
}: React.ComponentProps<"section">) {
	return (
		<section className={cn("relative", className)} id="hero" {...props}>
			<div className="absolute top-0 left-0 -z-20 h-svh w-full border-stone-200 border-b border-dashed bg-linear-to-b from-background to-stone-50 dark:border-stone-700 dark:to-stone-950">
				<div className="mx-auto h-full w-full max-w-6xl border-stone-200 border-x border-dashed px-8 pt-24 pb-32 md:py-32 dark:border-stone-700" />
			</div>
			<div className="mx-auto w-full max-w-6xl px-8 pt-24 pb-32 md:pt-32 md:pb-12">
				<div className="mb-6 flex items-center justify-start gap-2">
					<CircleDashed className="size-3.5 text-stone-400 dark:text-stone-500" />
					<p className="mt-0.25 font-medium text-stone-700 text-xs dark:text-stone-200">
						Closed beta coming soon
					</p>
				</div>
				<h1 className="max-w-3xl font-medium font-serif text-5xl text-stone-800 leading-14 dark:text-stone-50">
					Docs that write themselves—and stay in sync with your{" "}
					<span className="me-1 italic">code</span>.
				</h1>
				<p className="mt-4 max-w-xl text-sm text-stone-500 leading-6 dark:text-stone-400">
					Synk is an open-source tool that uses AI to generate documentation from
					your codebase and keep it updated automatically. Self-host for free, or use
					our hosted version. Focus on building — not on writing docs.
				</p>
				<JoinWaitlist className="mt-12 max-w-md" />
				<div className="mt-20 rounded-3xl bg-stone-50 p-2 ring-1 ring-stone-700/10 dark:bg-stone-950 dark:ring-stone-50/20">
					<div className="overflow-hidden rounded-xl shadow-md ring-1 ring-stone-700/10">
						<Image alt="Synk" src={AppScreenshot} />
					</div>
				</div>
			</div>
		</section>
	);
}
