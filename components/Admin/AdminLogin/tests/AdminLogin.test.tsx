import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import AdminLogin from '../AdminLogin';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

global.fetch = jest.fn();

describe('AdminLogin component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders login form', () => {
    render(<AdminLogin />);
    expect(screen.getByRole('heading', { level: 1, name: /Admin Login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('submits password to API', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<AdminLogin />);
    const input = screen.getByLabelText(/Password/i) as HTMLInputElement;
    const button = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(input, { target: { value: 'test-password' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/admin/auth',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: 'test-password' }),
        })
      );
    });
  });

  it('redirects to /admin on successful login', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<AdminLogin />);
    const input = screen.getByLabelText(/Password/i);
    const button = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(input, { target: { value: 'correct-password' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/admin');
    });
  });

  it('shows error on invalid password', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ error: 'Invalid password' }),
    });

    render(<AdminLogin />);
    const input = screen.getByLabelText(/Password/i) as HTMLInputElement;
    const button = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(input, { target: { value: 'wrong-password' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Invalid password/i)).toBeInTheDocument();
    });
  });

  it('clears password on error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 401,
    });

    render(<AdminLogin />);
    const input = screen.getByLabelText(/Password/i) as HTMLInputElement;
    const button = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(input, { target: { value: 'wrong' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });

  it('disables button while loading', async () => {
    (global.fetch as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 100))
    );

    render(<AdminLogin />);
    const input = screen.getByLabelText(/Password/i);
    const button = screen.getByRole('button') as HTMLButtonElement;

    fireEvent.change(input, { target: { value: 'password' } });
    fireEvent.click(button);

    expect(button.disabled).toBe(true);
    expect(button).toHaveTextContent(/Logging in/i);

    await waitFor(() => {
      expect(button.disabled).toBe(false);
    });
  });

  it('handles network error gracefully', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<AdminLogin />);
    const input = screen.getByLabelText(/Password/i);
    const button = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(input, { target: { value: 'password' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/An error occurred/i)).toBeInTheDocument();
    });
  });

  it('has autocomplete off for security', () => {
    render(<AdminLogin />);
    const input = screen.getByLabelText(/Password/i) as HTMLInputElement;
    expect(input).toHaveAttribute('autocomplete', 'off');
  });
});
