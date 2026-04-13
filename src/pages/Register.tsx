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
        <div className="max-w-[1400px] mx-auto w-full wf-section-px" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{ textDecoration: 'none' }}>
            <img
              src="https://www17.wellsfargomedia.com/assets/images/rwd/wf_logo_220x23.png"
              alt="Wells Fargo"
              width="180" height="20"
              style={{ height: '20px', width: 'auto', filter: 'brightness(0) invert(1)' }}
            />
          </a>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {['Open an Account', 'Customer Service', 'ATMs/Locations', 'Español'].map((item) => (
              <a key={item} style={{ color: '#fff', textDecoration: 'none', fontSize: '0.76rem', fontFamily: f }} className="wf-hide-mobile hover:underline">
                {item}
              </a>
            ))}
            <div className="wf-hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <label htmlFor="headerSearch" style={{ position: 'absolute', left: '-9999px' }}>Search</label>
              <input
                id="headerSearch"
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
        padding: '24px 16px',
      }}>
        {/* Form card */}
        <div className="wf-form-card" style={{
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderRadius: '12px',
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
            <div className="wf-form-row">
              <div>
                <label htmlFor="fullName" style={{ position: 'absolute', left: '-9999px' }}>Full Name</label>
                <input id="fullName" type="text" name="fullName" placeholder="Full Name" required value={form.fullName} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label htmlFor="advisoryCustodian" style={{ position: 'absolute', left: '-9999px' }}>Advisory Custodian</label>
                <input id="advisoryCustodian" type="text" name="advisoryCustodian" placeholder="Advisory Custodian" value={form.advisoryCustodian} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <div className="wf-form-row">
              <div>
                <label htmlFor="dob" style={{ position: 'absolute', left: '-9999px' }}>Date of Birth</label>
                <input id="dob" type="date" name="dob" placeholder="DOB" required value={form.dob} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label htmlFor="address" style={{ position: 'absolute', left: '-9999px' }}>Address</label>
                <input id="address" type="text" name="address" placeholder="Address" required value={form.address} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <div className="wf-form-row">
              <div>
                <label htmlFor="phone" style={{ position: 'absolute', left: '-9999px' }}>Phone Number</label>
                <input id="phone" type="tel" name="phone" placeholder="Phone Number" required pattern="[0-9]{10}" value={form.phone} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label htmlFor="email" style={{ position: 'absolute', left: '-9999px' }}>Email</label>
                <input id="email" type="email" name="email" placeholder="Email" required value={form.email} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <div className="wf-form-row">
              <div>
                <label htmlFor="ssn" style={{ position: 'absolute', left: '-9999px' }}>SSN</label>
                <input id="ssn" type="password" name="ssn" placeholder="SSN" required value={form.ssn} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label htmlFor="username" style={{ position: 'absolute', left: '-9999px' }}>Username</label>
                <input id="username" type="text" name="username" placeholder="Username" required value={form.username} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label htmlFor="password" style={{ position: 'absolute', left: '-9999px' }}>Password</label>
              <input id="password" type="password" name="password" placeholder="Password" required minLength={8} value={form.password} onChange={handleChange} style={inputStyle} />
            </div>

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

            <div style={{ textAlign: 'center', margin: '20px 0', color: '#555', fontSize: '0.88rem', fontFamily: f }}>
              or
            </div>

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
