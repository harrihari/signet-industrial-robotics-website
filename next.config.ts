import type { NextConfig } from "next";
import { securityHeaders } from "./src/config/security";

const nextConfig: NextConfig = {
	poweredByHeader: false,
	async headers() {
		// Page responses also get these from `src/proxy.ts`; this covers
		// dynamic routes (robots, sitemap, manifest, API).
		if (process.env.NODE_ENV !== "production") return [];
		return [{ source: "/:path*", headers: securityHeaders }];
	},
};

export default nextConfig;
