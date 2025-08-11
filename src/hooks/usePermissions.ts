import { currentUser } from '../constants/currentUser';

export function usePermissions() {
  const isAdmin = currentUser.role === 'admin';
  const canEdit = isAdmin;
  return {
    canEdit,
    canMove: canEdit,
    canUpdatePriority: canEdit,
    canMarkResolved: canEdit,
  };
}


