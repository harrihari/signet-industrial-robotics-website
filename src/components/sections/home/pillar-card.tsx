import { Tag } from "@/components/shared/tag";
import type { Pillar } from "@/types";

type PillarCardProps = {
	pillar: Pillar;
	total: number;
};

export function PillarCard({ pillar, total }: PillarCardProps) {
	const count = String(total).padStart(2, "0");

	return (
		<article className="group relative isolate h-[80svh] min-h-[540px] w-full shrink-0 snap-start overflow-hidden rounded-lg bg-ink text-paper md:h-[86svh] md:w-[80vw] lg:w-[70vw]">
			{/* Wrapper carries the scroll drift (`translate`); the image carries the
			    hover zoom (`scale`), so the two never fight over one property. */}
			<div className="md:scroll-drift absolute inset-0 -z-10">
				<img
					{...pillar.image}
					sizes="(min-width: 1024px) 70vw, (min-width: 768px) 80vw, 100vw"
					alt={pillar.imageAlt}
					loading="lazy"
					decoding="async"
					className="size-full scale-[1.2] object-cover transition-transform duration-1200 ease-out-quart group-hover:scale-[1.24]"
				/>
			</div>
			{/* Scrims top and bottom so labels stay legible over bright skies/decks. */}
			<div className="absolute inset-0 -z-10 bg-linear-to-b from-ink/70 via-35% via-transparent to-transparent" />
			<div className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-35% via-ink/75 to-70% to-transparent" />

			<div className="flex items-start justify-between gap-4 p-5 font-semibold text-xs uppercase tracking-[0.12em] sm:p-8">
				<span>
					{pillar.id} / {count}
				</span>
				<span className="text-right">{pillar.eyebrow}</span>
			</div>

			<div className="absolute inset-x-0 bottom-0 grid grid-cols-12 items-end gap-x-6 gap-y-6 p-5 sm:p-8">
				<div className="col-span-12 xl:col-span-8">
					<h3 className="font-light text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.05em]">
						{pillar.title}
					</h3>
					<p className="mt-4 max-w-lg text-lg text-mist leading-snug sm:text-xl">
						{pillar.description}
					</p>

					<dl className="mt-6 hidden max-w-lg grid-cols-2 gap-x-8 text-sm leading-[1.5] sm:grid">
						<div>
							<dt className="mb-1.5 font-semibold text-xs uppercase tracking-[0.12em]">
								Focus
							</dt>
							<dd className="text-mist">{pillar.focus.join(" · ")}</dd>
						</div>
						<div>
							<dt className="mb-1.5 font-semibold text-xs uppercase tracking-[0.12em]">
								Setting
							</dt>
							<dd className="text-mist">{pillar.region}</dd>
						</div>
					</dl>
				</div>

				<ul className="col-span-12 flex flex-wrap gap-2 xl:col-span-4 xl:justify-end">
					{pillar.tags.map((tag) => (
						<li key={tag}>
							<Tag>{tag}</Tag>
						</li>
					))}
				</ul>
			</div>
		</article>
	);
}
