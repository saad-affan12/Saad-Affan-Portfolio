export interface GitHubProfile {
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface ContributionsResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

export async function fetchGitHubProfile(): Promise<GitHubProfile | null> {
  try {
    const res = await fetch("https://api.github.com/users/saad-affan12", {
      next: { revalidate: 21600 },
    } as RequestInit & { next?: { revalidate: number } });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    return {
      name: data.name ?? "Saad Affan",
      avatar_url: data.avatar_url ?? "",
      bio: data.bio ?? "",
      public_repos: data.public_repos ?? 0,
      followers: data.followers ?? 0,
      following: data.following ?? 0,
      html_url: data.html_url ?? "https://github.com/saad-affan12",
    };
  } catch {
    return null;
  }
}

export async function fetchGitHubContributions(): Promise<ContributionsResponse | null> {
  try {
    const res = await fetch("https://github-contributions-api.jogruber.de/v4/saad-affan12", {
      next: { revalidate: 21600 },
    } as RequestInit & { next?: { revalidate: number } });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch {
    return null;
  }
}
