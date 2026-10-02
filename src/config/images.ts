import type { Picture } from "@/types";

/**
 * Every image the site uses, by slot. Sources live in `public/images/src`;
 * `pnpm images` writes the width variants referenced here. Several slots reuse
 * the three source images from the live Signum site until new ones exist;
 * `docs/image-prompts.md` has a prompt for each slot marked TODO.
 */
function responsive(
	name: string,
	widths: number[],
	aspect: [number, number],
): Picture {
	const largest = Math.max(...widths);
	return {
		src: `/images/${name}-${largest}.webp`,
		srcSet: widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(", "),
		width: largest,
		height: Math.round((largest * aspect[1]) / aspect[0]),
	};
}

const source = {
	offshoreSurvey: responsive("offshore-survey", [480, 720, 960], [4, 3]),
	industrialRobotics: responsive(
		"industrial-robotics",
		[480, 720, 960],
		[4, 3],
	),
	digitalPlatforms: responsive("digital-platforms", [480, 720, 960], [4, 3]),
};

export const ImagesConfig = {
	favicon: "/favicon.svg",
	og: { src: "/og.jpg", width: 1200, height: 630 },
	// TODO: hero-vessel
	hero: source.offshoreSurvey,
	// TODO: intro-rov-detail
	intro: source.industrialRobotics,
	pillars: {
		// TODO: pillar-subsea
		subsea: source.offshoreSurvey,
		// TODO: pillar-robotics
		robotics: source.industrialRobotics,
		// TODO: pillar-platforms
		platforms: source.digitalPlatforms,
	},
	capabilities: {
		// TODO: cap-positioning
		positioning: source.offshoreSurvey,
		// TODO: cap-imr
		imr: source.industrialRobotics,
		platforms: source.digitalPlatforms,
		// TODO: cap-remote-ops
		remoteOps: source.digitalPlatforms,
		robotics: source.industrialRobotics,
	},
	// TODO: showcase-control-room
	showcase: source.digitalPlatforms,
	// TODO: experience-fabrication
	experience: source.offshoreSurvey,
	flags: {
		us: { src: "/flags/us.svg", width: 1235, height: 650 },
		gh: { src: "/flags/gh.svg", width: 900, height: 600 },
		ao: { src: "/flags/ao.svg", width: 900, height: 600 },
		sn: { src: "/flags/sn.svg", width: 900, height: 600 },
		gy: { src: "/flags/gy.svg", width: 1000, height: 600 },
	},
} satisfies Record<string, unknown>;
