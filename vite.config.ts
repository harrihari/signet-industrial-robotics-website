import { cloudflare } from "@cloudflare/vite-plugin";
import { imagesOptimizer } from "@vinext/cloudflare/images/images-optimizer";
import vinext from "vinext";
import { defineConfig } from "vite";

export default defineConfig({
	// Dev only. The Cloudflare plugin restarts Vite when a quick-tunnel host is
	// not listed here (exact match), and the restart leaves the tunnel origin
	// dead: every request through the tunnel returns 502.
	server: { allowedHosts: true },
	plugins: [
		vinext({
			prerender: { routes: "*" },
			images: { optimizer: imagesOptimizer() },
		}),
		cloudflare({
			viteEnvironment: {
				name: "rsc",
				childEnvironments: ["ssr"],
			},
		}),
	],
});
