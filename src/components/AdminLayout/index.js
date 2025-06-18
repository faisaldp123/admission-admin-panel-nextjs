import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

const AdminLayout = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

 exports.checkAdminAuth = (req, res) => {
  const token = req.cookies.admin_token;
  if (!token) return res.status(401).json({ success: false });

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false });
  }
};

if (isChecking) return null;
if (!isLoggedIn) return <p>Redirecting...</p>;
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
        <ul>
          <li>
            <Link href="/admin/dashboard" className="block hover:bg-gray-700 p-2 rounded">Dashboard</Link>
          </li>
          <li>
            <Link href="/admin/universities" className="block hover:bg-gray-700 p-2 rounded">Universities</Link>
          </li>
          <li>
            <Link href="/admin/users" className="block hover:bg-gray-700 p-2 rounded">Users</Link>
          </li>
        </ul>
        <button
          onClick={async () => {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/logout`, {}, { withCredentials: true });
            router.push('/admin/adminLogin');
          }}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default AdminLayout;
