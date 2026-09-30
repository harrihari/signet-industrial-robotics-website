"use client";

import {
	animate,
	m,
	useInView,
	useMotionValue,
	useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { easeOutQuart } from "@/lib/utils/motion";

export function CountUp({
	value,
	suffix = "",
	className,
}: {
	value: number;
	suffix?: string;
	className?: string;
}) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
	const count = useMotionValue(0);
	const rounded = useTransform(count, (latest) => Math.round(latest));

	useEffect(() => {
		if (!inView) return;
		const controls = animate(count, value, {
			duration: 1.6,
			ease: easeOutQuart,
		});
		return () => controls.stop();
	}, [inView, count, value]);

	return (
		<span ref={ref} className={className}>
			<m.span>{rounded}</m.span>
			{suffix}
		</span>
	);
}
