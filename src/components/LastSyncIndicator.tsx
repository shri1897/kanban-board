import React from 'react';

export const LastSyncIndicator: React.FC<{ lastSyncAt: string | null }> = ({ lastSyncAt }) => {
  return (
    <span style={{ fontSize: 12, color: '#666' }}>
      Last sync: {lastSyncAt ? new Date(lastSyncAt).toLocaleTimeString() : '—'}
    </span>
  );
};


