import React from 'react';
import { Link } from 'react-router-dom';
import { useIssuesData } from '../hooks/useIssuesData';
import { LastSyncIndicator } from './LastSyncIndicator';

export const Navigation = () => {
  const { lastSyncAt, loading } = useIssuesData();
  return (
    <header className="kb-nav">
      <nav className="kb-nav-inner">
        <div className="kb-brand">
          <Link className="kb-brand-link" to="/board">Kanban Board</Link>
        </div>
        <div className="kb-nav-links">
          <Link className="kb-nav-link" to="/board">Board</Link>
          <Link className="kb-nav-link" to="/settings">Settings</Link>
        </div>
        <div className="kb-nav-status" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {loading && <span style={{ fontSize: 12, color: '#cbd5e1' }}>Loading…</span>}
          <LastSyncIndicator lastSyncAt={lastSyncAt} />
        </div>
      </nav>
    </header>
  );
};