import { supabase, type User } from './supabase';

const SESSION_KEY = 'wf_session';

interface SessionData {
  userId: string;
  username: string;
}

/** Hash a plain-text password with SHA-256 (demo-grade, not production-safe). */
export async function hashPassword(plain: string): Promise<string> {
  const encoded = new TextEncoder().encode(plain);
  const hashBuf = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(hashBuf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function login(user: User) {
  const data: SessionData = { userId: user.id, username: user.username };
  localStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): SessionData | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SessionData;
  } catch {
    return null;
  }
}

/** Fetches the currently logged-in user's full row from Supabase. */
export async function getCurrentUser(): Promise<User | null> {
  const session = getSession();
  if (!session) return null;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.userId)
    .single();

  if (error || !data) {
    logout();
    return null;
  }
  return data as User;
}

export function initials(name: string | null | undefined, username: string): string {
  if (name && name.trim()) {
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase() || username.slice(0, 2).toUpperCase();
  }
  return username.slice(0, 2).toUpperCase();
}

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(n);
}
