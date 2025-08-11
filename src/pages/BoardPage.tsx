import React, { useMemo } from 'react';
import { useIssuesData } from '../hooks/useIssuesData';
import { usePermissions } from '../hooks/usePermissions';
import { useSearchFilter } from '../hooks/useSearchFilter';
import { useBoardSorting } from '../hooks/useBoardSorting';
import { SearchFilterBar } from '../components/SearchFilterBar';
import { BoardColumn } from '../components/BoardColumn';
import { RecentlyAccessedSidebar } from '../components/RecentlyAccessedSidebar';
import { useRecentlyAccessed } from '../hooks/useRecentlyAccessed';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { IssueStatus } from '../types';

export const BoardPage = () => {
    const { issues, loading, error, moveIssue, updateIssue } = useIssuesData();
    const { canMove, canUpdatePriority } = usePermissions();
    const filter = useSearchFilter();
    const { recent } = useRecentlyAccessed();

    const filtered = useMemo(() => issues.filter(filter.predicate), [issues, filter.predicate]);
    const { groupedByStatus } = useBoardSorting(filtered);

    const setUserRank = (id: string, rank: number) => {
        updateIssue(id, { userDefinedRank: rank });
    };

    const onDragEnd = (event: DragEndEvent) => {
      const overId = event.over?.id as string | undefined;
      if (!overId) return;
      const candidate = overId.startsWith('column-') ? overId.replace('column-', '') : null;
      const isStatus = (s: string | null): s is IssueStatus => s === 'Backlog' || s === 'In Progress' || s === 'Done';
      const toStatus = isStatus(candidate) ? candidate : null;
      const issueId = event.active?.data?.current?.issueId as string | undefined;
      if (toStatus && issueId && canMove) {
        moveIssue(issueId, toStatus);
      }
    };

    return (
      <div style={{ display: 'flex', height: 'calc(100vh - 56px)' }}>
        <div style={{ flex: 1, padding: '1rem', overflow: 'auto' }}>
          <SearchFilterBar {...filter} />
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <DndContext onDragEnd={onDragEnd}>
            <div className="kb-board">
              <BoardColumn
                title="Backlog"
                issues={groupedByStatus['Backlog']}
                canEdit={canMove || canUpdatePriority}
                onSetRank={setUserRank}
              />
              <BoardColumn
                title="In Progress"
                issues={groupedByStatus['In Progress']}
                canEdit={canMove || canUpdatePriority}
                onSetRank={setUserRank}
              />
              <BoardColumn
                title="Done"
                issues={groupedByStatus['Done']}
                canEdit={canMove || canUpdatePriority}
                onSetRank={setUserRank}
              />
            </div>
          </DndContext>
          
        </div>
        <RecentlyAccessedSidebar items={recent.map(x => ({ 
          id: x.id, 
          title: issues.find(issue => issue.id === x.id)?.title || 'Unknown Issue' 
        }))} />
      </div>
    );
};
