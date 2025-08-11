export type IssueStatus = 'Backlog' | 'In Progress' | 'Done';
export type IssuePriority = 'low' | 'medium' | 'high';

export interface Issue {
  id: string;
  title: string;
  status: IssueStatus;
  priority: IssuePriority;
  severity: number;
  createdAt: string;
  assignee?: string;
  tags: string[];
  userDefinedRank?: number;
}

export interface RecentlyAccessedItem {
  id: string;
  visitedAt: string;
}

export interface IssuesState {
  issues: Issue[];
  loading: boolean;
  error: string | null;
  lastSyncAt: string | null;
}
