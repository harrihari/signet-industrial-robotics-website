import type { MetadataRoute } from "next";
import { ImagesConfig } from "@/config/images";
import { getBaseUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
	const url = getBaseUrl();
	return [
		{
			url: `${url}/`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
			images: [`${url}${ImagesConfig.og.src}`],
		},
	];
}
