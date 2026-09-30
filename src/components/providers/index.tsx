"use client";

import { type LenisRef, ReactLenis } from "lenis/react";
import {
	cancelFrame,
	domAnimation,
	frame,
	LazyMotion,
	MotionConfig,
} from "motion/react";
import { useEffect, useRef } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
	const lenisRef = useRef<LenisRef>(null);

	// Drive Lenis from motion's frame loop so smooth-scroll position and every
	// scroll-linked motion value update in the same frame. Running two separate
	// rAF loops made parallax layers lag a frame behind and visibly jitter.
	useEffect(() => {
		function update({ timestamp }: { timestamp: number }) {
			lenisRef.current?.lenis?.raf(timestamp);
		}
		frame.update(update, true);
		return () => cancelFrame(update);
	}, []);

	return (
		<ReactLenis
			root
			ref={lenisRef}
			options={{
				autoRaf: false,
				lerp: 0.09,
				anchors: { offset: -72, duration: 1.4 },
			}}
		>
			{/* `m` components + domAnimation instead of full `motion` components
			    keeps only the animation features this site uses in the bundle.
			    `strict` throws if a `motion.*` component slips back in. */}
			<LazyMotion features={domAnimation} strict>
				<MotionConfig reducedMotion="user">{children}</MotionConfig>
			</LazyMotion>
		</ReactLenis>
	);
}
