import Link from "next/link";
import { M } from "node_modules/@upstash/redis/zmscore-DcU8fVDf.mjs";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../ui/collapsible";

const faqs = [
	{
		id: "what-is-synk",
		question: "What is Synk?",
		answer:
			"Synk is an open-source tool that uses AI to generate documentation from your codebase and keep it updated automatically. \n\n Different to other tools, we don't force you to use a specific documentation framework. Instead we adapt to the stack you already use. No need to change your stack, Synk integrates with your existing tools.",
	},
	{
		id: "why-does-synk-exist",
		question: "Why does Synk exist?",
		answer:
			"We're building Synk to minimize documentation drift. Documentation is a critical part of any project, but it's often neglected and falls out of sync with the codebase. Especially in larger projects with countless contributors, this can be a major problem. \n\nThe existing tools didn't satisfy our needs, so we decided to build our own.",
	},
	{
		id: "dont-other-tools-exist-that-do-this",
		question: "Don't other tools exist that do this?",
		answer: `Yes, there definitely are - but we think we can do it better. The tools that are trying to solve this problem have two main issues: They are either: \n
        1. Not framework agnostic and bind you to their proprietary tooling
        2. or are not open source and you have to trust them with your codebase.`,
	},
	{
		id: "will-synk-be-free-to-use",
		question: "Will Synk be free to use?",
		answer: `For hosted instances we will provide paid and possibly free tiers but you will always be able to self-host your own instance of Synk for free (non-commercial use).
            The details of our pricing will be announced at a later date. This might be subject to change, but we will always be transparent about our pricing.`,
	},
	{
		id: "will-synk-be-available-for-my-framework-language",
		question: "Will Synk be available for my framework/language?",
		answer: `While we may limit usage to certain languages during the beta phase, the goal is for Synk to be universally applicable. Since LLMs are framework agnostic, we can use them to generate documentation for any language.`,
	},
	{
		id: "why-is-synk-not-open-source-at-the-moment",
		question: "Why is Synk not open source at the moment?",
		answer:
			"We are still in the early stages of development. Even though we believe in the power of open source, we do not want to give the community a tool that is unstable and unfinished. \n\nBefore the first beta version is released, there will likely be a number of breaking changes, which can make it difficult to work in a (uncoordinated) community. As soon as we feel ready, we will open source the tool and accept contributions from the community.",
	},
	{
		id: "will-it-be-open-source-after-the-beta-phase",
		question: "Will it be open source after the beta phase?",
		answer:
			"Yes – and it will remain that way forever. We believe in the power of open source.",
	},
	{
		id: "how-can-i-contribute",
		question: "How can I contribute to Synk?",
		answer:
			"While in pre-beta, we are not accepting community contributions. \n\nIf you are interested in becoming a permanent member of the team and contributing to the development from the outset, you can contact us at any time by email at hello@maill.use-synk.com – we look forward to hearing from you.",
	},
];

export async function FAQSection({
	...props
}: React.ComponentProps<"section">) {
	return (
		<section {...props}>
			<div className="mx-auto w-full max-w-6xl px-8 py-32">
				<h2 className="font-serif text-4xl">Frequently asked questions</h2>
				<div className="grid gap-8 md:grid-cols-2">
					<div>
						<p className="mt-4 max-w-xl text-sm text-stone-500 dark:text-stone-400">
							We've received a lot of questions from our waitlist. This section is our
							attempt to answer some of the most frequently asked ones.
						</p>
						<span className="mt-6 block text-sm text-stone-500 dark:text-stone-400">
							Question not answered?{" "}
							<Link
								className="font-medium text-lime-500 dark:text-lime-400"
								href={"mailto:hello@mail.use-synk.com"}
							>
								Get in touch
							</Link>
						</span>
					</div>
					<div className="">
						{faqs.map((faq) => (
							<Collapsible
								className={
									"border-stone-200 border-b last:border-b-0 dark:border-stone-700"
								}
								key={faq.id}
							>
								<CollapsibleTrigger
									className={"w-full justify-start py-4 text-start text-sm"}
								>
									<h3 className="font-medium text-stone-800 dark:text-stone-100">
										{faq.question}
									</h3>
								</CollapsibleTrigger>
								<CollapsibleContent className={"pb-8"}>
									<p className="max-w-prose whitespace-pre-line text-sm text-stone-500 dark:text-stone-400">
										{faq.answer}
									</p>
								</CollapsibleContent>
							</Collapsible>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
