import { eq } from "drizzle-orm";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { db } from "@/db";
import { waitlistSignups } from "@/db/schema";
import { env } from "@/env";
import { siteConfig } from "@/lib/config";
import { verifyUnsubscribeToken } from "@/lib/unsubscribe";

type UnsubscribeResult =
	| { status: "success" }
	| { status: "already_withdrawn" }
	| { status: "invalid" };

async function processUnsubscribe(token: string): Promise<UnsubscribeResult> {
	const email = verifyUnsubscribeToken(token, env.UNSUBSCRIBE_SECRET);
	if (!email) return { status: "invalid" };

	const existing = await db
		.select({ status: waitlistSignups.status })
		.from(waitlistSignups)
		.where(eq(waitlistSignups.email, email))
		.limit(1);

	if (existing.length === 0) return { status: "invalid" };
	if (existing[0]?.status === "withdrawn")
		return { status: "already_withdrawn" };

	await db
		.update(waitlistSignups)
		.set({ status: "withdrawn" })
		.where(eq(waitlistSignups.email, email));

	return { status: "success" };
}

export default async function UnsubscribePage({
	searchParams,
}: {
	searchParams: Promise<{ token?: string }>;
}) {
	const params = await searchParams;
	const token = params.token;

	if (!token) {
		return (
			<>
				<main className="mx-auto w-full max-w-6xl border-stone-200 border-x border-dashed px-8 py-32">
					<h1 className="font-medium font-serif text-3xl text-stone-800">
						Invalid unsubscribe link
					</h1>
					<p className="mt-4 text-stone-600">
						This link is invalid or has expired. If you want to unsubscribe, please
						use the link in one of our recent emails, or contact us at{" "}
						<span className="text-lime-600">legal@use-synk.com</span>.
					</p>
					<Link
						className="mt-8 inline-block font-medium text-lime-600 text-sm hover:text-lime-700"
						href={siteConfig.routes.home}
					>
						← Back to home
					</Link>
				</main>
				<Footer />
			</>
		);
	}

	const result = await processUnsubscribe(token);

	if (result.status === "invalid") {
		return (
			<>
				<main className="mx-auto w-full max-w-6xl border-stone-200 border-x border-dashed px-8 py-32">
					<h1 className="font-medium font-serif text-3xl text-stone-800">
						Invalid unsubscribe link
					</h1>
					<p className="mt-4 text-stone-600">
						This link is invalid or has expired. Please use the link in one of our
						recent emails, or contact us at{" "}
						<span className="text-lime-600">legal@use-synk.com</span>.
					</p>
					<Link
						className="mt-8 inline-block font-medium text-lime-600 text-sm hover:text-lime-700"
						href={siteConfig.routes.home}
					>
						← Back to home
					</Link>
				</main>
				<Footer />
			</>
		);
	}

	return (
		<>
			<main className="mx-auto w-full max-w-6xl border-stone-200 border-x border-dashed px-8 py-32">
				<h1 className="font-medium font-serif text-3xl text-stone-800">
					You&apos;ve been unsubscribed
				</h1>
				<p className="mt-4 text-stone-600">
					{result.status === "already_withdrawn"
						? "You were already unsubscribed from our waitlist emails."
						: "You have been removed from the Synk waitlist. You will no longer receive emails from us."}
				</p>
				<Link
					className="mt-8 inline-block font-medium text-lime-600 text-sm hover:text-lime-700"
					href={siteConfig.routes.home}
				>
					← Back to home
				</Link>
			</main>
			<Footer />
		</>
	);
}
