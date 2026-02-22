'use client';
// contact lambda
import { useState, FormEvent } from 'react';
import styles from './ContactForm.module.scss';
import PageHeader from '../PageHeader/PageHeader';
type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm(): React.JSX.Element {
  const { contactWrapper, contactForm, form, fieldGroup, input, message, submit, label } =
    styles;

  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div id="contact" className={contactWrapper}>
        <PageHeader headerName="contactMe" hideLinks={false} />
        <div className={contactForm}>
          <p>Your message was sent! I&apos;ll be in touch.</p>
        </div>
      </div>
    );
  }

  return (
    <div id="contact" className={contactWrapper}>
      <PageHeader headerName="contactMe" hideLinks={false} />
      <div className={contactForm}>
        <form className={form} onSubmit={handleSubmit}>
          <div className={fieldGroup}>
            <label className={label} htmlFor="contact-form-name">
              Your Name
            </label>
            <input
              className={input}
              type="text"
              name="name"
              id="contact-form-name"
              placeholder="Your Name"
              required
            />
          </div>

          <div className={fieldGroup}>
            <label className={label} htmlFor="contact-form-email">
              Your Email Address
            </label>
            <input
              className={input}
              type="email"
              name="email"
              id="contact-form-email"
              placeholder="grace@example.com"
              required
            />
          </div>

          <div className={fieldGroup}>
            <label className={label} htmlFor="contact-form-message">
              Message
            </label>
            <textarea
              name="message"
              className={message}
              id="contact-form-message"
              required
            />
          </div>

          {status === 'error' && (<p>Something went wrong. Please try again.</p>)}

          <input
            className={submit}
            type="submit"
            value={status === 'loading' ? 'Sending...' : 'Send message'}
            disabled={status === 'loading'}
          />
        </form>
      </div>
    </div>
  );
}
