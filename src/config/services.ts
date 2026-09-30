import type { Capability, Pillar } from "@/types";
import { ImagesConfig } from "./images";

export const pillars: Pillar[] = [
	{
		id: "01",
		eyebrow: "Field expertise",
		title: "Subsea & offshore",
		description: "Position, measure, and verify subsea assets.",
		focus: ["Subsea positioning", "Subsea IMR", "Metrology"],
		region: "Offshore",
		tags: ["Positioning", "IMR", "Verification"],
		image: ImagesConfig.pillars.subsea,
		imageAlt: "Offshore survey support vessel",
	},
	{
		id: "02",
		eyebrow: "Purpose-built systems",
		title: "Industrial robotics",
		description: "Develop robotic systems around the work they need to do.",
		focus: ["Robotic systems", "Inspection", "Intervention"],
		region: "Field",
		tags: ["Robotics", "ROV", "Systems"],
		image: ImagesConfig.pillars.robotics,
		imageAlt: "Inspection ROV on a vessel deck",
	},
	{
		id: "03",
		eyebrow: "Connected operations",
		title: "AI-native platforms",
		description: "Connect business processes, operational data, and AI.",
		focus: ["Digital platforms", "Remote operations", "Data"],
		region: "Remote",
		tags: ["AI", "Platforms", "Remote ops"],
		image: ImagesConfig.pillars.platforms,
		imageAlt: "Industrial digital twin workstation",
	},
];

export const capabilities: Capability[] = [
	{
		id: "01",
		title: "Subsea Positioning Services",
		description: "Position, measure, and verify subsea assets.",
		image: ImagesConfig.capabilities.positioning,
	},
	{
		id: "02",
		title: "Subsea IMR",
		description: "Understand condition. Support the right intervention.",
		image: ImagesConfig.capabilities.imr,
	},
	{
		id: "03",
		title: "AI-Native Digital Business Platforms",
		description: "Connect business processes, operational data, and AI.",
		image: ImagesConfig.capabilities.platforms,
	},
	{
		id: "04",
		title: "Industrial Remote Operations",
		description: "Bring specialist expertise closer to field operations.",
		image: ImagesConfig.capabilities.remoteOps,
	},
	{
		id: "05",
		title: "Industrial Robotics",
		description: "Develop robotic systems around the work they need to do.",
		image: ImagesConfig.capabilities.robotics,
	},
];
