import { pillars } from "@/config/services";
import { PillarCard } from "./pillar-card";

/**
 * md+ with scroll-timeline support: a tall section whose sticky inner track
 * slides sideways as you scroll (CSS scroll-driven, no JS).
 * md+ without support (e.g. Firefox): a swipeable, snapping horizontal row.
 * Phones: a plain vertical stack.
 */
export default function Pillars() {
	return (
		<section
			aria-label="What we do"
			className="relative [view-timeline-name:--pillars] supports-[animation-timeline:view()]:md:h-(--track-height)"
			style={
				{
					"--track-height": `${pillars.length * 90}svh`,
					"--timeline": "--pillars",
				} as React.CSSProperties
			}
		>
			<div className="not-supports-[animation-timeline:view()]:md:snap-x not-supports-[animation-timeline:view()]:md:snap-mandatory not-supports-[animation-timeline:view()]:md:overflow-x-auto supports-[animation-timeline:view()]:md:sticky supports-[animation-timeline:view()]:md:top-0 supports-[animation-timeline:view()]:md:flex supports-[animation-timeline:view()]:md:h-svh supports-[animation-timeline:view()]:md:items-center supports-[animation-timeline:view()]:md:overflow-hidden">
				<div className="md:scroll-track flex flex-col gap-3 px-3 sm:gap-4 sm:px-4 md:w-max md:flex-row md:gap-4 md:px-4">
					{pillars.map((pillar) => (
						<PillarCard
							key={pillar.id}
							pillar={pillar}
							total={pillars.length}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
