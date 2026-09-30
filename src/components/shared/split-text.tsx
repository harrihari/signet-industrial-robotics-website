import { cn } from "@/lib/utils";

type SplitTextProps = {
	/** A single string is split by words; an array is revealed line by line. */
	text: string | string[];
	className?: string;
};

/**
 * Masked word/line reveal on scroll (CSS scroll-driven, no JS). Screen readers
 * get the sentence once; the split spans are hidden from them.
 */
export function SplitText({ text, className }: SplitTextProps) {
	const byLine = Array.isArray(text);
	const parts = byLine ? text : text.split(" ");

	return (
		<span className={cn("block", className)}>
			<span className="sr-only">{byLine ? text.join(" ") : text}</span>
			{parts.map((part, index) => (
				<span
					key={`${part}-${index}`}
					aria-hidden
					className={cn(
						// The mask extends 0.25em below the line box so descenders
						// (g, p, y) aren't clipped at tight line heights; the negative
						// margin cancels it so spacing is unchanged.
						"-mb-[0.25em] overflow-hidden pb-[0.25em] align-top",
						byLine ? "block" : "inline-flex",
					)}
				>
					<span
						className="scroll-rise block"
						style={{ "--i": index } as React.CSSProperties}
					>
						{part}
						{/* Non-breaking: a normal trailing space collapses inside the word box. */}
						{!byLine && index < parts.length - 1 && " "}
					</span>
				</span>
			))}
		</span>
	);
}
