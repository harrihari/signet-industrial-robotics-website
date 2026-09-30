import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
	const url = getBaseUrl();
	return {
		rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
		sitemap: `${url}/sitemap.xml`,
		host: url,
	};
}
