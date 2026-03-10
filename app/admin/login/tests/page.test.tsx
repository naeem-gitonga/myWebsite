import { render, screen } from '@testing-library/react';
import AdminLoginPage from '../page';

jest.mock('@/components/Admin/AdminLogin/AdminLogin', () => ({
  __esModule: true,
  default: () => <div data-testid="admin-login">Admin Login Component</div>,
}));

describe('Admin Login Page', () => {
  it('renders admin login component', () => {
    render(<AdminLoginPage />);
    expect(screen.getByTestId('admin-login')).toBeInTheDocument();
  });

  it('has correct metadata', async () => {
    const { metadata } = await import('../page');
    expect(metadata.title).toContain('Admin Login');
    expect(metadata.description).toContain('Admin login page');
  });

  it('sets robots metadata to prevent indexing', async () => {
    const { metadata } = await import('../page');
    expect(metadata.robots?.index).toBe(false);
    expect(metadata.robots?.follow).toBe(false);
  });
});
