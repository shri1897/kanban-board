import { mockFetchIssues, mockUpdateIssue } from '../utils/api';
import { Issue } from '../types';

const ISSUES_KEY = 'kb_issues_v1';

export async function fetchIssues(): Promise<Issue[]> {
  const raw = localStorage.getItem(ISSUES_KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as Issue[];
    } catch {
      console.error('Failed to parse issues from localStorage, using mock data');
    }
  }
  const data = (await mockFetchIssues()) as Issue[];
  try {
    localStorage.setItem(ISSUES_KEY, JSON.stringify(data));
  } catch {}
  return data;
}

export async function updateIssueOnServer(issueId: string, updates: Partial<Issue>): Promise<Partial<Issue>> {
  const result = (await mockUpdateIssue(issueId, updates)) as Partial<Issue>;
  return result;
}


