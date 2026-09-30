import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { BackToTop } from "@/components/shared/back-to-top";
import { Logo } from "@/components/shared/logo";
import { Magnetic } from "@/components/shared/magnetic";
import { RollText } from "@/components/shared/roll-text";
import { SectionLabel } from "@/components/shared/section-label";
import { SplitText } from "@/components/shared/split-text";
import { contact, delivery } from "@/config/content";
import { navLinks, siteConfig } from "@/config/site";

const words = ["Let’s", "talk"];

export default function Footer() {
	return (
		<footer
			id="contact"
			className="relative -mt-10 overflow-hidden bg-ink-deep pt-10 text-paper"
		>
			<div className="scroll-lift mx-auto flex max-w-[1600px] flex-col px-5 sm:px-8 lg:px-10">
				<div className="grid grid-cols-12 gap-x-6 gap-y-6 pt-24 md:items-end md:pt-32">
					<div className="col-span-12 md:col-span-7">
						<SectionLabel tone="dark">{contact.label}</SectionLabel>
						<h2 className="mt-6 font-light text-[clamp(2.25rem,5vw,4.5rem)] leading-none tracking-[-0.045em]">
							<SplitText text={contact.heading} />
						</h2>
					</div>
					<p className="col-span-12 text-lg text-mist leading-[1.55] md:col-span-5 lg:col-span-4 lg:col-start-9">
						{contact.body}
					</p>
				</div>

				<a
					href={`mailto:${siteConfig.mail}`}
					className="group my-14 flex flex-wrap items-center gap-x-6 gap-y-4 md:my-20"
				>
					<span
						aria-hidden
						className="flex gap-[0.22em] overflow-hidden font-light text-[clamp(4rem,15vw,14rem)] uppercase leading-[0.9] tracking-[-0.06em] transition-colors duration-500 group-hover:text-accent-light"
					>
						{words.map((word, index) => (
							<span
								key={word}
								className="scroll-rise inline-block"
								style={{ "--i": index * 6 } as React.CSSProperties}
							>
								{word}
							</span>
						))}
					</span>
					<span className="sr-only">Let’s talk: email {siteConfig.mail}</span>

					<Magnetic strength={0.4}>
						<span className="flex size-[clamp(3.5rem,7vw,7rem)] items-center justify-center rounded-full bg-accent text-paper transition-colors duration-500 group-hover:bg-paper group-hover:text-ink">
							<HugeiconsIcon
								icon={ArrowUpRight01Icon}
								className="size-2/5 transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
								strokeWidth={1.6}
							/>
						</span>
					</Magnetic>
				</a>

				<div className="grid gap-10 border-paper/20 border-t pt-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
					<div className="lg:col-span-4">
						<p className="font-semibold text-mist text-xs uppercase tracking-[0.12em]">
							Project enquiries
						</p>
						<a
							href={`mailto:${siteConfig.mail}`}
							className="group/roll mt-4 inline-flex items-center gap-2 text-xl sm:text-2xl"
						>
							<RollText>{siteConfig.mail}</RollText>
							<HugeiconsIcon
								icon={ArrowUpRight01Icon}
								size={20}
								strokeWidth={1.6}
							/>
						</a>
					</div>

					<div className="lg:col-span-4">
						<p className="font-semibold text-mist text-xs uppercase tracking-[0.12em]">
							Houston address
						</p>
						<address className="mt-4 text-lg not-italic leading-[1.5]">
							{siteConfig.address.map((line) => (
								<span key={line} className="block">
									{line}
								</span>
							))}
						</address>
						<a
							href={siteConfig.mapsUrl}
							target="_blank"
							rel="noreferrer"
							className="group/roll mt-4 inline-flex items-center gap-1.5 font-semibold text-accent-light text-sm uppercase tracking-[0.1em]"
						>
							<RollText>Open in Google Maps</RollText>
							<HugeiconsIcon icon={ArrowUpRight01Icon} size={16} />
						</a>
					</div>

					<div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-4 lg:items-end">
						<p className="font-semibold text-mist text-xs uppercase tracking-[0.12em]">
							Where we work
						</p>
						<ul className="flex flex-wrap gap-2 lg:justify-end">
							{delivery.locations.map((location) => (
								<li
									key={location.id}
									className="inline-flex h-10 items-center gap-2.5 rounded-full border border-paper/25 pr-4 pl-1.5 text-sm"
								>
									<img
										{...location.flag}
										alt=""
										loading="lazy"
										decoding="async"
										className="size-7 rounded-full object-cover"
									/>
									{location.country}
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="mt-14 flex flex-col gap-8 border-paper/20 border-t py-8 md:flex-row md:items-center md:justify-between">
					<Logo />

					<nav
						aria-label="Footer navigation"
						className="flex flex-wrap gap-x-6 gap-y-3 text-[15px]"
					>
						{navLinks.map((link) => (
							<a key={link.href} href={link.href} className="group/roll py-1">
								<RollText>{link.label}</RollText>
							</a>
						))}
					</nav>

					<div className="flex items-center justify-between gap-6 md:justify-end">
						<p className="text-mist text-sm">
							© {new Date().getFullYear()} {siteConfig.name}
						</p>
						<BackToTop />
					</div>
				</div>
			</div>
		</footer>
	);
}
