import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LogoDark from "public/woodmark-dark.svg";
import LogoLight from "public/woodmark-light.svg";
import type React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Navbar() {
	return (
		<nav>
			<div className="mx-auto flex w-full max-w-6xl items-center justify-start gap-8 border-stone-200 border-x border-dashed px-8 py-4 dark:border-stone-700">
				<Link href={siteConfig.routes.home}>
					<Image
						alt="Logo"
						className="hidden h-5 w-auto dark:block"
						src={LogoLight}
					/>
					<Image
						alt="Logo"
						className="block h-5 w-auto dark:hidden"
						src={LogoDark}
					/>
				</Link>
				<div className="ml-auto flex items-center justify-center gap-6">
					<ThemeToggle />
					<NavLink href={"#"}>About</NavLink>
					<NavLink href={siteConfig.projectRepo.url} target="_blank">
						GitHub
						<ArrowUpRightIcon className="size-4 text-stone-500 dark:text-stone-400" />
					</NavLink>
				</div>
			</div>
		</nav>
	);
}

function NavLink({ className, ...props }: React.ComponentProps<typeof Link>) {
	return (
		<Link
			className={cn(
				"flex items-center justify-center gap-1.5 font-medium text-sm text-stone-700 transition-colors hover:text-stone-500 dark:text-stone-300 dark:hover:text-stone-100",
				className,
			)}
			{...props}
		/>
	);
}
