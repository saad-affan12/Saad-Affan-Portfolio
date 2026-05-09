import dynamic from "next/dynamic";
import SEO from "../components/SEO";
import { openSource } from "../portfolio";
import { GithubUserType } from "../types";

const Navigation = dynamic(() => import("../components/Navigation"), {
  ssr: false,
});
const Greetings = dynamic(() => import("../containers/Greetings"), {
  ssr: false,
});
const Skills = dynamic(() => import("../containers/Skills"), {
  ssr: false,
});
const Education = dynamic(() => import("../containers/Education"), {
  ssr: false,
});
const Experience = dynamic(() => import("../containers/Experience"), {
  ssr: false,
});
const Projects = dynamic(() => import("../containers/Projects"), {
  ssr: false,
});
const GithubProfileCard = dynamic(
  () => import("../components/GithubProfileCard"),
  { ssr: false }
);

type HomeProps = {
  githubProfileData: GithubUserType;
};

export default function Home({ githubProfileData }: HomeProps) {
  return (
    <div>
      <SEO />
      <Navigation />
      <Greetings />
      <Skills />
      <Projects />
      <Education />
      <Experience />

      {/* ✅ PASS ONLY REQUIRED PROPS — NO SPREAD */}
      <GithubProfileCard
        avatar_url={githubProfileData.avatar_url}
        bio={githubProfileData.bio}
        location={githubProfileData.location}
      />
    </div>
  );
}

export async function getStaticProps() {
  const githubProfileData: GithubUserType = await fetch(
    `https://api.github.com/users/${openSource.githubUserName}`
  ).then((res) => res.json());

  return {
    props: {
      githubProfileData,
    },
    revalidate: 86400, // revalidate once per day (safe for GitHub API)
  };
}
