import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, type User } from '../lib/supabase';
import { formatCurrency } from '../lib/session';

const f = '"Wells Fargo Sans", Arial, Helvetica, sans-serif';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string;
const ADMIN_AUTH_KEY = 'wf_admin_auth';

export default function Admin() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(ADMIN_AUTH_KEY) === '1');

  if (!authed) {
    return <AdminLogin onSuccess={() => { sessionStorage.setItem(ADMIN_AUTH_KEY, '1'); setAuthed(true); }} onBack={() => navigate('/')} />;
  }

  return <AdminPanel onLogout={() => { sessionStorage.removeItem(ADMIN_AUTH_KEY); setAuthed(false); }} onHome={() => navigate('/')} />;
}

function AdminLogin({ onSuccess, onBack }: { onSuccess: () => void; onBack: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!ADMIN_PASSWORD) {
      setError('VITE_ADMIN_PASSWORD is not set in .env');
      return;
    }
    if (password === ADMIN_PASSWORD) {
      onSuccess();
    } else {
      setError('Incorrect password.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: f, backgroundColor: '#f2f2f2' }}>
      <header style={{ backgroundColor: '#D71E28', borderBottom: '4px solid #FFCD41', height: '60px', display: 'flex', alignItems: 'center' }}>
        <div className="max-w-[1400px] mx-auto w-full wf-section-px" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a onClick={onBack} style={{ cursor: 'pointer', textDecoration: 'none' }}>
            <img src="https://www17.wellsfargomedia.com/assets/images/rwd/wf_logo_220x23.png" alt="Wells Fargo" style={{ height: '20px', filter: 'brightness(0) invert(1)' }} />
          </a>
          <span style={{ color: '#fff', fontSize: '0.88rem', fontWeight: 600 }}>Admin</span>
        </div>
      </header>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
        <form onSubmit={handleSubmit} style={{
          backgroundColor: '#fff', borderRadius: '12px', padding: '32px',
          maxWidth: '400px', width: '100%', boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        }}>
          <h1 style={{ fontFamily: f, fontSize: '1.6rem', color: '#141414', margin: '0 0 8px', fontWeight: 400 }}>Admin Access</h1>
          <p style={{ fontFamily: f, fontSize: '0.88rem', color: '#555', margin: '0 0 20px' }}>
            Enter the admin password to continue.
          </p>
          {error && (
            <div role="alert" style={{
              backgroundColor: '#FDECEA', border: '1px solid #F5C6CB', color: '#721C24',
              padding: '8px 12px', borderRadius: '6px', marginBottom: '14px',
              fontSize: '0.82rem',
            }}>
              {error}
            </div>
          )}
          <label htmlFor="adminpw" style={{ display: 'block', fontSize: '0.82rem', color: '#555', marginBottom: '6px' }}>
            Password
          </label>
          <input
            id="adminpw" type="password" autoFocus required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%', padding: '12px 14px', fontSize: '0.94rem',
              border: '1px solid #b5adad', borderRadius: '6px', outline: 'none',
              fontFamily: f, marginBottom: '16px',
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%', backgroundColor: '#D71E28', color: '#fff', border: 'none',
              borderRadius: '24px', fontFamily: f, fontWeight: 600, fontSize: '1rem',
              padding: '10px 32px', cursor: 'pointer',
            }}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

function AdminPanel({ onLogout, onHome }: { onLogout: () => void; onHome: () => void }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  async function fetchUsers() {
    setLoading(true);
    setError(null);
    const { data, error: dbError } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    if (dbError) {
      setError(dbError.message);
      setLoading(false);
      return;
    }
    setUsers((data as User[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      u.username.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.full_name ?? '').toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: f, backgroundColor: '#f2f2f2' }}>
      <header style={{ backgroundColor: '#D71E28', borderBottom: '4px solid #FFCD41', height: '60px', display: 'flex', alignItems: 'center' }}>
        <div className="max-w-[1400px] mx-auto w-full wf-section-px" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a onClick={onHome} style={{ cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="https://www17.wellsfargomedia.com/assets/images/rwd/wf_logo_220x23.png" alt="Wells Fargo" style={{ height: '20px', filter: 'brightness(0) invert(1)' }} />
            <span style={{ color: '#fff', fontSize: '0.88rem', fontWeight: 600, borderLeft: '1px solid rgba(255,255,255,0.4)', paddingLeft: '12px' }}>
              Admin Dashboard
            </span>
          </a>
          <button
            type="button" onClick={onLogout}
            style={{
              backgroundColor: '#fff', color: '#3b3331', border: 'none',
              borderRadius: '24px', fontWeight: 600, fontSize: '0.88rem',
              padding: '6px 20px', cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div style={{ flex: 1 }} className="wf-section-px">
        <div className="max-w-[1400px] mx-auto" style={{ paddingTop: '32px', paddingBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
            <h1 style={{ fontFamily: f, fontSize: '1.76rem', fontWeight: 300, fontStyle: 'italic', color: '#141414', margin: 0 }}>
              Users
            </h1>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="search" placeholder="Search name, email, username"
                value={search} onChange={(e) => setSearch(e.target.value)}
                style={{
                  padding: '8px 14px', fontSize: '0.88rem', fontFamily: f,
                  border: '1px solid #b5adad', borderRadius: '6px', outline: 'none',
                  minWidth: '240px',
                }}
              />
              <button
                type="button" onClick={fetchUsers}
                style={{
                  backgroundColor: '#141414', color: '#fff', border: 'none',
                  borderRadius: '6px', fontSize: '0.88rem', fontWeight: 600,
                  padding: '8px 16px', cursor: 'pointer',
                }}
              >
                Refresh
              </button>
            </div>
          </div>

          {toast && (
            <div role="status" style={{
              backgroundColor: '#D4EDDA', border: '1px solid #C3E6CB', color: '#155724',
              padding: '10px 16px', borderRadius: '6px', marginBottom: '16px',
              fontSize: '0.88rem',
            }}>
              {toast}
            </div>
          )}
          {error && (
            <div role="alert" style={{
              backgroundColor: '#FDECEA', border: '1px solid #F5C6CB', color: '#721C24',
              padding: '10px 16px', borderRadius: '6px', marginBottom: '16px',
              fontSize: '0.88rem',
            }}>
              {error}
            </div>
          )}

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#555' }}>Loading users…</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#555', backgroundColor: '#fff', borderRadius: '8px' }}>
              {users.length === 0 ? 'No users registered yet.' : 'No users match your search.'}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filtered.map((u) => (
                <AdminUserRow
                  key={u.id}
                  user={u}
                  onSaved={(msg) => {
                    setToast(msg);
                    fetchUsers();
                  }}
                  onError={(msg) => setError(msg)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminUserRow({
  user,
  onSaved,
  onError,
}: {
  user: User;
  onSaved: (msg: string) => void;
  onError: (msg: string) => void;
}) {
  const [checking, setChecking] = useState(String(user.checking_balance));
  const [investment, setInvestment] = useState(String(user.investment_balance));
  const [saving, setSaving] = useState(false);

  const dirty =
    Number(checking) !== Number(user.checking_balance) ||
    Number(investment) !== Number(user.investment_balance);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('users')
      .update({
        checking_balance: Number(checking) || 0,
        investment_balance: Number(investment) || 0,
      })
      .eq('id', user.id);
    setSaving(false);
    if (error) {
      onError(error.message);
      return;
    }
    onSaved(`Updated ${user.username}`);
  };

  return (
    <div style={{
      backgroundColor: '#fff', borderRadius: '8px', padding: '16px 20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      display: 'grid', gridTemplateColumns: '1fr', gap: '12px',
    }}>
      <style>{`
        @media (min-width: 900px) {
          .admin-row { grid-template-columns: 2fr 1fr 1fr auto !important; align-items: center; }
        }
      `}</style>
      <div className="admin-row" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', alignItems: 'start' }}>
        <div>
          <div style={{ fontWeight: 600, color: '#141414', fontSize: '1rem' }}>{user.full_name || user.username}</div>
          <div style={{ fontSize: '0.82rem', color: '#555' }}>{user.email}</div>
          <div style={{ fontSize: '0.76rem', color: '#787070' }}>Username: {user.username}</div>
          <div style={{ fontSize: '0.76rem', color: '#787070' }}>Current: {formatCurrency(Number(user.checking_balance))} checking · {formatCurrency(Number(user.investment_balance))} investment</div>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.76rem', color: '#555', marginBottom: '4px' }}>Checking</label>
          <input
            type="number" step="0.01" value={checking}
            onChange={(e) => setChecking(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', fontSize: '0.88rem', border: '1px solid #b5adad', borderRadius: '6px', outline: 'none' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.76rem', color: '#555', marginBottom: '4px' }}>Investment</label>
          <input
            type="number" step="0.01" value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', fontSize: '0.88rem', border: '1px solid #b5adad', borderRadius: '6px', outline: 'none' }}
          />
        </div>
        <div>
          <button
            type="button"
            onClick={handleSave}
            disabled={!dirty || saving}
            style={{
              backgroundColor: !dirty || saving ? '#b5adad' : '#D71E28',
              color: '#fff', border: 'none', borderRadius: '24px',
              fontWeight: 600, fontSize: '0.88rem', padding: '10px 28px',
              cursor: !dirty || saving ? 'not-allowed' : 'pointer',
              width: '100%',
              minWidth: '100px',
            }}
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
