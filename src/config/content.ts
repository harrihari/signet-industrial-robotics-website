import type { Location, Step } from "@/types";
import { ImagesConfig } from "./images";

export const about = {
	label: "About Signum",
	heading:
		"From the field to the digital platform, we bring the right people, equipment, and systems to your scope.",
	facts: [
		{ value: "5", label: "Connected capabilities" },
		{ value: "3", label: "Countries of operation" },
		{ value: "5+", label: "Years of contract history" },
	],
};

export const servicesIntro = {
	label: "01 / Our services",
	eyebrow: "Five capabilities. One connected approach.",
	heading: "Expertise that works together.",
};

export const showcase = {
	eyebrow: "Connected operations",
	heading: "Specialist expertise, closer to field operations.",
};

export const metrology = {
	label: "02 / Subsea positioning workflow",
	eyebrow: "Subsea positioning services",
	heading: "From measurement to verification.",
	body: "Our subsea positioning services connect inertial metrology with remote specialist support and dimensional checks before and after jumper and tieback fabrication.",
	steps: [
		{
			id: "01",
			title: "Measure offshore",
			description:
				"Inertial metrology equipment supports the measurement of subsea connection points.",
		},
		{
			id: "02",
			title: "Review remotely",
			description:
				"Remote specialists support data review, interpretation, and project deliverables.",
		},
		{
			id: "03",
			title: "Check before fabrication",
			description:
				"Dimensional control checks the geometry and references used for the assembly.",
		},
		{
			id: "04",
			title: "Verify after fabrication",
			description:
				"The completed assembly is checked against the project dimensions.",
		},
	] satisfies Step[],
};

export const experience = {
	label: "03 / Experience in practice",
	eyebrow: "Offshore · Remote · Fabrication",
	heading: ["Field experience.", "Practical perspective."],
	body: "Our people understand what happens between an offshore measurement and a completed assembly.",
	areas: [
		"Offshore execution",
		"Remote processing",
		"Dimensional control",
		"Project leadership",
	],
	image: ImagesConfig.experience,
	imageAlt: "Survey support vessel working offshore",
	partner: {
		eyebrow: "Team & partner experience",
		heading: "Delivered alongside Fortress in Ghana.",
		body: "Members of Signum’s team have contributed to a multiyear subsea metrology program, connecting field acquisition, specialist review, and pre- and post-fabrication verification.",
		stat: { value: 5, suffix: "+", label: "Years of contract history" },
		statNote: "Fortress’s subsea metrology program",
	},
};

export const delivery = {
	label: "04 / Connected delivery",
	eyebrow: "Personnel · Equipment · Partners",
	heading: "Houston based. Field connected.",
	body: "We bring together in-country personnel, remote specialists, equipment, and delivery partners around each project scope.",
	locations: [
		{
			id: "01",
			country: "United States",
			detail: "Houston, Texas",
			flag: ImagesConfig.flags.us,
		},
		{
			id: "02",
			country: "Ghana",
			detail: "Field and specialist support",
			flag: ImagesConfig.flags.gh,
		},
		{
			id: "03",
			country: "Angola",
			detail: "Field and specialist support",
			flag: ImagesConfig.flags.ao,
		},
		{
			id: "04",
			country: "Senegal",
			detail: "Field and specialist support",
			flag: ImagesConfig.flags.sn,
		},
		{
			id: "05",
			country: "Guyana",
			detail: "Field and specialist support",
			flag: ImagesConfig.flags.gy,
		},
	] satisfies Location[],
};

export const contact = {
	label: "05 / Contact Signum",
	eyebrow: "Let’s start a conversation",
	heading: "Let’s discuss your next project.",
	body: "Tell us what you need to achieve. We’ll help define the technical scope and delivery approach.",
};
