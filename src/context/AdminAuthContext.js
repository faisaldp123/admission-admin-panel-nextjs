import { createContext, useContext, useEffect, useState } from "react";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On first load, read from localStorage
  useEffect(() => {
    const storedLogin = localStorage.getItem("admin_logged_in");
    setIsLoggedIn(storedLogin === "true");
  }, []);

  // When isLoggedIn changes, update localStorage
  useEffect(() => {
    localStorage.setItem("admin_logged_in", isLoggedIn ? "true" : "false");
  }, [isLoggedIn]);

  return (
    <AdminAuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
