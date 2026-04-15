// Shared admin/superadmin auth helpers.
// Role is stored in sessionStorage so it clears when the tab/browser closes.

export type AdminRole = 'admin' | 'superadmin';

const ROLE_KEY = 'wf_admin_role';

export function getAdminRole(): AdminRole | null {
  const r = sessionStorage.getItem(ROLE_KEY);
  return r === 'admin' || r === 'superadmin' ? r : null;
}

export function setAdminRole(role: AdminRole) {
  sessionStorage.setItem(ROLE_KEY, role);
}

export function clearAdminRole() {
  sessionStorage.removeItem(ROLE_KEY);
}

export function verifyCredentials(role: AdminRole, username: string, password: string): boolean {
  if (role === 'admin') {
    return (
      username === (import.meta.env.VITE_ADMIN_USERNAME as string) &&
      password === (import.meta.env.VITE_ADMIN_PASSWORD as string)
    );
  }
  return (
    username === (import.meta.env.VITE_SUPERADMIN_USERNAME as string) &&
    password === (import.meta.env.VITE_SUPERADMIN_PASSWORD as string)
  );
}

/** Is the current session at least the given role? superadmin satisfies 'admin'. */
export function hasRole(required: AdminRole): boolean {
  const current = getAdminRole();
  if (!current) return false;
  if (required === 'admin') return true; // any role works
  return current === 'superadmin';
}
