import { useMemo } from 'react';
import { Issue, IssueStatus } from '../types';
import { compareIssuesByPriority } from '../utils/scoring';

export function useBoardSorting(issues: Issue[]) {
  return useMemo(() => {
    const grouped: Record<IssueStatus, Issue[]> = { 'Backlog': [], 'In Progress': [], 'Done': [] };
    for (const issue of issues) grouped[issue.status].push(issue);
    for (const key of Object.keys(grouped) as IssueStatus[]) grouped[key].sort(compareIssuesByPriority);
    return { groupedByStatus: grouped };
  }, [issues]);
}


