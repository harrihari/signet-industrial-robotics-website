import type { NavLink, SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
	name: "Signum Industrial AI",
	shortName: "signum",
	title: "Signum Industrial AI | Industrial Expertise. Digital Intelligence.",
	description:
		"Subsea services, robotics, and AI-native platforms. Connected to support your assets and operations.",
	tagline: "Houston based. Field connected.",
	eyebrow: "Engineering. Operations. Technology.",
	intro:
		"Subsea services, robotics, and AI-native platforms. Connected to support your assets and operations.",
	regions: ["United States", "Ghana", "Angola", "Senegal", "Guyana"],
	domain: "signumindustrial.ai",
	mail: "info@signumindustrial.ai",
	address: ["11050 W Little York Rd, Bldg. P", "Houston, TX 77041, USA"],
	mapsUrl:
		"https://www.google.com/maps/search/?api=1&query=11050+W+Little+York+Rd+Bldg+P+Houston+TX+77041",
};

export const navLinks: NavLink[] = [
	{ label: "Services", href: "#capabilities" },
	{ label: "Our process", href: "#metrology" },
	{ label: "Experience", href: "#experience" },
	{ label: "About", href: "#approach" },
	{ label: "Contact", href: "#contact" },
];
