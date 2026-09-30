import { cn } from "@/lib/utils";

/**
 * Duplicated label that rolls upward on hover. The hover target must carry the
 * named group class `group/roll`.
 */
export function RollText({
	children,
	className,
}: {
	children: string;
	className?: string;
}) {
	return (
		<span className={cn("relative inline-flex overflow-hidden", className)}>
			<span className="block transition-transform duration-500 ease-expo group-hover/roll:-translate-y-full">
				{children}
			</span>
			<span
				aria-hidden
				className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-expo group-hover/roll:translate-y-0"
			>
				{children}
			</span>
		</span>
	);
}
