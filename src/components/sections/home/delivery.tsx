import { Reveal } from "@/components/shared/reveal";
import { delivery } from "@/config/content";
import { cn } from "@/lib/utils";
import { SectionIntro } from "./section-intro";

export default function Delivery() {
	return (
		<section id="approach" className="scroll-mt-20 bg-soft">
			<div className="mx-auto max-w-[1600px] px-5 pt-20 pb-28 sm:px-8 md:pt-28 md:pb-36 lg:px-10">
				<SectionIntro
					label={delivery.label}
					eyebrow={delivery.eyebrow}
					heading={delivery.heading}
					body={delivery.body}
				/>

				{/* Six-column grid: three cards on the first row, two wider ones on the second. */}
				<div className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-20 lg:grid-cols-6 lg:gap-6">
					{delivery.locations.map((location, index) => (
						<Reveal
							as="article"
							key={location.id}
							index={index}
							className={cn(
								"group relative isolate flex min-h-64 flex-col justify-between overflow-hidden rounded-lg border border-line bg-paper p-6 transition-colors duration-500 hover:border-ink/30 sm:p-8 lg:min-h-80",
								index < 3 ? "lg:col-span-2" : "lg:col-span-3",
								index === delivery.locations.length - 1 &&
									index % 2 === 0 &&
									"sm:col-span-2",
							)}
						>
							<div className="flex items-start justify-between gap-4">
								<p className="inline-flex items-center gap-2 font-semibold text-accent-ink text-sm uppercase tracking-[0.1em]">
									{location.id}
									<span
										aria-hidden
										className="size-2 rounded-full bg-paper shadow-[0_0_0_1px_rgb(16_43_54/0.25)]"
									/>
								</p>
								<img
									{...location.flag}
									alt={`Flag of ${location.country}`}
									loading="lazy"
									decoding="async"
									className="h-9 w-auto rounded-sm shadow-[0_0_0_1px_rgb(16_43_54/0.12)] transition-transform duration-700 ease-expo group-hover:-rotate-3 group-hover:scale-110 sm:h-11"
								/>
							</div>

							{/* Oversized, faint flag as a texture that reveals on hover. */}
							<img
								{...location.flag}
								alt=""
								aria-hidden
								loading="lazy"
								decoding="async"
								className="absolute -right-12 -bottom-10 -z-10 h-48 w-auto rotate-[-8deg] opacity-[0.06] blur-[1px] transition-all duration-1000 ease-out-quart group-hover:-right-6 group-hover:opacity-15"
							/>

							<div className="mt-12">
								<h3 className="font-light text-4xl tracking-[-0.04em] sm:text-5xl">
									{location.country}
								</h3>
								<p className="mt-2 text-base text-muted">{location.detail}</p>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
