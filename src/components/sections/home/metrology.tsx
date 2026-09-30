import { Reveal } from "@/components/shared/reveal";
import { metrology } from "@/config/content";
import { SectionIntro } from "./section-intro";

export default function Metrology() {
	return (
		<section
			id="metrology"
			className="mx-auto max-w-[1600px] scroll-mt-20 px-5 py-24 sm:px-8 md:py-32 lg:px-10"
		>
			<SectionIntro
				label={metrology.label}
				eyebrow={metrology.eyebrow}
				heading={metrology.heading}
				body={metrology.body}
			/>

			<ol className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 md:mt-20 xl:grid-cols-4">
				{metrology.steps.map((step, index) => (
					<li
						key={step.id}
						// The tile stays put and only its content reveals, so the grid lines never show through.
						className="group relative flex min-h-64 flex-col bg-paper sm:min-h-72"
					>
						<span
							aria-hidden
							className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-700 ease-expo group-hover:scale-x-100"
						/>
						<Reveal index={index} className="flex flex-1 flex-col p-6 sm:p-8">
							<div className="flex items-center justify-between">
								<span className="font-semibold text-accent-ink text-sm tracking-[0.1em]">
									Step {step.id}
								</span>
								<span
									aria-hidden
									data-step={step.id}
									// Decorative numeral rendered via ::before so it isn't treated as low-contrast text.
									className="font-light text-6xl text-ink/15 leading-none tracking-[-0.05em] transition-colors duration-500 before:content-[attr(data-step)] group-hover:text-accent/80"
								/>
							</div>
							<h3 className="mt-auto pt-12 text-2xl leading-tight tracking-[-0.025em]">
								{step.title}
							</h3>
							<p className="mt-3 text-base text-muted leading-[1.55]">
								{step.description}
							</p>
						</Reveal>
					</li>
				))}
			</ol>
		</section>
	);
}
