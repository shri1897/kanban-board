import { useCallback, useMemo } from 'react';
import { RecentlyAccessedItem } from '../types';
import { useLocalStorageState } from './useLocalStorageState';

const RECENT_KEY = 'kb_recent_v1';
const MAX_RECENT = 5;

export function useRecentlyAccessed() {
  const [recent, setRecent] = useLocalStorageState<RecentlyAccessedItem[]>(RECENT_KEY, []);

  const add = useCallback((id: string) => {
    const now = new Date().toISOString();
    const filtered = recent.filter(x => x.id !== id);
    const next = [{ id, visitedAt: now }, ...filtered].slice(0, MAX_RECENT);
    setRecent(next);
  }, [recent, setRecent]);

  const clear = useCallback(() => {
    setRecent([]);
  }, [setRecent]);

  return useMemo(() => ({ recent, add, clear }), [recent, add, clear]);
}


