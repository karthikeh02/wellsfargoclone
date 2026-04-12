import { useState, useEffect } from 'react';

const f = '"Wells Fargo Sans", Arial, Helvetica, sans-serif';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 3 && hour <= 11) return 'Good morning';
  if (hour >= 12 && hour <= 17) return 'Good afternoon';
  return 'Good evening';
}

function BottomLink({ children }: { children: string }) {
  return (
    <a
      href="#"
      className="flex items-center justify-between mb-1 hover:underline"
      style={{
        color: '#5a469b',
        fontSize: '15px',
        fontFamily: f,
        lineHeight: '1.466',
        textDecoration: 'none',
      }}
    >
      {children}
      <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '10px', height: '10px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </a>
  );
}

export default function SignOnBox() {
  const [greeting, setGreeting] = useState(getGreeting());
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setGreeting(getGreeting()), 60000);
    return () => clearInterval(interval);
  }, []);

  const fieldBorder: React.CSSProperties = { border: '1px solid #b5adad', borderRadius: '3px' };
  const labelStyle: React.CSSProperties = {
    color: '#787070', fontSize: '0.76470588rem', padding: '4px 16px 0',
    fontFamily: f, backgroundColor: '#f9f7f6',
  };
  const inputStyle: React.CSSProperties = {
    border: 'none', borderBottom: '1px solid #787070', height: '30px',
    padding: '0 16px', fontSize: '20px', fontFamily: f, color: '#141414',
    width: '100%', backgroundColor: '#fff', outline: 'none',
  };

  return (
    <div style={{ width: '335px', flexShrink: 0 }}>
      {/* Top section - white */}
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '10px 10px 0 0',
          boxShadow: '0 0 12px 0 rgba(0,0,0,0.2)',
          padding: '12px 16px 16px',
        }}
      >
        <h2 style={{ color: '#141414', fontSize: '1.41176471rem', lineHeight: '1.25', margin: 0, fontFamily: f, fontWeight: 400 }}>
          {greeting}
        </h2>
        <span style={{ color: '#787070', display: 'inline-block', fontSize: '0.88235294rem', margin: '5px 0 10px', fontFamily: f }}>
          Sign on to manage your accounts.
        </span>

        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          {/* Username */}
          <div className="mb-2.5 flex flex-col" style={fieldBorder}>
            <label htmlFor="userid" className="block" style={labelStyle}>Username</label>
            <input type="text" id="userid" style={inputStyle} />
          </div>

          {/* Password */}
          <div className="mb-2.5 flex flex-col" style={fieldBorder}>
            <label htmlFor="password" className="block" style={labelStyle}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                style={{ ...inputStyle, paddingRight: '80px' }}
              />
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setShowPassword(!showPassword); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:underline"
                style={{ color: '#5a469b', fontSize: '0.88235294rem', textDecoration: 'none' }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </a>
            </div>
          </div>

          {/* Save username */}
          <div className="flex items-center gap-2 mt-4 mb-1">
            <input
              type="checkbox"
              id="saveusername"
              style={{
                width: '22px', height: '22px', accentColor: '#3b3331',
                border: '1px solid #787070', borderRadius: '2px', cursor: 'pointer',
              }}
            />
            <label htmlFor="saveusername" style={{ color: '#3b3331', fontSize: '15px', fontFamily: f }}>
              Save username
            </label>
          </div>

          {/* Sign On Button + Enroll side by side */}
          <div className="flex items-center gap-4" style={{ paddingTop: '20px', paddingBottom: '16px' }}>
            <button
              type="submit"
              className="cursor-pointer"
              style={{
                backgroundColor: '#D71E28', color: '#fff', borderRadius: '24px',
                fontFamily: f, fontWeight: 600, fontSize: '1rem', lineHeight: '1.29',
                padding: '9px 32px', textAlign: 'center',
                border: 'none', minWidth: '140px',
              }}
            >
              Sign On
            </button>
            <a
              href="#"
              className="hover:underline"
              style={{ color: '#5a469b', fontSize: '15px', fontFamily: f, textDecoration: 'none' }}
            >
              Enroll
            </a>
          </div>
        </form>
      </div>

      {/* Bottom section - warm gray */}
      <div
        style={{
          backgroundColor: '#f4f0ed',
          borderRadius: '0 0 10px 10px',
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.2)',
          padding: '12px 16px 16px',
        }}
      >
        <BottomLink>Sign on with a passkey</BottomLink>
        <BottomLink>Forgot username or password?</BottomLink>
        <BottomLink>Privacy, Cookies, and Legal</BottomLink>
      </div>
    </div>
  );
}
