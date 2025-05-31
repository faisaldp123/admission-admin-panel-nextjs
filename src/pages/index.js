import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const AdminDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('access_token');
    const lastActivity = Cookies.get('last_activity');
    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;

    // 1) no token → force login
    if (!token) {
      router.replace('/login');
      return;
    }

    // 2) we have a token but no timestamp → clear and login
    if (!lastActivity) {
      Cookies.remove('access_token');
      router.replace('/login');
      return;
    }

    // 3) timestamp is stale → clear both and login
    if (now - parseInt(lastActivity, 10) > ONE_DAY) {
      Cookies.remove('access_token');
      Cookies.remove('last_activity');
      router.replace('/login');
      return;
    }

    // 4) otherwise we’re good: renew last_activity
    Cookies.set('last_activity', now.toString(), { sameSite: 'lax' });
  }, [router]);

  return (
    <div>
      <h2 className='text-center'>Welcome to Admission Panel Admin Dashboard</h2>
      <p className='text-center'>Need any kind of support please contact to our helpline number or click to this link please we'll shortly get in touch with you...</p>
    </div>
  );
};

export default AdminDashboard;
