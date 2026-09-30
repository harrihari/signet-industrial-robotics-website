import { SectionLabel } from "@/components/shared/section-label";
import { SplitText } from "@/components/shared/split-text";
import { showcase } from "@/config/content";
import { ImagesConfig } from "@/config/images";

export default function Showcase() {
	return (
		<section
			className="relative isolate flex h-[80svh] min-h-[480px] items-end overflow-hidden bg-ink text-paper [view-timeline-name:--showcase] md:h-[100svh]"
			style={{ "--timeline": "--showcase" } as React.CSSProperties}
		>
			<div className="scroll-parallax absolute inset-0 -z-10">
				<img
					{...ImagesConfig.showcase}
					sizes="100vw"
					alt="Industrial digital twin workstation"
					loading="lazy"
					decoding="async"
					className="size-full scale-[1.25] object-cover"
				/>
			</div>
			<div className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-40% via-ink/60 to-ink/10" />

			<div className="mx-auto w-full max-w-[1600px] px-5 pb-12 sm:px-8 md:pb-20 lg:px-10">
				<SectionLabel tone="dark">{showcase.eyebrow}</SectionLabel>
				<p className="mt-5 max-w-4xl font-light text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-[-0.045em]">
					<SplitText text={showcase.heading} />
				</p>
			</div>
		</section>
	);
}
