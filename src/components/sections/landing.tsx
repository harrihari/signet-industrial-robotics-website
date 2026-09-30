import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Capabilities from "./home/capabilities";
import Delivery from "./home/delivery";
import Experience from "./home/experience";
import Hero from "./home/hero";
import Intro from "./home/intro";
import Metrology from "./home/metrology";
import Pillars from "./home/pillars";
import Showcase from "./home/showcase";

export default function HomeSection() {
	return (
		<>
			<a
				href="#main"
				className="fixed top-3 left-3 z-60 -translate-y-20 rounded-full bg-accent px-4 py-2 font-semibold text-paper text-xs focus:translate-y-0"
			>
				Skip to content
			</a>
			<Header />
			<Hero />
			<main
				id="main"
				className="relative z-10 overflow-clip rounded-b-[1.75rem] bg-paper text-ink md:rounded-b-[2.5rem]"
			>
				<Intro />
				<Pillars />
				<Capabilities />
				<Showcase />
				<Metrology />
				<Experience />
				<Delivery />
			</main>
			<Footer />
		</>
	);
}
