import React from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();

  const isAuthenticated = () => !!Cookies.get("access_token");

  const handleLogout = () => {
    Cookies.remove("access_token");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen">
      {isAuthenticated() && (
        <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link href="/universities" className="block hover:bg-gray-700 p-2 rounded">
                    Universities
                  </Link>
                </li>
                <li>
                  <Link href="/users" className="block hover:bg-gray-700 p-2 rounded">
                    Users
                  </Link>
                </li>
                {/* Add more sidebar items here */}
              </ul>
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
          >
            Logout
          </button>
        </aside>
      )}

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default Layout;
