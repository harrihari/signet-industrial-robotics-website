import { cn } from "@/lib/utils";

/** Non-interactive pill label. */
export function Tag({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<span
			className={cn(
				"inline-flex h-9 items-center rounded-full border border-paper/40 bg-ink/40 px-4 font-semibold text-paper text-xs uppercase tracking-[0.08em] backdrop-blur-sm",
				className,
			)}
		>
			{children}
		</span>
	);
}
