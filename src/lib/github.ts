const GITHUB_API_BASE = 'https://api.github.com';
const AI_LABEL = 'ai-generated';
const AI_LABEL_COLOR = '5C6BC0';

function getAuthHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error('GITHUB_TOKEN is not configured');
  }
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'Portfolio-AI-Agent',
  };
}

function getRepo(): { owner: string; repo: string } {
  const repoString = process.env.GITHUB_REPO;
  if (!repoString) {
    throw new Error('GITHUB_REPO is not configured');
  }
  const [owner, repo] = repoString.split('/');
  if (!owner || !repo) {
    throw new Error("GITHUB_REPO must be in format 'owner/repo'");
  }
  return { owner, repo };
}

export interface GitHubIssue {
  number: number;
  title: string;
  body?: string;
  state: string;
  html_url: string;
  created_at: string;
  labels: Array<{ name: string; color: string }>;
}

export interface CreateIssueResult {
  number: number;
  title: string;
  url: string;
}

export interface ListIssuesResult {
  issues: Array<{
    number: number;
    title: string;
    state: string;
    url: string;
    created_at: string;
  }>;
}

async function ensureLabelExists(): Promise<void> {
  const { owner, repo } = getRepo();
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/labels`;

  const checkResponse = await fetch(`${url}/${AI_LABEL}`, {
    headers: getAuthHeaders(),
  });

  if (checkResponse.ok) {
    return;
  }

  if (checkResponse.status === 404) {
    const createResponse = await fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        name: AI_LABEL,
        color: AI_LABEL_COLOR,
        description: 'Issues created by AI assistant',
      }),
    });

    if (!createResponse.ok && createResponse.status !== 422) {
      console.warn('Failed to create AI label, continuing without it');
    }
  }
}

export async function createIssue(
  title: string,
  body: string
): Promise<CreateIssueResult> {
  const { owner, repo } = getRepo();

  await ensureLabelExists();

  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues`;
  const response = await fetch(url, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      title,
      body,
      labels: [AI_LABEL],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create issue: ${response.status} - ${error}`);
  }

  const issue = (await response.json()) as GitHubIssue;
  return {
    number: issue.number,
    title: issue.title,
    url: issue.html_url,
  };
}

export async function listIssues(
  state: 'open' | 'closed' | 'all' = 'open',
  limit: number = 10
): Promise<ListIssuesResult> {
  const { owner, repo } = getRepo();
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues?state=${state}&per_page=${limit}&sort=created&direction=desc`;

  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to list issues: ${response.status} - ${error}`);
  }

  const issues = (await response.json()) as GitHubIssue[];
  return {
    issues: issues
      .filter((issue) => !('pull_request' in issue))
      .map((issue) => ({
        number: issue.number,
        title: issue.title,
        state: issue.state,
        url: issue.html_url,
        created_at: issue.created_at,
      })),
  };
}

export async function getIssue(issueNumber: number): Promise<{
  number: number;
  title: string;
  body: string;
  state: string;
  url: string;
  labels: string[];
  created_at: string;
}> {
  const { owner, repo } = getRepo();
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/${issueNumber}`;

  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Issue #${issueNumber} not found`);
    }
    const error = await response.text();
    throw new Error(`Failed to get issue: ${response.status} - ${error}`);
  }

  const issue = (await response.json()) as GitHubIssue;
  return {
    number: issue.number,
    title: issue.title,
    body: issue.body || '',
    state: issue.state,
    url: issue.html_url,
    labels: issue.labels.map((l) => l.name),
    created_at: issue.created_at,
  };
}
