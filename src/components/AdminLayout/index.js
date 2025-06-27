import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

const AdminLayout = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openMenus, setOpenMenus] = useState({ UG: false, PG: false });

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/check-admin-session`, {
          withCredentials: true,
        });
        if (res.status === 200 && res.data.message === "Authenticated") {
          setIsLoggedIn(true);
        } else {
          router.replace('/admin/adminLogin');
        }
      } catch (err) {
        router.replace('/admin/adminLogin');
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  if (isChecking) return <p>Checking authentication...</p>;
  if (!isLoggedIn) return null;

  const navStructure = {
    UG: ['bba', 'bca', 'bcom', 'ba'],
    PG: ['mba', 'mca', 'ma', 'mcom'],
  };

  const toggleMenu = (type) => {
    setOpenMenus((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

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

          {/* Specializations Dropdown */}
          <li className="mt-4 font-semibold">Specializations</li>
          {Object.entries(navStructure).map(([category, courses]) => (
            <div key={category} className="ml-1 mt-2">
              <button
                onClick={() => toggleMenu(category)}
                className="w-full text-left px-2 py-1 hover:bg-gray-700 rounded text-sm text-gray-200"
              >
                {category} {openMenus[category] ? '▾' : '▸'}
              </button>
              {openMenus[category] && (
                <div className="ml-4 mt-1">
                  {courses.map((course) => (
                    <Link
                      key={course}
                      href={`/admin/courses/${course}/specializations`}
                      className="block p-1 text-sm text-gray-300 hover:bg-gray-700 rounded"
                    >
                      {course.toUpperCase()}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </ul>

        <button
          onClick={async () => {
            try {
              await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/logout`,
                {},
                { withCredentials: true }
              );
              Cookies.remove('access_token', { path: '' });
              Cookies.remove('role', { path: '' });
              localStorage.clear();
              sessionStorage.clear();
              router.replace('/admin/adminLogin');
            } catch (err) {
              console.error("Logout failed:", err);
            }
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
