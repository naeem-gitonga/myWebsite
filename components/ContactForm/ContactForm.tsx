'use client';
import styles from './ContactForm.module.scss';
import sharedStyles from '../SharedCss/SharedCss.module.scss';
import PageHeader from '../PageHeader/PageHeader';

export default function ContactForm(): JSX.Element {
  const { contactWrapper, contactForm, input, form, message, submit, label } =
    styles;
  return (
    <div
      id="contact"
      className={`${contactWrapper} ${sharedStyles.height100vh}`}
    >
      <PageHeader headerName="contactMe" hideLinks={false} />
      <div className={contactForm}>
        <form
          className={form}
          action={process.env.NEXT_PUBLIC_FORM_URL}
          method="POST"
        >
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
          <label className={label} htmlFor="contact-form-message">
            Message
          </label>
          <textarea
            name="message"
            className={message}
            id="contact-form-message"
            required
          ></textarea>
          <input className={submit} type="submit" value="Send message" />
        </form>
      </div>
    </div>
  );
}
