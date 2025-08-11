# Simple Kanban Board

A minimal React kanban board for managing issues.

## Features

- **Board View**: Drag and drop issues between Backlog, In Progress, and Done columns
- **Search & Filter**: Search by title/tags, filter by assignee/priority
- **Issue Details**: Click any issue to view details and mark as resolved
- **Recently Accessed**: Sidebar showing last 5 viewed issues
- **Permissions**: Admin users can edit, contributors view only
- **Auto-sync**: Issues sync every 10 seconds

## Quick Start

```bash
npm install
npm start
```

Opens at http://localhost:3000

## Tech Stack

- React + TypeScript
- React Router
- Mock JSON data
- LocalStorage for persistence
- @dnd-kit for drag & drop

## Project Structure

```
src/
  components/     # UI components
  hooks/          # Custom hooks
  pages/          # Route pages
  data/          # Mock data
  types.ts       # TypeScript types
```

## Default User

Currently logged in as Admin user with full permissions. Change user role in `src/constants/currentUser.ts`.

That's it! Simple and focused on core functionality.
