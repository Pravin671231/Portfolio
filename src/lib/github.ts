import type { GithubStats } from "@/app/api/github/route";

const FALLBACK: GithubStats = { repos: 0, followers: 0, totalStars: 0, error: true };

export async function fetchGithubStats(): Promise<GithubStats> {
  try {
    const res = await fetch("/api/github");
    if (!res.ok) throw new Error("Failed to load GitHub stats");
    return await res.json();
  } catch {
    return FALLBACK;
  }
}
