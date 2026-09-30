import { type NextRequest, NextResponse } from "next/server";
import { securityHeaders } from "@/config/security";

/**
 * Adds the security headers (including the CSP) to every page response.
 * `next.config` `headers()` alone isn't applied to prerendered pages served
 * from the cache, so they're set here as well.
 */
export function proxy(_request: NextRequest) {
	const response = NextResponse.next();
	if (process.env.NODE_ENV === "production") {
		for (const { key, value } of securityHeaders) {
			response.headers.set(key, value);
		}
	}
	return response;
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|images/|flags/|favicon.svg|og.jpg).*)",
	],
};
