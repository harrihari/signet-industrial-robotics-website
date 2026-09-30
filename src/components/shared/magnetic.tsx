"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function Magnetic({
	children,
	strength = 0.35,
	className,
}: {
	children: React.ReactNode;
	strength?: number;
	className?: string;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 14 });
	const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 14 });

	function handleMove(event: React.PointerEvent<HTMLDivElement>) {
		const rect = ref.current?.getBoundingClientRect();
		if (!rect) return;
		x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
		y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
	}

	function reset() {
		x.set(0);
		y.set(0);
	}

	return (
		<m.div
			ref={ref}
			onPointerMove={handleMove}
			onPointerLeave={reset}
			style={{ x, y }}
			className={cn("inline-flex", className)}
		>
			{children}
		</m.div>
	);
}
