const GITHUB_USER = "Pravin671231";

export interface GithubStats {
  repos: number;
  followers: number;
  totalStars: number;
  error?: boolean;
}

interface GithubRepo {
  stargazers_count: number;
}

interface GithubUser {
  public_repos: number;
  followers: number;
}

export async function GET() {
  const headers: HeadersInit = process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {};

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error("GitHub API request failed");
    }

    const user: GithubUser = await userRes.json();
    const repos: GithubRepo[] = await reposRes.json();
    const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0);

    const stats: GithubStats = {
      repos: user.public_repos,
      followers: user.followers,
      totalStars,
    };
    return Response.json(stats);
  } catch {
    const fallback: GithubStats = { repos: 0, followers: 0, totalStars: 0, error: true };
    return Response.json(fallback);
  }
}
