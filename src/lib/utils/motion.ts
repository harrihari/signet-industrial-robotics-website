import type { Transition } from "motion/react";

export const easeExpo = [0.76, 0, 0.24, 1] as const;
export const easeOutQuart = [0.25, 1, 0.5, 1] as const;

export const revealTransition: Transition = {
	duration: 1.1,
	ease: easeOutQuart,
};
