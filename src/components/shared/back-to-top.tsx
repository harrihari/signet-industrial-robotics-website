"use client";

import { ArrowUp01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLenis } from "lenis/react";

export function BackToTop() {
	const lenis = useLenis();

	return (
		<button
			type="button"
			aria-label="Back to top"
			className="flex size-11 items-center justify-center rounded-full border border-paper/40 transition-colors duration-500 hover:bg-paper hover:text-ink"
			onClick={() =>
				lenis ? lenis.scrollTo(0, { duration: 2 }) : window.scrollTo(0, 0)
			}
		>
			<HugeiconsIcon icon={ArrowUp01Icon} size={18} strokeWidth={1.8} />
		</button>
	);
}
