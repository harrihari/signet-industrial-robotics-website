import { Reveal } from "@/components/shared/reveal";
import { SectionLabel } from "@/components/shared/section-label";
import { SplitText } from "@/components/shared/split-text";
import { cn } from "@/lib/utils";

type SectionIntroProps = {
	label: string;
	eyebrow: string;
	heading: string | string[];
	body: string;
	className?: string;
};

/** Label row, then a large heading and supporting paragraph aligned on their baseline. */
export function SectionIntro({
	label,
	eyebrow,
	heading,
	body,
	className,
}: SectionIntroProps) {
	return (
		<div
			className={cn(
				"grid grid-cols-12 gap-x-6 gap-y-8 md:items-end",
				className,
			)}
		>
			<Reveal className="col-span-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-line border-t pt-6">
				<SectionLabel>{label}</SectionLabel>
				<p className="font-semibold text-muted text-xs uppercase tracking-[0.12em] sm:text-[13px]">
					{eyebrow}
				</p>
			</Reveal>

			<h2 className="col-span-12 font-light text-[clamp(2.25rem,5vw,4.5rem)] leading-[1] tracking-[-0.045em] md:col-span-7">
				<SplitText text={heading} />
			</h2>

			<Reveal
				index={2}
				className="col-span-12 text-lg text-muted leading-[1.55] md:col-span-5 md:pb-1 lg:col-span-4 lg:col-start-9"
			>
				{body}
			</Reveal>
		</div>
	);
}
