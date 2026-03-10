import { Metadata } from 'next';
import AdminLogin from '@/components/Admin/AdminLogin/AdminLogin';

export const metadata: Metadata = {
  title: 'Admin Login | Analytics',
  description: 'Admin login page',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage(): React.JSX.Element {
  return <AdminLogin />;
}
