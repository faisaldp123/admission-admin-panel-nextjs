import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAdminAuth } from '@/context/AdminAuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { setIsLoggedIn } = useAdminAuth(); // ✅ This is important
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (password === 'F@isal8646') { // ✅ Replace with real password
      setIsLoggedIn(true);                   // ✅ Sets global admin state
      router.push('/admin/dashboard');       // ✅ Redirects to dashboard
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter admin password"
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
