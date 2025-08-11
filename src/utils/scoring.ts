import dayjs from 'dayjs';
import { Issue } from '../types';

export function computePriorityScore(issue: Issue, now: Date = new Date()): number {
  const daysSinceCreated = Math.floor(dayjs(now).diff(dayjs(issue.createdAt), 'day'));
  const userDefinedRank = issue.userDefinedRank ?? 0;
  return issue.severity * 10 + (daysSinceCreated * -1) + userDefinedRank;
}

export function compareIssuesByPriority(a: Issue, b: Issue): number {
  const now = new Date();
  const scoreA = computePriorityScore(a, now);
  const scoreB = computePriorityScore(b, now);
  if (scoreA !== scoreB) return scoreB - scoreA;
  const createdA = new Date(a.createdAt).getTime();
  const createdB = new Date(b.createdAt).getTime();
  if (createdA !== createdB) return createdB - createdA;
  return a.id.localeCompare(b.id);
}


