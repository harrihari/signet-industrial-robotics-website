import {
	ArrowDown01Icon,
	ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { PillButton } from "@/components/shared/pill-button";
import { SectionLabel } from "@/components/shared/section-label";
import { ImagesConfig } from "@/config/images";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const headline = ["Industrial expertise.", "Digital intelligence."];

/** Shared entrance classes; reduced-motion users get the final state immediately. */
const fadeUp = "animate-fade-up motion-reduce:animate-none";

/**
 * Server component with CSS-only entrance animations: the headline and hero
 * image paint from the first frame of HTML instead of waiting for hydration,
 * which keeps LCP fast. No scroll-linked motion here: parallax on the hero
 * visibly jittered against smooth scrolling.
 */
export default function Hero() {
	return (
		<section
			id="top"
			className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink text-paper"
		>
			<div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
				<img
					{...ImagesConfig.hero}
					// Decorative background under a 75% scrim (the LCP element is the
					// headline), so it loads at normal priority and phones take 720w.
					sizes="(max-width: 767px) 400px, (max-aspect-ratio: 4/3) 134vh, 100vw"
					alt=""
					decoding="async"
					className="size-full animate-hero-zoom object-cover motion-reduce:animate-none"
				/>
			</div>
			{/* Static scrim keeps text contrast consistent over any image. */}
			<div
				aria-hidden
				className="absolute inset-0 -z-10 bg-ink/75 bg-linear-to-b from-ink/40 via-transparent to-ink"
			/>

			<div className="mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-12 content-end gap-x-6 gap-y-10 px-5 pt-32 pb-12 sm:px-8 md:pb-16 lg:px-10">
				<div className="col-span-12 xl:col-span-8">
					<div className={cn(fadeUp, "[animation-delay:150ms]")}>
						<SectionLabel tone="dark">{siteConfig.eyebrow}</SectionLabel>
					</div>
					<h1 className="mt-6 font-light text-[clamp(3rem,8vw,8rem)] leading-[0.95] tracking-[-0.05em]">
						{headline.map((line, index) => (
							// The mask extends below the line box so descenders aren't
							// clipped; the negative margin keeps line spacing unchanged.
							<span
								key={line}
								className="-mb-[0.25em] block overflow-hidden pb-[0.25em]"
							>
								<span
									className={cn(
										"block animate-rise motion-reduce:animate-none",
										index === 0
											? "[animation-delay:250ms]"
											: "text-mist [animation-delay:340ms]",
									)}
								>
									{line}
								</span>
							</span>
						))}
					</h1>
				</div>

				<div className="col-span-12 flex flex-col items-start justify-center gap-7 sm:col-span-9 md:col-span-7 xl:col-span-4 xl:pt-6 xl:pb-3">
					<p
						className={cn(
							fadeUp,
							"max-w-md text-lg text-mist leading-normal [animation-delay:600ms] sm:text-xl",
						)}
					>
						{siteConfig.intro}
					</p>
					<div className={cn(fadeUp, "[animation-delay:720ms]")}>
						<PillButton
							tone="accent"
							size="md"
							href="#capabilities"
							icon={ArrowUpRight01Icon}
						>
							Explore our services
						</PillButton>
					</div>
				</div>
			</div>

			<div
				className={cn(
					fadeUp,
					"mx-auto grid w-full max-w-[1600px] grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 border-paper/15 border-t px-5 py-5 [animation-delay:900ms] sm:px-8 md:grid-cols-12 lg:px-10",
				)}
			>
				<p className="font-medium text-base md:col-span-4">
					{siteConfig.tagline}
				</p>
				<a
					href="#capabilities"
					aria-label="Scroll to services"
					className="row-span-2 flex justify-end md:order-last md:col-span-1 md:row-span-1"
				>
					<span className="flex size-11 animate-nudge items-center justify-center rounded-full border border-paper/40 motion-reduce:animate-none">
						<HugeiconsIcon icon={ArrowDown01Icon} size={18} strokeWidth={1.8} />
					</span>
				</a>
				<p className="font-semibold text-mist text-xs uppercase tracking-[0.12em] md:col-span-7">
					{siteConfig.regions.join(" · ")}
				</p>
			</div>
		</section>
	);
}
