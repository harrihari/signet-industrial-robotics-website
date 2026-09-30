import { cn } from "@/lib/utils";

/** Signum wordmark: "signum." with the accent dot and the "Industrial AI" descriptor. */
export function Logo({
	className,
	tone = "dark",
}: {
	className?: string;
	tone?: "light" | "dark";
}) {
	return (
		<a
			href="#top"
			className={cn(
				"inline-flex items-center gap-3",
				tone === "dark" ? "text-paper" : "text-ink",
				className,
			)}
		>
			<span className="space-x-px font-extrabold text-[1.75rem] leading-none tracking-[-0.01em] sm:text-[2rem]">
				signum<span className="text-accent-bright">.</span>
			</span>
			<span
				className={cn(
					// Nudged down so the caps centre on the wordmark's x-height, not
					// its line box (measured: 2.5px at 28px, 3px at 32px).
					"translate-y-[2.5px] whitespace-nowrap border-l py-1 pl-3 font-semibold text-[11px] uppercase leading-none tracking-[0.14em] sm:translate-y-0.7",
					tone === "dark" ? "border-paper/25" : "border-ink/20",
				)}
			>
				Industrial AI
			</span>
		</a>
	);
}
