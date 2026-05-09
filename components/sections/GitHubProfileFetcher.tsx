import { fetchGitHubProfile, fetchGitHubContributions } from "@/lib/github";
import GitHubContributions from "./GitHubContributions";

export default async function GitHubProfileFetcher() {
  const [profile, contributions] = await Promise.all([
    fetchGitHubProfile(),
    fetchGitHubContributions(),
  ]);
  return <GitHubContributions profile={profile} contributions={contributions} />;
}
