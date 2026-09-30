import type { Metadata } from "next";
import { ImagesConfig } from "@/config/images";
import { siteConfig } from "@/config/site";
import { getBaseUrl } from ".";

export const keywords = [
	"Signum Industrial AI",
	"subsea positioning services",
	"subsea metrology",
	"inertial metrology",
	"subsea IMR",
	"jumper and tieback dimensional control",
	"industrial robotics",
	"industrial remote operations",
	"AI-native digital platforms",
	"offshore services Houston",
	"subsea services Ghana",
	"subsea services Angola",
];

export function constructMetadata(): Metadata {
	const url = getBaseUrl();

	return {
		metadataBase: new URL(url),
		title: {
			default: siteConfig.title,
			template: `%s | ${siteConfig.name}`,
		},
		description: siteConfig.description,
		applicationName: siteConfig.name,
		keywords,
		authors: [{ name: siteConfig.name, url }],
		creator: siteConfig.name,
		publisher: siteConfig.name,
		category: "Industrial services",
		alternates: { canonical: "/" },
		formatDetection: { telephone: false, address: false, email: false },
		icons: {
			icon: [{ url: ImagesConfig.favicon, type: "image/svg+xml" }],
			apple: [{ url: ImagesConfig.favicon }],
		},
		manifest: "/manifest.webmanifest",
		openGraph: {
			type: "website",
			url: "/",
			siteName: siteConfig.name,
			title: siteConfig.title,
			description: siteConfig.description,
			locale: "en_US",
			images: [
				{
					url: ImagesConfig.og.src,
					width: ImagesConfig.og.width,
					height: ImagesConfig.og.height,
					alt: `${siteConfig.name}: ${siteConfig.tagline}`,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: siteConfig.title,
			description: siteConfig.description,
			images: [ImagesConfig.og.src],
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-image-preview": "large",
				"max-snippet": -1,
				"max-video-preview": -1,
			},
		},
	};
}

/** schema.org Organization + WebSite graph for rich results. */
export function structuredData() {
	const url = getBaseUrl();
	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": `${url}/#organization`,
				name: siteConfig.name,
				url,
				logo: `${url}${ImagesConfig.favicon}`,
				image: `${url}${ImagesConfig.og.src}`,
				description: siteConfig.description,
				email: siteConfig.mail,
				address: {
					"@type": "PostalAddress",
					streetAddress: "11050 W Little York Rd, Bldg. P",
					addressLocality: "Houston",
					addressRegion: "TX",
					postalCode: "77041",
					addressCountry: "US",
				},
				areaServed: siteConfig.regions.map((name) => ({
					"@type": "Country",
					name,
				})),
				contactPoint: {
					"@type": "ContactPoint",
					contactType: "sales",
					email: siteConfig.mail,
					availableLanguage: ["English"],
				},
				knowsAbout: keywords.slice(1),
			},
			{
				"@type": "WebSite",
				"@id": `${url}/#website`,
				url,
				name: siteConfig.name,
				description: siteConfig.description,
				publisher: { "@id": `${url}/#organization` },
				inLanguage: "en",
			},
		],
	};
}
