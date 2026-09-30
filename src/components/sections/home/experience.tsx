import { CountUp } from "@/components/shared/count-up";
import { Reveal } from "@/components/shared/reveal";
import { SectionLabel } from "@/components/shared/section-label";
import { SplitText } from "@/components/shared/split-text";
import { experience } from "@/config/content";
import { SectionIntro } from "./section-intro";

export default function Experience() {
	const { partner } = experience;

	return (
		<section
			id="experience"
			className="mx-auto max-w-[1600px] scroll-mt-20 px-5 pb-24 sm:px-8 md:pb-32 lg:px-10"
		>
			<SectionIntro
				label={experience.label}
				eyebrow={experience.eyebrow}
				heading={experience.heading}
				body={experience.body}
			/>

			<div className="mt-14 grid grid-cols-12 gap-6 md:mt-20">
				<div className="col-span-12 flex flex-col gap-6 lg:col-span-6">
					<ul className="grid grid-cols-1 border-line border-t sm:grid-cols-2">
						{experience.areas.map((area, index) => (
							<Reveal
								as="li"
								key={area}
								index={index}
								className="flex items-center gap-3 border-line border-b py-5 text-lg tracking-[-0.01em] sm:py-6 sm:text-xl sm:even:border-l sm:even:pl-6 sm:odd:pr-6"
							>
								<span className="size-2 shrink-0 rounded-full bg-accent" />
								{area}
							</Reveal>
						))}
					</ul>

					<div
						className="relative aspect-16/10 overflow-hidden rounded-lg bg-ink [view-timeline-name:--experience] lg:aspect-auto lg:flex-1"
						style={{ "--timeline": "--experience" } as React.CSSProperties}
					>
						<div className="scroll-parallax absolute inset-0">
							<img
								{...experience.image}
								sizes="(min-width: 1024px) 50vw, 100vw"
								alt={experience.imageAlt}
								loading="lazy"
								decoding="async"
								className="size-full scale-[1.2] object-cover"
							/>
						</div>
					</div>
				</div>

				<Reveal className="col-span-12 flex flex-col rounded-lg bg-ink p-7 text-paper sm:p-10 lg:col-span-6">
					<SectionLabel tone="dark">{partner.eyebrow}</SectionLabel>
					<h3 className="mt-6 max-w-lg font-light text-[clamp(2rem,3.4vw,3.25rem)] leading-[1.02] tracking-[-0.04em]">
						<SplitText text={partner.heading} />
					</h3>
					<p className="mt-6 max-w-xl text-lg text-mist leading-[1.6]">
						{partner.body}
					</p>

					<div className="mt-auto pt-12">
						<div className="flex flex-wrap items-end gap-x-6 gap-y-3 border-paper/20 border-t pt-8">
							<CountUp
								value={partner.stat.value}
								suffix={partner.stat.suffix}
								className="font-light text-8xl leading-[0.8] tracking-[-0.06em] sm:text-9xl"
							/>
							<div className="pb-1 text-base leading-snug">
								<p className="font-medium">{partner.stat.label}</p>
								<p className="text-mist">{partner.statNote}</p>
							</div>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
