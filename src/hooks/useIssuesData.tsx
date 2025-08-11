import React, { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { Issue, IssueStatus } from '../types';
import { fetchIssues, updateIssueOnServer } from '../services/issuesService';
import { usePermissions } from './usePermissions';

interface IssuesContextValue {
  issues: Issue[];
  loading: boolean;
  error: string | null;
  lastSyncAt: string | null;
  refetch: () => Promise<void>;
  updateIssue: (id: string, changes: Partial<Issue>) => Promise<void>;
  moveIssue: (id: string, toStatus: IssueStatus) => Promise<void>;
  markResolved: (id: string) => Promise<void>;
}

const IssuesContext = createContext<IssuesContextValue | undefined>(undefined);

export const IssuesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSyncAt, setLastSyncAt] = useState<string | null>(null);
  const { canEdit } = usePermissions();

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchIssues();
      setIssues(data);
      setLastSyncAt(new Date().toISOString());
    } catch (e: any) {
      setError(e?.message ?? 'Failed to fetch issues');
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch on mount
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Simple polling every 10 seconds
  useEffect(() => {
    const interval = setInterval(refetch, 10000);
    return () => clearInterval(interval);
  }, [refetch]);

  const updateIssue = useCallback(async (id: string, changes: Partial<Issue>) => {
    if (!canEdit) {
      alert('You do not have permission to perform this action');
      return;
    }

    // Optimistic update
    setIssues(prev => prev.map(issue => 
      issue.id === id ? { ...issue, ...changes } : issue
    ));

    try {
      await updateIssueOnServer(id, changes);
    } catch (e: any) {
      // Revert on error
      await refetch();
      alert(e?.message ?? 'Failed to update issue');
    }
  }, [canEdit, refetch]);

  const moveIssue = useCallback(async (id: string, toStatus: IssueStatus) => {
    await updateIssue(id, { status: toStatus });
  }, [updateIssue]);

  const markResolved = useCallback(async (id: string) => {
    await updateIssue(id, { status: 'Done' });
  }, [updateIssue]);

  const value = useMemo<IssuesContextValue>(() => ({
    issues,
    loading,
    error,
    lastSyncAt,
    refetch,
    updateIssue,
    moveIssue,
    markResolved,
  }), [issues, loading, error, lastSyncAt, refetch, updateIssue, moveIssue, markResolved]);

  return <IssuesContext.Provider value={value}>{children}</IssuesContext.Provider>;
};

export function useIssuesData() {
  const ctx = useContext(IssuesContext);
  if (!ctx) throw new Error('useIssuesData must be used within IssuesProvider');
  return ctx;
}

export function useIssue(id: string | undefined) {
  const { issues } = useIssuesData();
  return issues.find(issue => issue.id === id) ?? null;
}


