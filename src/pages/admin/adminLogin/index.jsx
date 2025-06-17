import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!password) return setError('Password is required');

    setLoading(true);
    try {
      const res = await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`,
  { email, password },
  { withCredentials: true } // ✅ this is crucial
);

      if (res.data.success) {
  router.push('/admin/dashboard');
}
    } catch (err) {
      setError(err?.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl mb-4 font-bold">Admin Login</h2>
      <input
        type="password"
        className="p-2 border border-gray-400 rounded mb-4 w-64"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter admin password"
      />
      <button
        onClick={handleLogin}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p className="text-red-600 mt-3">{error}</p>}
    </div>
  );
}
