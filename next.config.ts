import type { NextConfig } from "next";
import { securityHeaders } from "./src/config/security";

const immutable = [
	{ key: "Cache-Control", value: "public, max-age=31536000, immutable" },
];

const nextConfig: NextConfig = {
	poweredByHeader: false,
	async headers() {
		// Production only: the dev server relies on eval-based HMR, which the
		// CSP would block. Next applies these to prerendered pages as well.
		if (process.env.NODE_ENV !== "production") return [];
		return [
			{ source: "/:path*", headers: securityHeaders },
			{ source: "/images/:path*", headers: immutable },
			{ source: "/flags/:path*", headers: immutable },
			{
				source: "/og.jpg",
				headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
			},
		];
	},
};

export default nextConfig;
