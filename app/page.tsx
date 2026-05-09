import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import GitHubProfileFetcher from "@/components/sections/GitHubProfileFetcher";
import Setup from "@/components/sections/Setup";
import Sponsor from "@/components/sections/Sponsor";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <GitHubProfileFetcher />
      <Setup />
      <Sponsor />
      <Contact />
    </>
  );
}
