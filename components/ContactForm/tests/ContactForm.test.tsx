import { render, screen } from '@testing-library/react';
import ContactForm from '../ContactForm';

describe('ContactForm', () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = originalEnv;
  });

  it('renders contact form with action', () => {
    process.env = { ...originalEnv, NEXT_PUBLIC_FORM_URL: 'https://form.test' };
    const { container } = render(<ContactForm />);
    const form = container.querySelector('form') as HTMLFormElement;
    expect(form.action).toBe('https://form.test/');
    expect(screen.getByLabelText('Your Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });
});
