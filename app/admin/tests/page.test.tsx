import { render, screen } from '@testing-library/react';
import AdminPage from '../page';

jest.mock('@/components/Admin/AdminDashboard/AdminDashboard', () => ({
  __esModule: true,
  default: () => <div data-testid="admin-dashboard">Admin Dashboard Component</div>,
}));

describe('Admin Page', () => {
  it('renders admin dashboard component', () => {
    render(<AdminPage />);
    expect(screen.getByTestId('admin-dashboard')).toBeInTheDocument();
  });

  it('has correct metadata', async () => {
    const { metadata } = await import('../page');
    expect(metadata.title).toContain('Admin Dashboard');
    expect(metadata.description).toContain('Analytics dashboard');
  });

  it('sets robots metadata to prevent indexing', async () => {
    const { metadata } = await import('../page');
    expect(metadata.robots?.index).toBe(false);
    expect(metadata.robots?.follow).toBe(false);
  });
});
