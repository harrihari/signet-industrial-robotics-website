import "lenis/dist/lenis.css";
import "@/styles/globals.css";
import type { Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import { Providers } from "@/components/providers";
import { constructMetadata, structuredData } from "@/lib/utils/metadata";

export const metadata = constructMetadata();

export const viewport: Viewport = {
	themeColor: "#102b36",
	colorScheme: "dark light",
	width: "device-width",
	initialScale: 1,
};

const interTight = Inter_Tight({
	subsets: ["latin"],
	variable: "--font-inter-tight",
	weight: ["300", "400", "500", "600", "800"],
	display: "swap",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={interTight.variable}>
			<body>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(structuredData()).replace(/</g, "\\u003c"),
					}}
				/>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
