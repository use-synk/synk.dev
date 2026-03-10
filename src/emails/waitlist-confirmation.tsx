import {
	Body,
	Column,
	Container,
	Font,
	Head,
	Heading,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Tailwind,
	Text,
} from "@react-email/components";
import { env } from "@/env";
import { getBaseUrl, siteConfig } from "@/lib/config";
import { getUnsubscribeUrl } from "@/lib/unsubscribe";
import { getWaitlistConfirmationUrl } from "@/lib/waitlist-confirmation";

const footerLinks = [
	{ label: "Home", href: siteConfig.routes.home },
	{ label: "Terms", href: siteConfig.routes.termsOfService },
	{ label: "Privacy", href: siteConfig.routes.privacyPolicy },
	{ label: "GitHub", href: siteConfig.projectRepo.url },
];

type WaitlistConfirmationEmailProps = {
	email: string;
};

export function WaitlistConfirmationEmail({
	email,
}: WaitlistConfirmationEmailProps) {
	const baseUrl = getBaseUrl();
	const confirmUrl = getWaitlistConfirmationUrl(
		email,
		env.UNSUBSCRIBE_SECRET,
		baseUrl,
	);
	const unsubscribeUrl = getUnsubscribeUrl(
		email,
		env.UNSUBSCRIBE_SECRET,
		baseUrl,
	);

	return (
		<Html>
			<Preview>Confirm your email to join the Synk waitlist.</Preview>
			<Tailwind
				config={{
					theme: {
						extend: {
							fontFamily: {
								serif: ["Instrument Serif", "Georgia", "serif"],
							},
						},
					},
				}}
			>
				<Head>
					<Font
						fallbackFontFamily="Georgia"
						fontFamily="Instrument Serif"
						fontStyle="normal"
						fontWeight={400}
						webFont={{
							url: "https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-2zI.ttf",
							format: "truetype",
						}}
					/>
				</Head>
				<Body className="bg-stone-100 py-8 font-sans">
					<Container className="bg-white p-8">
						<Img
							alt="Synk Logo"
							height={24}
							src={`${baseUrl}/email/logo-lime.png`}
							width={80}
						/>
						<Heading className="mt-12 font-normal font-serif text-3xl">
							Confirm your waitlist signup
						</Heading>
						<Text className="mt-8 font-sans text-stone-700">Hey there,</Text>
						<Text className="font-sans text-stone-700">
							Thanks for your interest in Synk. To complete your signup, please confirm
							your email address.
						</Text>
						<Text className="font-sans text-stone-700">
							Only after confirmation will your address be added to the waitlist and
							used for product updates.
						</Text>
						<Text className="mt-6">
							<Link
								className="inline-block rounded-md bg-lime-500 px-4 py-2 font-medium text-lime-950 text-sm"
								href={confirmUrl}
							>
								Confirm email address
							</Link>
						</Text>
						<Text className="font-sans text-stone-700">
							All the best, <br />
							<span className="font-sans italic">The Synk Team</span>
						</Text>
					</Container>
					<Container className="px-8">
						<Row className="mt-4">
							{footerLinks.map(({ label, href }, index) => (
								<Column
									className={`text-center ${index < footerLinks.length - 1 ? "border-stone-300 border-r" : ""}`}
									key={label}
								>
									<Link
										className="font-sans text-stone-500 text-xs"
										href={href.startsWith("http") ? href : `${baseUrl}${href}`}
									>
										{label}
									</Link>
								</Column>
							))}
						</Row>
						<Text className="font-sans text-stone-500 text-xs">
							You receive this email because your email address was submitted to the
							Synk waitlist form. If that was not you, please ignore this email.{" "}
							<Link className="font-sans text-lime-500" href={unsubscribeUrl}>
								Unsubscribe
							</Link>{" "}
							from these emails at any time. If you did not request this email, please
							contact us at{" "}
							<Link
								className="font-sans text-lime-500"
								href="mailto:legal@mail.use-synk.com"
							>
								legal@mail.use-synk.com
							</Link>
							. See our{" "}
							<Link
								className="font-sans text-lime-500"
								href={
									siteConfig.routes.privacyPolicy.startsWith("http")
										? siteConfig.routes.privacyPolicy
										: `${baseUrl}${siteConfig.routes.privacyPolicy}`
								}
							>
								privacy policy
							</Link>{" "}
							for more information.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}

export default WaitlistConfirmationEmail;

WaitlistConfirmationEmail.PreviewProps = {
	email: "preview@example.com",
} satisfies WaitlistConfirmationEmailProps;
