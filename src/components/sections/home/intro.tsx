import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { PillButton } from "@/components/shared/pill-button";
import { Reveal } from "@/components/shared/reveal";
import { SectionLabel } from "@/components/shared/section-label";
import { SplitText } from "@/components/shared/split-text";
import { about } from "@/config/content";
import { ImagesConfig } from "@/config/images";

export default function Intro() {
	return (
		<section className="mx-auto grid max-w-[1600px] grid-cols-12 gap-x-6 px-5 pt-24 pb-20 sm:px-8 md:pt-32 md:pb-28 lg:px-10">
			<Reveal className="col-span-12 mb-6 lg:col-span-3 lg:mb-0">
				<SectionLabel>{about.label}</SectionLabel>
			</Reveal>

			<h2 className="col-span-12 font-light text-[clamp(1.875rem,3.6vw,3.25rem)] leading-[1.1] tracking-[-0.035em] md:col-span-9 lg:col-span-6">
				<SplitText text={about.heading} />
			</h2>

			<div className="col-span-12 mt-10 flex md:col-span-3 md:mt-0 md:justify-end">
				<div className="scroll-circle aspect-square w-36 overflow-hidden rounded-full bg-ink sm:w-44 md:w-full md:max-w-64">
					<img
						{...ImagesConfig.intro}
						sizes="(min-width: 768px) 256px, 176px"
						alt="Inspection ROV on a vessel deck"
						loading="lazy"
						decoding="async"
						className="scroll-zoom size-full object-cover"
					/>
				</div>
			</div>

			<div className="col-span-12 mt-16 grid grid-cols-12 items-end gap-x-6 gap-y-10 md:mt-24">
				<dl className="col-span-12 grid grid-cols-3 gap-x-4 sm:gap-x-6 lg:col-span-9">
					{about.facts.map((fact, index) => (
						<Reveal
							key={fact.label}
							index={index}
							className="flex flex-col-reverse border-line border-t pt-5"
						>
							<dt className="mt-2 text-muted text-sm leading-snug sm:text-base">
								{fact.label}
							</dt>
							<dd className="font-light text-5xl leading-none tracking-[-0.05em] sm:text-6xl lg:text-7xl">
								{fact.value}
							</dd>
						</Reveal>
					))}
				</dl>

				<Reveal
					index={3}
					className="col-span-12 flex lg:col-span-3 lg:justify-end"
				>
					<PillButton href="#capabilities" icon={ArrowUpRight01Icon}>
						Explore our services
					</PillButton>
				</Reveal>
			</div>
		</section>
	);
}
