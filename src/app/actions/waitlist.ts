"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { db } from "@/db";
import { waitlistSignups } from "@/db/schema";
import { WaitlistConfirmationEmail } from "@/emails/waitlist-confirmation";
import { waitlistRatelimit } from "@/lib/ratelimit";
import { resend } from "@/lib/resend";

type SignupResult =
	| { success: true }
	| { success: false; error: "already_registered" | "rate_limited" | "unknown" };

function getClientIdentifier(headersList: Headers): string {
	const forwarded = headersList.get("x-forwarded-for");
	if (forwarded) return forwarded.split(",")[0]?.trim() ?? "anonymous";
	const realIp = headersList.get("x-real-ip");
	if (realIp) return realIp.trim();
	return "anonymous";
}

export async function joinWaitlist(email: string): Promise<SignupResult> {
	const headersList = await headers();
	const identifier = getClientIdentifier(headersList);

	const { success: allowed } = await waitlistRatelimit.limit(identifier);
	if (!allowed) return { success: false, error: "rate_limited" };

	try {
		const existing = await db
			.select({ status: waitlistSignups.status })
			.from(waitlistSignups)
			.where(eq(waitlistSignups.email, email))
			.limit(1);

		if (existing.length > 0 && existing[0]?.status === "active") {
			return { success: false, error: "already_registered" };
		}
	} catch (err) {
		console.error("Waitlist lookup error:", err);
		return { success: false, error: "unknown" };
	}

	const { error } = await resend.emails.send({
		from: "Synk <no-reply@waitlist.use-synk.com>",
		to: [email],
		subject: "Confirm your waitlist signup",
		react: WaitlistConfirmationEmail({ email }),
	});

	if (error) {
		console.error("Resend error:", error);
		return { success: false, error: "unknown" };
	}

	return { success: true };
}
