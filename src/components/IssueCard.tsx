import React, { useEffect, useState } from 'react';
import { Issue } from '../types';
import { Link } from 'react-router-dom';
import { useDraggable } from '@dnd-kit/core';

interface Props {
  issue: Issue;
  canEdit: boolean;
  onSetRank?: (rank: number) => void;
  draggable?: boolean;
}

export const IssueCard: React.FC<Props> = ({ issue, canEdit, onSetRank, draggable = true }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: issue.id,
    data: { issueId: issue.id, fromStatus: issue.status },
  });
  const [rankValue, setRankValue] = useState<number>(issue.userDefinedRank ?? 0);
  useEffect(() => {
    setRankValue(issue.userDefinedRank ?? 0);
  }, [issue.userDefinedRank, issue.id]);
  const style: React.CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.6 : 1,
  };
  return (
    <div ref={setNodeRef} style={style} className="kb-card">
      <div className="kb-card-header">
        <Link to={`/issue/${issue.id}`} className="kb-card-title" onPointerDown={e => e.stopPropagation()}>{issue.title}</Link>
        <div className="kb-card-header-right">
          <span className="kb-badge">sev {issue.severity}</span>
          {canEdit && draggable && (
            <span
              className="kb-drag-handle"
              {...attributes}
              {...listeners}
              onClick={e => e.preventDefault()}
              title="Drag"
            >
              ⋮⋮
            </span>
          )}
        </div>
      </div>
      <div className="kb-card-meta">
        <span>priority: {issue.priority}</span>
        {typeof issue.userDefinedRank === 'number' && <span> · rank: {issue.userDefinedRank}</span>}
      </div>
      <div className="kb-tags">
        {issue.tags.map(t => (
          <span key={t} className="kb-tag">{t}</span>
        ))}
      </div>
      {canEdit && onSetRank && (
        <div className="kb-card-actions">
          <label className="kb-rank-label">Rank</label>
          <input
            className="kb-input-number"
            type="number"
            placeholder="Rank"
            value={rankValue}
            onChange={e => setRankValue(Number(e.target.value))}
            onBlur={() => onSetRank(rankValue)}
            onPointerDown={e => e.stopPropagation()}
            onKeyDown={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};


