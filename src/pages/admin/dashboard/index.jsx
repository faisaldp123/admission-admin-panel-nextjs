import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AdminDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin_logged_in');
    if (!isLoggedIn) {
      router.replace('/admin/adminLogin');
    }
  }, [router]);

  return (
    <div>
      <h2>Welcome to Admission Panel Admin Dashboard</h2>
    </div>
  );
};

export default AdminDashboard;