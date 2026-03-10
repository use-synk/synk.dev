import { Footer } from "@/components/footer";

export default async function ServerLayout(params: LayoutProps<"/legal">) {
	const { children } = params;
	return (
		<main>
			<article className="mx-auto w-full max-w-6xl border-stone-200 border-x border-dashed px-8 py-32 dark:border-stone-700">
				{children}
			</article>
			<Footer />
		</main>
	);
}
