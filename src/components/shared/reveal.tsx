import { cn } from "@/lib/utils";

type RevealProps = {
	children: React.ReactNode;
	className?: string;
	/** Stagger step: each step starts the reveal slightly later in the scroll. */
	index?: number;
	as?: "div" | "li" | "article";
};

/** Fades a block up as it scrolls into view (CSS scroll-driven, no JS). */
export function Reveal({
	children,
	className,
	index = 0,
	as: Tag = "div",
}: RevealProps) {
	return (
		<Tag
			className={cn("scroll-reveal", className)}
			style={{ "--i": index } as React.CSSProperties}
		>
			{children}
		</Tag>
	);
}
