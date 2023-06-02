import styles from './ContactForm.module.css';
import sharedStyles from '../SharedCss/SharedCss.module.scss';

export default function ContactForm(): JSX.Element {
  const {
    contactMe,
    contactForm,
    input,
    form,
    message,
    submit,
    contact,
    label,
  } = styles;
  return (
    <section
      className={`${contact} ${sharedStyles.height100vh} animated`}
      id="contact"
    >
      <div className={contactForm}>
        <h2 className={contactMe}>contactMe</h2>
        <form
          className={form}
          action="https://formspree.io/blackb8r@gmail.com"
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
    </section>
  );
}
