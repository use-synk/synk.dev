import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Confirm Waitlist Signup",
	description: "Confirm your email to join the Synk waitlist.",
	robots: {
		index: false,
		follow: false,
	},
};

export default function WaitlistConfirmLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
