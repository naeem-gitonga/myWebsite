'use client';
import styles from './ContactForm.module.scss';
import PageHeader from '../PageHeader/PageHeader';

export default function ContactForm(): React.JSX.Element {
  const { contactWrapper, contactForm, form, fieldGroup, input, message, submit, label } =
    styles;

  return (
    <div id="contact" className={contactWrapper}>
      <PageHeader headerName="contactMe" hideLinks={false} />
      <div className={contactForm}>
        <form
          className={form}
          action={process.env.NEXT_PUBLIC_FORM_URL}
          method="POST"
        >
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
              name="_replyto"
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

          <input className={submit} type="submit" value="Send message" />
        </form>
      </div>
    </div>
  );
}
