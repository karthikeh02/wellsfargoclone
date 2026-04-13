import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { hashPassword, login } from '../../lib/session';

const f = '"Wells Fargo Sans", Arial, Helvetica, sans-serif';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 3 && hour <= 11) return 'Good morning';
  if (hour >= 12 && hour <= 17) return 'Good afternoon';
  return 'Good evening';
}

export default function SignOnBox() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState(getGreeting());
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setGreeting(getGreeting()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const { data, error: dbError } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .maybeSingle();

      if (dbError || !data) {
        setError('Invalid username or password.');
        setSubmitting(false);
        return;
      }

      const hash = await hashPassword(password);
      if (hash !== data.password_hash) {
        setError('Invalid username or password.');
        setSubmitting(false);
        return;
      }

      login(data);
      navigate('/accounts');
    } catch (err) {
      console.error(err);
      setError('Sign on failed. Please try again.');
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    border: 'none', borderBottom: '1px solid #787070', height: '36px',
    padding: '0 16px', fontSize: '20px', fontFamily: f, color: '#141414',
    width: '100%', backgroundColor: '#fff', outline: 'none',
  };

  return (
    <div style={{ width: '100%', maxWidth: '335px', margin: '0 auto' }}>
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '10px 10px 0 0',
          boxShadow: '0 0 12px 0 rgba(0,0,0,0.2)',
          padding: '16px 16px 16px',
        }}
      >
        <h2 style={{ color: '#141414', fontSize: '1.41176471rem', lineHeight: '1.25', margin: 0, fontFamily: f, fontWeight: 400 }}>
          {greeting}
        </h2>
        <span style={{ color: '#787070', display: 'inline-block', fontSize: '0.88235294rem', margin: '5px 0 14px', fontFamily: f }}>
          Sign on to manage your accounts.
        </span>

        {error && (
          <div role="alert" style={{
            backgroundColor: '#FDECEA', border: '1px solid #F5C6CB', color: '#721C24',
            padding: '8px 12px', borderRadius: '4px', marginBottom: '12px',
            fontFamily: f, fontSize: '0.82rem',
          }}>
            {error}
          </div>
        )}

        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="userid" className="block" style={{
              color: '#787070', fontSize: '0.76470588rem', padding: '0 0 2px', fontFamily: f,
            }}>
              Username
            </label>
            <input type="text" id="userid" required value={username} onChange={(e) => setUsername(e.target.value)} style={inputStyle} />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block" style={{
              color: '#787070', fontSize: '0.76470588rem', padding: '0 0 2px', fontFamily: f,
            }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password" required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ ...inputStyle, paddingRight: '80px' }}
              />
              <a
                onClick={(e) => { e.preventDefault(); setShowPassword(!showPassword); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:underline"
                style={{ color: '#5a469b', fontSize: '0.88235294rem', textDecoration: 'underline' }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox" id="saveusername"
              style={{ width: '22px', height: '22px', accentColor: '#3b3331', cursor: 'pointer' }}
            />
            <label htmlFor="saveusername" style={{ color: '#3b3331', fontSize: '15px', fontFamily: f }}>
              Save username
            </label>
          </div>

          <div className="flex items-center gap-4" style={{ paddingTop: '16px', paddingBottom: '12px' }}>
            <button
              type="submit"
              disabled={submitting}
              className="cursor-pointer"
              style={{
                backgroundColor: submitting ? '#9c0b18' : '#D71E28',
                color: '#fff', borderRadius: '24px',
                fontFamily: f, fontWeight: 600, fontSize: '1rem', lineHeight: '1.29',
                padding: '9px 32px', textAlign: 'center', border: 'none',
                minWidth: '160px', opacity: submitting ? 0.8 : 1,
              }}
            >
              {submitting ? 'Signing on…' : 'Sign On'}
            </button>
            <a href="/register" className="hover:underline" style={{ color: '#5a469b', fontSize: '15px', fontFamily: f, textDecoration: 'none' }}>
              Open an Account
            </a>
          </div>
        </form>
      </div>

      <div
        style={{
          backgroundColor: '#f4f0ed',
          borderRadius: '0 0 10px 10px',
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.2)',
          padding: '12px 16px 16px',
        }}
      >
        <a href="/register" className="block mb-1 hover:underline" style={{
          color: '#141414', fontSize: '15px', fontFamily: f, lineHeight: '1.466', textDecoration: 'none',
        }}>
          Open an Account
        </a>
        <a className="block mb-1 hover:underline" style={{
          color: '#141414', fontSize: '15px', fontFamily: f, lineHeight: '1.466', textDecoration: 'none',
        }}>
          Forgot username or password?
        </a>
        <a className="block hover:underline" style={{
          color: '#141414', fontSize: '15px', fontFamily: f, lineHeight: '1.466', textDecoration: 'none',
        }}>
          Privacy, Cookies, and Legal
        </a>
      </div>
    </div>
  );
}
