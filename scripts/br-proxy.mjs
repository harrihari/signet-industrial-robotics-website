// Brotli-compressing reverse proxy: localhost:4174 -> localhost:4173.
// Mimics Vercel's edge compression so local Lighthouse runs are realistic.
import http from "node:http";
import zlib from "node:zlib";

const TEXT = /text\/|javascript|json|xml|svg|manifest/;

http
	.createServer((req, res) => {
		const upstream = http.request(
			{
				host: "localhost",
				port: 4173,
				path: req.url,
				method: req.method,
				headers: { ...req.headers, "accept-encoding": "identity" },
			},
			(up) => {
				const type = up.headers["content-type"] ?? "";
				const headers = { ...up.headers };
				if (
					TEXT.test(type) &&
					/br/.test(req.headers["accept-encoding"] ?? "")
				) {
					delete headers["content-length"];
					headers["content-encoding"] = "br";
					res.writeHead(up.statusCode ?? 200, headers);
					up.pipe(
						zlib.createBrotliCompress({
							params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 },
						}),
					).pipe(res);
				} else {
					res.writeHead(up.statusCode ?? 200, headers);
					up.pipe(res);
				}
			},
		);
		upstream.on("error", () => res.writeHead(502).end());
		req.pipe(upstream);
	})
	.listen(4174, () => console.log("br proxy on http://localhost:4174"));
