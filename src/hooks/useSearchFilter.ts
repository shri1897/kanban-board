import { useMemo, useState } from 'react';
import { Issue } from '../types';

export function useSearchFilter() {
  const [query, setQuery] = useState('');
  const [assignee, setAssignee] = useState<string | null>(null);
  const [severity, setSeverity] = useState<number | null>(null);

  const predicate = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (issue: Issue) => {
      const matchesQuery = q.length === 0 ||
        issue.title.toLowerCase().includes(q) ||
        issue.tags.some(t => t.toLowerCase().includes(q));
      const matchesAssignee = assignee == null || issue.assignee === assignee;
      const matchesSeverity = severity == null || issue.severity === severity;
      return matchesQuery && matchesAssignee && matchesSeverity;
    };
  }, [query, assignee, severity]);

  return {
    query,
    setQuery,
    assignee,
    setAssignee,
    severity,
    setSeverity,
    predicate,
  };
}


