import Person1 from "public/person-1.jpeg";
import Person2 from "public/person-2.jpeg";
import Person3 from "public/person-3.jpeg";
import { JoinWaitlist } from "../join-waitlist";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "../ui/avatar";

export async function CalloutSection({
	...props
}: React.ComponentProps<"section">) {
	return (
		<section {...props}>
			<div className="mx-auto w-full max-w-6xl px-8 py-32">
				<div className="mx-auto max-w-2xl rounded-t-xl bg-linear-to-b from-stone-100 to-transparent p-6 sm:p-12 dark:from-stone-800 dark:to-transparent">
					<h2 className="font-serif text-4xl">Get early access</h2>
					<p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
						Be the first to try Synk when we launch. We'll notify you – no spam.
					</p>
					<JoinWaitlist className="mt-8" />

					<div className="mt-12 flex flex-wrap items-center justify-start gap-4">
						<AvatarGroup className="grayscale">
							<Avatar size="sm">
								<AvatarImage src={Person1.src} />
								<AvatarFallback>JN</AvatarFallback>
							</Avatar>
							<Avatar size="sm">
								<AvatarImage src={Person2.src} />
								<AvatarFallback>KL</AvatarFallback>
							</Avatar>
							<Avatar size="sm">
								<AvatarImage src={Person3.src} />
								<AvatarFallback>OM</AvatarFallback>
							</Avatar>
						</AvatarGroup>
						<p className="text-sm text-stone-500 dark:text-stone-400">
							<span className="font-medium text-stone-700 dark:text-stone-50">
								150+
							</span>{" "}
							developers are already on the list
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
