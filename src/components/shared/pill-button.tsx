import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark" | "accent";

type PillButtonProps = {
	children: React.ReactNode;
	href?: string;
	onClick?: () => void;
	icon?: IconSvgElement;
	tone?: Tone;
	size?: "sm" | "md";
	className?: string;
};

const toneClasses: Record<Tone, { base: string; fill: string }> = {
	light: {
		base: "border-ink/30 text-ink hover:text-paper",
		fill: "bg-ink",
	},
	dark: {
		base: "border-paper/40 text-paper hover:text-ink",
		fill: "bg-paper",
	},
	accent: {
		base: "border-accent bg-accent text-paper hover:text-ink",
		fill: "bg-paper",
	},
};

/**
 * Uses the named `group/pill` so the fill only reacts to hovering the button
 * itself, not an ancestor `group` (e.g. a hoverable card).
 */
export function PillButton({
	children,
	href,
	onClick,
	icon,
	tone = "light",
	size = "sm",
	className,
}: PillButtonProps) {
	const styles = toneClasses[tone];
	const classes = cn(
		"group/pill relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full border font-semibold uppercase leading-none tracking-[0.08em] transition-colors duration-500 ease-expo focus-visible:outline-2 focus-visible:outline-accent-light focus-visible:outline-offset-2",
		size === "sm"
			? "h-10 px-4 text-xs"
			: "h-12 px-6 text-[13px] sm:h-14 sm:px-7",
		styles.base,
		className,
	);

	const content = (
		<>
			<span
				aria-hidden
				className={cn(
					"absolute inset-0 translate-y-[101%] rounded-full transition-transform duration-500 ease-expo group-hover/pill:translate-y-0",
					styles.fill,
				)}
			/>
			<span className="relative">{children}</span>
			{icon && (
				<HugeiconsIcon
					icon={icon}
					size={size === "sm" ? 14 : 16}
					strokeWidth={1.8}
					className="relative transition-transform duration-500 ease-expo group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-0.5"
				/>
			)}
		</>
	);

	if (href) {
		const external = href.startsWith("http");
		return (
			<a
				href={href}
				onClick={onClick}
				className={classes}
				target={external ? "_blank" : undefined}
				rel={external ? "noreferrer" : undefined}
			>
				{content}
			</a>
		);
	}

	return (
		<button type="button" onClick={onClick} className={classes}>
			{content}
		</button>
	);
}
