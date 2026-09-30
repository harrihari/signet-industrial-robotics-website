import { cn } from "@/lib/utils";

export function SectionLabel({
	children,
	tone = "light",
	className,
}: {
	children: React.ReactNode;
	/** Surface the label sits on; picks an accent shade that passes contrast. */
	tone?: "light" | "dark";
	className?: string;
}) {
	return (
		<p
			className={cn(
				"font-semibold text-xs uppercase tracking-[0.12em] sm:text-[13px]",
				tone === "dark" ? "text-accent-light" : "text-accent-ink",
				className,
			)}
		>
			{children}
		</p>
	);
}
