"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { joinWaitlist } from "@/app/actions/waitlist";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Field, FieldDescription, FieldGroup } from "./ui/field";

const formSchema = z.object({
	email: z.email(),
});

export function JoinWaitlist({
	...props
}: Omit<React.ComponentProps<"form">, "onSubmit">) {
	const [submitState, setSubmitState] = useState<
		"idle" | "success" | "already_registered" | "error"
	>("idle");

	const form = useForm({
		defaultValues: {
			email: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			const result = await joinWaitlist(value.email);
			if (result.success) {
				setSubmitState("success");
				toast.success("You're on the list! We'll be in touch soon.");
			} else if (result.error === "already_registered") {
				setSubmitState("already_registered");
				toast.error("This email is already on the waitlist.");
			} else if (result.error === "rate_limited") {
				setSubmitState("error");
				toast.error("Too many attempts. Please try again in a minute.");
			} else {
				setSubmitState("error");
				toast.error("Something went wrong. Please try again.");
			}
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				setSubmitState("idle");
				form.handleSubmit();
			}}
			{...props}
		>
			<FieldGroup className="flex sm:flex-row">
				<form.Field name="email">
					{(field) => {
						const isInvalid = !field.state.meta.isValid && field.state.meta.isTouched;
						return (
							<Field>
								<input
									aria-invalid={isInvalid}
									className={cn(
										"flex h-8 items-center justify-center rounded-md bg-background px-3 text-sm text-stone-800 shadow-xs ring-1 ring-stone-700/10 placeholder:text-stone-500 sm:h-7",
										"focus-visible:outline-none focus-visible:ring-lime-500 disabled:opacity-70 aria-invalid:border aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
										"dark:text-stone-50 dark:ring-stone-50/20 dark:placeholder:text-stone-400",
									)}
									disabled={submitState === "success"}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="Email"
									type="email"
									value={field.state.value}
								/>
							</Field>
						);
					}}
				</form.Field>
				<form.Subscribe
					selector={(formState) => [formState.isDirty, formState.isSubmitting]}
				>
					{([isDirty, isSubmitting]) => (
						<button
							className="inset-shadow-2xs inset-shadow-white/35 flex h-8 shrink-0 items-center justify-center gap-2 rounded-md bg-linear-to-b from-lime-400 to-lime-500 px-3 py-1.5 font-medium text-lime-950 text-sm ring-1 ring-lime-500 disabled:pointer-events-none disabled:opacity-70 sm:h-7"
							disabled={!isDirty || isSubmitting || submitState === "success"}
							type="submit"
						>
							{isSubmitting ? "Joining…" : "Join waitlist"}
						</button>
					)}
				</form.Subscribe>
			</FieldGroup>
			<FieldDescription className="mt-4! max-w-xs text-stone-500 text-xs dark:text-stone-400">
				By submitting this form, you agree to our{" "}
				<Link href={siteConfig.routes.privacyPolicy}>privacy policy</Link> and{" "}
				<Link href={siteConfig.routes.termsOfService}>terms of service</Link>.
			</FieldDescription>
		</form>
	);
}
