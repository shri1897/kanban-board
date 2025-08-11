import React from 'react';

interface Props {
  query: string;
  setQuery: (v: string) => void;
  assignee: string | null;
  setAssignee: (v: string | null) => void;
  severity: number | null;
  setSeverity: (v: number | null) => void;
}

export const SearchFilterBar: React.FC<Props> = ({ query, setQuery, assignee, setAssignee, severity, setSeverity }) => {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search title or tags"
        style={{ flex: 1, padding: 8 }}
      />
      <input
        value={assignee ?? ''}
        onChange={e => setAssignee(e.target.value || null)}
        placeholder="Assignee"
        style={{ width: 160, padding: 8 }}
      />
      <input
        value={severity ?? ''}
        onChange={e => setSeverity(e.target.value ? Number(e.target.value) : null)}
        placeholder="Severity"
        type="number"
        min={1}
        style={{ width: 120, padding: 8 }}
      />
    </div>
  );
};


