import { Metadata } from 'next';
import AdminDashboard from '@/components/Admin/AdminDashboard/AdminDashboard';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Analytics',
  description: 'Analytics dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage(): React.JSX.Element {
  return <AdminDashboard />;
}
