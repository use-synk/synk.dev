import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
	h1: (props: React.ComponentProps<"h1">) => (
		<h1 className="mb-6 font-serif text-5xl" {...props} />
	),
	h2: (props: React.ComponentProps<"h2">) => (
		<h2 className="mb-6 font-serif text-3xl" {...props} />
	),
	h3: (props: React.ComponentProps<"h3">) => (
		<h3 className="mt-6 mb-2 font-serif text-2xl" {...props} />
	),
	h4: (props: React.ComponentProps<"h4">) => (
		<h4 className="font-serif text-xl" {...props} />
	),
	p: (props: React.ComponentProps<"p">) => (
		<p
			className="mb-3 max-w-xl text-[0.9375rem] text-stone-600 leading-7 last:mb-0 dark:text-stone-300"
			{...props}
		/>
	),
	strong: (props: React.ComponentProps<"strong">) => (
		<strong
			className="font-medium text-stone-700 dark:text-stone-100"
			{...props}
		/>
	),
	hr: (props: React.ComponentProps<"hr">) => (
		<hr
			className="my-8 border-stone-200 border-dashed dark:border-stone-700"
			{...props}
		/>
	),
	ul: (props: React.ComponentProps<"ul">) => (
		<ul
			className="mb-3 list-inside list-disc text-[0.9375rem] text-stone-600 leading-7 last:mb-0 dark:text-stone-300"
			{...props}
		/>
	),
	ol: (props: React.ComponentProps<"ol">) => (
		<ol
			className="mb-3 list-inside list-decimal text-[0.9375rem] text-stone-600 leading-7 last:mb-0 dark:text-stone-300"
			{...props}
		/>
	),
	li: (props: React.ComponentProps<"li">) => (
		<li
			className="mb-1 text-[0.9375rem] text-stone-600 leading-7 last:mb-0 dark:text-stone-300"
			{...props}
		/>
	),
	table: (props: React.ComponentProps<"table">) => (
		<div className="my-6 overflow-x-auto">
			<table
				className="w-full border-collapse text-left text-[0.9375rem] text-stone-600 dark:text-stone-300"
				{...props}
			/>
		</div>
	),
	thead: (props: React.ComponentProps<"thead">) => (
		<thead className="border-stone-200 border-b dark:border-stone-700" {...props} />
	),
	tbody: (props: React.ComponentProps<"tbody">) => (
		<tbody className="divide-y divide-stone-200 dark:divide-stone-700" {...props} />
	),
	tr: (props: React.ComponentProps<"tr">) => (
		<tr className="align-top" {...props} />
	),
	th: (props: React.ComponentProps<"th">) => (
		<th
			className="px-3 py-2 font-medium text-[0.875rem] text-stone-800 dark:text-stone-100"
			{...props}
		/>
	),
	td: (props: React.ComponentProps<"td">) => (
		<td className="px-3 py-2 text-[0.875rem] leading-6" {...props} />
	),
};

export function useMDXComponents(): MDXComponents {
	return components;
}
