/**
 * Strict Content Security Policy. No `unsafe-eval`: the production bundle
 * contains no `eval`/`new Function`. `unsafe-inline` for scripts is required by
 * the framework's inline RSC bootstrap scripts on statically prerendered pages
 * (a per-request nonce isn't possible for prerendered HTML) and the JSON-LD
 * block; styles need it for motion's inline transform styles.
 *
 * Only applied in production: the Vite dev server relies on eval-based HMR,
 * which this policy would (correctly) block.
 */
const contentSecurityPolicy = [
	"default-src 'self'",
	"script-src 'self' 'unsafe-inline'",
	"style-src 'self' 'unsafe-inline'",
	"img-src 'self' data: blob:",
	"font-src 'self'",
	"connect-src 'self'",
	"media-src 'self'",
	"object-src 'none'",
	"base-uri 'self'",
	"form-action 'self' mailto:",
	"frame-ancestors 'none'",
	"upgrade-insecure-requests",
].join("; ");

export const securityHeaders: { key: string; value: string }[] = [
	{ key: "Content-Security-Policy", value: contentSecurityPolicy },
	{
		key: "Strict-Transport-Security",
		value: "max-age=63072000; includeSubDomains; preload",
	},
	{ key: "X-Content-Type-Options", value: "nosniff" },
	{ key: "X-Frame-Options", value: "DENY" },
	{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
	{ key: "Cross-Origin-Opener-Policy", value: "same-origin" },
	{
		key: "Permissions-Policy",
		value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
	},
];
