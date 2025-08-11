import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BoardPage } from './pages/BoardPage';
import { IssueDetailPage } from './pages/IssueDetailPage';
import { Navigation } from './components/Navigation';
import { IssuesProvider } from './hooks/useIssuesData';

export const App = () => {
  return (
    <Router>
      <IssuesProvider>
        <Navigation />
        <Routes>
          <Route path="/board" element={<BoardPage />} />
          <Route path="/issue/:id" element={<IssueDetailPage />} />
          <Route path="*" element={<Navigate to="/board" />} />
        </Routes>
      </IssuesProvider>
    </Router>
  );
}