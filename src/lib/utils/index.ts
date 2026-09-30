import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/config/site";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Canonical origin for absolute URLs (metadata, sitemap, structured data).
 * Defaults to the production domain; override with NEXT_PUBLIC_SITE_URL for
 * staging or preview deployments.
 */
export function getBaseUrl() {
	return (
		process.env.NEXT_PUBLIC_SITE_URL ?? `https://${siteConfig.domain}`
	).replace(/\/$/, "");
}
