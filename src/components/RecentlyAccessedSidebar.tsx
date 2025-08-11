import React from 'react';
import { Link } from 'react-router-dom';

interface Item {
  id: string;
  title?: string;
}

interface Props {
  items: Item[];
}

export const RecentlyAccessedSidebar: React.FC<Props> = ({ items }) => {
  return (
    <aside className="kb-sidebar">
      <div className="kb-sidebar-header">Recently Accessed</div>
      <ul className="kb-sidebar-list">
        {items.map(item => (
          <li key={item.id} className="kb-sidebar-item">
            <Link className="kb-sidebar-link" to={`/issue/${item.id}`}>
              <span className="kb-issue-key">#{item.id}</span>
              {item.title && <span className="kb-issue-title">{item.title}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};


