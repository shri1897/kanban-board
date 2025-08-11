import React from 'react';
import { Issue, IssueStatus } from '../types';
import { IssueCard } from './IssueCard';
import { useDroppable } from '@dnd-kit/core';

interface Props {
  title: IssueStatus;
  issues: Issue[];
  canEdit: boolean;
  onSetRank: (id: string, rank: number) => void;
}

export const BoardColumn: React.FC<Props> = ({ title, issues, canEdit, onSetRank }) => {
  const { isOver, setNodeRef } = useDroppable({ id: `column-${title}`, data: { toStatus: title } });
  return (
    <div ref={setNodeRef} className={`kb-column ${isOver ? 'kb-column-over' : ''}`}>
      <h3 className="kb-column-title">{title}</h3>
      {issues.map(issue => (
        <IssueCard
          key={issue.id}
          issue={issue}
          canEdit={canEdit}
          onSetRank={(rank) => onSetRank(issue.id, rank)}
        />
      ))}
    </div>
  );
};


