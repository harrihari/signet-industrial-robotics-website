"use client";

import { AnimatePresence, m, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import { easeExpo, easeOutQuart } from "@/lib/utils/motion";
import type { Picture } from "@/types";

const spring = { stiffness: 150, damping: 20, mass: 0.5 };

/**
 * Client island: wraps the server-rendered capability list and shows an image
 * preview that follows the mouse. Rows opt in with `data-preview-index`.
 */
export function CapabilityPreview({
	images,
	children,
}: {
	images: Picture[];
	children: React.ReactNode;
}) {
	const [active, setActive] = useState<number | null>(null);
	const x = useSpring(useMotionValue(0), spring);
	const y = useSpring(useMotionValue(0), spring);

	function handleMove(event: React.PointerEvent) {
		if (event.pointerType !== "mouse") return;
		x.set(event.clientX);
		y.set(event.clientY);
		const row = (event.target as HTMLElement).closest<HTMLElement>(
			"[data-preview-index]",
		);
		setActive(row ? Number(row.dataset.previewIndex) : null);
	}

	return (
		<div onPointerMove={handleMove} onPointerLeave={() => setActive(null)}>
			{children}

			<m.div
				aria-hidden
				style={{ x, y }}
				className="pointer-events-none fixed top-0 left-0 z-40 hidden lg:block"
			>
				<AnimatePresence>
					{active !== null && (
						<m.div
							key="preview"
							className="relative h-56 w-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-ink shadow-2xl"
							initial={{ scale: 0.6, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.6, opacity: 0 }}
							transition={{ duration: 0.45, ease: easeOutQuart }}
						>
							<m.div
								className="absolute inset-0 flex flex-col"
								animate={{ y: `-${active * 100}%` }}
								transition={{ duration: 0.7, ease: easeExpo }}
							>
								{images.map((image, index) => (
									<img
										key={index}
										{...image}
										sizes="320px"
										alt=""
										decoding="async"
										className="size-full shrink-0 object-cover"
									/>
								))}
							</m.div>
						</m.div>
					)}
				</AnimatePresence>
			</m.div>
		</div>
	);
}
