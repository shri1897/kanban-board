import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useIssue, useIssuesData } from '../hooks/useIssuesData';
import { usePermissions } from '../hooks/usePermissions';
import { useRecentlyAccessed } from '../hooks/useRecentlyAccessed';

export const IssueDetailPage = () => {
    const { id } = useParams();
    const issue = useIssue(id);
    const { canMarkResolved } = usePermissions();
    const { markResolved } = useIssuesData();
    const { add } = useRecentlyAccessed();

    useEffect(() => {
      if (id) add(id);
    }, [id, add]);

    if (!id) return <div style={{ padding: '1rem' }}>Invalid issue id</div>;
    if (!issue) return <div style={{ padding: '1rem' }}>Issue not found</div>;

    return (
      <div style={{ padding: '1rem', maxWidth: 800 }}>
        <h2>#{issue.id} — {issue.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 8, alignItems: 'center' }}>
          <label>Status</label><div>{issue.status}</div>
          <label>Priority</label><div>{issue.priority}</div>
          <label>Severity</label><div>{issue.severity}</div>
          <label>Assignee</label><div>{issue.assignee ?? '—'}</div>
          <label>Created</label><div>{new Date(issue.createdAt).toLocaleString()}</div>
          <label>Tags</label><div>{issue.tags.join(', ')}</div>
        </div>
        {canMarkResolved && issue.status !== 'Done' && (
          <button style={{ marginTop: 12 }} onClick={() => markResolved(issue.id)}>Mark as Resolved</button>
        )}
      </div>
    );
};
