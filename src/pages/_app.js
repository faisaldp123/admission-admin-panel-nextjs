// pages/_app.js
import Layout from '@/components/Layout';
import AdminLayout from '@/components/AdminLayout';
import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import NextNProgress from 'nextjs-progressbar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdminAuthProvider } from '@/context/AdminAuthContext'; // ✅ Import context

function MyApp({ Component, pageProps, router }) {
  const path = router.pathname;

  const noLayoutPages = ['/login', '/register', '/admin/adminLogin'];
  const isAdminPage = path.startsWith('/admin');

  let content = <Component {...pageProps} />;

  if (!noLayoutPages.includes(path)) {
    if (isAdminPage) {
      content = <AdminLayout>{content}</AdminLayout>;
    } else {
      content = <Layout>{content}</Layout>;
    }
  }

  return (
    <Provider store={store}>
      <NextNProgress />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AdminAuthProvider>
          {content}
        </AdminAuthProvider>
      </LocalizationProvider>
    </Provider>
  );
}

export default MyApp;
