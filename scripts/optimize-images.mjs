/**
 * Generates responsive variants for every source image in `public/images/src`
 * and the Open Graph image. Run with `pnpm images` after adding or replacing a
 * source image; commit the output in `public/images`.
 */
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const srcDir = path.join(root, "public/images/src");
const outDir = path.join(root, "public/images");
const WIDTHS = [480, 720, 960, 1600, 2400];

await mkdir(outDir, { recursive: true });

const sources = (await readdir(srcDir)).filter((file) =>
	/\.(webp|jpe?g|png|avif)$/i.test(file),
);

for (const file of sources) {
	const name = path.parse(file).name;
	const input = sharp(path.join(srcDir, file));
	const { width: sourceWidth = 0 } = await input.metadata();

	// Never upscale: only emit widths the source can actually fill.
	const widths = WIDTHS.filter((width) => width <= sourceWidth);
	if (!widths.includes(sourceWidth) && sourceWidth < WIDTHS.at(-1)) {
		widths.push(sourceWidth);
	}

	for (const width of widths) {
		const output = path.join(outDir, `${name}-${width}.webp`);
		await input
			.clone()
			.resize({ width, withoutEnlargement: true })
			.webp({ quality: 60, effort: 6, smartSubsample: true })
			.toFile(output);
		console.log(`✓ ${path.relative(root, output)}`);
	}
}

// Open Graph image: 1200×630 crop of the hero with the brand scrim and wordmark.
const ogWidth = 1200;
const ogHeight = 630;
const overlay = Buffer.from(`
<svg width="${ogWidth}" height="${ogHeight}" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<linearGradient id="fade" x1="0" x2="1" y1="0" y2="0">
			<stop offset="0" stop-color="#0b1f27" stop-opacity="0.96"/>
			<stop offset="0.55" stop-color="#102b36" stop-opacity="0.82"/>
			<stop offset="1" stop-color="#102b36" stop-opacity="0.35"/>
		</linearGradient>
	</defs>
	<rect width="100%" height="100%" fill="url(#fade)"/>
	<text x="80" y="150" font-family="Arial, Helvetica, sans-serif" font-size="84" font-weight="800" letter-spacing="-5" fill="#ffffff">signum<tspan fill="#dc512b">.</tspan></text>
	<text x="80" y="200" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" letter-spacing="4" fill="#b9c6cc">INDUSTRIAL AI</text>
	<text x="80" y="420" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="400" letter-spacing="-2" fill="#ffffff">Industrial expertise.</text>
	<text x="80" y="495" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="400" letter-spacing="-2" fill="#b9c6cc">Digital intelligence.</text>
	<text x="80" y="570" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" letter-spacing="3" fill="#f0784f">SUBSEA · ROBOTICS · AI-NATIVE PLATFORMS</text>
</svg>`);

await sharp(path.join(srcDir, "offshore-survey.webp"))
	.resize(ogWidth, ogHeight, { fit: "cover", position: "right" })
	.composite([{ input: overlay }])
	.jpeg({ quality: 84, mozjpeg: true })
	.toFile(path.join(root, "public/og.jpg"));
console.log("✓ public/og.jpg");
