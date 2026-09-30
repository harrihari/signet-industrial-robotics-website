"use client";

import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { useLenis } from "lenis/react";
import {
	AnimatePresence,
	m,
	useMotionValueEvent,
	useScroll,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/shared/logo";
import { PillButton } from "@/components/shared/pill-button";
import { RollText } from "@/components/shared/roll-text";
import { navLinks, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { easeExpo, easeOutQuart } from "@/lib/utils/motion";

export default function Header() {
	const lenis = useLenis();
	const { scrollY } = useScroll();
	const [scrolled, setScrolled] = useState(false);
	const [hidden, setHidden] = useState(false);
	const [open, setOpen] = useState(false);
	const lastY = useRef(0);

	useMotionValueEvent(scrollY, "change", (latest) => {
		const delta = latest - lastY.current;
		// Ignore sub-pixel jitter from smooth scrolling so the bar doesn't flicker.
		if (Math.abs(delta) < 6) return;
		lastY.current = latest;
		setScrolled(latest > 40);
		setHidden(latest > 480 && delta > 0);
	});

	useEffect(() => {
		if (open) lenis?.stop();
		else lenis?.start();
	}, [open, lenis]);

	useEffect(() => {
		if (!open) return;
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);

	return (
		<>
			<m.header
				className={cn(
					"fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500",
					scrolled && !open
						? "border-paper/10 border-b bg-ink-deep"
						: "border-transparent border-b bg-transparent",
				)}
				animate={{ y: hidden && !open ? "-100%" : "0%" }}
				transition={{ duration: 0.5, ease: easeOutQuart }}
			>
				<div className="mx-auto flex h-18 max-w-[1600px] items-center justify-between gap-6 px-5 sm:px-8 lg:h-20 lg:px-10">
					<Logo />

					<nav
						aria-label="Primary navigation"
						className="hidden items-center gap-8 font-medium text-[15px] text-paper lg:flex"
					>
						{navLinks.map((link) => (
							<a key={link.href} href={link.href} className="group/roll">
								<RollText>{link.label}</RollText>
							</a>
						))}
					</nav>

					<div className="flex items-center gap-3">
						<PillButton
							tone="dark"
							href="#contact"
							icon={ArrowUpRight01Icon}
							className="hidden sm:inline-flex"
						>
							Discuss a project
						</PillButton>

						<button
							type="button"
							aria-label={open ? "Close menu" : "Open menu"}
							aria-expanded={open}
							aria-controls="mobile-nav"
							onClick={() => setOpen((value) => !value)}
							className="relative flex size-11 items-center justify-center rounded-full border border-paper/40 text-paper lg:hidden"
						>
							<m.span
								className="absolute h-0.5 w-5 rounded-full bg-paper"
								animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
								transition={{ duration: 0.4, ease: easeExpo }}
							/>
							<m.span
								className="absolute h-0.5 w-5 rounded-full bg-paper"
								animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
								transition={{ duration: 0.4, ease: easeExpo }}
							/>
						</button>
					</div>
				</div>
			</m.header>

			<AnimatePresence>
				{open && (
					<m.div
						id="mobile-nav"
						className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink-deep px-5 pt-28 pb-8 text-paper sm:px-8 lg:hidden"
						initial={{ clipPath: "inset(0 0 100% 0)" }}
						animate={{ clipPath: "inset(0 0 0% 0)" }}
						exit={{ clipPath: "inset(0 0 100% 0)" }}
						transition={{ duration: 0.7, ease: easeExpo }}
					>
						<nav aria-label="Mobile navigation" className="flex flex-col">
							{navLinks.map((link, index) => (
								<a
									key={link.href}
									href={link.href}
									onClick={() => setOpen(false)}
									className="overflow-hidden border-paper/15 border-b py-4"
								>
									<m.span
										className="flex items-baseline gap-4 font-light text-[clamp(2.25rem,10vw,3.75rem)] leading-none tracking-[-0.04em]"
										initial={{ y: "110%" }}
										animate={{ y: 0 }}
										transition={{
											duration: 0.8,
											delay: 0.25 + index * 0.06,
											ease: easeOutQuart,
										}}
									>
										<span className="font-semibold text-accent-light text-xs tracking-[0.12em]">
											0{index + 1}
										</span>
										{link.label}
									</m.span>
								</a>
							))}
						</nav>

						<m.div
							className="mt-auto flex flex-col gap-6 pt-10"
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.6, ease: easeOutQuart }}
						>
							<PillButton
								tone="accent"
								size="md"
								href="#contact"
								icon={ArrowUpRight01Icon}
								className="self-start"
								onClick={() => setOpen(false)}
							>
								Discuss a project
							</PillButton>
							<div className="flex flex-wrap justify-between gap-4 text-mist text-sm">
								<a href={`mailto:${siteConfig.mail}`}>{siteConfig.mail}</a>
								<span>{siteConfig.regions.join(" · ")}</span>
							</div>
						</m.div>
					</m.div>
				)}
			</AnimatePresence>
		</>
	);
}
