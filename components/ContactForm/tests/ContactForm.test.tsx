import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from '../ContactForm';

global.fetch = jest.fn();

describe('ContactForm', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockReset();
  });

  it('renders all form fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText('Your Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Send message')).toBeInTheDocument();
  });

  it('shows success message after successful submission', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });

    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText('Your Name'), { target: { value: 'Ada' } });
    fireEvent.change(screen.getByLabelText('Your Email Address'), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello' } });
    fireEvent.submit(document.querySelector('form'));

    await waitFor(() => {
      expect(screen.getByText(/message was sent/i)).toBeInTheDocument();
    });
  });

  it('shows error message when submission fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });

    render(<ContactForm />);
    fireEvent.submit(document.querySelector('form'));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it('sends name, email, and message as JSON to /api/contact', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });

    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText('Your Name'), { target: { value: 'Ada' } });
    fireEvent.change(screen.getByLabelText('Your Email Address'), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello there' } });
    fireEvent.submit(document.querySelector('form'));

    await waitFor(() => {
      const [url, options] = (global.fetch as jest.Mock).mock.calls[0];
      expect(url).toBe('/api/contact');
      expect(options.method).toBe('POST');
      expect(JSON.parse(options.body)).toEqual({
        name: 'Ada',
        email: 'ada@example.com',
        message: 'Hello there',
      });
    });
  });
});
