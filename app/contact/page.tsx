import ContactForm from '@/components/ContactForm/ContactForm';
import Footer from '@/components/Footer/Footer';
import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';
import '../globals.css';
import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: "Contact",
    description:
      'Contact me here, in LinkedIn, email, phone by Naeem Gitonga',
  };
}

export default async function Contact(params: Params): Promise<JSX.Element> {
  const searchParams = await params.searchParams;
  const from = searchParams?.fromWebsite ?? "direct";
  return (
    <>
      <AnalyticsTracker fromWebsite={from} />
      <ContactForm />
      <Footer />
    </>
  );
}
