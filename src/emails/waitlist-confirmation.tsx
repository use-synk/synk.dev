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
import { getBaseUrl, siteConfig } from "@/lib/config";

const footerLinks = [
	{ label: "Home", href: siteConfig.routes.home },
	{ label: "Terms", href: siteConfig.routes.termsOfService },
	{ label: "Privacy", href: siteConfig.routes.privacyPolicy },
	{ label: "GitHub", href: siteConfig.projectRepo.url },
];

interface WaitlistConfirmationEmailProps {
	email: string;
}

export function WaitlistConfirmationEmail({
	email,
}: WaitlistConfirmationEmailProps) {
	const baseUrl = getBaseUrl();

	return (
		<Html>
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
			<Preview>
				Thanks for signing up to the Synk waitlist! We'll be in touch soon.
			</Preview>
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
				<Body className="bg-stone-100 py-8 font-sans">
					<Container className="bg-white p-8">
						<Img
							alt="Synk"
							height={24}
							src={`${baseUrl}/email/logo-dark.png`}
							width={80}
						/>
						<Heading className="mt-12 font-normal font-serif text-3xl">
							You're on the waitlist!
						</Heading>
						<Text className="mt-8 font-sans text-stone-700">Hey there,</Text>
						<Text className="font-sans text-stone-700">
							Thanks for signing up to the Synk waitlist. We are working hard to bring
							you the first beta as soon as possible.
						</Text>
						<Text className="font-sans text-stone-700">
							Since you've joined the waitlist, you'll be one of the first to know when
							we launch.
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
							You receive this email because you signed up to the Synk waitlist. If you
							did not request this email, please contact us at{" "}
							<Link
								className="font-sans text-lime-500"
								href="mailto:hello@use-synk.com"
							>
								hello@use-synk.com
							</Link>
							. You can unsubscribe from these emails at any time. Please see our{" "}
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
							for more information or contact us directly at{" "}
							<Link
								className="font-sans text-lime-500"
								href="mailto:hello@use-synk.com"
							>
								hello@use-synk.com
							</Link>
							.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}

export default WaitlistConfirmationEmail;

WaitlistConfirmationEmail.PreviewProps = {
	email: "test@example.com",
};
