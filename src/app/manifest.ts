import type { MetadataRoute } from "next";
import { ImagesConfig } from "@/config/images";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: siteConfig.name,
		short_name: "Signum",
		description: siteConfig.description,
		start_url: "/",
		display: "standalone",
		background_color: "#0b1f27",
		theme_color: "#102b36",
		icons: [
			{
				src: ImagesConfig.favicon,
				sizes: "any",
				type: "image/svg+xml",
				purpose: "any",
			},
		],
	};
}
