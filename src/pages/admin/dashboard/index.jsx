import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';

const AdminDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin_logged_in');
    if (!isLoggedIn) {
      router.replace('/admin/adminLogin');
    }
  }, [router]); // ← important to include router in dependency

  return (
    <AdminLayout>
        <div>
      <h2>Welcome to Admin Dashboard</h2>
    </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
