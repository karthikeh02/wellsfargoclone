import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminRole, clearAdminRole } from '../lib/adminAuth';
import { AdminLoginScreen, AdminLookupScreen } from './Admin';

export default function SuperAdmin() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(() => getAdminRole() === 'superadmin');

  if (!authed) {
    return (
      <AdminLoginScreen
        title="Super Admin Login"
        role="superadmin"
        onSuccess={() => setAuthed(true)}
        onBack={() => navigate('/')}
      />
    );
  }

  return (
    <AdminLookupScreen
      title="Super Admin Dashboard"
      showExtras={true}
      onLogout={() => { clearAdminRole(); setAuthed(false); }}
      onHome={() => navigate('/')}
    />
  );
}
