import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminIndex() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin_logged_in');
    if (isLoggedIn) {
      router.replace('/admin/dashboard');
    } else {
      router.replace('/admin/adminLogin');
    }
  }, []);

  return null;
}