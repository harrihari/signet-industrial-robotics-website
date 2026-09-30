export type Picture = {
	src: string;
	/** Width-descriptor srcset; absent for vector images. */
	srcSet?: string;
	width: number;
	height: number;
};

export type NavLink = {
	label: string;
	href: string;
};

export type SiteConfig = {
	name: string;
	shortName: string;
	title: string;
	description: string;
	tagline: string;
	eyebrow: string;
	intro: string;
	regions: string[];
	/** Production hostname, without protocol. */
	domain: string;
	mail: string;
	address: string[];
	mapsUrl: string;
};

export type Pillar = {
	id: string;
	eyebrow: string;
	title: string;
	description: string;
	focus: string[];
	region: string;
	tags: string[];
	image: Picture;
	imageAlt: string;
};

export type Capability = {
	id: string;
	title: string;
	description: string;
	image: Picture;
};

export type Step = {
	id: string;
	title: string;
	description: string;
};

export type Location = {
	id: string;
	kind: string;
	country: string;
	detail: string;
	flag: Picture;
};
