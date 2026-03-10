import { eq } from "drizzle-orm";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { db } from "@/db";
import { waitlistSignups } from "@/db/schema";
import { env } from "@/env";
import { siteConfig } from "@/lib/config";
import { verifyWaitlistConfirmationToken } from "@/lib/waitlist-confirmation";

type ConfirmationResult =
	| { status: "success" }
	| { status: "already_confirmed" }
	| { status: "invalid" };

async function processConfirmation(token: string): Promise<ConfirmationResult> {
	const email = verifyWaitlistConfirmationToken(token, env.UNSUBSCRIBE_SECRET);
	if (!email) return { status: "invalid" };

	const existing = await db
		.select({ status: waitlistSignups.status })
		.from(waitlistSignups)
		.where(eq(waitlistSignups.email, email))
		.limit(1);

	if (existing.length === 0) {
		try {
			await db.insert(waitlistSignups).values({ email, status: "active" });
			return { status: "success" };
		} catch (err) {
			// Handle race where another request confirms the same email first.
			if (
				typeof err === "object" &&
				err !== null &&
				"code" in err &&
				err.code === "23505"
			) {
				return { status: "already_confirmed" };
			}
			throw err;
		}
	}

	if (existing[0]?.status === "active") {
		return { status: "already_confirmed" };
	}

	await db
		.update(waitlistSignups)
		.set({ status: "active" })
		.where(eq(waitlistSignups.email, email));

	return { status: "success" };
}

export default async function WaitlistConfirmPage({
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
					<h1 className="font-medium font-serif text-3xl text-stone-800 dark:text-stone-100">
						Invalid confirmation link
					</h1>
					<p className="mt-4 text-stone-600 dark:text-stone-300">
						This confirmation link is invalid or expired. Please sign up again from
						the homepage.
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

	const result = await processConfirmation(token);

	if (result.status === "invalid") {
		return (
			<>
				<main className="mx-auto w-full max-w-6xl border-stone-200 border-x border-dashed px-8 py-32">
					<h1 className="font-medium font-serif text-3xl text-stone-800 dark:text-stone-100">
						Invalid confirmation link
					</h1>
					<p className="mt-4 text-stone-600 dark:text-stone-300">
						This confirmation link is invalid or expired. Please sign up again from
						the homepage.
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

	const isAlreadyConfirmed = result.status === "already_confirmed";

	return (
		<>
			<main className="mx-auto w-full max-w-6xl border-stone-200 border-x border-dashed px-8 py-32">
				<h1 className="font-medium font-serif text-3xl text-stone-800 dark:text-stone-100">
					{isAlreadyConfirmed
						? "Your waitlist signup is already confirmed"
						: "Your waitlist signup is confirmed"}
				</h1>
				<p className="mt-4 text-stone-600 dark:text-stone-300">
					{isAlreadyConfirmed
						? "No further action is needed."
						: "Thanks for confirming. You are now on the Synk waitlist."}
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
