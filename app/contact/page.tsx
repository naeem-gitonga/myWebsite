import ContactForm from '@/components/ContactForm/ContactForm';
import Footer from '@/components/Footer/Footer';
import '../globals.css';
import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: "Contact",
    description:
      'Contact me here, in LinkedIn, email, phone by Naeem Gitonga',
  };
}

export default function Contact() {
  return (
    <>
      <ContactForm />
      <Footer />
    </>
  );
}
