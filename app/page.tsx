import { fetchGitHubProfile, fetchGitHubContributions } from "@/lib/github";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import GitHubContributions from "@/components/sections/GitHubContributions";
import Setup from "@/components/sections/Setup";
import Sponsor from "@/components/sections/Sponsor";
import Contact from "@/components/sections/Contact";

export default async function Home() {
  const [profile, contributions] = await Promise.all([
    fetchGitHubProfile().catch(() => null),
    fetchGitHubContributions().catch(() => null),
  ]);

  return (
    <>
      <Hero profile={profile} contributions={contributions} />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <GitHubContributions profile={profile} contributions={contributions} />
      <Setup />
      <Sponsor />
      <Contact />
    </>
  );
}
