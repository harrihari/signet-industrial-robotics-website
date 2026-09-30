import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Reveal } from "@/components/shared/reveal";
import { SectionLabel } from "@/components/shared/section-label";
import { SplitText } from "@/components/shared/split-text";
import { servicesIntro } from "@/config/content";
import { capabilities } from "@/config/services";
import { CapabilityPreview } from "./capability-preview";

export default function Capabilities() {
	return (
		<section
			id="capabilities"
			className="mx-auto max-w-[1600px] scroll-mt-20 px-5 py-24 sm:px-8 md:py-36 lg:px-10"
		>
			<div className="mx-auto max-w-4xl text-center">
				<Reveal>
					<SectionLabel>{servicesIntro.label}</SectionLabel>
					<p className="mt-3 text-base text-muted sm:text-lg">
						{servicesIntro.eyebrow}
					</p>
				</Reveal>
				<h2 className="mt-6 font-light text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.98] tracking-[-0.045em]">
					<SplitText text={servicesIntro.heading} />
				</h2>
			</div>

			{/* The list is server-rendered; only the cursor preview is a client island. */}
			<CapabilityPreview images={capabilities.map((item) => item.image)}>
				<ul className="mt-16 border-line border-t md:mt-24">
					{capabilities.map((capability, index) => (
						<Reveal
							as="li"
							key={capability.id}
							index={index}
							className="border-line border-b"
						>
							<a
								href="#contact"
								data-preview-index={index}
								className="group relative isolate grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 gap-y-2 py-7 sm:grid-cols-[3.5rem_1fr_auto] md:grid-cols-[4rem_minmax(0,1.3fr)_minmax(0,1fr)_auto] md:items-center md:gap-x-8 md:py-9"
							>
								<span
									aria-hidden
									className="absolute inset-0 -z-10 origin-bottom scale-y-0 rounded-md bg-soft transition-transform duration-700 ease-expo group-hover:scale-y-100"
								/>
								<span className="pt-1.5 font-semibold text-accent-ink text-sm tracking-[0.1em] md:pt-0 md:pl-4">
									{capability.id}
								</span>
								<span className="text-2xl leading-tight tracking-[-0.03em] transition-transform duration-700 ease-expo md:text-3xl md:group-hover:translate-x-2 lg:text-[2.5rem]">
									{capability.title}
								</span>
								<span className="col-start-2 row-start-2 text-base text-muted leading-[1.5] md:col-start-auto md:row-start-auto md:text-lg">
									{capability.description}
								</span>
								<span className="col-start-3 row-start-1 flex size-11 items-center justify-center rounded-full border border-ink/20 transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-paper md:col-start-auto md:row-start-auto md:mr-4">
									<HugeiconsIcon
										icon={ArrowUpRight01Icon}
										size={18}
										strokeWidth={1.6}
									/>
								</span>
							</a>
						</Reveal>
					))}
				</ul>
			</CapabilityPreview>
		</section>
	);
}
